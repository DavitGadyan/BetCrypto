"use client";

import Link from "next/link";
import { ArrowRight, Dices, Lock, ShieldCheck, Timer, Trophy, Wallet, Zap } from "lucide-react";
import { chains, tickers, walletBrands } from "@/lib/data";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Pill, Sparkline } from "@/components/ui";

/* ------------------------- in-CSS product mock panels ------------------------ */

function MockOddsCard() {
  return (
    <div className="card w-full max-w-[380px] p-5" aria-hidden>
      <div className="flex items-center justify-between">
        <Pill tone="live" dot>LIVE 64&prime;</Pill>
        <span className="text-[13px] text-muted">Europa League</span>
      </div>
      <p className="mt-3 text-[17px] font-bold text-ink">Aston Villa <span className="text-muted">–</span> Feyenoord</p>
      <p className="num mt-0.5 text-[13px] text-muted"><span className="font-bold text-ink">2 – 1</span> · implied 71%</p>
      <div className="mt-4 flex gap-2">
        {[["1", "1.36"], ["X", "5.25"], ["2", "8.60"]].map(([l, o], i) => (
          <span key={l} className="odds-btn" data-on={i === 0 ? "true" : undefined}>
            <span className="odds-lab">{l}</span>
            <span className="odds-val num">{o}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function MockCrashCard() {
  return (
    <div className="card w-full max-w-[380px] p-5" aria-hidden>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold text-ink">Aurum Crash</span>
        <span className="num text-[22px] font-bold text-win">2.41×</span>
      </div>
      <div className="mt-2"><Sparkline points={[1, 1.15, 1.4, 1.8, 2.05, 2.41]} tone="win" w={300} h={72} /></div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[13px]">
        <span className="flex items-center gap-1.5 text-win"><ShieldCheck size={14} aria-hidden />Provably fair</span>
        <span className="num text-muted">RTP 99.0%</span>
      </div>
    </div>
  );
}

function MockWalletCard() {
  return (
    <div className="card w-full max-w-[380px] p-5" aria-hidden>
      <div className="flex items-center justify-between">
        <Pill tone="gold">Bitcoin</Pill>
        <span className="num text-[13px] font-semibold text-win">+1.8% 24h</span>
      </div>
      <p className="num mt-3 text-[22px] font-bold text-ink">0.28431 <span className="text-[14px] text-muted">BTC</span></p>
      <p className="num text-[14px] text-muted">$34,516.40</p>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[13px]">
        <span className="text-muted">Withdrawal</span>
        <span className="flex items-center gap-1.5 font-semibold text-win"><Timer size={14} aria-hidden />87s median</span>
      </div>
    </div>
  );
}

/* ---------------------------------- landing --------------------------------- */

const features = [
  {
    icon: Trophy,
    title: "A sportsbook that moves at chain speed",
    body: "Live prices across 40+ sports, re-priced in milliseconds over WebSockets. Lock odds at slip time, cash out mid-match, and watch settlement hit your wallet — not a support queue.",
    mock: <MockOddsCard />,
  },
  {
    icon: Dices,
    title: "Casino originals you can audit",
    body: "Every original commits to a hashed server seed before the round starts. Mix in your own client seed, replay any result locally, and verify the math yourself — no trust required.",
    mock: <MockCrashCard />,
  },
  {
    icon: Wallet,
    title: "Your crypto, in and out in minutes",
    body: "Deposit on six chains, bet in any balance, withdraw to your own keys. Median payout clears in under 90 seconds, with 2FA and address allowlists standing in front of every send.",
    mock: <MockWalletCard />,
  },
];

const stats = [
  ["1,400+", "markets priced daily"],
  ["87s", "median withdrawal"],
  ["99.0%", "RTP on originals"],
  ["6", "chains supported"],
];

const security = [
  {
    icon: ShieldCheck,
    title: "Provably fair by construction",
    body: "SHA-256 seed commitments published before every round; seeds revealed on rotation so any outcome can be recomputed.",
  },
  {
    icon: Lock,
    title: "Cold-first custody",
    body: "Hot wallets hold operating float only. The rest sits in multi-sig cold storage with allowlisted, rate-limited withdrawals.",
  },
  {
    icon: Zap,
    title: "Built for the spike",
    body: "Odds feeds, bet placement and settlement run on separate paths, so a cup-final surge never queues your cashout.",
  },
];

export function LandingScreen() {
  return (
    <div className="min-h-dvh bg-ground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-line bg-[rgba(13,14,16,0.85)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <Link href="/" className="text-[20px] font-bold tracking-wide text-accent" style={{ fontFamily: "var(--font-display)" }}>
            BETRIUM
          </Link>
          <nav aria-label="Marketing" className="hidden items-center gap-7 text-[15px] text-muted md:flex">
            <Link href="/sportsbook" className="transition-colors hover:text-ink">Sportsbook</Link>
            <Link href="/casino" className="transition-colors hover:text-ink">Casino</Link>
            <Link href="/casino/aurum-crash" className="transition-colors hover:text-ink">Provably fair</Link>
            <Link href="/wallet" className="transition-colors hover:text-ink">Wallet</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/sportsbook" className="hidden text-[15px] font-medium text-muted transition-colors hover:text-ink sm:block">
              Log in
            </Link>
            <Link href="/sportsbook" className="rounded-xl bg-accent px-4 py-2.5 text-[14px] font-bold text-[#15120A] transition-[filter] duration-150 hover:brightness-110">
              Launch app
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section tone="ground" className="!pb-16 md:!pb-20">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Pill tone="gold">Non-custodial options · Provably fair · 18+</Pill>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-[17ch] text-balance uppercase" style={{ fontSize: "var(--size-display)", letterSpacing: "0.02em" }}>
              Bet in crypto. <span className="text-accent">Settle on-chain.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-[52ch] text-[18px] leading-relaxed text-muted">
              Betrium is a sportsbook and casino built on cryptographic receipts: live odds across 40+ sports,
              originals you can verify hand by hand, and withdrawals that clear in minutes — not days.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/sportsbook" className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[16px] font-bold text-[#15120A] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.99]">
              Launch app <ArrowRight size={17} aria-hidden />
            </Link>
            <Link href="/casino" className="card px-6 py-3.5 text-[16px] font-semibold text-ink transition-colors hover:border-[rgba(212,169,78,0.45)]">
              Explore casino
            </Link>
          </Reveal>
        </div>

        {/* Live ticker row */}
        <Reveal delay={320}>
          <div className="mt-14 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]" aria-label="Live markets right now">
            {tickers.map((t) => (
              <Link key={t.slug} href={`/sportsbook/${t.slug}`} className="card flex min-w-[280px] items-center gap-3.5 px-4 py-3.5 transition-colors hover:border-[rgba(212,169,78,0.45)]">
                {t.live ? (
                  <span className="flex items-center gap-1.5 text-[12px] font-bold text-loss">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-loss" aria-hidden />
                    {t.clock}
                  </span>
                ) : (
                  <span className="text-[12px] font-semibold text-muted">SOON</span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-ink">{t.label}</span>
                  <span className="block text-[12px] text-muted">{t.league}</span>
                </span>
                <span className="num ml-auto text-[16px] font-bold text-accent">{t.odds}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Features — alternating rows */}
      <Section tone="surface">
        <div className="flex flex-col gap-20 md:gap-28">
          {features.map((f, i) => (
            <Reveal key={f.title}>
              <div className={`flex flex-col items-center gap-10 md:gap-16 ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                <div className="flex-1">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[rgba(212,169,78,0.12)] text-accent">
                    <f.icon size={22} aria-hidden />
                  </span>
                  <h2 className="mt-5 max-w-[24ch]" style={{ fontSize: "var(--size-h2)" }}>{f.title}</h2>
                  <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-muted">{f.body}</p>
                </div>
                <div className="flex w-full flex-1 justify-center">
                  <div className="w-full max-w-[380px]" style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>{f.mock}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Statement */}
      <Section tone="ground">
        <Reveal>
          <p className="mx-auto max-w-[24ch] text-center uppercase" style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h1)", lineHeight: 1.15 }}>
            Every bet is a transaction. <span className="text-accent">Every payout is proof.</span>
          </p>
        </Reveal>
      </Section>

      {/* Stats band */}
      <Section tone="surface" className="!py-16 md:!py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map(([v, l], i) => (
            <Reveal key={l} delay={i * 70} className="text-center">
              <p className="num text-[40px] font-bold leading-none text-accent" style={{ fontFamily: "var(--font-display)" }}>{v}</p>
              <p className="mt-2.5 text-[15px] text-muted">{l}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section tone="ground">
        <Reveal>
          <h2 className="text-center uppercase" style={{ fontSize: "var(--size-h2)" }}>Engineered like an exchange</h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-center text-[17px] text-muted">
            Real money moves through this platform, and the architecture treats that with the weight it deserves.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {security.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card h-full p-6">
                <s.icon size={22} className="text-accent" aria-hidden />
                <h3 className="mt-4 text-[18px] font-bold" style={{ fontFamily: "var(--font-body)" }}>{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Wallets & chains */}
        <Reveal delay={120}>
          <p className="mt-16 text-center text-[13px] uppercase tracking-[0.18em] text-muted">Connect with · Settle on</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {[...walletBrands, ...chains].map((w) => (
              <span key={w} className="card px-4 py-2 text-[14px] font-medium text-muted">{w}</span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section tone="surface" className="!py-20">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-[20ch] uppercase" style={{ fontSize: "var(--size-h1)" }}>Take a seat at the table</h2>
          <p className="mt-4 max-w-[44ch] text-[17px] text-muted">
            Connect a wallet, make a first deposit, and you are live on 1,400 markets in under a minute.
          </p>
          <Link href="/sportsbook" className="mt-8 flex items-center gap-2 rounded-xl bg-accent px-7 py-4 text-[16px] font-bold text-[#15120A] transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.99]">
            Create account <ArrowRight size={17} aria-hidden />
          </Link>
        </Reveal>
      </Section>

      {/* Footer */}
      <footer className="border-t border-line bg-ground px-6 py-14 md:px-10">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[18px] font-bold tracking-wide text-accent" style={{ fontFamily: "var(--font-display)" }}>BETRIUM</p>
            <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-muted">
              Crypto-native sportsbook and casino. Provably fair games, on-chain settlement, cold-first custody.
            </p>
          </div>
          {[
            ["Product", ["Sportsbook", "Live betting", "Casino originals", "Wallet"]],
            ["Resources", ["Provably fair", "API status", "Fee schedule", "Help center"]],
            ["Legal", ["Terms of service", "Privacy", "AML policy", "Responsible play"]],
          ].map(([h, items]) => (
            <nav key={h as string} aria-label={h as string}>
              <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{h}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {(items as string[]).map((it) => (
                  <li key={it}>
                    <Link href="/sportsbook" className="text-[14px] text-ink opacity-80 transition-opacity hover:opacity-100">{it}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mx-auto mt-12 flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted">
          <span>© 2026 Betrium Labs. All rights reserved.</span>
          <span className="flex items-center gap-2"><ShieldCheck size={14} aria-hidden /> 18+ · Please play responsibly.</span>
        </div>
      </footer>
    </div>
  );
}
