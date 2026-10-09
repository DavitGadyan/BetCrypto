"use client";

import { useState } from "react";
import { CircleDollarSign, Download, Layers, MoreHorizontal } from "lucide-react";
import { bets, betStatuses, type Bet } from "@/lib/data";
import { ActionButton, FilterSelect, MetaRow, PageHeader, Pagination, Pill, type PillTone } from "@/components/ui";

const PER_PAGE = 9;

const statusTone: Record<Bet["status"], PillTone> = {
  Won: "win",
  Lost: "live",
  Open: "gold",
  "Cashed out": "bronze",
};

function BetCard({ b }: { b: Bet }) {
  return (
    <article className="card flex flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <Pill tone={statusTone[b.status]} dot={b.status === "Open"}>{b.status}</Pill>
        <div className="flex items-center gap-2.5 text-[13px] text-muted">
          <span className="num">{b.time}</span>
          <button type="button" aria-label={`Options for bet ${b.id}`} className="text-muted transition-colors hover:text-ink">
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-[17px] font-bold leading-snug text-ink">{b.pick}</h2>
        <p className="mt-0.5 text-[14px] text-muted">{b.market} · <span className="num">{b.id}</span></p>
      </div>

      <div className="mt-4 border-t border-line pt-3.5">
        <MetaRow
          items={[
            <span key="k" className="flex items-center gap-1.5">{b.kind === "Single" ? <CircleDollarSign size={14} aria-hidden /> : <Layers size={14} className="text-accent" aria-hidden />}{b.kind}</span>,
            <span key="s" className="num"><span className="font-semibold text-ink">{b.stake}</span> @ <span className="font-semibold text-ink">{b.odds}</span></span>,
            <span key="p" className="num">
              Payout{" "}
              <span className={`font-semibold ${b.status === "Won" || b.status === "Cashed out" ? "text-win" : b.status === "Lost" ? "text-muted" : "text-ink"}`}>
                {b.payout}
              </span>
            </span>,
          ]}
        />
      </div>
    </article>
  );
}

export function BetsScreen() {
  const [status, setStatus] = useState("All");
  const [kind, setKind] = useState("All");
  const [page, setPage] = useState(1);

  const list = bets.filter(
    (b) => (status === "All" || b.status === status) && (kind === "All" || (kind === "Singles" ? b.kind === "Single" : b.kind !== "Single")),
  );
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const shown = list.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const open = bets.filter((b) => b.status === "Open").length;
  const settledWon = bets.filter((b) => b.status === "Won" || b.status === "Cashed out").length;

  return (
    <>
      <PageHeader
        title="My Bets"
        subtitle={`${open} open positions · ${settledWon} settled in profit this week.`}
        actions={<ActionButton icon={<Download size={16} className="text-muted" aria-hidden />}>Export</ActionButton>}
      />

      <div className="mb-6 flex flex-wrap gap-2.5">
        <FilterSelect icon={<CircleDollarSign size={16} />} label="Status" value={status} options={betStatuses} onChange={(v) => { setStatus(v); setPage(1); }} />
        <FilterSelect icon={<Layers size={16} />} label="Type" value={kind} options={["All", "Singles", "Parlays"]} onChange={(v) => { setKind(v); setPage(1); }} />
      </div>

      {shown.length === 0 ? (
        <div className="card grid place-items-center p-16 text-center">
          <p className="text-[15px] text-muted">No bets match these filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((b) => <BetCard key={b.id} b={b} />)}
        </div>
      )}

      {pages > 1 && <Pagination page={safePage} pages={pages} onPage={setPage} />}
    </>
  );
}
