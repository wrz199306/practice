"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export function SendTranscation() {
  const { isConnected } = useAccount();
  const { sendTransaction, isPending, error } = useSendTransaction();

  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");

  function handleSend() {
    if (!address.trim() || !value.trim()) return;
    sendTransaction({
      to: address as `0x${string}`,
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
        {error && <p>错误: {error.message}</p>}
      </div>
    );
  }
}
