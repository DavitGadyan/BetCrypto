import type { Metadata } from "next";
import { matches } from "@/lib/data";
import { MatchDetailScreen } from "@/components/screens/match-detail";

export function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = matches.find((x) => x.slug === slug);
  return { title: m ? `${m.home} – ${m.away} · Betrium` : "Match · Betrium" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MatchDetailScreen slug={slug} />;
}
