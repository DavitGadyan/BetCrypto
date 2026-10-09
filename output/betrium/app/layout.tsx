import type { Metadata, Viewport } from "next";
import { Cinzel as DisplayFont } from "next/font/google";
import { Inter as BodyFont } from "next/font/google";

const displayFont = DisplayFont({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });
const bodyFont = BodyFont({ subsets: ["latin"], variable: "--font-body-loaded", display: "swap" });
import "./globals.css";

export const metadata: Metadata = {
  title: "Betrium — Crypto Sportsbook & Casino",
  description:
    "Live odds across 40+ sports, provably fair casino originals, and on-chain settlement across six chains. Bet in crypto, settle on-chain.",
  openGraph: {
    title: "Betrium — Crypto Sportsbook & Casino",
    description: "Live odds, provably fair originals, on-chain settlement. Bet in crypto, settle on-chain.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0E10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
