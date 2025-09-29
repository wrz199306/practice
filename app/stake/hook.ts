"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ABI, CONTRACT_ADDRESS, PID } from "./config";
import { useMemo } from "react";
import { formatEther, parseEther } from "viem";

export function useMetaNode() {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();

  const { data: _stakedAmount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "stakingBalance",
    args: [PID, address!],
    query: {
      enabled: !!address && isConnected,
    },
  });
  const stakedAmount = useMemo(
    () => (_stakedAmount ? formatEther(_stakedAmount) : "0"),
    [_stakedAmount]
  );

  const { writeContract, isPending } = useWriteContract();
  async function handleStake(amount: string) {
    if (!isConnected) {
      openConnectModal!();
      return;
    }

    await writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "depositETH",
      value: parseEther(amount),
    });
  }

  const stakeLabel = useMemo(() => {
    if (typeof window === "undefined") return "Stake ETH";
    if (isPending) return "Loading...";
    if (!isConnected) return "Connect Wallet";
    return "Stake ETH";
  }, [isPending, isConnected]);

  // 如果需要配置pending状态，需要重新useWriteContract
  async function handleUnstake(amount: string) {
    await writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "unstake",
      args: [PID, parseEther(amount)],
    });
  }

  const { data: _withdrawAmount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "withdrawAmount",
    args: [PID, address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  const availableToWithdraw = useMemo(
    () => (_withdrawAmount?.[1] ? formatEther(_withdrawAmount?.[1]) : "0"),
    [_withdrawAmount]
  );

  const pendingWithdraw = useMemo(() => {
    if (
      !_withdrawAmount?.[0] === undefined ||
      _withdrawAmount?.[1] === undefined
    )
      return "0";
    const _pendingWithdraw = _withdrawAmount[0] - _withdrawAmount[1];
    return formatEther(_pendingWithdraw);
  }, [_withdrawAmount]);

  function handleWithdraw() {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "withdraw",
      args: [PID],
    });
  }

  return {
    stakeLabel,
    stakedAmount,
    pendingWithdraw,
    availableToWithdraw,
    handleStake,
    handleUnstake,
    handleWithdraw,
  };
}
