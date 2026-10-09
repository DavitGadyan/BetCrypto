import type { Metadata } from "next";
import { WalletScreen } from "@/components/screens/wallet";

export const metadata: Metadata = { title: "Wallet · Betrium" };

export default function Page() {
  return <WalletScreen />;
}
