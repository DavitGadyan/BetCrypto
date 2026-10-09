import type { Metadata } from "next";
import { BetsScreen } from "@/components/screens/bets";

export const metadata: Metadata = { title: "My Bets · Betrium" };

export default function Page() {
  return <BetsScreen />;
}
