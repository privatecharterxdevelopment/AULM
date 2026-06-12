export type PaymentStatus = 'completed' | 'pending' | 'processing'

export type Payment = {
  id: string
  reference: string
  counterparty: string
  amountUsd: number
  status: PaymentStatus
  date: string
  method: string
}

export type ShipmentStatus = 'booked' | 'in_transit' | 'customs' | 'delivered'

export type Shipment = {
  id: string
  trackingId: string
  commodity: string
  origin: string
  destination: string
  valueUsd: number
  weight: string
  mode: 'air' | 'sea' | 'road'
  status: ShipmentStatus
  eta: string
  updatedAt: string
}

export type TransportMode = 'air' | 'sea' | 'road'

export type LogisticsRoute = {
  id: string
  from: string
  to: string
  commodity: string
  valueUsd: number
  weightKg: number
  mode: TransportMode
  notes: string
  createdAt: string
  status: 'draft' | 'submitted' | 'active'
}

export const DEMO_DEPOSITED_USD = 2_847_500

export const DEMO_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    reference: 'MT103-88421',
    counterparty: 'Swiss Vault AG',
    amountUsd: 420_000,
    status: 'completed',
    date: '2026-06-08',
    method: 'SWIFT',
  },
  {
    id: 'pay-2',
    reference: 'MT103-88435',
    counterparty: 'Dubai IFZA Hub',
    amountUsd: 185_000,
    status: 'processing',
    date: '2026-06-09',
    method: 'SWIFT',
  },
  {
    id: 'pay-3',
    reference: 'SETTLE-1204',
    counterparty: 'AULM Trading Desk',
    amountUsd: 92_500,
    status: 'pending',
    date: '2026-06-10',
    method: 'Internal',
  },
]

export const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: 'shp-1',
    trackingId: 'AULM-AF-DXB-4821',
    commodity: 'Gold doré',
    origin: 'Accra, GH',
    destination: 'Dubai IFZA',
    valueUsd: 1_240_000,
    weight: '12.4 kg',
    mode: 'air',
    status: 'in_transit',
    eta: '2026-06-14',
    updatedAt: '2026-06-10T09:00:00Z',
  },
  {
    id: 'shp-2',
    trackingId: 'AULM-CH-GVA-1092',
    commodity: 'Silver bullion',
    origin: 'Zürich, CH',
    destination: 'Hong Kong',
    valueUsd: 380_000,
    weight: '420 kg',
    mode: 'air',
    status: 'customs',
    eta: '2026-06-12',
    updatedAt: '2026-06-09T14:30:00Z',
  },
  {
    id: 'shp-3',
    trackingId: 'AULM-CU-RTM-7730',
    commodity: 'Copper cathode',
    origin: 'Rotterdam, NL',
    destination: 'Shanghai',
    valueUsd: 290_000,
    weight: '18 t',
    mode: 'sea',
    status: 'booked',
    eta: '2026-06-28',
    updatedAt: '2026-06-08T11:00:00Z',
  },
]

export const SHIPMENT_STATUS_LABEL: Record<ShipmentStatus, string> = {
  booked: 'Booked',
  in_transit: 'In transit',
  customs: 'Customs clearance',
  delivered: 'Delivered',
}

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  completed: 'Completed',
  pending: 'Pending',
  processing: 'Processing',
}

export const TRANSPORT_MODES: { id: TransportMode; label: string; hint: string }[] = [
  { id: 'air', label: 'Air freight', hint: 'IATA-compliant, 3–7 days' },
  { id: 'sea', label: 'Sea freight', hint: 'Bulk & containers, 14–35 days' },
  { id: 'road', label: 'Road / rail', hint: 'Regional corridors, 2–10 days' },
]

const ROUTES_KEY = 'aulm_dashboard_routes'

export function loadRoutes(): LogisticsRoute[] {
  try {
    const raw = localStorage.getItem(ROUTES_KEY)
    return raw ? (JSON.parse(raw) as LogisticsRoute[]) : []
  } catch {
    return []
  }
}

export function saveRoutes(routes: LogisticsRoute[]) {
  localStorage.setItem(ROUTES_KEY, JSON.stringify(routes))
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatUsdPrecise(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
