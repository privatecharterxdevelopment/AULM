export type BankingWidget = {
  id: string
  title: string
  text: string
}

export const BANKING_WIDGETS: BankingWidget[] = [
  {
    id: 'multi-currency',
    title: 'Multi currency',
    text: 'USD, EUR, AED and CHF from one institutional wallet — settle across corridors without switching apps.',
  },
  {
    id: 'transfers',
    title: 'Instant transfers between companies',
    text: 'Verified counterparty rails for B2B desks — authorise and release in seconds, not days.',
  },
  {
    id: 'connect',
    title: 'Connecting sellers + buyers the right way',
    text: 'Match physical commodity flows with compliant settlement — one mandate, full chain-of-custody.',
  },
  {
    id: 'convert',
    title: 'Convert · invest · deposit · withdraw in seconds',
    text: 'Move fiat, allocate metal, or route settlements — treasury actions without leaving your desk.',
  },
]

export type BankingFeature = {
  id: string
  title: string
  text: string
}

export type BankingStep = {
  id: string
  label: string
  title: string
  body: string
}

export const BANKING_STEPS: BankingStep[] = [
  {
    id: '01',
    label: 'Account',
    title: 'Open your institutional account',
    body: 'Complete KYC/KYB and access your dashboard — trading, payments and logistics in one place.',
  },
  {
    id: '02',
    label: 'Add',
    title: 'Add funds or metal allocation',
    body: 'Wire USD, EUR or AED — or allocate metal to your treasury wallet for instant settlement.',
  },
  {
    id: '03',
    label: 'Method',
    title: 'Choose your settlement rail',
    body: 'SWIFT MT103, escrow-linked release, or card-authorised counterparty payment — per mandate.',
  },
  {
    id: '04',
    label: 'Review',
    title: 'Review and authorise',
    body: 'Dual-control approval, compliance checks and full audit trail before every outbound transfer.',
  },
  {
    id: '05',
    label: 'Done',
    title: 'Settled — reconciled in-app',
    body: 'Funds routed, confirmations logged, and positions updated on your desk without leaving AULM.',
  },
]

export const BANKING = {
  heroHeadline: ['Connecting continents,', 'creating opportunities'],
  heroSubline: 'All-in-one institutional commodity banking solution',
  unifyTitle: 'Unify your commodity treasury',
  unifyBody: 'All currencies. One app.',
  videoTagline: ['Focus on transactions', 'the most efficient way'],
  title: 'AULM Banking',
  disclaimer:
    'AULM Banking products are subject to partner bank approval, jurisdiction and completed KYC/KYB. Card and wallet features are marked coming soon until live with licensed banking partners. Nothing on this page constitutes an offer of banking services.',
  partnerLogos: [
    { name: 'Mastercard', src: '/banking/mastercard.png', className: 'banking-partner-logo--mastercard' },
    { name: 'Visa', src: '/banking/visa.svg', className: 'banking-partner-logo--visa' },
    { name: "Brink's", src: '/cargo-logos/brinks.svg', className: 'banking-partner-logo--brinks' },
    { name: 'Transguard Group', src: '/cargo-logos/transguard.png', className: 'banking-partner-logo--transguard' },
  ],
} as const

export const BANKING_BG = '#f0f0f2'
