import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

/** Isolated from legacy PCX kyc_applications — see supabase/aulm-modern-tables.sql */
export const tables = {
  kycApplications: 'aulm_modern_kyc_applications',
  profiles: 'aulm_modern_profiles',
  supportMessages: 'aulm_modern_support_messages',
  logisticsRequests: 'aulm_modern_logistics_requests',
  orders: 'aulm_modern_orders',
} as const

export type OrderType = 'buy' | 'sell' | 'delivery_inbound'

export type Order = {
  id: string
  user_id: string
  reference: string
  order_type: OrderType
  metal: 'gold' | 'silver' | 'copper'
  quantity_oz: number | null
  weight_kg: number | null
  value_usd: number | null
  delivery_date: string | null
  origin: string
  notes: string
  status: 'submitted' | 'acknowledged' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  email: string
  full_name: string | null
  company_name: string | null
  kyc_status: 'none' | 'under_review' | 'approved' | 'rejected' | 'more_docs'
  kyc_application_id: string | null
  is_admin?: boolean
}

export type SupportMessage = {
  id: string
  user_id: string
  body: string
  from_admin: boolean
  created_at: string
}

export type LogisticsRequest = {
  id: string
  user_id: string
  from_location: string
  to_location: string
  commodity: string
  value_usd: number
  weight_kg: number
  mode: 'air' | 'sea' | 'road'
  notes: string
  status: 'submitted' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export type KycApplication = {
  id: string
  created_at: string
  contact_email: string
  company_legal_name: string
  status: 'under_review' | 'approved' | 'rejected' | 'more_docs'
  user_id: string | null
  payload: Record<string, unknown>
}

let client: SupabaseClient | null = null

export function getSupabase() {
  if (!isSupabaseConfigured) return null
  if (!client) {
    client = createClient(url!, anonKey!)
  }
  return client
}
