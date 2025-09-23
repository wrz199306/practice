import { useEffect, useMemo, useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  PublicClient,
  WalletClient,
  type Address,
  webSocket,
  getContract,
} from "viem";
import { sepolia } from "viem/chains";

const ethereum = typeof window !== "undefined" && (window as any).ethereum;

export const getWalletClient = (function () {
  let walletClient: WalletClient;
  return function () {
    if (typeof window !== "undefined" && !walletClient) {
      walletClient = createWalletClient({
        chain: sepolia,
        transport: custom((window as any).ethereum),
      });
    }
    return walletClient;
  };
})();

export const getPublicClient = (function () {
  let publicClient: PublicClient;
  return function () {
    if (!publicClient) {
      publicClient = createPublicClient({
        chain: sepolia,
        transport: webSocket("wss://sepolia.gateway.tenderly.co"),
      });
    }
    return publicClient;
  };
})();

export function useAccount() {
  const [address, setAddress] = useState<Address | null>(null);
  const isConnected = useMemo(() => !!address, [address]);

  async function init() {
    if (!ethereum) return;

    try {
      const walletClient = getWalletClient();
      const addresses = await walletClient.getAddresses();
      setAddress(addresses[0]);
    } catch (error) {
      console.error(error);
      setAddress(null);
    }
  }

  function handleAccountChange(addresses: Address[]) {
    setAddress(addresses[0]);
  }
  function handleDisconnect() {
    setAddress(null);
  }

  useEffect(() => {
    init();
    ethereum?.on("accountsChanged", handleAccountChange);
    ethereum.on("disconnect", handleDisconnect);

    return () => {
      setAddress(null);
      ethereum?.removeListener("accountsChanged", handleAccountChange);
      ethereum?.removeListener("disconnect", handleDisconnect);
    };
  }, []);

  return { isConnected, address };
}

export function useConnect() {
  const [isPending, setPending] = useState(false);
  async function connect() {
    setPending(true);
    const walletClient = getWalletClient();
    await walletClient.requestAddresses();
    setPending(false);
  }
  async function disconnect() {
    // await ethereum?.disconnect();
    try {
      if ((window as any).ethereum) {
        await (window as any).ethereum.request({
          method: "wallet_revokePermissions",
          params: [
            {
              eth_accounts: {}, // 撤销账户访问权限
            },
          ],
        });
        console.log("Disconnected from MetaMask");
      } else {
        console.error("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  }

  return { isPending, connect, disconnect };
}

export function useBalance(address: Address | null) {
  const publicClient = getPublicClient();
  const [data, setData] = useState<bigint>();

  async function update() {
    setData(
      address
        ? await publicClient.getBalance({
            address: address!,
          })
        : undefined
    );
  }

  useEffect(() => {
    update();
  }, [address]);

  useEffect(() => {
    if (!address) return;

    const unwatch = publicClient.watchBlocks({
      onBlock: async (block) => {
        for (const hash of block?.transactions || []) {
          const transaction = await publicClient.getTransaction({ hash });
          if (transaction.from === address || transaction.to === address) {
            console.log(address);
            const balance = await publicClient.getBalance({ address });
            setData(balance);
          }
        }
      },
    });

    return () => {
      unwatch();
    };
  }, [address]);

  return { data };
}

interface ISendTransactionOptions {
  to: Address;
  value: bigint;
}
export function useSendTransaction() {
  const [isPending, setPending] = useState(false);

  async function sendTransaction(options: ISendTransactionOptions) {
    const walletClient = getWalletClient();
    const chainId = await walletClient.getChainId();
    if (chainId !== sepolia.id) {
      await walletClient.switchChain(sepolia);
    }

    setPending(true);
    const [account] = await walletClient.getAddresses();
    await walletClient.sendTransaction({
      account,
      to: options.to,
      value: options.value,
      chain: sepolia,
    });
    setPending(false);
  }

  return { sendTransaction, isPending };
}
