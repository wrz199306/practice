"use client";

import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { parseAbi, parseEther, formatUnits } from "viem";
import { useState } from "react";
import { sepolia } from "viem/chains";

const erc20Abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
]);

const CONTRACT_ADDRESS = "0x5c0E35FFBA10B837258A03ae68AdcD313172a2B3";

export default function ContractInteraction() {
  const { address } = useAccount();

  // 读取合约数据
  const { data: name } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: "name",
    chainId: sepolia.id,
  });

  const { data: symbol } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: "symbol",
    chainId: sepolia.id,
  });

  const { data: tokenDecimals } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: "decimals",
    chainId: sepolia.id,
  });

  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: sepolia.id,
    query: { enabled: Boolean(address) },
  });

  const formattedBalance =
    balance !== undefined && tokenDecimals !== undefined
      ? formatUnits(balance as bigint, Number(tokenDecimals))
      : undefined;

  // 写入合约
  const { writeContract, isPending } = useWriteContract();

  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const handleTransfer = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: erc20Abi,
      functionName: "transfer",
      args: [to as `0x${string}`, parseEther(value)],
    });
  };

  return (
    <div>
      <h3>合约交互</h3>
      <p>代币名称: {name}</p>
      <p>代币符号: {symbol}</p>
      <p>余额: {formattedBalance ?? "-"}</p>
      <div>
        <input
          placeholder="address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleTransfer} disabled={isPending}>
          {isPending ? "处理中..." : "转账"}
        </button>
      </div>
    </div>
  );
}
