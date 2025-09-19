"use client";

import { formatEther } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useBalance } from "wagmi";

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    unit: "ether",
    chainId: sepolia.id,
  });

  if (isConnected) {
    return (
      <div>
        <p>地址: {address}</p>
        <p>
          余额:
          {balance?.value && formatEther(balance?.value)} {balance?.symbol}
        </p>
      </div>
    );
  }
}
