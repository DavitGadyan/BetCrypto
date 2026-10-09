import type { ReactNode } from "react";
import { ChevronDown, ListFilter } from "lucide-react";

/* ------------------------------- status pills ------------------------------ */

const pillTones = {
  live: { bg: "rgba(229,105,109,0.14)", fg: "var(--color-loss)" },
  win: { bg: "rgba(76,195,138,0.14)", fg: "var(--color-win)" },
  warn: { bg: "rgba(232,180,76,0.14)", fg: "var(--color-warn)" },
  gold: { bg: "rgba(212,169,78,0.14)", fg: "var(--color-accent)" },
  bronze: { bg: "rgba(139,116,69,0.22)", fg: "#C2A879" },
  neutral: { bg: "rgba(244,241,234,0.08)", fg: "var(--color-muted)" },
} as const;

export type PillTone = keyof typeof pillTones;

export function Pill({ tone = "neutral", dot, children }: { tone?: PillTone; dot?: boolean; children: ReactNode }) {
  const t = pillTones[tone];
  return (
    <span className="pill" style={{ background: t.bg, color: t.fg }}>
      {dot && (
        <span
          aria-hidden
          className={tone === "live" ? "animate-pulse" : undefined}
          style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}

/* -------------------------------- sparkline -------------------------------- */

export function Sparkline({
  points,
  tone = "win",
  w = 96,
  h = 32,
  className,
}: {
  points: number[];
  tone?: "win" | "loss" | "gold";
  w?: number;
  h?: number;
  className?: string;
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - 4 - ((p - min) / span) * (h - 8)] as const);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const color = tone === "win" ? "var(--color-win)" : tone === "loss" ? "var(--color-loss)" : "var(--color-accent)";
  const id = `sp-${tone}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className={className ?? "shrink-0"}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------- page header ------------------------------- */

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="mt-1.5 text-[15px] text-muted">{subtitle}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}

/* --------------------------- header action buttons -------------------------- */

export function ActionButton({ icon, children, onClick }: { icon?: ReactNode; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card flex items-center gap-2 px-4 py-2.5 text-[15px] font-medium text-ink transition-colors duration-150 hover:border-[rgba(212,169,78,0.4)] active:scale-[0.98]"
    >
      {icon ?? <ListFilter size={16} className="text-muted" aria-hidden />}
      {children}
    </button>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  icons,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  icons?: Partial<Record<T, ReactNode>>;
}) {
  return (
    <div className="card flex items-center gap-1 p-1" role="tablist">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o)}
            className={`flex items-center gap-2 rounded-[11px] px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150 ${
              on ? "bg-surface2 text-ink" : "text-muted hover:text-ink"
            }`}
            style={on ? { border: "1px solid var(--color-line)" } : { border: "1px solid transparent" }}
          >
            {icons?.[o]}
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------ filter dropdown ----------------------------- */

export function FilterSelect({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="card relative flex cursor-pointer items-center gap-2.5 px-4 py-2.5 text-[15px] transition-colors duration-150 hover:border-[rgba(212,169,78,0.4)]">
      <span className="text-muted" aria-hidden>{icon}</span>
      <span className="font-medium text-ink">
        {label}: <span className="text-muted">{value}</span>
      </span>
      <ChevronDown size={15} className="text-muted" aria-hidden />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* -------------------------------- pagination -------------------------------- */

export function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (p: number) => void }) {
  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPage(Math.max(1, page - 1))}
        className="card grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink"
      >
        ‹
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPage(p)}
          className={`num grid h-11 w-11 place-items-center rounded-[var(--radius-card)] text-[15px] font-semibold transition-colors ${
            p === page ? "bg-accent text-[#15120A]" : "card text-muted hover:text-ink"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPage(Math.min(pages, page + 1))}
        className="card grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink"
      >
        ›
      </button>
    </nav>
  );
}

/* --------------------------------- misc bits -------------------------------- */

/** "a / b / c" meta row with the template's slash separators. The slash trails
 *  its item, so a wrapped line never opens with an orphaned "/". */
export function MetaRow({ items }: { items: ReactNode[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] text-muted">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2.5">
          {it}
          {i < items.length - 1 && <span className="text-[rgba(244,241,234,0.18)]">/</span>}
        </span>
      ))}
    </div>
  );
}

export function CountryBadge({ code }: { code: string }) {
  return (
    <span className="rounded-md border border-line bg-surface2 px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-muted">
      {code}
    </span>
  );
}
