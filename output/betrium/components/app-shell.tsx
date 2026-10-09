"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { Bell, Dices, Plus, Radio, Search, Settings, Trophy, Wallet, ReceiptText } from "lucide-react";
import { BetSlipPanel, BetSlipProvider } from "@/components/bet-slip";

const nav = [
  { href: "/sportsbook", label: "Sportsbook", icon: Trophy },
  { href: "/live", label: "Live", icon: Radio },
  { href: "/casino", label: "Casino", icon: Dices },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/bets", label: "My Bets", icon: ReceiptText },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavIcon({ href, label, icon: Icon, active }: { href: string; label: string; icon: typeof Trophy; active: boolean }) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      title={label}
      className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-150 ${
        active ? "bg-accent text-[#15120A]" : "text-muted hover:bg-surface2 hover:text-ink"
      }`}
    >
      <Icon size={19} strokeWidth={2} />
    </Link>
  );
}

function HomeMark() {
  return (
    <Link
      href="/"
      aria-label="Betrium home"
      className="grid h-11 w-11 place-items-center rounded-full bg-surface2 text-[19px] font-bold text-accent"
      style={{ fontFamily: "var(--font-display)" }}
    >
      B
    </Link>
  );
}

function Avatar() {
  return (
    <Link
      href="/settings"
      aria-label="Account"
      className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(212,169,78,0.45)] bg-surface2 text-[13px] font-bold text-accent"
    >
      DG
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses search — the template's top bar advertises exactly this.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <BetSlipProvider>
      {/* Darker ground behind a raised, rounded app canvas — the dark inversion
          of the template's white-card-on-grey shell. */}
      <div className="min-h-dvh bg-[#070809] p-2 md:p-4 lg:pl-20">
        {/* Floating icon rail — desktop */}
        <nav
          aria-label="Primary"
          className="card fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 !rounded-full px-2.5 py-4 lg:flex"
        >
          <div className="mb-2"><HomeMark /></div>
          {nav.map((n) => (
            <NavIcon key={n.href} {...n} active={pathname.startsWith(n.href)} />
          ))}
          <div className="mt-2 border-t border-line pt-3">
            <Avatar />
          </div>
        </nav>

        {/* Floating bottom bar — mobile, straight from the template composite */}
        <nav
          aria-label="Primary"
          className="card fixed bottom-4 left-1/2 z-40 flex w-[min(96vw,520px)] -translate-x-1/2 items-center justify-between !rounded-full px-4 py-2.5 lg:hidden"
          style={{ background: "rgba(22,23,25,0.92)", backdropFilter: "blur(12px)" }}
        >
          <HomeMark />
          {nav
            .filter((n) => n.href !== "/settings") /* the avatar covers Settings on mobile */
            .map((n) => (
              <NavIcon key={n.href} {...n} active={pathname.startsWith(n.href)} />
            ))}
          <Avatar />
        </nav>

        {/* The app canvas */}
        <div className="min-h-[calc(100dvh-16px)] rounded-2xl border border-line bg-ground md:min-h-[calc(100dvh-32px)]">
          {/* Top bar */}
          <header className="sticky top-0 z-30 rounded-t-2xl border-b border-line bg-[rgba(13,14,16,0.88)] px-4 py-3 backdrop-blur-md md:px-8">
            <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3">
              <label className="card flex w-full max-w-[460px] items-center gap-3 bg-surface2 px-4 py-2.5">
                <Search size={17} className="shrink-0 text-muted" aria-hidden />
                <input
                  ref={searchRef}
                  placeholder="Search events, teams, games"
                  className="w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
                  aria-label="Search"
                />
                <kbd className="hidden rounded-md border border-line px-1.5 text-[12px] text-muted sm:block">/</kbd>
              </label>
              <div className="ml-auto flex items-center gap-3">
                <Link
                  href="/wallet"
                  className="flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2.5 text-[14px] font-bold text-[#15120A] transition-[filter] duration-150 hover:brightness-110"
                >
                  <Plus size={16} strokeWidth={2.5} aria-hidden />
                  <span className="hidden sm:inline">Deposit</span>
                </Link>
                <button type="button" aria-label="Notifications" className="card relative grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink">
                  <Bell size={18} aria-hidden />
                  <span aria-hidden className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1200px] px-4 pb-32 pt-8 md:px-8 lg:pb-16">
            {children}
          </main>
        </div>

        <BetSlipPanel />
      </div>
    </BetSlipProvider>
  );
}
