"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Check, Copy, Download, MoreHorizontal } from "lucide-react";
import { assets, txs } from "@/lib/data";
import { ActionButton, MetaRow, PageHeader, Pill, Segmented, Sparkline } from "@/components/ui";

/** Deterministic faux-QR so the deposit card reads real without an image. */
function Qr({ seed }: { seed: string }) {
  const n = 13;
  let h = 7;
  for (const c of seed) h = (h * 33 + c.charCodeAt(0)) % 9973;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (h * 1103515245 + 12345) % 2147483647;
    cells.push(h % 100 < 46);
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}${y}`}>
      <rect x={x} y={y} width="3" height="3" fill="var(--color-ink)" />
      <rect x={x + 0.6} y={y + 0.6} width="1.8" height="1.8" fill="var(--color-surface2)" />
      <rect x={x + 1.1} y={y + 1.1} width="0.8" height="0.8" fill="var(--color-ink)" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="h-28 w-28 rounded-lg bg-surface2 p-1.5" aria-label="Deposit address QR code" role="img">
      {cells.map((on, i) => {
        const x = i % n, y = Math.floor(i / n);
        const inEye = (x < 4 && y < 4) || (x > n - 5 && y < 4) || (x < 4 && y > n - 5);
        return on && !inEye ? <rect key={i} x={x} y={y} width="0.92" height="0.92" fill="var(--color-ink)" /> : null;
      })}
      {eye(0.3, 0.3)}
      {eye(n - 3.3, 0.3)}
      {eye(0.3, n - 3.3)}
    </svg>
  );
}

export function WalletScreen() {
  const [selected, setSelected] = useState(assets[0].symbol);
  const [mode, setMode] = useState<"Deposit" | "Withdraw">("Deposit");
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const asset = assets.find((a) => a.symbol === selected) ?? assets[0];

  return (
    <>
      <PageHeader
        title="Wallet"
        subtitle="Balances, deposits and withdrawals, settled on-chain."
        actions={<ActionButton icon={<Download size={16} className="text-muted" aria-hidden />}>Export CSV</ActionButton>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="min-w-0">
          {/* Asset cards — the explorer site-card anatomy */}
          <div className="grid gap-4 sm:grid-cols-2">
            {assets.map((a) => {
              const on = a.symbol === selected;
              return (
                <button
                  key={a.symbol}
                  type="button"
                  onClick={() => setSelected(a.symbol)}
                  aria-pressed={on}
                  className={`card p-5 text-left transition-colors duration-150 ${on ? "!border-[rgba(212,169,78,0.55)]" : "hover:border-[rgba(212,169,78,0.35)]"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <Pill tone={on ? "gold" : "neutral"}>{a.network}</Pill>
                    <span className={`num text-[13px] font-semibold ${a.up ? "text-win" : "text-loss"}`}>{a.change24h} 24h</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="num text-[22px] font-bold leading-tight text-ink">
                        {a.balance} <span className="text-[14px] font-semibold text-muted">{a.symbol}</span>
                      </p>
                      <p className="num mt-0.5 text-[14px] text-muted">{a.usd}</p>
                    </div>
                    <Sparkline points={a.trend} tone={a.up ? "win" : "loss"} w={84} h={30} />
                  </div>
                  <div className="mt-4 border-t border-line pt-3">
                    <MetaRow
                      items={[
                        <span key="b" className="num">In bets: <span className="font-semibold text-ink">{a.inBets}</span></span>,
                        <span key="p" className="num">Pending: <span className="font-semibold text-ink">{a.pending}</span></span>,
                      ]}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Transactions */}
          <h2 className="mb-3 mt-8 text-[16px] font-bold text-ink">Recent transactions</h2>
          <div className="flex flex-col gap-2.5">
            {txs.map((t) => (
              <article key={t.id} className="card flex min-w-0 items-center gap-4 px-5 py-3.5">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${t.kind === "Deposit" ? "bg-[rgba(76,195,138,0.12)] text-win" : "bg-surface2 text-muted"}`}>
                  {t.kind === "Deposit" ? <ArrowDownToLine size={17} aria-hidden /> : <ArrowUpFromLine size={17} aria-hidden />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">{t.kind} · {t.asset}</p>
                  <p className="num truncate font-mono text-[13px] text-muted">{t.hash}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                  <div className="text-right">
                    <p className={`num text-[15px] font-bold ${t.amount.startsWith("+") ? "text-win" : "text-ink"}`}>{t.amount}</p>
                    <p className="num hidden text-[12px] text-muted sm:block">{t.usd}</p>
                  </div>
                  <div className="text-right">
                    {t.status === "Pending" ? (
                      <Pill tone="warn">
                        Pending<span className="hidden sm:inline">&nbsp;· {t.confs}</span>
                      </Pill>
                    ) : (
                      <Pill tone="win">Confirmed</Pill>
                    )}
                    <p className="num mt-1 hidden text-[12px] text-muted sm:block">{t.time}</p>
                  </div>
                  <button type="button" aria-label={`Options for transaction ${t.hash}`} className="hidden text-muted transition-colors hover:text-ink sm:block">
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Deposit / withdraw panel — the floating detail card anatomy */}
        <aside className="card h-fit min-w-0 p-6 lg:sticky lg:top-24">
          <Segmented options={["Deposit", "Withdraw"] as const} value={mode} onChange={setMode} />
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-[17px] font-bold text-ink">{asset.name}</p>
              <p className="text-[13px] text-muted">{asset.network} network</p>
            </div>
            <Pill tone="gold">{asset.symbol}</Pill>
          </div>

          {mode === "Deposit" ? (
            <>
              <div className="mt-5 flex items-start gap-4">
                <Qr seed={asset.address} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] uppercase tracking-wide text-muted">Your {asset.symbol} address</p>
                  <p className="num mt-1 break-all font-mono text-[13px] leading-relaxed text-ink">{asset.address}</p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(asset.address).catch(() => {});
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1600);
                    }}
                    className="mt-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors hover:text-ink"
                  >
                    {copied ? <Check size={14} className="text-win" aria-hidden /> : <Copy size={14} aria-hidden />}
                    {copied ? "Copied" : "Copy address"}
                  </button>
                </div>
              </div>
              <div className="mt-5 flex flex-col border-t border-line">
                {[
                  ["Minimum deposit", asset.minDeposit],
                  ["Credited after", `${asset.confirmations} confirmations`],
                  ["Network fee", "Paid by sender"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-line py-3 text-[14px] last:border-b-0">
                    <span className="text-muted">{k}</span>
                    <span className="num font-semibold text-ink">{v}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(asset.address).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                }}
                className="mt-5 w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-bold text-[#15120A] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.99]"
              >
                {copied ? "Address copied" : "Copy deposit address"}
              </button>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Send only {asset.symbol} on the {asset.network} network to this address. Deposits show as pending after
                the first confirmation.
              </p>
            </>
          ) : (
            <>
              <label className="mt-5 block text-[14px] text-muted">
                Amount
                <span className="card mt-1.5 flex items-center gap-2 bg-surface2 px-3 py-2.5">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                    inputMode="decimal"
                    placeholder={`0.0000 ${asset.symbol}`}
                    className="num w-full bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:text-muted"
                    aria-label={`Withdrawal amount in ${asset.symbol}`}
                  />
                  <button type="button" onClick={() => setAmount(asset.balance.replace(/,/g, ""))} className="text-[13px] font-bold text-accent">
                    MAX
                  </button>
                </span>
              </label>
              <label className="mt-4 block text-[14px] text-muted">
                Destination address
                <span className="card mt-1.5 flex items-center bg-surface2 px-3 py-2.5">
                  <input
                    placeholder={`${asset.symbol} address`}
                    className="num w-full bg-transparent font-mono text-[14px] text-ink outline-none placeholder:font-sans placeholder:text-muted"
                    aria-label="Destination address"
                  />
                </span>
              </label>
              <div className="mt-5 flex flex-col border-t border-line">
                {[
                  ["Available", `${asset.balance} ${asset.symbol}`],
                  ["Network fee", asset.fee],
                  ["Arrives in", "≈ 2–10 minutes"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-line py-3 text-[14px] last:border-b-0">
                    <span className="text-muted">{k}</span>
                    <span className="num font-semibold text-ink">{v}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-5 w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-bold text-[#15120A] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.99]">
                Request withdrawal
              </button>
              <p className="mt-2.5 text-center text-[12px] text-muted">2FA confirmation required for every withdrawal</p>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
