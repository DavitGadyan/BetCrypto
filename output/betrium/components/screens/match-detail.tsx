"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, CalendarClock, Clock, Goal, History, LayoutGrid, ReceiptText, Shield, Timer } from "lucide-react";
import { marketsFor, matches, type Match, type Market } from "@/lib/data";
import { useBetSlip } from "@/components/bet-slip";
import { CountryBadge, MetaRow, Pill, Sparkline } from "@/components/ui";

const TABS = ["Overview", "Markets", "Statistics", "Timeline", "Head-to-Head", "My Bets"] as const;
type Tab = (typeof TABS)[number];

const tabIcons: Record<Tab, typeof Goal> = {
  Overview: LayoutGrid,
  Markets: Goal,
  Statistics: BarChart3,
  Timeline: Timer,
  "Head-to-Head": History,
  "My Bets": ReceiptText,
};

/* Deterministic per-match extras so every event page differs without a backend. */
function seeded(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 997;
  return (min: number, max: number, salt = 0) => min + ((h + salt * 131) % (max - min + 1));
}

function MarketCard({ m, match }: { m: Market; match: Match }) {
  const { toggle, has } = useBetSlip();
  const suspended = m.state === "suspended";
  return (
    <article className={`card p-5 ${suspended ? "opacity-70" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-bold text-ink">{m.name}</span>
        {suspended ? <Pill tone="warn">Suspended</Pill> : <Pill tone="win">Open</Pill>}
      </div>
      <div className="mt-4 flex gap-2">
        {m.outcomes.map((o) => {
          const key = `${match.slug}|${m.name}|${o.label}`;
          return (
            <button
              key={o.label}
              type="button"
              className="odds-btn"
              data-on={has(key)}
              aria-pressed={has(key)}
              disabled={suspended}
              onClick={() =>
                toggle({ key, match: `${match.home} – ${match.away}`, market: m.name, pick: o.label, odds: o.odds, live: match.status === "live" })
              }
            >
              <span className="odds-lab truncate max-w-full">{o.label}</span>
              <span className="odds-val num">{o.odds.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[13px] text-muted">
        <span>{m.cashout ? "Cashout available" : "No cashout"}</span>
        <span className="num">#{match.slug.slice(0, 3).toUpperCase()}-{m.name.length * 37 + m.name.charCodeAt(0)}</span>
      </div>
    </article>
  );
}

function StatBar({ label, home, away, unit = "" }: { label: string; home: number; away: number; unit?: string }) {
  const total = home + away || 1;
  return (
    <div>
      <div className="num flex items-center justify-between text-[14px] font-semibold text-ink">
        <span>{home}{unit}</span>
        <span className="text-[13px] font-medium text-muted">{label}</span>
        <span>{away}{unit}</span>
      </div>
      <div className="mt-1.5 flex h-1.5 gap-1 overflow-hidden rounded-full">
        <span className="rounded-full bg-accent" style={{ width: `${(home / total) * 100}%` }} />
        <span className="rounded-full bg-surface2" style={{ width: `${(away / total) * 100}%` }} />
      </div>
    </div>
  );
}

export function MatchDetailScreen({ slug }: { slug: string }) {
  const match = matches.find((m) => m.slug === slug) ?? matches[0];
  const [tab, setTab] = useState<Tab>("Markets");
  const { selections } = useBetSlip();
  const rnd = seeded(slug);
  const allMarkets = marketsFor(match);
  const live = match.status === "live";
  const rising = match.trend[match.trend.length - 1] >= match.trend[0];
  // Away win probability straight from the book's prices, normalised.
  const inv = match.outcomes.map((o) => 1 / o.odds);
  const invSum = inv.reduce((a, b) => a + b, 0);
  const awayProb = Math.round((inv[inv.length - 1] / invSum) * 100);

  const stats = [
    { label: "Possession", home: 40 + rnd(0, 25, 1), away: 60 - rnd(0, 25, 1), unit: "%" },
    { label: "Shots", home: rnd(4, 16, 2), away: rnd(2, 12, 3) },
    { label: "On target", home: rnd(1, 7, 4), away: rnd(0, 5, 5) },
    { label: "Corners", home: rnd(2, 9, 6), away: rnd(1, 7, 7) },
    { label: "Fouls", home: rnd(5, 14, 8), away: rnd(5, 14, 9) },
  ];

  const [hs, as] = (match.score ?? "0 – 0").split("–").map((s) => parseInt(s.trim(), 10) || 0);
  const timeline = live
    ? [
        ...Array.from({ length: hs }, (_, i) => ({ min: rnd(8, 60, 10 + i), who: match.home, what: "Goal" })),
        ...Array.from({ length: as }, (_, i) => ({ min: rnd(12, 70, 20 + i), who: match.away, what: "Goal" })),
        { min: rnd(20, 44, 30), who: match.away, what: "Yellow card" },
        { min: rnd(46, 63, 31), who: match.home, what: "Substitution" },
      ].sort((a, b) => a.min - b.min)
    : [];

  const h2h = [
    { when: "Apr 2026", score: `${match.home} ${rnd(0, 3, 40)} – ${rnd(0, 2, 41)} ${match.away}` },
    { when: "Nov 2025", score: `${match.away} ${rnd(0, 2, 42)} – ${rnd(0, 3, 43)} ${match.home}` },
    { when: "Mar 2025", score: `${match.home} ${rnd(0, 2, 44)} – ${rnd(0, 2, 45)} ${match.away}` },
  ];

  const myPicks = selections.filter((s) => s.match === `${match.home} – ${match.away}`);

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2.5 text-[14px] text-muted">
        <Goal size={15} aria-hidden />
        <Link href="/sportsbook" className="transition-colors hover:text-ink">Sportsbook</Link>
        <span className="text-[rgba(244,241,234,0.18)]">/</span>
        <span>{match.league}</span>
        <span className="text-[rgba(244,241,234,0.18)]">/</span>
        <span className="font-semibold text-ink">{match.home} – {match.away}</span>
      </nav>

      {/* Title + status pill */}
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="page-title">{match.home} – {match.away}</h1>
        {live ? <Pill tone="live" dot>LIVE {match.clock} · {match.score}</Pill> : <Pill tone="gold">{match.start}</Pill>}
      </div>

      {/* Two summary cards */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {[match.home, match.away].map((team, i) => (
          <div key={team} className="card flex items-center gap-4 p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface2 text-accent">
              <Shield size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[16px] font-bold text-ink">{team}</p>
              <MetaRow
                items={[
                  <span key="s" className={i === 0 ? "font-semibold text-win" : "font-semibold text-muted"}>{i === 0 ? "Home" : "Away"}</span>,
                  <span key="f" className="num">Form {i === 0 ? "W W D W L".slice(0, 9) : "L W W D W".slice(0, 9)}</span>,
                ]}
              />
            </div>
            <div className="ml-auto text-right">
              <span className={`num text-[22px] font-bold ${i === 0 ? (rising ? "text-win" : "text-loss") : "text-muted"}`}>
                {i === 0 ? match.impliedHome : awayProb}%
              </span>
              <p className="text-[12px] text-muted">win prob.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab strip */}
      <div className="card mb-6 flex items-center gap-1 overflow-x-auto p-1" role="tablist" aria-label="Match sections">
        {TABS.map((t) => {
          const Icon = tabIcons[t];
          const on = t === tab;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t)}
              className={`flex shrink-0 items-center gap-2 rounded-[11px] px-4 py-2 text-[14px] font-medium transition-colors ${
                on ? "border border-line bg-surface2 text-ink" : "border border-transparent text-muted hover:text-ink"
              }`}
            >
              <Icon size={15} aria-hidden className={on ? "text-accent" : undefined} />
              {t}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {tab === "Markets" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {allMarkets.map((m) => <MarketCard key={m.name} m={m} match={match} />)}
        </div>
      )}

      {tab === "Overview" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-ink">{match.home.split(" ")[0]} win probability</span>
              <span className={`num text-[24px] font-bold ${rising ? "text-win" : "text-loss"}`}>{match.impliedHome}%</span>
            </div>
            <div className="mt-3"><Sparkline points={match.trend} tone={rising ? "win" : "loss"} w={280} h={64} /></div>
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              {stats.slice(0, 3).map((s) => <StatBar key={s.label} {...s} />)}
            </div>
          </div>
          <div className="grid content-start gap-4">
            {allMarkets.slice(0, 2).map((m) => <MarketCard key={m.name} m={m} match={match} />)}
          </div>
        </div>
      )}

      {tab === "Statistics" && (
        <div className="card mx-auto flex max-w-[620px] flex-col gap-5 p-6">
          <div className="flex items-center justify-between text-[15px] font-bold text-ink">
            <span>{match.home}</span>
            <span className="text-[13px] font-medium text-muted">{live ? `after ${match.clock}` : "last 5 matches, avg."}</span>
            <span>{match.away}</span>
          </div>
          {stats.map((s) => <StatBar key={s.label} {...s} />)}
        </div>
      )}

      {tab === "Timeline" && (
        live ? (
          <ol className="mx-auto flex max-w-[620px] flex-col gap-2.5">
            {timeline.map((e, i) => (
              <li key={i} className="card flex items-center gap-4 px-5 py-3.5">
                <span className="num w-12 shrink-0 text-[15px] font-bold text-accent">{e.min}′</span>
                <span className={`text-[15px] font-semibold ${e.what === "Goal" ? "text-win" : "text-ink"}`}>{e.what}</span>
                <span className="ml-auto truncate text-[14px] text-muted">{e.who}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="card mx-auto grid max-w-[620px] place-items-center gap-2 p-14 text-center">
            <CalendarClock size={28} className="text-muted" aria-hidden />
            <p className="text-[16px] font-semibold text-ink">Timeline opens at kickoff</p>
            <p className="text-[14px] text-muted">First whistle {match.start}. Markets stay open until then.</p>
          </div>
        )
      )}

      {tab === "Head-to-Head" && (
        <ol className="mx-auto flex max-w-[620px] flex-col gap-2.5">
          {h2h.map((r) => (
            <li key={r.when} className="card flex items-center gap-4 px-5 py-4">
              <Clock size={15} className="shrink-0 text-muted" aria-hidden />
              <span className="w-24 shrink-0 text-[14px] text-muted">{r.when}</span>
              <span className="num text-[15px] font-semibold text-ink">{r.score}</span>
            </li>
          ))}
        </ol>
      )}

      {tab === "My Bets" && (
        myPicks.length > 0 ? (
          <ul className="mx-auto flex max-w-[620px] flex-col gap-2.5">
            {myPicks.map((s) => (
              <li key={s.key} className="card flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-[15px] font-semibold text-ink">{s.pick}</p>
                  <p className="text-[13px] text-muted">{s.market}</p>
                </div>
                <span className="num text-[16px] font-bold text-accent">{s.odds.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card mx-auto grid max-w-[620px] place-items-center gap-2 p-14 text-center">
            <ReceiptText size={28} className="text-muted" aria-hidden />
            <p className="text-[16px] font-semibold text-ink">Nothing on this event yet</p>
            <p className="text-[14px] text-muted">Pick a price under Markets and it lands in your slip.</p>
          </div>
        )
      )}
    </>
  );
}
