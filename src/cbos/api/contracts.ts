import type {
  CardListResponse,
  CreateEscrowDto,
  CreateTransferDto,
  EscrowListResponse,
  TransferListResponse,
  WalletListResponse,
} from './dtos'
import type { CbosDashboardSummary, CbosNotification } from '../types'

/** REST-style API surface for CBOS backend (Supabase Edge Functions or future API) */
export interface CbosApiContract {
  getDashboardSummary(): Promise<CbosDashboardSummary>
  listWallets(): Promise<WalletListResponse>
  listEscrows(): Promise<EscrowListResponse>
  createEscrow(dto: CreateEscrowDto): Promise<{ id: string; reference: string }>
  listTransfers(): Promise<TransferListResponse>
  createTransfer(dto: CreateTransferDto): Promise<{ id: string; status: string }>
  listCards(): Promise<CardListResponse>
  listNotifications(): Promise<{ items: CbosNotification[] }>
  markNotificationRead(id: string): Promise<void>
}
