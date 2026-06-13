import { CONTACT_EMAIL } from '../config/site'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

export type NotifyOpsPayload = {
  type:
    | 'kyc_submitted'
    | 'support_message'
    | 'logistics_submitted'
    | 'kyc_status_changed'
    | 'order_submitted'
    | 'contact_inquiry'
  to?: string
  customerEmail?: string
  fullName?: string
  topic?: string
  phone?: string
  company?: string
  applicationId?: string
  message?: string
  status?: string
  routeId?: string
  orderId?: string
  reference?: string
  orderType?: string
  metal?: string
  quantityOz?: number
  deliveryDate?: string
  origin?: string
  notes?: string
  from?: string
  destination?: string
  commodity?: string
  valueUsd?: number
}

export function notifyOps(payload: NotifyOpsPayload) {
  if (!isSupabaseConfigured) return
  const supabase = getSupabase()
  if (!supabase) return

  void supabase.functions.invoke('notify-ops', {
    body: { ...payload, to: payload.to ?? CONTACT_EMAIL },
  })
}
