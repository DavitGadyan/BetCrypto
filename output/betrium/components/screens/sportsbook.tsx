"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Goal, ListFilter, Radio, Trophy } from "lucide-react";
import { matches, sports, type Match } from "@/lib/data";
import { useBetSlip } from "@/components/bet-slip";
import { ActionButton, CountryBadge, FilterSelect, PageHeader, Pill, Segmented, Sparkline } from "@/components/ui";

function OddsRow({ m }: { m: Match }) {
  const { toggle, has } = useBetSlip();
  return (
    <div className="mt-4 flex gap-2" role="group" aria-label={`Odds for ${m.home} vs ${m.away}`}>
      {m.outcomes.map((o) => {
        const key = `${m.slug}|Match Winner|${o.label}`;
        return (
          <button
            key={o.short}
            type="button"
            className="odds-btn"
            data-on={has(key)}
            aria-pressed={has(key)}
            onClick={() =>
              toggle({ key, match: `${m.home} – ${m.away}`, market: "Match Winner", pick: o.label, odds: o.odds, live: m.status === "live" })
            }
          >
            <span className="odds-lab">{o.short}</span>
            <span className="odds-val num">{o.odds.toFixed(2)}</span>
          </button>
        );
      })}
    </div>
  );
}

function MatchCard({ m }: { m: Match }) {
  const rising = m.trend[m.trend.length - 1] >= m.trend[0];
  return (
    <article className="card flex min-w-0 flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        {m.status === "live" ? (
          <Pill tone="live" dot>LIVE {m.clock}</Pill>
        ) : (
          <Pill tone="neutral">{m.start}</Pill>
        )}
        <div className="flex items-center gap-2 text-[14px] text-muted">
          {m.league}
          <CountryBadge code={m.country} />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href={`/sportsbook/${m.slug}`} className="block">
            <h2 className="truncate text-[19px] font-bold leading-snug text-ink transition-colors hover:text-accent">
              {m.home} <span className="text-muted">–</span> {m.away}
            </h2>
          </Link>
          <p className="num mt-1 text-[14px] text-muted">
            {m.status === "live" ? (
              <>
                <span className="font-bold text-ink">{m.score}</span>
                <span className="mx-2 text-[rgba(244,241,234,0.18)]">/</span>
                {m.sport}
              </>
            ) : (
              m.sport
            )}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end max-[420px]:hidden">
          <span className={`num text-[26px] font-bold leading-none ${rising ? "text-win" : "text-loss"}`}>{m.impliedHome}%</span>
          <Sparkline points={m.trend} tone={rising ? "win" : "loss"} />
          <span className="mt-0.5 text-[12px] text-muted">home win probability</span>
        </div>
      </div>

      <OddsRow m={m} />

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5 text-[14px]">
        <span className="text-muted">Cashout available</span>
        <Link href={`/sportsbook/${m.slug}`} className="flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-ink">
          +{m.marketsCount} markets <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function SportsbookScreen({ initialView = "All" }: { initialView?: "All" | "Live" | "Upcoming" }) {
  const [sport, setSport] = useState("All");
  const [league, setLeague] = useState("All");
  const [period, setPeriod] = useState("All");
  const [view, setView] = useState<"All" | "Live" | "Upcoming">(initialView);

  const leagues = useMemo(() => ["All", ...Array.from(new Set(matches.map((m) => m.league)))], []);
  const list = matches.filter(
    (m) =>
      (sport === "All" || m.sport === sport) &&
      (league === "All" || m.league === league) &&
      (period === "All" ||
        (period === "Today" ? m.start.startsWith("Today") : !m.start.startsWith("Today"))) &&
      (view === "All" || (view === "Live" ? m.status === "live" : m.status === "upcoming")),
  );

  return (
    <>
      <PageHeader
        title="Sportsbook"
        subtitle="Every market priced in crypto and settled on-chain."
        actions={
          <>
            <ActionButton icon={<ListFilter size={16} className="text-muted" aria-hidden />}>Decimal</ActionButton>
            <Segmented
              options={["All", "Live", "Upcoming"] as const}
              value={view}
              onChange={setView}
              icons={{ Live: <Radio size={14} className="text-loss" aria-hidden /> }}
            />
          </>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2.5">
        <FilterSelect icon={<Trophy size={16} />} label="Sport" value={sport} options={sports} onChange={setSport} />
        <FilterSelect icon={<Goal size={16} />} label="League" value={league} options={leagues} onChange={setLeague} />
        <FilterSelect icon={<CalendarDays size={16} />} label="Period" value={period} options={["All", "Today", "This weekend"]} onChange={setPeriod} />
      </div>

      {list.length === 0 ? (
        <div className="card grid place-items-center p-16 text-center">
          <p className="text-[15px] text-muted">No events match these filters right now. Clear a filter or check back shortly.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((m) => (
            <MatchCard key={m.slug} m={m} />
          ))}
        </div>
      )}
    </>
  );
}
