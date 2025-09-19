import { WalletConnect } from "./components/WalletConnect";
import { AccountInfo } from "./components/AccountInfo";
import { SendTranscation } from "./components/SendTranscation";
import { ContractInteraction } from "./components/ContractInteraction";

export default function WagmiPage() {
  return (
    <>
      <WalletConnect />
      <AccountInfo />
      <SendTranscation />
      <ContractInteraction />
    </>
  );
}
