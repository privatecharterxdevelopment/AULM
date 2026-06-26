import type { CbosApiContract } from '../api/contracts'
import type { CreateEscrowDto, CreateTransferDto } from '../api/dtos'
import { cardsProvider } from '../mocks/cards'
import { cryptoProvider } from '../mocks/crypto'
import {
  DEMO_APPROVALS,
  DEMO_ESCROWS,
  DEMO_NOTIFICATIONS,
  DEMO_SAVINGS,
  DEMO_SUMMARY,
  DEMO_WALLETS,
} from '../mocks/demoData'
import { paymentsProvider } from '../mocks/payments'

let escrows = [...DEMO_ESCROWS]
let notifications = [...DEMO_NOTIFICATIONS]

export const mockCbosApi: CbosApiContract = {
  async getDashboardSummary() {
    return { ...DEMO_SUMMARY, cryptoBalanceUsd: cryptoProvider.portfolioValueUsd() }
  },

  async listWallets() {
    return { items: DEMO_WALLETS }
  },

  async listEscrows() {
    return { items: escrows, total: escrows.length }
  },

  async createEscrow(dto: CreateEscrowDto) {
    const ref = `ESC-2026-${String(escrows.length + 52).padStart(4, '0')}`
    const id = `e${Date.now()}`
    escrows = [
      {
        id,
        reference: ref,
        title: dto.title,
        status: 'draft',
        currency: dto.currency,
        transactionValue: dto.transactionValue,
        fundedAmount: 0,
        commodityCode: dto.commodityCode,
        commodityAmount: dto.commodityAmount,
        commodityUnit: dto.commodityUnit,
        fundsReleased: false,
        updatedAt: new Date().toISOString(),
      },
      ...escrows,
    ]
    return { id, reference: ref }
  },

  async listTransfers() {
    return { items: paymentsProvider.listTransfers() }
  },

  async createTransfer(dto: CreateTransferDto) {
    const t = paymentsProvider.createTransfer(dto)
    return { id: t.id, status: t.status }
  },

  async listCards() {
    return { items: cardsProvider.list() }
  },

  async listNotifications() {
    return { items: notifications }
  },

  async markNotificationRead(id: string) {
    notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
  },
}

export { DEMO_APPROVALS, DEMO_SAVINGS }
