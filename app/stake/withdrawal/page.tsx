"use client";

import { useState } from "react";
import { useMetaNode } from "../hook";

export default function Withdrawal() {
  const {
    stakedAmount,
    availableToWithdraw,
    pendingWithdraw,
    handleUnstake,
    handleWithdraw,
  } = useMetaNode();
  const [unstakeValue, setUnstakeValue] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 w-64 m-auto">
      <h1>MetaNode Stake</h1>
      <h2>Staked Amount {stakedAmount} ETH</h2>
      <h2>Available to Withdraw {availableToWithdraw} ETH</h2>
      <h2>Pending Withdraw {pendingWithdraw} ETH</h2>

      <div className="w-full flex items-center border border-solid border-black p-1">
        <input
          className="flex-1"
          type="number"
          value={unstakeValue}
          onChange={(e) => setUnstakeValue(e.target.value)}
        />
        <span>ETH</span>
      </div>
      <button
        className="w-full bg-amber-500"
        onClick={() => handleUnstake(unstakeValue)}
      >
        unstake
      </button>
      <button className="w-full bg-amber-500" onClick={handleWithdraw}>
        Withdraw
      </button>
    </div>
  );
}
