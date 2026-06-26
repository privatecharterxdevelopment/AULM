import type {
  CbosApprovalTask,
  CbosCard,
  CbosCryptoWallet,
  CbosDashboardSummary,
  CbosEscrow,
  CbosEvaultPosition,
  CbosNotification,
  CbosSavingsGoal,
  CbosTransfer,
  CbosWallet,
} from '../types'
import { DEFAULT_ADMIN_TERMS } from '../escrowDefaults'

export const DEMO_ORG = {
  name: 'AULM Precious Metals',
  legalName: 'AULM Precious Metal Trader LLC',
  slug: 'aulm-demo',
  bankLicenseRef: 'IFZA-85927',
  orgRole: 'owner' as const,
}

export const DEMO_SUMMARY: CbosDashboardSummary = {
  totalBalance: 4_287_450.32,
  cashBalance: 2_145_800.0,
  escrowBalance: 1_850_000.0,
  cryptoBalanceUsd: 186_420.18,
  savingsBalance: 105_230.14,
  evaultBalance: 1_847_500,
  cardSpendingMtd: 84_320.5,
  currency: 'USD',
}

export const DEMO_MONTHLY_SPEND = [
  { month: 'Jan', amount: 62_400 },
  { month: 'Feb', amount: 71_200 },
  { month: 'Mar', amount: 58_900 },
  { month: 'Apr', amount: 84_320 },
  { month: 'May', amount: 76_100 },
  { month: 'Jun', amount: 48_200 },
  { month: 'Jul', amount: 39_800 },
]

export const DEMO_SPENDING_CATEGORIES = [
  { label: 'Payroll', amount: 38_400, pct: 46 },
  { label: 'Logistics', amount: 22_100, pct: 26 },
  { label: 'Refinery', amount: 14_800, pct: 18 },
  { label: 'Other', amount: 8_020, pct: 10 },
]

export const DEMO_CARD_USAGE_DAYS = [42, 68, 55, 84, 61, 72, 48]

export const DEMO_WALLETS: CbosWallet[] = [
  {
    id: 'w1',
    label: 'Operating USD',
    currency: 'USD',
    accountType: 'business',
    iban: 'AE07 0331 2345 6789 0123 456',
    isFrozen: false,
    balances: { available: 1_245_800, pending: 12_400, reserved: 887_600 },
  },
  {
    id: 'w2',
    label: 'EUR Settlement',
    currency: 'EUR',
    accountType: 'business',
    iban: 'AE07 0331 2345 6789 0123 789',
    isFrozen: false,
    balances: { available: 412_500, escrowed: 650_000 },
  },
  {
    id: 'w3',
    label: 'Escrow Reserve',
    currency: 'USD',
    accountType: 'escrow',
    isFrozen: false,
    balances: { escrowed: 1_850_000, reserved: 1_850_000 },
  },
  {
    id: 'w4',
    label: 'Treasury AED',
    currency: 'AED',
    accountType: 'treasury',
    iban: 'AE07 0331 2345 6789 0999 001',
    isFrozen: false,
    balances: { available: 2_890_000 },
  },
]

export const DEMO_ESCROWS: CbosEscrow[] = [
  {
    id: 'e1',
    reference: 'ESC-2026-0042',
    title: 'Gold bullion — Dubai to Zurich',
    status: 'in_progress',
    currency: 'USD',
    transactionValue: 1_850_000,
    fundedAmount: 1_850_000,
    commodityCode: 'XAU',
    commodityAmount: 520,
    commodityUnit: 'kg',
    fundsReleased: false,
    updatedAt: '2026-06-08T14:22:00Z',
    deliveryDate: '2026-06-18',
    incoterm: 'CIF',
    origin: 'Peru',
    destination: 'Zurich',
    adminTerms: DEFAULT_ADMIN_TERMS,
    clearingAgent: 'Brinks',
    participants: [
      {
        id: 'p1',
        name: 'Zurich Bullion GmbH',
        email: 'desk@zurichbullion.ch',
        role: 'buyer',
        termsAccepted: true,
        termsAcceptedAt: '2026-06-06T10:00:00Z',
      },
      {
        id: 'p2',
        name: 'Lima Metals SA',
        email: 'ops@limametals.pe',
        role: 'seller',
        termsAccepted: true,
        termsAcceptedAt: '2026-06-06T11:30:00Z',
      },
      {
        id: 'p3',
        name: 'DMCC Certified Lab',
        email: 'assay@dmcc-lab.ae',
        role: 'assayer',
        termsAccepted: true,
        termsAcceptedAt: '2026-06-07T08:00:00Z',
      },
      {
        id: 'p4',
        name: 'Brinks UAE',
        email: 'clearing@brinks.ae',
        role: 'clearing_agent',
        termsAccepted: false,
      },
    ],
    documents: [
      {
        id: 'd1',
        label: 'Export licence',
        phase: 'seller_pre_ship',
        status: 'verified',
        fileName: 'export-licence-lima-2026.pdf',
        uploadedAt: '2026-06-08T09:00:00Z',
        uploadedBy: 'Lima Metals SA',
      },
      {
        id: 'd2',
        label: 'Pre-assay report',
        phase: 'seller_pre_ship',
        status: 'verified',
        fileName: 'pre-assay-lot-442.pdf',
        uploadedAt: '2026-06-08T09:15:00Z',
        uploadedBy: 'Lima Metals SA',
      },
      {
        id: 'd3',
        label: 'Certificate of origin',
        phase: 'seller_pre_ship',
        status: 'uploaded',
        fileName: 'coo-peru-xau.pdf',
        uploadedAt: '2026-06-09T07:40:00Z',
        uploadedBy: 'Lima Metals SA',
      },
      {
        id: 'd4',
        label: 'Commercial invoice',
        phase: 'seller_pre_ship',
        status: 'missing',
      },
      {
        id: 'd5',
        label: 'Packing list',
        phase: 'seller_pre_ship',
        status: 'missing',
      },
      {
        id: 'd6',
        label: 'Insurance certificate',
        phase: 'seller_pre_ship',
        status: 'missing',
      },
      {
        id: 'd7',
        label: 'Clearing & arrival certificate (agent → buyer)',
        phase: 'clearing_certificate',
        status: 'verified',
        fileName: 'brinks-arrival-cert-442.pdf',
        uploadedAt: '2026-06-10T11:00:00Z',
        uploadedBy: 'Brinks UAE',
        visibleTo: 'buyer',
      },
      {
        id: 'd9',
        label: 'Arrival certificate (buyer upload for seller)',
        phase: 'buyer_arrival',
        status: 'missing',
        visibleTo: 'seller',
      },
      {
        id: 'd8',
        label: 'Final assay report (agreed refinery)',
        phase: 'release',
        status: 'missing',
      },
      {
        id: 'd10',
        label: 'Import / customs declaration',
        phase: 'release',
        status: 'missing',
      },
    ],
  },
  {
    id: 'e2',
    reference: 'ESC-2026-0038',
    title: 'Silver concentrate — Peru inbound',
    status: 'under_review',
    currency: 'USD',
    transactionValue: 420_000,
    fundedAmount: 420_000,
    commodityCode: 'XAG',
    commodityAmount: 12_000,
    commodityUnit: 'kg',
    fundsReleased: false,
    updatedAt: '2026-06-07T09:10:00Z',
    deliveryDate: '2026-06-14',
    incoterm: 'FOB',
    origin: 'Peru',
    destination: 'Dubai IFZA',
    adminTerms: DEFAULT_ADMIN_TERMS,
    participants: [
      {
        id: 'p5',
        name: 'AULM Dubai Desk',
        email: 'desk@aulm.com',
        role: 'buyer',
        termsAccepted: true,
        termsAcceptedAt: '2026-06-05T14:00:00Z',
      },
      {
        id: 'p6',
        name: 'Andes Silver Corp',
        email: 'trade@andessilver.pe',
        role: 'seller',
        termsAccepted: true,
        termsAcceptedAt: '2026-06-05T16:00:00Z',
      },
    ],
    documents: [
      { id: 'd9', label: 'Export licence', phase: 'seller_pre_ship', status: 'verified', fileName: 'export-andes.pdf', uploadedBy: 'Andes Silver Corp' },
      { id: 'd10', label: 'Pre-assay report', phase: 'seller_pre_ship', status: 'uploaded', fileName: 'assay-batch-12.pdf', uploadedBy: 'Andes Silver Corp' },
    ],
  },
  {
    id: 'e3',
    reference: 'ESC-2026-0051',
    title: 'Platinum sponge — refinery lot',
    status: 'awaiting_funding',
    currency: 'EUR',
    transactionValue: 280_000,
    fundedAmount: 0,
    commodityCode: 'XPT',
    commodityAmount: 85,
    commodityUnit: 'kg',
    fundsReleased: false,
    updatedAt: '2026-06-09T11:00:00Z',
    deliveryDate: '2026-06-22',
    incoterm: 'DAP',
    origin: 'South Africa',
    destination: 'Geneva',
    adminTerms: DEFAULT_ADMIN_TERMS,
    participants: [
      {
        id: 'p7',
        name: 'Geneva Refinery SA',
        email: 'ops@genevarefinery.ch',
        role: 'buyer',
        termsAccepted: true,
        termsAcceptedAt: '2026-06-09T09:00:00Z',
      },
      {
        id: 'p8',
        name: 'Platinum Source Ltd',
        email: 'sales@platinumsource.co.za',
        role: 'seller',
        termsAccepted: false,
      },
    ],
    documents: [],
  },
]

export const DEMO_TRANSFERS: CbosTransfer[] = [
  {
    id: 't1',
    transferType: 'international',
    category: 'vendor',
    currency: 'USD',
    amount: 125_000,
    status: 'completed',
    reference: 'INV-8842',
    beneficiaryName: 'Swiss Refinery AG',
    avatarInitials: 'SR',
    personRole: 'Refinery · Settlement',
    createdAt: '2026-06-08T10:30:00Z',
  },
  {
    id: 't2',
    transferType: 'bulk',
    category: 'payroll',
    currency: 'USD',
    amount: 48_600,
    status: 'completed',
    reference: 'PAY-JUN-2026',
    beneficiaryName: 'Dubai Ops Team',
    avatarInitials: 'DO',
    personRole: 'Payroll · 12 employees',
    createdAt: '2026-06-07T09:00:00Z',
  },
  {
    id: 't3',
    transferType: 'international',
    category: 'employee',
    currency: 'CHF',
    amount: 8_400,
    status: 'completed',
    reference: 'SAL-4821',
    beneficiaryName: 'Sarah Müller',
    avatarInitials: 'SM',
    personRole: 'Treasury Analyst',
    createdAt: '2026-06-06T14:00:00Z',
  },
  {
    id: 't4',
    transferType: 'international',
    category: 'employee',
    currency: 'USD',
    amount: 4_200,
    status: 'processing',
    reference: 'CTR-9034',
    beneficiaryName: 'James Chen',
    avatarInitials: 'JC',
    personRole: 'Contractor · Logistics',
    createdAt: '2026-06-09T08:15:00Z',
  },
  {
    id: 't5',
    transferType: 'internal',
    category: 'treasury',
    currency: 'USD',
    amount: 50_000,
    status: 'processing',
    reference: 'Treasury sweep',
    beneficiaryName: 'Operating USD',
    avatarInitials: 'OP',
    personRole: 'Internal transfer',
    createdAt: '2026-06-09T08:15:00Z',
  },
  {
    id: 't6',
    transferType: 'international',
    category: 'employee',
    currency: 'EUR',
    amount: 6_800,
    status: 'pending',
    reference: 'BON-2210',
    beneficiaryName: 'Elena Kowalski',
    avatarInitials: 'EK',
    personRole: 'Compliance Officer',
    createdAt: '2026-06-09T11:30:00Z',
  },
  {
    id: 't7',
    transferType: 'international',
    category: 'vendor',
    currency: 'EUR',
    amount: 78_500,
    status: 'pending',
    reference: 'ESC-2026-0038 milestone',
    beneficiaryName: 'Lima Metals SA',
    avatarInitials: 'LM',
    personRole: 'Supplier · Milestone',
    createdAt: '2026-06-09T12:00:00Z',
  },
  {
    id: 't8',
    transferType: 'bulk',
    category: 'payroll',
    currency: 'AED',
    amount: 124_000,
    status: 'processing',
    reference: 'PAY-W2-IFZA',
    beneficiaryName: 'IFZA Desk Staff',
    avatarInitials: 'IF',
    personRole: 'Payroll · 8 employees',
    createdAt: '2026-06-10T07:00:00Z',
  },
  {
    id: 't9',
    transferType: 'international',
    category: 'employee',
    currency: 'USD',
    amount: 3_150,
    status: 'completed',
    reference: 'EXP-7712',
    beneficiaryName: 'Marco Rossi',
    avatarInitials: 'MR',
    personRole: 'Field Inspector',
    createdAt: '2026-06-05T16:45:00Z',
  },
]

export const DEMO_CARDS: CbosCard[] = [
  {
    id: 'c1',
    cardType: 'corporate',
    lastFour: '4821',
    holderName: 'AULM Treasury',
    spendLimit: 250_000,
    isFrozen: false,
    balance: 48_200,
    currency: 'USD',
  },
  {
    id: 'c2',
    cardType: 'virtual',
    lastFour: '9034',
    holderName: 'Logistics Desk',
    spendLimit: 25_000,
    isFrozen: false,
    balance: 3_420,
    currency: 'USD',
  },
]

export const DEMO_CRYPTO: CbosCryptoWallet[] = [
  { id: 'cr1', asset: 'BTC', available: 1.24, pending: 0.05, reserved: 0.1, address: 'bc1qaulm…8k2f' },
  { id: 'cr2', asset: 'ETH', available: 18.5, pending: 0, reserved: 2.0 },
  { id: 'cr3', asset: 'USDT', available: 95_000, pending: 5_000, reserved: 0 },
  { id: 'cr4', asset: 'USDC', available: 42_000, pending: 0, reserved: 10_000 },
]

export const DEMO_EVAULT_POSITIONS: CbosEvaultPosition[] = [
  {
    id: 'v1',
    reference: 'EV-2026-0018',
    term: 'flexible',
    apy: 3.4,
    principal: 250_000,
    accruedInterest: 2_125.4,
    currency: 'USD',
    openedAt: '2025-11-12T09:00:00Z',
    status: 'active',
  },
  {
    id: 'v2',
    reference: 'EV-2026-0031',
    term: '6m',
    apy: 5.5,
    principal: 500_000,
    accruedInterest: 8_958.33,
    currency: 'USD',
    openedAt: '2026-02-01T10:00:00Z',
    unlockAt: '2026-08-01T00:00:00Z',
    status: 'active',
  },
  {
    id: 'v3',
    reference: 'EV-2025-0094',
    term: '12m',
    apy: 5.5,
    principal: 1_097_500,
    accruedInterest: 42_180.5,
    currency: 'USD',
    openedAt: '2025-06-15T08:30:00Z',
    unlockAt: '2026-06-15T00:00:00Z',
    status: 'active',
  },
]

export const DEMO_SAVINGS: CbosSavingsGoal[] = [
  { id: 's1', name: 'Commodity Purchase', goalType: 'commodity_purchase', targetAmount: 500_000, balance: 105_230.14, currency: 'USD' },
  { id: 's2', name: 'Tax Reserve', goalType: 'taxes', targetAmount: 80_000, balance: 42_100, currency: 'USD' },
  { id: 's3', name: 'Emergency', goalType: 'emergency', targetAmount: 200_000, balance: 88_000, currency: 'USD' },
]

export const DEMO_NOTIFICATIONS: CbosNotification[] = [
  { id: 'n1', kind: 'escrow_funded', title: 'Escrow funded', body: 'ESC-2026-0042 is fully funded.', read: false, createdAt: '2026-06-08T14:22:00Z' },
  { id: 'n2', kind: 'document_approved', title: 'Assay report approved', body: 'Assayer signed off on ESC-2026-0038.', read: false, createdAt: '2026-06-07T16:00:00Z' },
  { id: 'n3', kind: 'money_received', title: 'USD received', body: '+$125,000 from Swiss Refinery AG', read: true, createdAt: '2026-06-08T10:30:00Z' },
]

export const DEMO_APPROVALS: CbosApprovalTask[] = [
  { id: 'a1', escrowRef: 'ESC-2026-0038', title: 'Weight certificate', step: 'Inspector review', status: 'pending' },
  { id: 'a2', escrowRef: 'ESC-2026-0042', title: 'Compliance clearance', step: 'Compliance officer', status: 'pending' },
  { id: 'a3', escrowRef: 'ESC-2026-0042', title: 'Manager release', step: 'CommodityBank manager', status: 'pending' },
]

export const FX_RATES = [
  { pair: 'EUR/USD', rate: 1.0842, change: +0.12 },
  { pair: 'GBP/USD', rate: 1.2718, change: -0.08 },
  { pair: 'USD/AED', rate: 3.6725, change: 0 },
  { pair: 'USD/CHF', rate: 0.8912, change: +0.05 },
]

import type { CbosContact } from '../types'

export const DEMO_CONTACTS: CbosContact[] = [
  { id: 'p1', name: 'Sarah Müller', initials: 'SM', role: 'Treasury', kind: 'employee', photoUrl: 'https://i.pravatar.cc/96?img=5' },
  { id: 'p2', name: 'James Chen', initials: 'JC', role: 'Logistics', kind: 'employee', photoUrl: 'https://i.pravatar.cc/96?img=12' },
  { id: 'p3', name: 'Elena Kowalski', initials: 'EK', role: 'Compliance', kind: 'employee', photoUrl: 'https://i.pravatar.cc/96?img=9' },
  { id: 'p4', name: 'Marco Rossi', initials: 'MR', role: 'Inspector', kind: 'employee', photoUrl: 'https://i.pravatar.cc/96?img=15' },
  { id: 'p5', name: 'Dubai Ops', initials: 'DO', role: 'Payroll · 12', kind: 'payroll', photoUrl: 'https://i.pravatar.cc/96?img=33' },
  { id: 'p6', name: 'IFZA Staff', initials: 'IF', role: 'Payroll · 8', kind: 'payroll', photoUrl: 'https://i.pravatar.cc/96?img=27' },
  { id: 'c1', name: 'Swiss Refinery', initials: 'SR', role: 'Vendor', kind: 'vendor', photoUrl: 'https://i.pravatar.cc/96?img=68' },
  { id: 'c2', name: 'Lima Metals', initials: 'LM', role: 'Supplier', kind: 'vendor', photoUrl: 'https://i.pravatar.cc/96?img=52' },
  { id: 'c3', name: 'Zurich Bullion', initials: 'ZB', role: 'Buyer', kind: 'vendor', photoUrl: 'https://i.pravatar.cc/96?img=60' },
  { id: 'c4', name: 'DMCC Lab', initials: 'DL', role: 'Assayer', kind: 'team', photoUrl: 'https://i.pravatar.cc/96?img=47' },
]

export const WITHDRAW_LIMIT = { used: 48_432, limit: 100_000, currency: 'EUR' as const }

const ACCOUNT_DOT_COLORS = ['#111', '#e85d5d', '#e8a0bf', '#c9a962', '#5b8def']

export function accountDotColor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) % ACCOUNT_DOT_COLORS.length
  return ACCOUNT_DOT_COLORS[h]!
}

export function accountTypeLabel(type: string): string {
  const map: Record<string, string> = {
    personal: 'Debit',
    business: 'Debit',
    savings: 'Savings',
    escrow: 'Escrow',
    treasury: 'Treasury',
    reserve: 'Reserve',
  }
  return map[type] ?? type
}
