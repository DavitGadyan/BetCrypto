/**
 * Demo dataset for the Betrium showcase. Everything is plausible and
 * internally consistent (odds carry a real overround, USD equivalents match
 * the quoted prices, confirmation counts match each chain) so the UI reads
 * as a live product, not a lorem-ipsum mock.
 *
 * Reference date: Thu 8 Oct 2026, ~21:40 local.
 */

export type Outcome = { label: string; short: string; odds: number };

export type Match = {
  slug: string;
  sport: string;
  league: string;
  country: string; // short badge, e.g. ENG
  home: string;
  away: string;
  status: "live" | "upcoming";
  clock?: string; // live minute / quarter
  score?: string;
  start: string; // display string for upcoming
  impliedHome: number; // win probability %, drives the big number + sparkline
  trend: number[]; // implied prob over time
  outcomes: Outcome[]; // 1X2 or ML
  marketsCount: number;
};

export const matches: Match[] = [
  {
    slug: "aston-villa-feyenoord",
    sport: "Football",
    league: "Europa League",
    country: "EU",
    home: "Aston Villa",
    away: "Feyenoord",
    status: "live",
    clock: "64'",
    score: "2 – 1",
    start: "Today, 21:00",
    impliedHome: 71,
    trend: [48, 52, 50, 61, 58, 66, 71],
    outcomes: [
      { label: "Aston Villa", short: "1", odds: 1.36 },
      { label: "Draw", short: "X", odds: 5.25 },
      { label: "Feyenoord", short: "2", odds: 8.6 },
    ],
    marketsCount: 94,
  },
  {
    slug: "real-betis-porto",
    sport: "Football",
    league: "Europa League",
    country: "EU",
    home: "Real Betis",
    away: "FC Porto",
    status: "live",
    clock: "23'",
    score: "0 – 0",
    start: "Today, 21:00",
    impliedHome: 38,
    trend: [36, 37, 35, 39, 38, 40, 38],
    outcomes: [
      { label: "Real Betis", short: "1", odds: 2.55 },
      { label: "Draw", short: "X", odds: 2.95 },
      { label: "FC Porto", short: "2", odds: 3.1 },
    ],
    marketsCount: 112,
  },
  {
    slug: "roma-fenerbahce",
    sport: "Football",
    league: "Europa League",
    country: "EU",
    home: "AS Roma",
    away: "Fenerbahçe",
    status: "live",
    clock: "78'",
    score: "1 – 0",
    start: "Today, 18:45",
    impliedHome: 83,
    trend: [55, 54, 60, 72, 70, 79, 83],
    outcomes: [
      { label: "AS Roma", short: "1", odds: 1.22 },
      { label: "Draw", short: "X", odds: 6.75 },
      { label: "Fenerbahçe", short: "2", odds: 15.0 },
    ],
    marketsCount: 87,
  },
  {
    slug: "arsenal-chelsea",
    sport: "Football",
    league: "Premier League",
    country: "ENG",
    home: "Arsenal",
    away: "Chelsea",
    status: "upcoming",
    start: "Sat 10 Oct, 17:30",
    impliedHome: 49,
    trend: [45, 46, 44, 47, 48, 47, 49],
    outcomes: [
      { label: "Arsenal", short: "1", odds: 1.95 },
      { label: "Draw", short: "X", odds: 3.7 },
      { label: "Chelsea", short: "2", odds: 3.95 },
    ],
    marketsCount: 186,
  },
  {
    slug: "man-city-brighton",
    sport: "Football",
    league: "Premier League",
    country: "ENG",
    home: "Manchester City",
    away: "Brighton",
    status: "upcoming",
    start: "Sat 10 Oct, 15:00",
    impliedHome: 66,
    trend: [62, 63, 65, 64, 66, 65, 66],
    outcomes: [
      { label: "Man City", short: "1", odds: 1.44 },
      { label: "Draw", short: "X", odds: 4.8 },
      { label: "Brighton", short: "2", odds: 7.25 },
    ],
    marketsCount: 171,
  },
  {
    slug: "liverpool-newcastle",
    sport: "Football",
    league: "Premier League",
    country: "ENG",
    home: "Liverpool",
    away: "Newcastle",
    status: "upcoming",
    start: "Sun 11 Oct, 16:30",
    impliedHome: 57,
    trend: [54, 55, 53, 56, 57, 56, 57],
    outcomes: [
      { label: "Liverpool", short: "1", odds: 1.68 },
      { label: "Draw", short: "X", odds: 4.1 },
      { label: "Newcastle", short: "2", odds: 5.0 },
    ],
    marketsCount: 164,
  },
  {
    slug: "lakers-warriors",
    sport: "Basketball",
    league: "NBA Preseason",
    country: "USA",
    home: "LA Lakers",
    away: "Golden State",
    status: "upcoming",
    start: "Sat 10 Oct, 04:00",
    impliedHome: 52,
    trend: [50, 51, 49, 52, 51, 52, 52],
    outcomes: [
      { label: "LA Lakers", short: "1", odds: 1.87 },
      { label: "Golden State", short: "2", odds: 1.95 },
    ],
    marketsCount: 58,
  },
  {
    slug: "celtics-knicks",
    sport: "Basketball",
    league: "NBA Preseason",
    country: "USA",
    home: "Boston Celtics",
    away: "NY Knicks",
    status: "upcoming",
    start: "Sun 11 Oct, 01:30",
    impliedHome: 56,
    trend: [53, 54, 55, 54, 56, 55, 56],
    outcomes: [
      { label: "Boston Celtics", short: "1", odds: 1.72 },
      { label: "NY Knicks", short: "2", odds: 2.12 },
    ],
    marketsCount: 61,
  },
  {
    slug: "chiefs-bills",
    sport: "American Football",
    league: "NFL · Week 5",
    country: "USA",
    home: "Kansas City",
    away: "Buffalo",
    status: "upcoming",
    start: "Sun 11 Oct, 21:25",
    impliedHome: 50,
    trend: [48, 49, 50, 49, 51, 50, 50],
    outcomes: [
      { label: "Kansas City", short: "1", odds: 1.91 },
      { label: "Buffalo", short: "2", odds: 1.91 },
    ],
    marketsCount: 142,
  },
  {
    slug: "rangers-bruins",
    sport: "Ice Hockey",
    league: "NHL",
    country: "USA",
    home: "NY Rangers",
    away: "Boston Bruins",
    status: "upcoming",
    start: "Sun 11 Oct, 00:00",
    impliedHome: 41,
    trend: [40, 41, 39, 42, 41, 40, 41],
    outcomes: [
      { label: "NY Rangers", short: "1", odds: 2.3 },
      { label: "Draw", short: "X", odds: 4.2 },
      { label: "Boston Bruins", short: "2", odds: 2.45 },
    ],
    marketsCount: 73,
  },
];

export const sports = ["All", "Football", "Basketball", "American Football", "Ice Hockey"];

export type Market = {
  name: string;
  state: "open" | "suspended";
  cashout: boolean;
  outcomes: Outcome[];
};

/** Markets rendered on the match-detail page; derived from the 1X2 prices so nothing is internally impossible. */
export function marketsFor(m: Match): Market[] {
  const base = m.outcomes[0].odds;
  const live = m.status === "live";
  // Implied probabilities from the head-to-head prices (overround left in,
  // matching how a real book quotes derivatives).
  const p = m.outcomes.map((o) => 1 / o.odds);
  const [p1, px, p2] = p.length === 3 ? p : [p[0], 0, p[1]];
  const dc = (prob: number) => Math.max(1.01, round2((1 / prob) * 0.97));
  return [
    { name: "Match Winner", state: "open", cashout: true, outcomes: m.outcomes },
    {
      name: "Double Chance",
      state: "open",
      cashout: true,
      outcomes: [
        { label: "1X", short: "1X", odds: dc(p1 + px) },
        { label: "12", short: "12", odds: dc(p1 + p2) },
        { label: "X2", short: "X2", odds: dc(px + p2) },
      ],
    },
    {
      name: "Total Goals O/U 2.5",
      state: live && m.clock === "78'" ? "suspended" : "open",
      cashout: true,
      outcomes: [
        { label: "Over 2.5", short: "O", odds: live ? 2.45 : 1.92 },
        { label: "Under 2.5", short: "U", odds: live ? 1.52 : 1.88 },
      ],
    },
    {
      name: "Both Teams to Score",
      state: "open",
      cashout: true,
      outcomes: [
        { label: "Yes", short: "Y", odds: live ? 2.1 : 1.78 },
        { label: "No", short: "N", odds: live ? 1.66 : 1.98 },
      ],
    },
    {
      name: "Asian Handicap −1.5",
      state: "open",
      cashout: false,
      outcomes: [
        { label: `${m.home} −1.5`, short: "H", odds: round2(base * 1.9) },
        { label: `${m.away} +1.5`, short: "A", odds: round2(1.1 + 1 / base) },
      ],
    },
    {
      name: "Corners O/U 9.5",
      state: live ? "suspended" : "open",
      cashout: false,
      outcomes: [
        { label: "Over 9.5", short: "O", odds: 1.85 },
        { label: "Under 9.5", short: "U", odds: 1.95 },
      ],
    },
  ];
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/* ---------------------------------- casino --------------------------------- */

export type Game = {
  slug: string;
  title: string;
  studio: string;
  tag: "Hot" | "New" | "Live" | "Original";
  rtp: number;
  maxWin: string;
  playing: number;
  fair: boolean;
};

export const games: Game[] = [
  { slug: "aurum-crash", title: "Aurum Crash", studio: "Betrium Originals", tag: "Hot", rtp: 99.0, maxWin: "10,000×", playing: 1243, fair: true },
  { slug: "gilded-dice", title: "Gilded Dice", studio: "Betrium Originals", tag: "Original", rtp: 98.5, maxWin: "9,900×", playing: 866, fair: true },
  { slug: "plinko-royale", title: "Plinko Royale", studio: "Betrium Originals", tag: "Hot", rtp: 99.0, maxWin: "1,000×", playing: 721, fair: true },
  { slug: "mines-of-midas", title: "Mines of Midas", studio: "Betrium Originals", tag: "Original", rtp: 97.0, maxWin: "5,280×", playing: 534, fair: true },
  { slug: "limbo-noir", title: "Limbo Noir", studio: "Betrium Originals", tag: "New", rtp: 99.0, maxWin: "1,000,000×", playing: 412, fair: true },
  { slug: "velvet-roulette", title: "Velvet Roulette", studio: "Northlight Live", tag: "Live", rtp: 97.3, maxWin: "35×", playing: 388, fair: false },
  { slug: "blackjack-prive", title: "Blackjack Privé", studio: "Northlight Live", tag: "Live", rtp: 99.5, maxWin: "3:2", playing: 296, fair: false },
  { slug: "baccarat-noir", title: "Baccarat Noir", studio: "Northlight Live", tag: "Live", rtp: 98.9, maxWin: "8:1", playing: 204, fair: false },
  { slug: "midas-wheel", title: "Midas Wheel", studio: "Betrium Originals", tag: "New", rtp: 96.8, maxWin: "49.5×", playing: 177, fair: true },
  { slug: "hi-lo-sovereign", title: "Hi-Lo Sovereign", studio: "Betrium Originals", tag: "Original", rtp: 98.0, maxWin: "1,014×", playing: 132, fair: true },
  { slug: "keno-dor", title: "Keno d'Or", studio: "Astra Gaming", tag: "Original", rtp: 94.0, maxWin: "100,000×", playing: 98, fair: true },
  { slug: "video-poker-jacks", title: "Jacks or Better", studio: "Astra Gaming", tag: "Original", rtp: 99.5, maxWin: "800×", playing: 61, fair: true },
];

export const gameCategories = ["All", "Originals", "Live", "Table", "New"];

export type Round = { id: string; multiplier: number; bet: string; payout: string; time: string };

export const crashRounds: Round[] = [
  { id: "#7 441 203", multiplier: 2.41, bet: "25.00 USDT", payout: "60.25 USDT", time: "21:38" },
  { id: "#7 441 202", multiplier: 1.08, bet: "25.00 USDT", payout: "—", time: "21:37" },
  { id: "#7 441 201", multiplier: 12.44, bet: "10.00 USDT", payout: "124.40 USDT", time: "21:36" },
  { id: "#7 441 200", multiplier: 1.62, bet: "25.00 USDT", payout: "40.50 USDT", time: "21:35" },
  { id: "#7 441 199", multiplier: 1.0, bet: "50.00 USDT", payout: "—", time: "21:34" },
  { id: "#7 441 198", multiplier: 3.87, bet: "15.00 USDT", payout: "58.05 USDT", time: "21:32" },
];

export const fairness = {
  serverSeedHash: "a3f1c88d6b2e49075c1df30aa7b64e92d85f4ce1b09a2d6f7c43e8a15b96d204",
  clientSeed: "dg-2026-10-08-vTq9",
  nonce: 1847,
  revealedSeed: "4b7a…previous seed revealed after rotation",
};

/* ---------------------------------- wallet --------------------------------- */

export type Asset = {
  symbol: string;
  name: string;
  network: string;
  balance: string;
  usd: string;
  change24h: string;
  up: boolean;
  trend: number[];
  inBets: string;
  pending: string;
  confirmations: number;
  minDeposit: string;
  fee: string;
  address: string;
};

export const assets: Asset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
    balance: "0.28431",
    usd: "$34,516.40",
    change24h: "+1.8%",
    up: true,
    trend: [118.2, 119.4, 118.9, 120.1, 119.6, 120.8, 121.4],
    inBets: "0.01250",
    pending: "0.00000",
    confirmations: 2,
    minDeposit: "0.0001 BTC",
    fee: "≈ 0.00004 BTC",
    address: "bc1qxw4e8k2hv7n3m9t5rfu0ycad6s1lgp842zjq7h",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "Ethereum",
    balance: "2.4612",
    usd: "$10,607.77",
    change24h: "+0.9%",
    up: true,
    trend: [4.21, 4.18, 4.24, 4.2, 4.27, 4.29, 4.31],
    inBets: "0.1500",
    pending: "0.0000",
    confirmations: 12,
    minDeposit: "0.005 ETH",
    fee: "≈ 0.00031 ETH",
    address: "0x4F3e9bD71c25A8e06f2A9c13De5B8a4C7F1e8A21",
  },
  {
    symbol: "SOL",
    name: "Solana",
    network: "Solana",
    balance: "42.180",
    usd: "$8,773.44",
    change24h: "−2.1%",
    up: false,
    trend: [221, 218, 215, 212, 214, 210, 208],
    inBets: "6.500",
    pending: "0.000",
    confirmations: 32,
    minDeposit: "0.1 SOL",
    fee: "≈ 0.00025 SOL",
    address: "7dK2mPqXhVBg4sZtN8eJcA1wyRuL5fTo9UiCDnEa36bM",
  },
  {
    symbol: "USDT",
    name: "Tether",
    network: "Tron · TRC-20",
    balance: "1,250.00",
    usd: "$1,250.00",
    change24h: "0.0%",
    up: true,
    trend: [1, 1, 1, 1, 1, 1, 1],
    inBets: "75.00",
    pending: "200.00",
    confirmations: 19,
    minDeposit: "10 USDT",
    fee: "≈ 1 USDT",
    address: "TXk9eW2mQp7rAzN4S1cVuJfB5hGdL8oyT3",
  },
];

export type Tx = {
  id: string;
  kind: "Deposit" | "Withdrawal";
  asset: string;
  amount: string;
  usd: string;
  hash: string;
  status: "Confirmed" | "Pending";
  confs: string;
  time: string;
};

export const txs: Tx[] = [
  { id: "t1", kind: "Deposit", asset: "USDT", amount: "+200.00", usd: "$200.00", hash: "c84d…f1b7", status: "Pending", confs: "11 / 19", time: "4 min ago" },
  { id: "t2", kind: "Withdrawal", asset: "BTC", amount: "−0.05200", usd: "$6,312.80", hash: "9a1e…04cd", status: "Confirmed", confs: "6 / 2", time: "Today, 18:12" },
  { id: "t3", kind: "Deposit", asset: "ETH", amount: "+1.2000", usd: "$5,172.00", hash: "0x7b2f…9e6a", status: "Confirmed", confs: "36 / 12", time: "Today, 11:47" },
  { id: "t4", kind: "Deposit", asset: "SOL", amount: "+18.500", usd: "$3,848.00", hash: "4Fsm…Vw2q", status: "Confirmed", confs: "32 / 32", time: "Wed, 22:03" },
  { id: "t5", kind: "Withdrawal", asset: "USDT", amount: "−450.00", usd: "$450.00", hash: "ae3c…77d0", status: "Confirmed", confs: "19 / 19", time: "Tue, 09:31" },
  { id: "t6", kind: "Deposit", asset: "BTC", amount: "+0.15000", usd: "$18,210.00", hash: "f05b…3c9e", status: "Confirmed", confs: "142 / 2", time: "Mon, 16:58" },
];

/* ----------------------------------- bets ---------------------------------- */

export type Bet = {
  id: string;
  kind: "Single" | "Parlay ×3";
  pick: string;
  market: string;
  status: "Won" | "Lost" | "Open" | "Cashed out";
  stake: string;
  odds: string;
  payout: string;
  time: string;
};

export const bets: Bet[] = [
  { id: "B-20481", kind: "Single", pick: "Aston Villa to win", market: "Match Winner · live", status: "Open", stake: "50.00 USDT", odds: "2.05", payout: "102.50", time: "Today, 21:04" },
  { id: "B-20473", kind: "Single", pick: "AS Roma −1.5", market: "Asian Handicap", status: "Open", stake: "0.0100 BTC", odds: "3.10", payout: "0.0310", time: "Today, 18:40" },
  { id: "B-20466", kind: "Parlay ×3", pick: "Arsenal · Over 2.5 · BTTS Yes", market: "Premier League combo", status: "Open", stake: "25.00 USDT", odds: "9.84", payout: "246.00", time: "Today, 14:22" },
  { id: "B-20412", kind: "Single", pick: "Bayern Munich to win", market: "Match Winner", status: "Won", stake: "100.00 USDT", odds: "1.57", payout: "157.00", time: "Tue, 22:51" },
  { id: "B-20397", kind: "Single", pick: "Real Madrid · Under 3.5", market: "Total Goals", status: "Cashed out", stake: "0.2500 ETH", odds: "1.90", payout: "0.3180", time: "Tue, 20:14" },
  { id: "B-20371", kind: "Single", pick: "PSG to win", market: "Match Winner", status: "Lost", stake: "40.00 USDT", odds: "1.72", payout: "—", time: "Sun, 23:02" },
  { id: "B-20355", kind: "Parlay ×3", pick: "Inter · Juventus X · Milan O2.5", market: "Serie A combo", status: "Won", stake: "15.00 USDT", odds: "11.20", payout: "168.00", time: "Sun, 19:45" },
  { id: "B-20318", kind: "Single", pick: "Dortmund +0.5", market: "Asian Handicap", status: "Lost", stake: "0.0080 BTC", odds: "2.02", payout: "—", time: "Sat 3 Oct, 18:30" },
  { id: "B-20301", kind: "Single", pick: "Barcelona to win", market: "Match Winner", status: "Won", stake: "60.00 USDT", odds: "1.44", payout: "86.40", time: "Sat 3 Oct, 16:15" },
  { id: "B-20287", kind: "Single", pick: "Atlético · Under 2.5", market: "Total Goals", status: "Won", stake: "30.00 USDT", odds: "1.68", payout: "50.40", time: "Fri 2 Oct, 22:40" },
  { id: "B-20262", kind: "Parlay ×3", pick: "Lyon · Sevilla · Porto O1.5", market: "Europa combo", status: "Lost", stake: "20.00 USDT", odds: "7.35", payout: "—", time: "Thu 1 Oct, 21:12" },
  { id: "B-20244", kind: "Single", pick: "Napoli −1 (AH)", market: "Asian Handicap", status: "Cashed out", stake: "0.0120 BTC", odds: "2.10", payout: "0.0178", time: "Wed 30 Sep, 20:05" },
  { id: "B-20219", kind: "Single", pick: "Tottenham · BTTS Yes", market: "Both Teams to Score", status: "Won", stake: "45.00 USDT", odds: "1.81", payout: "81.45", time: "Tue 29 Sep, 22:58" },
];

export const betStatuses = ["All", "Open", "Won", "Lost", "Cashed out"];

/* --------------------------------- landing --------------------------------- */

export const tickers = matches.slice(0, 6).map((m) => ({
  slug: m.slug,
  label: `${m.home} – ${m.away}`,
  league: m.league,
  odds: m.outcomes[0].odds.toFixed(2),
  live: m.status === "live",
  clock: m.clock,
}));

export const walletBrands = ["MetaMask", "WalletConnect", "Phantom", "Ledger", "Trust Wallet", "Coinbase Wallet"];
export const chains = ["Bitcoin", "Ethereum", "Solana", "Tron", "Polygon", "BNB Chain"];
