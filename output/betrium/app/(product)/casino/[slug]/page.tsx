import type { Metadata } from "next";
import { games } from "@/lib/data";
import { GameDetailScreen } from "@/components/screens/game-detail";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = games.find((x) => x.slug === slug);
  return { title: g ? `${g.title} · Betrium Casino` : "Game · Betrium" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GameDetailScreen slug={slug} />;
}
