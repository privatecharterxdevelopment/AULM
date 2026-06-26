import type { CbosApiContract } from '../api/contracts'
import type { CreateEscrowDto, CreateTransferDto } from '../api/dtos'
import { cbosTables, getCbosSupabase } from '../lib/cbosSupabase'
import { mockCbosApi } from './mockApi'
import type {
  CbosBalanceKind,
  CbosCard,
  CbosCurrency,
  CbosDashboardSummary,
  CbosEscrow,
  CbosEscrowStatus,
  CbosNotification,
  CbosTransfer,
  CbosWallet,
} from '../types'
import { cryptoProvider } from '../mocks/crypto'

function walletTotal(w: CbosWallet): number {
  return Object.values(w.balances).reduce((s, v) => s + (v ?? 0), 0)
}

function buildSummary(wallets: CbosWallet[]): CbosDashboardSummary {
  const cash = wallets
    .filter((w) => w.accountType !== 'escrow' && w.accountType !== 'savings')
    .reduce((s, w) => s + (w.balances.available ?? 0), 0)
  const escrow = wallets.reduce((s, w) => s + (w.balances.escrowed ?? 0), 0)
  const savings = wallets
    .filter((w) => w.accountType === 'savings')
    .reduce((s, w) => s + walletTotal(w), 0)
  const total = wallets.reduce((s, w) => s + walletTotal(w), 0) + cryptoProvider.portfolioValueUsd()
  return {
    totalBalance: total,
    cashBalance: cash,
    escrowBalance: escrow,
    cryptoBalanceUsd: cryptoProvider.portfolioValueUsd(),
    savingsBalance: savings,
    cardSpendingMtd: 0,
    evaultBalance: 0,
    currency: 'USD',
  }
}

async function fetchWallets(): Promise<CbosWallet[] | null> {
  const sb = getCbosSupabase()
  if (!sb) return null

  const { data: wallets, error } = await sb.from(cbosTables.wallets).select('id, label, currency, account_type, iban, is_frozen')
  if (error || !wallets?.length) return null

  const ids = wallets.map((w) => w.id)
  const { data: balances } = await sb
    .from(cbosTables.balances)
    .select('wallet_id, kind, amount')
    .in('wallet_id', ids)

  const balanceMap = new Map<string, Partial<Record<CbosBalanceKind, number>>>()
  for (const b of balances ?? []) {
    const row = balanceMap.get(b.wallet_id) ?? {}
    row[b.kind as CbosBalanceKind] = Number(b.amount)
    balanceMap.set(b.wallet_id, row)
  }

  return wallets.map((w) => ({
    id: w.id,
    label: w.label,
    currency: w.currency as CbosCurrency,
    accountType: w.account_type,
    iban: w.iban ?? undefined,
    isFrozen: w.is_frozen,
    balances: balanceMap.get(w.id) ?? {},
  }))
}

async function fetchEscrows(): Promise<CbosEscrow[] | null> {
  const sb = getCbosSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from(cbosTables.escrows)
    .select('id, reference, title, status, currency, transaction_value, funded_amount, commodity_code, commodity_amount, commodity_unit, funds_released, updated_at')
    .order('updated_at', { ascending: false })
    .limit(50)
  if (error || !data?.length) return null
  return data.map((e) => ({
    id: e.id,
    reference: e.reference,
    title: e.title,
    status: e.status as CbosEscrowStatus,
    currency: e.currency as CbosCurrency,
    transactionValue: Number(e.transaction_value),
    fundedAmount: Number(e.funded_amount),
    commodityCode: e.commodity_code ?? undefined,
    commodityAmount: e.commodity_amount ? Number(e.commodity_amount) : undefined,
    commodityUnit: e.commodity_unit ?? undefined,
    fundsReleased: e.funds_released,
    updatedAt: e.updated_at,
  }))
}

async function fetchTransfers(): Promise<CbosTransfer[] | null> {
  const sb = getCbosSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from(cbosTables.transfers)
    .select('id, transfer_type, currency, amount, status, reference, created_at, beneficiary_id')
    .order('created_at', { ascending: false })
    .limit(30)
  if (error || !data?.length) return null
  return data.map((t) => ({
    id: t.id,
    transferType: t.transfer_type,
    currency: t.currency as CbosCurrency,
    amount: Number(t.amount),
    status: t.status,
    reference: t.reference ?? '',
    createdAt: t.created_at,
  }))
}

async function fetchCards(): Promise<CbosCard[] | null> {
  const sb = getCbosSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from(cbosTables.cards)
    .select('id, card_type, last_four, holder_name, spend_limit, is_frozen')
    .limit(10)
  if (error || !data?.length) return null
  return data.map((c) => ({
    id: c.id,
    cardType: c.card_type,
    lastFour: c.last_four,
    holderName: c.holder_name,
    spendLimit: c.spend_limit ? Number(c.spend_limit) : undefined,
    isFrozen: c.is_frozen,
    balance: 0,
    currency: 'USD',
  }))
}

async function fetchNotifications(): Promise<CbosNotification[] | null> {
  const sb = getCbosSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from(cbosTables.notifications)
    .select('id, kind, title, body, read_at, created_at')
    .order('created_at', { ascending: false })
    .limit(20)
  if (error || !data?.length) return null
  return data.map((n) => ({
    id: n.id,
    kind: n.kind,
    title: n.title,
    body: n.body ?? undefined,
    read: Boolean(n.read_at),
    createdAt: n.created_at,
  }))
}

/** Live Supabase reads with mock fallback for writes & empty tables */
export function createSupabaseCbosApi(): CbosApiContract {
  return {
    async getDashboardSummary(): Promise<CbosDashboardSummary> {
      const wallets = await fetchWallets()
      if (wallets?.length) return buildSummary(wallets)
      return mockCbosApi.getDashboardSummary()
    },

    async listWallets() {
      const items = await fetchWallets()
      if (items?.length) return { items }
      return mockCbosApi.listWallets()
    },

    async listEscrows() {
      const items = await fetchEscrows()
      if (items?.length) return { items, total: items.length }
      return mockCbosApi.listEscrows()
    },

    async createEscrow(dto: CreateEscrowDto) {
      return mockCbosApi.createEscrow(dto)
    },

    async listTransfers() {
      const items = await fetchTransfers()
      if (items?.length) return { items }
      return mockCbosApi.listTransfers()
    },

    async createTransfer(dto: CreateTransferDto) {
      return mockCbosApi.createTransfer(dto)
    },

    async listCards() {
      const items = await fetchCards()
      if (items?.length) return { items }
      return mockCbosApi.listCards()
    },

    async listNotifications() {
      const items = await fetchNotifications()
      if (items?.length) return { items }
      return mockCbosApi.listNotifications()
    },

    async markNotificationRead(id: string) {
      const sb = getCbosSupabase()
      if (sb) {
        await sb.from(cbosTables.notifications).update({ read_at: new Date().toISOString() }).eq('id', id)
      }
      return mockCbosApi.markNotificationRead(id)
    },
  }
}
