import { AccountInfo } from "./components/AccountInfo";
import ContractInteraction from "./components/ContractInteraction";
import { SendTranscation } from "./components/SendTranscation";
import { WalletConnect } from "./components/WalletConnect";

export default function Home() {
  return (
    <>
      <WalletConnect />
      <AccountInfo />
      <SendTranscation />
      <ContractInteraction />
    </>
  );
}
