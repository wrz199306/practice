"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletConnect() {
  const { isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return isConnected ? (
    <button onClick={() => disconnect()}>断开连接</button>
  ) : (
    <div>
      <p>连接钱包</p>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
        >
          {connector.name}
        </button>
      ))}
      {error && <p>错误： {error.message}</p>}
    </div>
  );
}
