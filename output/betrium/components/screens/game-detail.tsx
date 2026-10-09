"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, Dices, FileCheck2, Gauge, History, Scale, ShieldCheck } from "lucide-react";
import { crashRounds, fairness, games } from "@/lib/data";
import { MetaRow, Pill, Sparkline } from "@/components/ui";

const TABS = ["Game", "Provably Fair", "Recent Rounds", "Limits"] as const;
type Tab = (typeof TABS)[number];
const tabIcons: Record<Tab, typeof Dices> = {
  Game: Dices,
  "Provably Fair": ShieldCheck,
  "Recent Rounds": History,
  Limits: Scale,
};

function CopyField({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface2 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[12px] uppercase tracking-wide text-muted">{label}</p>
        <p className={`truncate text-[14px] text-ink ${mono ? "num font-mono" : ""}`}>{value}</p>
      </div>
      <button
        type="button"
        aria-label={`Copy ${label}`}
        onClick={() => {
          navigator.clipboard?.writeText(value).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className="shrink-0 text-muted transition-colors hover:text-ink"
      >
        {copied ? <Check size={16} className="text-win" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export function GameDetailScreen({ slug }: { slug: string }) {
  const game = games.find((g) => g.slug === slug) ?? games[0];
  const [tab, setTab] = useState<Tab>("Game");
  const [verified, setVerified] = useState(false);
  const [amount, setAmount] = useState("10.00");
  const [cashout, setCashout] = useState("2.00");

  const lastMultipliers = crashRounds.map((r) => r.multiplier);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2.5 text-[14px] text-muted">
        <Dices size={15} aria-hidden />
        <Link href="/casino" className="transition-colors hover:text-ink">Casino</Link>
        <span className="text-[rgba(244,241,234,0.18)]">/</span>
        <span>{game.studio}</span>
        <span className="text-[rgba(244,241,234,0.18)]">/</span>
        <span className="font-semibold text-ink">{game.title}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="page-title">{game.title}</h1>
        <Pill tone="win">RTP {game.rtp.toFixed(1)}%</Pill>
        {game.fair && <Pill tone="gold">Provably fair</Pill>}
      </div>

      {/* Two summary cards — seeds, straight off the template's device cards */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="card flex items-center gap-4 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface2 text-accent"><FileCheck2 size={20} aria-hidden /></span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-ink">Server seed</p>
            <p className="num truncate font-mono text-[13px] text-muted">{fairness.serverSeedHash.slice(0, 18)}… (hashed)</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface2 text-accent"><Gauge size={20} aria-hidden /></span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-ink">Client seed · nonce</p>
            <MetaRow items={[<span key="c" className="num font-mono">{fairness.clientSeed}</span>, <span key="n" className="num">#{fairness.nonce}</span>]} />
          </div>
        </div>
      </div>

      <div className="card mb-6 flex items-center gap-1 overflow-x-auto p-1" role="tablist" aria-label="Game sections">
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

      {tab === "Game" && (
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="card flex min-w-0 flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-ink">Last round</span>
              <span className="num text-[30px] font-bold text-win">{crashRounds[0].multiplier.toFixed(2)}×</span>
            </div>
            <div className="mt-2"><Sparkline points={[1, 1.2, 1.5, 1.9, 2.1, 2.41]} tone="win" w={520} h={140} className="h-auto w-full" /></div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4" aria-label="Recent multipliers">
              {lastMultipliers.map((m, i) => (
                <span key={i} className={`num rounded-lg px-2.5 py-1 text-[13px] font-bold ${m >= 2 ? "bg-[rgba(76,195,138,0.14)] text-win" : m > 1.2 ? "bg-surface2 text-ink" : "bg-[rgba(229,105,109,0.14)] text-loss"}`}>
                  {m.toFixed(2)}×
                </span>
              ))}
            </div>
          </div>
          <div className="card flex min-w-0 flex-col gap-4 p-6">
            <label className="text-[14px] text-muted">
              Bet amount
              <span className="card mt-1.5 flex items-center gap-2 bg-surface2 px-3 py-2.5">
                <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" size={1} className="num w-full min-w-0 bg-transparent text-[15px] font-semibold text-ink outline-none" aria-label="Bet amount in USDT" />
                <span className="text-[13px] font-semibold text-muted">USDT</span>
              </span>
            </label>
            <label className="text-[14px] text-muted">
              Auto cashout
              <span className="card mt-1.5 flex items-center gap-2 bg-surface2 px-3 py-2.5">
                <input value={cashout} onChange={(e) => setCashout(e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" size={1} className="num w-full min-w-0 bg-transparent text-[15px] font-semibold text-ink outline-none" aria-label="Auto cashout multiplier" />
                <span className="text-[13px] font-semibold text-muted">×</span>
              </span>
            </label>
            <div className="num flex items-center justify-between text-[14px] text-muted">
              Payout on win
              <span className="font-bold text-win">
                {((parseFloat(amount) || 0) * (parseFloat(cashout) || 0)).toFixed(2)} USDT
              </span>
            </div>
            <button type="button" className="w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-bold text-[#15120A] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.99]">
              Place bet — next round
            </button>
            <p className="text-center text-[12px] text-muted">Round seeds committed before launch · 18+</p>
          </div>
        </div>
      )}

      {tab === "Provably Fair" && (
        <div className="card mx-auto flex max-w-[680px] flex-col gap-3 p-6">
          <p className="text-[15px] leading-relaxed text-muted">
            Before every round the server commits to a seed by publishing its SHA-256 hash. Your client seed and a
            per-round nonce are mixed in, so neither side can steer the result. After seed rotation the server seed is
            revealed and any round can be recomputed below.
          </p>
          <CopyField label="Server seed hash (SHA-256)" value={fairness.serverSeedHash} />
          <CopyField label="Client seed" value={fairness.clientSeed} />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-surface2 px-4 py-3">
              <p className="text-[12px] uppercase tracking-wide text-muted">Nonce</p>
              <p className="num text-[14px] text-ink">{fairness.nonce}</p>
            </div>
            <div className="rounded-xl border border-line bg-surface2 px-4 py-3">
              <p className="text-[12px] uppercase tracking-wide text-muted">Previous seed</p>
              <p className="num truncate font-mono text-[14px] text-ink">{fairness.revealedSeed}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setVerified(true)}
            className="mt-1 w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-bold text-[#15120A] transition-[filter] duration-150 hover:brightness-110"
          >
            Verify last round
          </button>
          <p aria-live="polite" className={`text-center text-[14px] ${verified ? "text-win" : "text-muted"}`}>
            {verified
              ? `Round ${crashRounds[0].id} recomputed → ${crashRounds[0].multiplier.toFixed(2)}× — hash matches the commitment.`
              : "Recomputes the result locally from the three inputs above."}
          </p>
        </div>
      )}

      {tab === "Recent Rounds" && (
        <ol className="mx-auto flex max-w-[680px] flex-col gap-2.5">
          {crashRounds.map((r) => (
            <li key={r.id} className="card flex items-center gap-4 px-5 py-4">
              <span className={`num w-16 shrink-0 text-[16px] font-bold ${r.multiplier >= 2 ? "text-win" : r.multiplier > 1.2 ? "text-ink" : "text-loss"}`}>
                {r.multiplier.toFixed(2)}×
              </span>
              <div className="min-w-0">
                <p className="num truncate text-[14px] font-semibold text-ink">{r.id}</p>
                <p className="num text-[13px] text-muted">Bet {r.bet}</p>
              </div>
              <div className="ml-auto text-right">
                <p className={`num text-[14px] font-semibold ${r.payout === "—" ? "text-muted" : "text-win"}`}>{r.payout}</p>
                <p className="num text-[12px] text-muted">{r.time}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {tab === "Limits" && (
        <div className="card mx-auto flex max-w-[680px] flex-col p-6">
          {[
            ["Minimum bet", "1.00 USDT"],
            ["Maximum bet", "5,000.00 USDT"],
            ["Maximum win per round", `${game.maxWin} · capped at 250,000 USDT`],
            ["House edge", `${(100 - game.rtp).toFixed(1)}%`],
            ["Session loss limit", "Configurable in Settings → Limits"],
          ].map(([k, v], i) => (
            <div key={k} className={`flex items-center justify-between gap-4 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
              <span className="text-[14px] text-muted">{k}</span>
              <span className="num text-right text-[14px] font-semibold text-ink">{v}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
