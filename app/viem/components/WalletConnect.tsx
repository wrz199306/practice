"use client";

import { useAccount, useConnect } from "../hook";

export function WalletConnect() {
  const { isConnected, address } = useAccount();
  const { connect, isPending, disconnect } = useConnect();

  return isConnected ? (
    <div>
      <button onClick={() => disconnect()}>断开连接</button>
      <p>{address}</p>
    </div>
  ) : (
    <button disabled={isPending} onClick={() => connect()}>
      {isPending ? "连接中" : "连接钱包"}
    </button>
  );
}
