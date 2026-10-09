# Critique (round 2) - betrium vs chladni-ui-ux-designer-web-designer-for-saas-system

**Verdict:** Ship. All 6 round-1 items resolved, all 5 nice-to-haves applied, no regressions found. 1 minor should-fix, 2 nice-to-haves remain.
**Reviewed:** desktop + mobile pixels - fresh static export at http://localhost:4874, headless Chrome, 8 routes x 1440px and 390px, plus scrolled sticky-header states. (390px captured via same-origin 390px iframe; headless Chrome clamps direct windows to ~500px - the clipped-looking direct 390 PNGs in verify/critique/r2/mobile-*.png are that artifact, not the build.) Captures in verify/critique/r2/.

## Round-1 items - all confirmed fixed

| # | Round-1 finding | Status | Evidence |
|---|---|---|---|
| M1 | dev server serving unstyled CSS | fixed | static export fully styled on all 8 routes, both widths (desktop-*.png, m390-*.png); `npm run build` green |
| M2 | 390px horizontal overflow on /sportsbook and /casino/aurum-crash | fixed | iframe probe: scrollWidth = clientWidth = 390 on all 8 routes (and 1440 on all); no clipped content in m390-sportsbook.png / m390-crash.png |
| S3 | thin density on /casino and /bets (2 rows) | fixed | both now 9 cards in 3x3 (desktop-casino.png, desktop-bets.png), content ~1030px tall at 1440 - fills a 900px viewport like image_original4's grid |
| S4 | meta rows wrapping with orphaned leading "/" | fixed | no leading "/" anywhere; separators stay attached to the preceding item ("@ 2.05 /" wraps before "Payout 102.50" on bets cards; "Max 10,000x /" before "Provably fair" on casino mobile) |
| S5 | missing rounded app-canvas frame | fixed | canvas is rounded-2xl + hairline border on #070809 ground with 8/16px frame (app-shell.tsx:110); sticky header sticks cleanly inside it when scrolled at 1440 and 390 (d1440-sportsbook-scrolled.png, m390-sportsbook-scrolled.png) - no content peeking above, corners intact |
| S6 | rail missing Live; bottom bar missing Home | fixed | rail = logo + Sportsbook/Live/Casino/Wallet/My Bets/Settings + avatar (8 items, per LAYOUT.md); Live navigates to /live which renders the live board with the rail item active (desktop-live.png); bottom bar = Home + 5 sections + avatar, 7 x 44px items fitting 390 with margin |

Nice-to-haves from round 1, all applied: third filter dropdown on /sportsbook (Sport/League/Period); second header action on /casino (Filter + Sort: Popular); 2-col settings cards; deposit-panel terminal line under the CTA ("Send only BTC on the Bitcoin network..."); 44px avatar (h-11 w-11).

No template brand leak (grep for chladni/PUMP/PUCK/Berlin plant/Acme/Explorer over out/*.html: zero hits). Win-probability block correctly hidden on match cards <=420px with no gap left behind (m390-sportsbook.png). Bet slip remains selection-driven (bet-slip.tsx), unchanged from round 1.

## Must fix
(none)

## Should fix
1. **Wallet transaction rows lose their status pill below 640px** - Reference: image_original2/4 card anatomy keeps the status pill (Online/Pending-tier) on every card, including the mobile composite. Build: m390-wallet.png rows show only icon/title/amount - the Pending/Confirmed pill and timestamp are inside `<div className="hidden text-right sm:block">` (components/screens/wallet.tsx:111), so the state carrier disappears at 390. Fix: components/screens/wallet.tsx:111 - keep the pill visible below sm (move the Pill out of the hidden wrapper), hide only the timestamp.

## Nice to have
2. **/bets never shows the template's pagination row** - Reference: image_original4 ends in prev / 1 2 3 / next; LAYOUT.md maps /bets to Screen 4 "+ pagination"; /casino shows it (2 pages). Build: 9 seeded bets with pages=1, so `{pages > 1 && <Pagination/>}` (components/screens/bets.tsx:92) renders nothing. Fix: lib/data.ts - seed 3-4 more bets so pages=2 and the region exercises like the template.
3. **Bets desktop meta rows wrap to two lines on every card at 1440** - Reference devices cards (image_original4) keep the icon meta row on one line (3 items); build has 4 items so "Payout" wraps (desktop-bets.png). The wrap is clean now (separator stays on line 1), so this is rhythm only. If a single line is wanted: components/screens/bets.tsx - drop the "/" before Payout and let Payout be the card's second meta line by design, or shorten the Stake label.

## Excluded by design
colours (gold/bronze on near-black), fonts (Cinzel/Inter), logo, copy, photography subject - not reviewed.

## Not verified
- Runtime console errors / hydration warnings (no Playwright in this environment; headless Chrome CLI cannot dump console).
- Hover/press/focus states and the bet-slip place-bet flow (static captures only; the slip mounts on odds selection).
- Landing at exactly 390px was verified via the direct capture (mobile-home.png, ~500px layout - no breakpoints between 390 and 640 so layout is equivalent); the iframe harness capture (m390-home.png) shows Reveal content unrevealed because IntersectionObserver does not fire under virtual-time in an iframe - capture artifact, not a build bug. Reduced-motion fallback forces content visible (app/globals.css:204-212).
