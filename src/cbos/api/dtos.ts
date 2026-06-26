import type {
  CbosCard,
  CbosCurrency,
  CbosEscrow,
  CbosEscrowStatus,
  CbosTransfer,
  CbosWallet,
} from '../types'

export type CreateEscrowDto = {
  title: string
  currency: CbosCurrency
  transactionValue: number
  commodityCode?: string
  commodityAmount?: number
  commodityUnit?: string
}

export type CreateTransferDto = {
  fromWalletId: string
  beneficiaryId?: string
  transferType: CbosTransfer['transferType']
  currency: CbosCurrency
  amount: number
  reference?: string
  scheduledFor?: string
}

export type EscrowListResponse = {
  items: CbosEscrow[]
  total: number
}

export type WalletListResponse = {
  items: CbosWallet[]
}

export type TransferListResponse = {
  items: CbosTransfer[]
}

export type CardListResponse = {
  items: CbosCard[]
}

export type UpdateEscrowStatusDto = {
  status: CbosEscrowStatus
}
