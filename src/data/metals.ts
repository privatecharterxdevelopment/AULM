export type MetalId = 'gold' | 'silver' | 'copper'

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
      'Institutional gold desk for doré bars, bullion, nuggets and dust. Live pricing with same-day settlement across European hubs, Swiss vaulting and full chain-of-custody from African origin.',
    accent: 'gold',
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
      'Spot and physical silver for funds, refiners and industrial buyers. Transparent spreads with vault delivery or loco London, backed by audited inventory and OECD-aligned sourcing standards.',
    accent: 'silver',
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
