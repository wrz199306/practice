"use client";

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
          {balance
            ? Number(balance.value) / Math.pow(10, balance.decimals)
            : 0}{" "}
          {balance?.symbol}
        </p>
      </div>
    );
  }
}
