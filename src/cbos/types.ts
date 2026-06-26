export type CbosCurrency = 'EUR' | 'USD' | 'AED' | 'CHF' | 'GBP' | 'SGD' | 'HKD'

export type CbosBalanceKind = 'available' | 'pending' | 'reserved' | 'escrowed' | 'savings'

export type CbosEscrowStatus =
  | 'draft'
  | 'awaiting_participants'
  | 'awaiting_documents'
  | 'awaiting_funding'
  | 'funded'
  | 'in_progress'
  | 'under_review'
  | 'approved'
  | 'released'
  | 'completed'
  | 'refunded'
  | 'disputed'

export type CbosEscrowParticipantRole =
  | 'buyer'
  | 'seller'
  | 'inspector'
  | 'clearing_agent'
  | 'assayer'
  | 'compliance'
  | 'admin'

export type CbosEscrowDocStatus = 'missing' | 'uploaded' | 'verified' | 'rejected'

export type CbosEscrowDocPhase =
  | 'seller_pre_ship'
  | 'clearing_certificate'
  | 'buyer_arrival'
  | 'release'

export type CbosEscrowParticipant = {
  id: string
  name: string
  email: string
  role: CbosEscrowParticipantRole
  termsAccepted: boolean
  termsAcceptedAt?: string
}

export type CbosEscrowDocument = {
  id: string
  label: string
  phase: CbosEscrowDocPhase
  status: CbosEscrowDocStatus
  fileName?: string
  uploadedAt?: string
  uploadedBy?: string
  visibleTo?: 'buyer' | 'seller' | 'all'
}

export type CbosTransferStatus = 'pending' | 'processing' | 'completed' | 'failed'

export type CbosCardType = 'virtual' | 'single_use' | 'corporate' | 'employee'

export type CryptoAsset = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'SOL'

export type CbosWallet = {
  id: string
  label: string
  currency: CbosCurrency
  accountType: 'personal' | 'business' | 'savings' | 'escrow' | 'treasury' | 'reserve'
  iban?: string
  isFrozen: boolean
  balances: Partial<Record<CbosBalanceKind, number>>
}

export type CbosEscrow = {
  id: string
  reference: string
  title: string
  status: CbosEscrowStatus
  currency: CbosCurrency
  transactionValue: number
  fundedAmount: number
  commodityCode?: string
  commodityAmount?: number
  commodityUnit?: string
  fundsReleased: boolean
  updatedAt: string
  deliveryDate?: string
  incoterm?: string
  origin?: string
  destination?: string
  adminTerms?: string
  participants?: CbosEscrowParticipant[]
  documents?: CbosEscrowDocument[]
  clearingAgent?: string
}

export type CbosTransferCategory = 'payroll' | 'employee' | 'vendor' | 'internal' | 'escrow' | 'treasury'

export type CbosTransfer = {
  id: string
  transferType: 'internal' | 'international' | 'scheduled' | 'bulk'
  category?: CbosTransferCategory
  currency: CbosCurrency
  amount: number
  status: CbosTransferStatus
  reference: string
  beneficiaryName?: string
  personRole?: string
  avatarInitials?: string
  createdAt: string
}

export type CbosCard = {
  id: string
  cardType: CbosCardType
  lastFour: string
  holderName: string
  spendLimit?: number
  isFrozen: boolean
  balance: number
  currency: CbosCurrency
}

export type CbosCryptoWallet = {
  id: string
  asset: CryptoAsset
  available: number
  pending: number
  reserved: number
  address?: string
}

export type CbosEvaultTerm = 'flexible' | '6m' | '12m'

export type CbosEvaultPosition = {
  id: string
  reference: string
  term: CbosEvaultTerm
  apy: number
  principal: number
  accruedInterest: number
  currency: CbosCurrency
  openedAt: string
  unlockAt?: string
  status: 'active' | 'matured' | 'withdrawing'
}

export type CbosSavingsGoal = {
  id: string
  name: string
  goalType: string
  targetAmount?: number
  balance: number
  currency: CbosCurrency
}

export type CbosNotification = {
  id: string
  kind: string
  title: string
  body?: string
  read: boolean
  createdAt: string
}

export type CbosApprovalTask = {
  id: string
  escrowRef: string
  title: string
  step: string
  status: 'pending' | 'approved' | 'rejected'
  dueAt?: string
}

export type CbosDashboardSummary = {
  totalBalance: number
  cashBalance: number
  escrowBalance: number
  cryptoBalanceUsd: number
  savingsBalance: number
  evaultBalance: number
  cardSpendingMtd: number
  currency: CbosCurrency
}

export type CbosSpendingCategory = {
  label: string
  amount: number
  pct: number
}

export type CbosMonthlySpend = {
  month: string
  amount: number
}

export type CbosContactKind = 'employee' | 'payroll' | 'vendor' | 'team'

export type CbosContact = {
  id: string
  name: string
  initials: string
  role?: string
  kind: CbosContactKind
  accent?: string
  /** Portrait for quick-send avatar stack */
  photoUrl?: string
}
