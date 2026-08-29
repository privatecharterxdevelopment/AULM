export type CrmClientKind = 'buyer' | 'supplier' | 'both' | 'partner'
export type CrmClientStatus = 'lead' | 'onboarding' | 'active' | 'inactive' | 'blocked'
export type CrmKycStatus =
  | 'not_started'
  | 'invited'
  | 'in_progress'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'expired'
export type CrmRiskRating = 'unrated' | 'low' | 'medium' | 'high' | 'prohibited'
export type CrmCommodityCode = 'XAU' | 'XAG' | 'CU' | 'NG' | 'OIL'

export type CrmContact = {
  id: string
  fullName: string
  title: string
  email: string
  phone: string
  role: string
  nationality?: string
  ownershipPercent?: number
  isPrimary?: boolean
  isAuthorisedSignatory?: boolean
}

export type CrmHolding = {
  id: string
  commodityCode: CrmCommodityCode
  commodityName: string
  quantity: number
  unit: string
  purity?: number
  positionType: 'declared' | 'verified' | 'in_transit' | 'allocated' | 'sold'
  location: string
  valuationUsd: number
  asOf: string
}

export type CrmTransaction = {
  id: string
  reference: string
  type: 'purchase' | 'sale' | 'delivery' | 'payment' | 'refund' | 'fee'
  status: 'draft' | 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
  commodityCode?: CrmCommodityCode
  quantity?: number
  unit?: string
  value: number
  currency: string
  date: string
}

export type CrmDocument = {
  id: string
  title: string
  type: string
  status: 'requested' | 'uploaded' | 'under_review' | 'approved' | 'rejected' | 'signed' | 'expired'
  version: number
  uploadedBy: string
  uploadedAt: string
  expiresAt?: string
}

export type CrmActivity = {
  id: string
  actor: string
  action: string
  timestamp: string
}

export type CrmClient = {
  id: string
  reference: string
  legalName: string
  tradingName?: string
  kind: CrmClientKind
  status: CrmClientStatus
  kycStatus: CrmKycStatus
  riskRating: CrmRiskRating
  country: string
  registrationNumber: string
  email: string
  phone: string
  assignedTo: string
  sourceOfFunds: string
  expectedAnnualVolume: number
  annualRevenue: number
  currency: string
  tags: string[]
  notes: string
  createdAt: string
  contacts: CrmContact[]
  holdings: CrmHolding[]
  transactions: CrmTransaction[]
  documents: CrmDocument[]
  activity: CrmActivity[]
}

export type CrmEscrowStatus =
  | 'draft'
  | 'funded'
  | 'in_transit'
  | 'certificate_pending'
  | 'buyer_review'
  | 'released'
  | 'disputed'

export type CrmEscrow = {
  id: string
  reference: string
  clientId: string
  clientName: string
  commodity: string
  amountUsd: number
  status: CrmEscrowStatus
  clearingAgent: string
  openedAt: string
  updatedAt: string
}

export type CrmEvaultProduct = 'flexible' | 'locked_6m' | 'locked_12m'

export type CrmEvaultPosition = {
  id: string
  clientId: string
  clientName: string
  product: CrmEvaultProduct
  principalUsd: number
  apy: number
  accruedUsd: number
  openedAt: string
  maturesAt?: string
  status: 'active' | 'maturing' | 'closed'
}

export type CrmApprovalKind =
  | 'payment'
  | 'escrow_release'
  | 'kyc'
  | 'document'
  | 'evault_withdrawal'
  | 'limit_change'

export type CrmApproval = {
  id: string
  kind: CrmApprovalKind
  title: string
  clientName: string
  amountUsd?: number
  requestedBy: string
  requestedAt: string
  priority: 'low' | 'normal' | 'high'
  status: 'pending' | 'approved' | 'rejected'
}
