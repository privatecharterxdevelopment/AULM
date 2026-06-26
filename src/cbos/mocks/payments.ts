import type { CreateTransferDto } from '../api/dtos'
import type { CbosTransfer } from '../types'
import { DEMO_TRANSFERS } from './demoData'

let transfers = [...DEMO_TRANSFERS]

export const paymentsProvider = {
  listTransfers(): CbosTransfer[] {
    return transfers
  },

  createTransfer(dto: CreateTransferDto): CbosTransfer {
    const entry: CbosTransfer = {
      id: `t${Date.now()}`,
      transferType: dto.transferType,
      currency: dto.currency,
      amount: dto.amount,
      status: 'pending',
      reference: dto.reference ?? 'Transfer',
      createdAt: new Date().toISOString(),
    }
    transfers = [entry, ...transfers]
    return entry
  },
}
