export type MetalId = 'gold' | 'silver' | 'copper'

export type MetalDeskStep = {
  n: string
  title: string
  body: string
}

export type MetalData = {
  id: MetalId
  name: string
  pageTitle: string
  price: number
  unit: string
  change: number
  image: string
  description: string
  accent: MetalId
  tags?: string[]
  desk: {
    photo: string
    photoAlt: string
    lead: string
    copy: string[]
    forms: string[]
    who: string
    minima: string
    steps: MetalDeskStep[]
  }
}

export const METALS: Record<MetalId, MetalData> = {
  gold: {
    id: 'gold',
    name: 'Gold',
    pageTitle: 'Trade Gold today',
    price: 2340.8,
    unit: 'USD/oz',
    change: 0.42,
    image: '/metals/gold.png',
    tags: ['Doré', 'Bullion', 'Nuggets', 'Dust'],
    description:
      'Institutional gold desk for doré bars, bullion, nuggets and dust. Live pricing with same-day settlement across European hubs, Swiss custody and full chain-of-custody from African origin.',
    accent: 'gold',
    desk: {
      photo: '/sourcing/responsible-sourcing.jpg',
      photoAlt: 'Open-pit gold operations under AULM supervision',
      lead: 'We buy doré and scrap. We sell LBMA bullion. One desk.',
      copy: [
        'Gold is the core book. Intake lots are assayed and documented before a price is firm. Onward sale is allocated bars with a named stamp — not a paper claim.',
        'Every mandate carries OECD due diligence, chain of custody and bank-to-bank settlement. No cash, no third-party payment agents, no undocumented melt.',
      ],
      forms: ['Doré', 'Bullion', 'Nuggets', 'Dust', 'Scrap'],
      who: 'Family offices, licensed traders, funds and refiners. B2B only — no retail.',
      minima: 'Minimum 500g. Maximum 2 tonnes per month per client from Q2 2026, on continuous mandates.',
      steps: [
        {
          n: '01',
          title: 'Write',
          body: 'Metal form, origin, approximate weight and current documents. The desk tells you what is missing.',
        },
        {
          n: '02',
          title: 'KYC',
          body: 'Onboarding, e-meeting and KYB before any lot moves. Procedure PDF sets the intake pack.',
        },
        {
          n: '03',
          title: 'Mandate',
          body: 'Assay, allocation, partner refining if required, then SWIFT MT103. Custody to your specification.',
        },
      ],
    },
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    pageTitle: 'Trade Silver today',
    price: 28.54,
    unit: 'USD/oz',
    change: -0.18,
    image: '/metals/silver.png',
    description:
      'Spot and physical silver for funds, refiners and industrial buyers. Transparent spreads with physical delivery or loco London, backed by audited inventory and OECD-aligned sourcing standards.',
    accent: 'silver',
    desk: {
      photo: '/nuggets/silver.png',
      photoAlt: 'Physical silver',
      lead: 'Physical silver for funds, refiners and industrial books.',
      copy: [
        'Silver sits next to gold on the same desk: documented origin, assay where the form requires it, and delivery loco London or to a named vault.',
        'Industrial offtake and investment bars are different filings. Say which book you are filling — we will not quote a Good Delivery price on an undocumented melt.',
      ],
      forms: ['Bullion', 'Grain', 'Industrial'],
      who: 'Funds, refiners, manufacturers and licensed traders. Institutional counterparties only.',
      minima: 'Structured mandates — write to the desk with volume and delivery city.',
      steps: [
        {
          n: '01',
          title: 'Specify',
          body: 'Form, quantity, stamp preference and where you want the metal to sit.',
        },
        {
          n: '02',
          title: 'KYC',
          body: 'Same onboarding as gold. No trade before identity verification and an e-meeting.',
        },
        {
          n: '03',
          title: 'Settle',
          body: 'Bank-to-bank on allocated metal. Custody via TransGuard, Brinks, Loomis or your vault.',
        },
      ],
    },
  },
  copper: {
    id: 'copper',
    name: 'Copper',
    pageTitle: 'Trade Copper today',
    price: 4.52,
    unit: 'USD/lb',
    change: 0.65,
    image: '/metals/copper.png',
    description:
      'Cathode and wire-rod copper for manufacturers and traders. Benchmark-linked pricing with flexible logistics to EU and Asia, with export documentation and port-to-plant delivery on request.',
    accent: 'copper',
    desk: {
      photo: '/metals/copper.png',
      photoAlt: 'Copper cathode',
      lead: 'Cathode and wire-rod for manufacturers and traders.',
      copy: [
        'Copper is a physical industrial book, not a retail coin. Pricing is benchmark-linked. Documentation follows the lot — origin, assay and export papers before anything is booked.',
        'Delivery is specified on the mandate: port, plant or warehouse. AULM is the desk and counterparty, not a freight forwarder you hire after the goods have left.',
      ],
      forms: ['Cathode', 'Wire rod'],
      who: 'Manufacturers, traders and industrial offtakers. B2B — qualified counterparties only.',
      minima: 'Structured lots — contact the desk with grade, volume and destination.',
      steps: [
        {
          n: '01',
          title: 'Specify',
          body: 'Grade, form, tonnage and destination. Missing papers stop the quote.',
        },
        {
          n: '02',
          title: 'KYC',
          body: 'Onboarding and KYB before a lot is accepted. Same stack as precious metals.',
        },
        {
          n: '03',
          title: 'Deliver',
          body: 'Documented movement to the named point. Settlement bank-to-bank against the accepted lot.',
        },
      ],
    },
  },
}

export const METAL_LIST: MetalData[] = [METALS.gold, METALS.silver, METALS.copper]

export const METAL_ORDER: MetalId[] = ['gold', 'silver', 'copper']

export function getAdjacentMetals(id: MetalId) {
  const i = METAL_ORDER.indexOf(id)
  const prev = METAL_ORDER[(i - 1 + METAL_ORDER.length) % METAL_ORDER.length]
  const next = METAL_ORDER[(i + 1) % METAL_ORDER.length]
  return { prev: METALS[prev], next: METALS[next] }
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value >= 100 ? 2 : 2,
    maximumFractionDigits: value >= 100 ? 2 : 2,
  }).format(value)
}

export function formatChange(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/** Grams in one troy ounce. */
export const TROY_OZ_GRAMS = 31.1034768

export function ozToGram(usdPerOz: number) {
  return usdPerOz / TROY_OZ_GRAMS
}

export function formatGoldPerGram(usdPerOz: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ozToGram(usdPerOz))
}
