"use client";

import { getPublicClient, getWalletClient, useAccount } from "../hook";
import { abi } from "../abi";
import { useEffect, useMemo, useState } from "react";
import { getContract, formatUnits, parseEther } from "viem";

const CONTRACT_ADDRESS = "0x5c0E35FFBA10B837258A03ae68AdcD313172a2B3";

export function ContractInteraction() {
  const publicClient = getPublicClient();
  const walletClient = getWalletClient();
  const { address } = useAccount();

  const contract = useMemo(
    () =>
      getContract({
        address: CONTRACT_ADDRESS,
        abi,
        client: { public: publicClient, wallet: walletClient },
      }),
    []
  );

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");

  async function init() {
    const [_name, _symbol, _balance, decimals] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.balanceOf([address]),
      contract.read.decimals(),
    ]);
    setName(_name as string);
    setSymbol(_symbol as string);
    setBalance(formatUnits(_balance as bigint, Number(decimals)));
  }

  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [isPending, setPending] = useState(false);

  async function handleTransfer() {
    if (!address) return;
    setPending(true);
    try {
      await contract.write.transfer([to, parseEther(value)], {
        account: address,
      });
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (!address) return;
    init();

    const fromUnWatch = contract.watchEvent.Transfer(
      { from: address },
      {
        onLogs(logs) {
          console.log(logs);
          init();
        },
      }
    );
    const toUnWatch = contract.watchEvent.Transfer(
      { from: address },
      {
        onLogs(logs) {
          console.log(logs);
          init();
        },
      }
    );

    return () => {
      fromUnWatch();
      toUnWatch();
    };
  }, [address]);

  return (
    <div>
      <h3>合约交互</h3>
      <p>代币名称: {name}</p>
      <p>代币符号: {symbol}</p>
      <p>余额: {balance}</p>
      <div>
        <input
          placeholder="address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleTransfer} disabled={isPending}>
          {isPending ? "处理中..." : "转账"}
        </button>
      </div>
    </div>
  );
}
