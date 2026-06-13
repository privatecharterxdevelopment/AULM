export type BankingFeature = {
  id: string
  title: string
  text: string
}

export const BANKING_CORPORATE_FEATURES: BankingFeature[] = [
  {
    id: 'all-in-one',
    title: 'All-in-one card',
    text: 'Commodities, FX and institutional settlement on one corporate card.',
  },
  {
    id: 'multi-currency',
    title: 'Multi-currency',
    text: 'USD, EUR, AED and CHF from a single wallet — coming soon.',
  },
  {
    id: 'in-app',
    title: 'In-app treasury',
    text: 'Authorise wires and reconcile flows without leaving AULM.',
  },
  {
    id: 'instant',
    title: 'Instant transfers',
    text: 'Bank-to-bank rails for verified counterparties — SWIFT MT103.',
  },
]

export const BANKING_VOLUME_FEATURES: BankingFeature[] = [
  {
    id: 'metals',
    title: 'Gold · Silver · Copper',
    text: 'Doré intake to LBMA bullion — high-volume physical flows.',
  },
  {
    id: 'energy',
    title: 'Oil & gas',
    text: 'Structured commodity payments and escrow-linked settlement.',
  },
  {
    id: 'volume',
    title: 'High-volume mandates',
    text: 'Up to 2 tonnes gold per client per month — continuous programmes.',
  },
  {
    id: 'one-app',
    title: 'One app',
    text: 'Trading, logistics, vaulting and banking on one surface.',
  },
]

export const BANKING = {
  tagline: ['Settle.', 'Route.', 'Scale.'],
  title: 'AULM Banking',
  lead: 'Institutional corporate card and banking rails for physical commodities — one app, every flow.',
  copy: [
    'AULM Banking connects your commodity desk to multi-currency wallets, in-app transaction management and high-volume settlement — designed for family offices, traders and funds moving gold, silver, copper, oil and gas.',
    'Corporate card and full banking suite: coming soon. Open your institutional account today to secure early access and KYC clearance.',
  ],
  heroVideos: ['/company/logo-video.mp4', '/refinery/refinery-hero.mp4'],
  pillars: [
    {
      title: 'Corporate card',
      text: 'Single institutional card for commodities, FX corridors and verified counterparty payments.',
    },
    {
      title: 'In-app treasury',
      text: 'Manage mandates, authorise transfers and reconcile positions without external portals.',
    },
    {
      title: 'Commodity-native',
      text: 'Built for physical flows — metals, energy and structured offtake, not generic neobank UX.',
    },
  ],
  disclaimer:
    'AULM Banking products are subject to partner bank approval, jurisdiction and completed KYC/KYB. Card and wallet features are marked coming soon until live with licensed banking partners. Nothing on this page constitutes an offer of banking services.',
} as const
