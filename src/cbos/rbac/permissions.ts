import type { OrgRole } from './roles'

const PERMISSIONS = {
  'wallet.read': ['owner', 'admin', 'finance_manager', 'treasury_manager', 'employee', 'viewer'],
  'wallet.transfer': ['owner', 'admin', 'finance_manager', 'treasury_manager'],
  'escrow.create': ['owner', 'admin', 'escrow_admin', 'escrow_manager'],
  'escrow.read': ['owner', 'admin', 'escrow_admin', 'escrow_manager', 'finance_manager', 'viewer'],
  'escrow.approve': ['owner', 'admin', 'escrow_admin'],
  'card.manage': ['owner', 'admin', 'finance_manager'],
  'crypto.trade': ['owner', 'admin', 'treasury_manager', 'finance_manager'],
  'team.manage': ['owner', 'admin'],
  'settings.manage': ['owner', 'admin'],
  'audit.read': ['owner', 'admin', 'finance_manager'],
} as const satisfies Record<string, OrgRole[]>

export type CbosPermission = keyof typeof PERMISSIONS

export function can(role: OrgRole, permission: CbosPermission): boolean {
  return (PERMISSIONS[permission] as readonly OrgRole[]).includes(role)
}
