"use client";

import { useState } from "react";
import { KeyRound, Laptop, ShieldCheck, Smartphone, UserRound, Scale } from "lucide-react";
import { PageHeader, Pill } from "@/components/ui";

const TABS = ["Profile", "Security", "Sessions", "Limits"] as const;
type Tab = (typeof TABS)[number];
const tabIcons: Record<Tab, typeof UserRound> = {
  Profile: UserRound,
  Security: ShieldCheck,
  Sessions: Laptop,
  Limits: Scale,
};

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ${on ? "bg-accent" : "bg-surface2 border border-line"}`}
    >
      <span
        className="absolute top-1 h-5 w-5 rounded-full bg-ink transition-[left] duration-150"
        style={{ left: on ? 26 : 4, background: on ? "#15120A" : "var(--color-muted)" }}
      />
    </button>
  );
}

function Row({ label, hint, right, divider = true }: { label: string; hint?: string; right: React.ReactNode; divider?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 py-4 ${divider ? "border-b border-line last:border-b-0" : ""}`}>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-ink">{label}</p>
        {hint && <p className="mt-0.5 text-[13px] text-muted">{hint}</p>}
      </div>
      {right}
    </div>
  );
}

export function SettingsScreen() {
  const [tab, setTab] = useState<Tab>("Profile");
  const [twoFa, setTwoFa] = useState(true);
  const [withdrawLock, setWithdrawLock] = useState(true);
  const [oddsAlerts, setOddsAlerts] = useState(false);
  const [depLimit, setDepLimit] = useState("2500");

  return (
    <>
      <PageHeader title="Settings" subtitle="Account, security and responsible-play controls." />

      <div className="card mb-6 flex items-center gap-1 overflow-x-auto p-1" role="tablist" aria-label="Settings sections">
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

      <div className="grid gap-4 lg:grid-cols-2">
        {tab === "Profile" && (
          <>
            <div className="card h-fit px-6 py-2">
              <Row
                label="Username"
                hint="Shown on leaderboards and in chat"
                right={<span className="num text-[15px] font-semibold text-ink">dgadyan</span>}
              />
              <Row label="Email" hint="Used for sign-in and withdrawal alerts" right={<span className="text-[15px] text-muted">d•••••@gmail.com</span>} />
              <Row label="Verification" hint="Level 2 · withdrawals up to 50,000 USDT/day" right={<Pill tone="win">Verified</Pill>} />
            </div>
            <div className="card h-fit px-6 py-2">
              <Row label="Display currency" hint="Balances convert at spot rate" right={<Pill tone="gold">USD</Pill>} />
              <Row label="Odds format" hint="Decimal, fractional or American" right={<Pill tone="neutral">Decimal</Pill>} />
              <Row label="Time zone" hint="Kickoff times follow this setting" right={<span className="num text-[15px] font-semibold text-ink">UTC+4</span>} />
            </div>
          </>
        )}

        {tab === "Security" && (
          <>
            <div className="card h-fit px-6 py-2">
              <Row
                label="Two-factor authentication"
                hint="TOTP app · required for every withdrawal"
                right={<Toggle on={twoFa} onChange={setTwoFa} label="Two-factor authentication" />}
              />
              <Row
                label="Withdrawal address allowlist"
                hint="New addresses unlock after a 24h hold"
                right={<Toggle on={withdrawLock} onChange={setWithdrawLock} label="Withdrawal allowlist" />}
              />
              <Row label="Passkey" hint="Added 14 Sep 2026 · MacBook Pro" right={<Pill tone="win">Active</Pill>} />
            </div>
            <div className="card h-fit px-6 py-2">
              <Row
                label="Change password"
                hint="Last changed 3 weeks ago"
                right={
                  <button type="button" className="card flex items-center gap-2 bg-surface2 px-3.5 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-[rgba(212,169,78,0.4)]">
                    <KeyRound size={15} className="text-muted" aria-hidden /> Update
                  </button>
                }
              />
              <Row label="Odds-change alerts" hint="Email when a slip price moves more than 5%" right={<Toggle on={oddsAlerts} onChange={setOddsAlerts} label="Odds-change alerts" />} />
            </div>
          </>
        )}

        {tab === "Sessions" && (
          <div className="card px-6 py-2 lg:col-span-2">
            {[
              { icon: Laptop, name: "macOS · Chrome", meta: "This device · signed in now", current: true },
              { icon: Smartphone, name: "iPhone · Safari", meta: "Last active 2h ago", current: false },
              { icon: Laptop, name: "Windows · Edge", meta: "Last active Mon, 09:12", current: false },
            ].map((s) => (
              <Row
                key={s.name}
                label={s.name}
                hint={s.meta}
                right={
                  s.current ? (
                    <Pill tone="win">Current</Pill>
                  ) : (
                    <button type="button" className="text-[14px] font-semibold text-loss transition-opacity hover:opacity-80">Revoke</button>
                  )
                }
              />
            ))}
          </div>
        )}

        {tab === "Limits" && (
          <>
            <div className="card h-fit px-6 py-2">
              <Row
                label="Daily deposit limit"
                hint="Used today: $450 of your cap"
                right={
                  <span className="card flex items-center gap-2 bg-surface2 px-3 py-2">
                    <span className="text-[13px] text-muted">$</span>
                    <input
                      value={depLimit}
                      onChange={(e) => setDepLimit(e.target.value.replace(/[^0-9]/g, ""))}
                      inputMode="numeric"
                      className="num w-20 bg-transparent text-right text-[15px] font-semibold text-ink outline-none"
                      aria-label="Daily deposit limit in USD"
                    />
                  </span>
                }
              />
              <Row label="Weekly loss limit" hint="Betting pauses automatically once reached" right={<span className="num text-[15px] font-semibold text-ink">$5,000</span>} />
            </div>
            <div className="card h-fit px-6 py-2">
              <Row label="Session reminder" hint="Nudge after 2 hours of continuous play" right={<Pill tone="win">On</Pill>} />
              <Row
                label="Self-exclusion"
                hint="Lock the account for 7 days to 5 years. Takes effect immediately."
                right={<button type="button" className="text-[14px] font-semibold text-loss transition-opacity hover:opacity-80">Configure</button>}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
