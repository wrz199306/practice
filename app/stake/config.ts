import { parseAbi } from "viem";

export const CONTRACT_ADDRESS = "0x01A01E8B862F10a3907D0fC7f47eBF5d34190341";

export const PID = BigInt(0);

export const ABI = parseAbi([
  "function stakingBalance(uint256 _pid, address _user) external view returns(uint256)",
  "function pendingMetaNode(uint256 _pid, address _user) external view returns(uint256)",
  "function withdrawAmount(uint256 _pid, address _user) public view returns(uint256 requestAmount, uint256 pendingWithdrawAmount)",
  "function depositETH() public payable",
  "function unstake(uint256 _pid, uint256 _amount) public",
  "function withdraw(uint256 _pid) public",
]);
