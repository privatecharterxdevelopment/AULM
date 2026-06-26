export const PLATFORM_ROLES = [
  'SuperAdmin',
  'OperationsAdmin',
  'ComplianceAdmin',
  'TreasuryAdmin',
  'RiskAdmin',
] as const

export const ORG_ROLES = [
  'owner',
  'admin',
  'finance_manager',
  'treasury_manager',
  'escrow_admin',
  'escrow_manager',
  'commodity_manager',
  'consultant',
  'employee',
  'viewer',
] as const

export const ESCROW_ROLES = [
  'escrow_creator',
  'buyer',
  'seller',
  'consultant',
  'assayer',
  'inspector',
  'escrow_agent',
  'commodity_bank_manager',
  'compliance_officer',
  'auditor',
] as const

export type PlatformRole = (typeof PLATFORM_ROLES)[number]
export type OrgRole = (typeof ORG_ROLES)[number]
export type EscrowRole = (typeof ESCROW_ROLES)[number]
