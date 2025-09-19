"use client";

import { formatEther } from "viem";
import { useAccount, useBalance } from "../hook";

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance(address);

  if (isConnected) {
    return (
      <p>
        余额:
        {balance && formatEther(balance)} ETH
      </p>
    );
  }
}
