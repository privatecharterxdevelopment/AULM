export const EVAULT_FLEXIBLE_APY = 3.4
export const EVAULT_LOCKED_APY = 5.5

export const EVAULT_PRODUCTS = [
  {
    id: 'flexible',
    label: 'Flexible',
    apy: EVAULT_FLEXIBLE_APY,
    lockMonths: 0,
    hint: 'Capital available anytime · interest paid monthly',
  },
  {
    id: '6m',
    label: '6 months',
    apy: EVAULT_LOCKED_APY,
    lockMonths: 6,
    hint: 'Capital blocked for 6 months · higher yield',
  },
  {
    id: '12m',
    label: '12 months',
    apy: EVAULT_LOCKED_APY,
    lockMonths: 12,
    hint: 'Capital blocked for 12 months · higher yield',
  },
] as const

export type EvaultProductId = (typeof EVAULT_PRODUCTS)[number]['id']

export function evaultProductLabel(id: EvaultProductId): string {
  return EVAULT_PRODUCTS.find((p) => p.id === id)?.label ?? id
}

export function evaultProductApy(id: EvaultProductId): number {
  return EVAULT_PRODUCTS.find((p) => p.id === id)?.apy ?? EVAULT_FLEXIBLE_APY
}
