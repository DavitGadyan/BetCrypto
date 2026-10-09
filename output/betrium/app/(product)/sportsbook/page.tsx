import type { Metadata } from "next";
import { SportsbookScreen } from "@/components/screens/sportsbook";

export const metadata: Metadata = { title: "Sportsbook · Betrium" };

export default function Page() {
  return <SportsbookScreen />;
}
