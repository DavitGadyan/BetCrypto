import type { Metadata } from "next";
import { CasinoScreen } from "@/components/screens/casino";

export const metadata: Metadata = { title: "Casino · Betrium" };

export default function Page() {
  return <CasinoScreen />;
}
