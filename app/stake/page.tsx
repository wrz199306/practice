"use client";

import { useMetaNode } from "./hook";
import { useState } from "react";

export default function Stake() {
  const [value, setValue] = useState("0");

  const { stakedAmount, stakeLabel, handleStake } = useMetaNode();

  return (
    <div className="flex flex-col items-center gap-4 w-64 m-auto">
      <h1>MetaNode Stake</h1>
      <h2>Staked Amount {stakedAmount} ETH</h2>
      <div className="w-full flex items-center border border-solid border-black p-1">
        <input
          className="flex-1"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span>ETH</span>
      </div>
      <button
        className="w-full bg-amber-500"
        onClick={() => handleStake(value)}
      >
        {stakeLabel}
      </button>
    </div>
  );
}
