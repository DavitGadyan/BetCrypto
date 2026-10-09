"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDownWideNarrow, Dices, Gauge, MoreHorizontal, ShieldCheck, Sparkles, Users } from "lucide-react";
import { gameCategories, games, type Game } from "@/lib/data";
import { ActionButton, FilterSelect, MetaRow, PageHeader, Pagination, Pill, type PillTone } from "@/components/ui";

const PER_PAGE = 9;

const tagTone: Record<Game["tag"], PillTone> = { Hot: "gold", New: "win", Live: "live", Original: "bronze" };

function GameCard({ g }: { g: Game }) {
  return (
    <article className="card flex flex-col p-5 transition-colors duration-150 hover:border-[rgba(212,169,78,0.4)]">
      <div className="flex items-center justify-between gap-3">
        <Pill tone={tagTone[g.tag]} dot={g.tag === "Live"}>{g.tag}</Pill>
        <div className="flex items-center gap-2.5 text-[13px] text-muted">
          <span className="num flex items-center gap-1.5"><Users size={13} aria-hidden />{g.playing.toLocaleString("en-US")} playing</span>
          <button type="button" aria-label={`More options for ${g.title}`} className="text-muted transition-colors hover:text-ink">
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      <Link href={`/casino/${g.slug}`} className="mt-4 block">
        <h2 className="text-[19px] font-bold text-ink transition-colors hover:text-accent">{g.title}</h2>
        <p className="mt-0.5 text-[14px] text-muted">{g.studio}</p>
      </Link>

      <div className="mt-4 border-t border-line pt-3.5">
        <MetaRow
          items={[
            <span key="rtp" className="num flex items-center gap-1.5"><Gauge size={14} className="text-win" aria-hidden />RTP {g.rtp.toFixed(1)}%</span>,
            <span key="max" className="num flex items-center gap-1.5"><Sparkles size={14} className="text-accent" aria-hidden />Max {g.maxWin}</span>,
            g.fair ? (
              <span key="pf" className="flex items-center gap-1.5 text-win"><ShieldCheck size={14} aria-hidden />Provably fair</span>
            ) : (
              <span key="pf" className="flex items-center gap-1.5"><ShieldCheck size={14} aria-hidden />Live dealer</span>
            ),
          ]}
        />
      </div>
    </article>
  );
}

export function CasinoScreen() {
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const list = games.filter((g) => {
    if (cat === "All") return true;
    if (cat === "Originals") return g.studio === "Betrium Originals";
    if (cat === "Live") return g.tag === "Live";
    if (cat === "New") return g.tag === "New";
    if (cat === "Table") return ["velvet-roulette", "blackjack-prive", "baccarat-noir"].includes(g.slug);
    return true;
  });
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const shown = list.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <>
      <PageHeader
        title="Casino"
        subtitle="Originals and live tables, every original verifiable hand by hand."
        actions={
          <>
            <ActionButton>Filter</ActionButton>
            <ActionButton icon={<ArrowDownWideNarrow size={16} className="text-muted" aria-hidden />}>Sort: Popular</ActionButton>
          </>
        }
      />
      <div className="mb-6 flex flex-wrap gap-2.5">
        <FilterSelect
          icon={<Dices size={16} />}
          label="Category"
          value={cat}
          options={gameCategories}
          onChange={(v) => { setCat(v); setPage(1); }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((g) => <GameCard key={g.slug} g={g} />)}
      </div>

      {pages > 1 && <Pagination page={safePage} pages={pages} onPage={setPage} />}
    </>
  );
}
