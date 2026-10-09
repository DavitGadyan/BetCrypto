"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ReceiptText, X } from "lucide-react";
import { Pill } from "@/components/ui";

export type Selection = {
  key: string; // match+market+pick
  match: string;
  market: string;
  pick: string;
  odds: number;
  live?: boolean;
};

type SlipState = {
  selections: Selection[];
  toggle: (s: Selection) => void;
  remove: (key: string) => void;
  clear: () => void;
  has: (key: string) => boolean;
};

const SlipContext = createContext<SlipState | null>(null);

export function useBetSlip() {
  const ctx = useContext(SlipContext);
  if (!ctx) throw new Error("useBetSlip outside provider");
  return ctx;
}

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<Selection[]>([]);

  const toggle = useCallback((s: Selection) => {
    setSelections((prev) => {
      const found = prev.find((p) => p.key === s.key);
      if (found) return prev.filter((p) => p.key !== s.key);
      // one pick per market: replace a sibling selection from the same market
      const sibling = prev.filter((p) => !(p.match === s.match && p.market === s.market));
      return [...sibling, s];
    });
  }, []);

  const remove = useCallback((key: string) => setSelections((prev) => prev.filter((p) => p.key !== key)), []);
  const clear = useCallback(() => setSelections([]), []);
  const has = useCallback((key: string) => selections.some((p) => p.key === key), [selections]);

  const value = useMemo(() => ({ selections, toggle, remove, clear, has }), [selections, toggle, remove, clear, has]);
  return <SlipContext.Provider value={value}>{children}</SlipContext.Provider>;
}

/**
 * Floating slip, bottom-right — the template's floating detail card
 * (status pill, rows, big number, full-width CTA) repurposed for staking.
 */
export function BetSlipPanel() {
  const { selections, remove, clear } = useBetSlip();
  const [stake, setStake] = useState("25.00");
  const [placed, setPlaced] = useState(false);

  if (selections.length === 0) return null;

  const stakeNum = parseFloat(stake) || 0;
  const combined = selections.reduce((acc, s) => acc * s.odds, 1);
  const payout = stakeNum * combined;

  return (
    <aside
      aria-label="Bet slip"
      className="card fixed bottom-24 right-4 z-40 w-[min(92vw,360px)] p-5 lg:bottom-6 lg:right-6"
      style={{ background: "var(--color-surface)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ReceiptText size={17} className="text-accent" aria-hidden />
          <span className="font-semibold text-ink">
            Bet slip <span className="num text-muted">({selections.length})</span>
          </span>
          {selections.length > 1 && <Pill tone="gold">Parlay</Pill>}
        </div>
        <button type="button" onClick={() => { clear(); setPlaced(false); }} className="text-[14px] text-muted transition-colors hover:text-ink">
          Clear
        </button>
      </div>

      <ul className="flex flex-col gap-2.5">
        {selections.map((s) => (
          <li key={s.key} className="rounded-xl border border-line bg-surface2 px-3.5 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-ink">{s.pick}</p>
                <p className="mt-0.5 truncate text-[13px] text-muted">
                  {s.market} · {s.match}
                  {s.live && <span className="ml-1.5 font-semibold text-loss">LIVE</span>}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="num text-[15px] font-bold text-accent">{s.odds.toFixed(2)}</span>
                <button type="button" aria-label={`Remove ${s.pick}`} onClick={() => remove(s.key)} className="text-muted transition-colors hover:text-ink">
                  <X size={15} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-line pt-4">
        <label className="flex items-center justify-between gap-3 text-[14px] text-muted">
          Stake
          <span className="card flex items-center gap-2 bg-surface2 px-3 py-2">
            <input
              value={stake}
              onChange={(e) => { setStake(e.target.value.replace(/[^0-9.]/g, "")); setPlaced(false); }}
              inputMode="decimal"
              className="num w-20 bg-transparent text-right text-[15px] font-semibold text-ink outline-none"
              aria-label="Stake in USDT"
            />
            <span className="text-[13px] font-semibold text-muted">USDT</span>
          </span>
        </label>
        <div className="mt-3 flex items-end justify-between">
          <div className="text-[14px] text-muted">
            Combined odds <span className="num ml-1 font-bold text-ink">{combined.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <div className="text-[13px] text-muted">Potential payout</div>
            <div className="num text-[26px] font-bold leading-tight text-win">
              {payout.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="ml-1 text-[14px] font-semibold text-muted">USDT</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPlaced(true)}
          className="mt-4 w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-bold text-[#15120A] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.99]"
        >
          {placed ? "Bet placed — view in My Bets" : "Place bet"}
        </button>
        <p className="mt-2.5 text-center text-[12px] text-muted">Odds may change before confirmation · 18+</p>
      </div>
    </aside>
  );
}
