import { CONTACT_EMAIL } from '../config/site'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

export type KycEmailUbo = {
  type?: string
  name?: string
  ownership?: string
  dob?: string
  nationality?: string
  address?: string
  occupation?: string
  employment?: string
  sourceOfWealth?: string
  identity?: string
}

export type KycEmailDetails = {
  companyLegalName?: string
  tradeName?: string
  registrationNumber?: string
  incorporationCountry?: string
  registeredAddress?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  accountUse?: string
  accountUseOther?: string
  expectedTurnover?: string
  counterpartyRole?: string
  bankAccountHolder?: string
  bankName?: string
  bankIban?: string
  bankSwift?: string
  bankCountry?: string
  aucbOpenAccount?: string
  ubos?: KycEmailUbo[]
  businessDescription?: string
  geoMarkets?: string
  companySourceOfFunds?: string
  annualRevenue?: string
  annualTaxPaid?: string
  auditorName?: string
  auditorFirm?: string
  amlProcedures?: string
  complianceOfficerName?: string
  complianceOfficerEmail?: string
  authorisedName?: string
  authorisedTitle?: string
  authorisedDate?: string
  policyAccepted?: boolean
  signatureOnFile?: boolean
  signatureFileName?: string
  policyPdfName?: string
  documents?: string[]
}

export type NotifyOpsPayload = {
  type:
    | 'kyc_submitted'
    | 'kyc_applicant_receipt'
    | 'support_message'
    | 'logistics_submitted'
    | 'kyc_status_changed'
    | 'order_submitted'
    | 'contact_inquiry'
    | 'banking_preapply'
  to?: string
  customerEmail?: string
  fullName?: string
  topic?: string
  phone?: string
  company?: string
  applicationId?: string
  message?: string
  status?: string
  notes?: string
  routeId?: string
  orderId?: string
  reference?: string
  orderType?: string
  metal?: string
  quantityOz?: number
  deliveryDate?: string
  origin?: string
  from?: string
  destination?: string
  commodity?: string
  valueUsd?: number
  jurisdiction?: string
  expectedVolume?: string
  kycDetails?: KycEmailDetails
}

export type NotifyOpsResult = { ok: boolean; error?: string }

function readFunctionError(data: unknown, fallback: string): string {
  if (data && typeof data === 'object' && 'error' in data) {
    const err = (data as { error?: unknown }).error
    if (typeof err === 'string' && err.trim()) return err
  }
  return fallback
}

export async function notifyOps(payload: NotifyOpsPayload): Promise<NotifyOpsResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'Supabase is not configured.' }
  }
  const supabase = getSupabase()
  if (!supabase) {
    return { ok: false, error: 'Could not connect to Supabase.' }
  }

  const { data, error } = await supabase.functions.invoke('notify-ops', {
    body: { ...payload, to: payload.to ?? CONTACT_EMAIL },
  })

  if (error) {
    return { ok: false, error: error.message }
  }
  if (data && typeof data === 'object' && 'ok' in data && (data as { ok?: boolean }).ok === false) {
    return { ok: false, error: readFunctionError(data, 'Could not send email.') }
  }
  return { ok: true }
}
