import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getCbosSupabaseKey(): string | undefined {
  return (
    import.meta.env.VITE_CBOS_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_CBOS_SUPABASE_ANON_KEY
  )
}

export function getCbosSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_CBOS_SUPABASE_URL
  const key = getCbosSupabaseKey()
  if (!url || !key) return null
  if (!client) client = createClient(url, key)
  return client
}

export const cbosTables = {
  organizations: 'cbos_organizations',
  members: 'cbos_organization_members',
  wallets: 'cbos_wallets',
  balances: 'cbos_wallet_balances',
  escrows: 'cbos_escrows',
  transfers: 'cbos_transfers',
  cards: 'cbos_cards',
  notifications: 'cbos_notifications',
  beneficiaries: 'cbos_beneficiaries',
  savings: 'cbos_savings_vaults',
} as const
