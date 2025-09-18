"use client";

import { useAccount, useBalance } from "wagmi";

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    unit: "ether",
    chainId: 11155111,
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
