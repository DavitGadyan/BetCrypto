# Layout inventory - Chladni - Industrial IoT Asset Performance SaaS -> Betrium

The images are the template; this file is the contract the build follows.

## Template tokens (read off the images)

| | Template (from the image) | Yours |
|---|---|---|
| mode | light | dark |
| ground | #F0F2F4 light gray | #0D0E10 |
| surface | #FFFFFF | #161719 |
| ink | #191A1B | #F4F1EA |
| accent | #4930FF electric blue | #D4A94E gold |
| accent2 | #3828AF | #8B7445 bronze |
| display font | Orbitron (uppercase, techno) | Cinzel (uppercase, luxury serif) |
| body font | Inter | Inter (odds/amounts tabular-nums) |
| corner radius | cards ~16-20px, pills full, sidebar rail full | same geometry (radius is template anatomy, not a token override) |
| nav pattern | floating icon-rail sidebar, detached from edge, avatar at bottom; search-first top bar with "/" hint; dark "+" square; bell w/ notification dot. On mobile/tablet composite: same icons as a floating horizontal bottom bar | identical; "+" becomes gold Deposit square; rail icons: Home(landing logo), Sportsbook, Live, Casino, Wallet, My Bets, Settings, avatar |
| card style | white surface, hairline border, status pill top-left, timestamp + "…" top-right, bold title row, icon meta row with "/" separators, some cards carry big % + area sparkline | same anatomy on dark: surface + 1px rgba(244,241,234,.08) border |
| status pills | tinted bg + colored text, slightly rounded (Online green, Offline red, Battery low amber, Unassigned violet) | LIVE red, Won green, Pending amber, Cashed out bronze, Open gold-tint |

## Screens

### Screen 1 - image_original1 (Explorer / map viewport)
| # | Region | Component | Contents | Layout | States |
|---|---|---|---|---|---|
| 1 | Top bar | search pill + actions | search w/ "/" shortcut; right: dark "+" square, bell w/ dot | full-width, white card frame around entire app | hover |
| 2 | Page header | uppercase display title + muted subtitle; right: Filter btn, Export Report btn, List/Map segmented toggle (Map active = white pill) | left title, right action row | active segment |
| 3 | Icon rail | floating pill sidebar, 8 icons + avatar, active = circled | overlaps content edge, detached | active circle |
| 4 | Body | full-bleed panel w/ floating detail card bottom-right: flag + location row, status pill right, bold name, timestamp, big green % + area sparkline right, 2x3 stats rows (label: value), full-width CTA button | card ~360px | Active pill green |

### Screen 2/3 - image_original2/3 (drill-down, full page, incl. mobile bottom bar)
| # | Region | Component | Contents | Layout | States |
|---|---|---|---|---|---|
| 1 | Breadcrumb | icon + crumbs sep by "/" | Explorer / Berlin Plant / PUMP#7 | left | link hover |
| 2 | Title row | uppercase display title + health pill | PUMP#7 + green pill | left | |
| 3 | Summary cards | 2 compact cards: icon tile, ID, status icon+word / meta | 2-up row | |
| 4 | Tab strip | 6 tabs in a gray pill container, active = white pill w/ icon | Overview, Diagnostics, Raw Data, Incidents, Work Orders, History | horizontal scroll on narrow | active |
| 5 | Card grid | 2-col cards: CRITICAL label pill + state pill right (Solved green/Open gold/Linked violet), bold title, timestamp, divider, footer row icon + "Last incident" + #id right | 2-col | |
| 6 | Collapsible card | name + "1/1 WO" right, timestamp, big red % + red area sparkline, divider, "Assets:" count rows, nested child card (icon, High, #id, title, type / date, To do pill), "View Less" center toggle | 1-col ~400px | expanded |
| 7 | Mobile bottom bar | same rail icons horizontal, floating, active circled, avatar right | fixed bottom | active |

### Screen 4 - image_original4 (Devices grid)
| # | Region | Component | Contents | Layout | States |
|---|---|---|---|---|---|
| 1 | Page header | DEVICES + subtitle; right Filter + Export Report | | |
| 2 | Card grid | 3-col cards: status pill top-left, "2h Ago" + "…" top-right, bold ID + light name, icon meta row (signal / battery / asset) with "/" separators | 3-col, equal height | Online/Offline/Battery low/Unassigned variants; "+ Add" inline action |
| 3 | Pagination | prev circle, 1 (active dark), 2, 3, next | centered | active |

### Screen 5 - image_original5 (user-flow diagram) — flow reference only, not a screen.
Login -> Dashboard / Header / Explorer / Incidents / Work Orders / Settings. Settings -> Users & Roles, Sites & Lines, Billing, Integrations.

### Screen 6 - image_original6 (Explorer list view, laptop mockup)
| # | Region | Component | Contents | Layout | States |
|---|---|---|---|---|---|
| 1 | Filter bar | 3 dropdown pills w/ leading icon + chevron: Site: All / Location: All / Status: All | row above grid | open |
| 2 | Site cards | 2-col: status pill top-left, location + flag top-right, bold name, timestamp, big % + sparkline right, 2 stats rows of 3 (Assets/Lines/Orders, Critical/Major/Minor) | 2-col | Active green / Disabled red, % colored |

### Screen 7 - image_original7 (design system board) — tokens reference only.
### Screen 8 - image_original8 (portfolio CTA banner) — ignore.

## Betrium mapping (template anatomy -> product screens)

1. **App shell** (`components/app-shell.tsx`): icon rail (desktop) / floating bottom bar (<lg), search top bar, gold Deposit square, bell w/ dot, avatar.
2. **/sportsbook** = Screen 6: filter dropdowns (Sport / League / Status) + header actions (Filter, Odds format, Upcoming|Live segmented); 2-col match cards = site cards (LIVE/kickoff pill, league + flag, Team v Team title, minute/score, implied-prob % + sparkline, stats rows -> 1X2 odds buttons + markets count).
3. **/sportsbook/[slug]** = Screen 2/3: breadcrumb, title + LIVE pill, 2 team summary cards, 6 tabs (Overview, Markets, Statistics, Lineups, Timeline, My Bets), 2-col market cards (market-type label + Open/Suspended pill, selections as odds buttons, footer "Cashout available" + id). Right rail: **bet slip** = Screen 1 floating detail card (pill, selections, stake input, big payout number, CTA). Mobile: bottom sheet.
4. **/casino** = Screen 4: 3-col game cards (Hot/New/Live pill, "2 min ago" + "…", game title + studio, meta row RTP / max win / provably fair), pagination.
5. **/casino/[slug]** = Screen 2/3 anatomy: breadcrumb, title + RTP pill, 2 summary cards (session, seeds), tabs, provably-fair verify panel = collapsible card anatomy + recent rounds grid.
6. **/wallet** = Screen 6 + Screen 1: asset balance cards (asset + network pill, amount, USD, sparkline, stats rows), deposit/withdraw panel = floating detail card (segmented toggle, address + copy, QR, fee/conf rows, CTA), tx list = Screen 4 cards (Confirmed/Pending pill, truncated hash, confs).
7. **/bets** = Screen 4: filter dropdowns + 3-col bet cards (Won/Lost/Open/Cashed out pill, settled time + "…", selection + market, stake / odds / payout meta row), pagination.
8. **/settings** = Screen 2/3: title, tabs (Profile, Security, Sessions, Limits), 2-col setting cards incl. responsible-gambling limits.
9. **/** landing (structure from Invest Inc. reference, dark fintech): nav, Cinzel hero + dual CTA, live-odds ticker card row, 3 alternating feature blocks w/ in-CSS product mock cards, statement line, stats band, provably-fair/security section, wallets & chains text-chip strip, sign-up CTA, footer w/ 18+ responsible play line.

## Section plan

1. app shell (rail + top bar + mobile bottom bar)
2. sportsbook board
3. match detail + bet slip
4. casino grid
5. game detail + provably fair
6. wallet
7. bet history
8. settings
9. landing
