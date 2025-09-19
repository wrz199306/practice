"use client";

import { useState } from "react";
import { Address, parseEther } from "viem";
import { useAccount, useSendTransaction } from "../hook";

export function SendTranscation() {
  const { isConnected } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();

  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");

  function handleSend() {
    if (!address.trim() || !value.trim()) return;
    sendTransaction({
      to: address as Address,
      value: parseEther(value),
    });
  }

  if (isConnected) {
    return (
      <div>
        <input
          type="text"
          placeholder="地址"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="金额(ETH)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button disabled={isPending} onClick={handleSend}>
          {isPending ? "Loading" : "发送"}
        </button>
      </div>
    );
  }
}
