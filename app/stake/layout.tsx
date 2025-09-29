"use client";

import "./index.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StakeProvider } from "./components/Provider";
import Link from "next/link";

interface StakeProps {
  children: React.ReactNode;
}
export default function Stake({ children }: StakeProps) {
  return (
    <StakeProvider>
      <div className="w-full p-4 flex items-center justify-between">
        <div>MetaNode State</div>
        <nav className="flex gap-4">
          <Link href="/stake">Stake</Link>
          <Link href="/stake/withdrawal">Withdrawal</Link>
        </nav>
        <div>
          <ConnectButton label="Connect Wallet"></ConnectButton>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </StakeProvider>
  );
}
