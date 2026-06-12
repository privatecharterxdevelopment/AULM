import { CONTACT_EMAIL } from '../config/site'
import { notifyOps } from './notifyOps'
import { getSupabase, isSupabaseConfigured, tables } from '../lib/supabase'
import { getKycApplicationId, saveKycApplicationId, saveKycPrefill } from '../lib/kycSession'
import type { KycFormState } from '../types/kyc'

export type SubmitKycResult =
  | { ok: true; applicationId: string }
  | { ok: false; error: string }

export function serializeKycPayload(form: KycFormState) {
  return {
    tradeName: form.tradeName,
    registrationNumber: form.registrationNumber,
    incorporationCountry: form.incorporationCountry,
    registeredAddress: form.registeredAddress,
    contactName: form.contactName,
    contactPhone: form.contactPhone,
    accountUseCases: form.accountUseCases,
    accountUseOther: form.accountUseOther,
    expectedTurnover: form.expectedTurnover,
    counterpartyRole: form.counterpartyRole,
    bankAccountHolder: form.bankAccountHolder,
    bankName: form.bankName,
    bankIban: form.bankIban,
    bankSwift: form.bankSwift,
    bankCountry: form.bankCountry,
    aucbOpenAccount: form.aucbOpenAccount,
    ubos: form.ubos,
    businessDescription: form.businessDescription,
    geoMarkets: form.geoMarkets,
    companySourceOfFunds: form.companySourceOfFunds,
    annualRevenue: form.annualRevenue,
    annualTaxPaid: form.annualTaxPaid,
    auditorName: form.auditorName,
    auditorFirm: form.auditorFirm,
    aulmHandlesImport: form.aulmHandlesImport,
    aulmHandlesExport: form.aulmHandlesExport,
    amlProcedures: form.amlProcedures,
    complianceOfficerName: form.complianceOfficerName,
    complianceOfficerEmail: form.complianceOfficerEmail,
    authorisedName: form.authorisedName,
    authorisedTitle: form.authorisedTitle,
    authorisedDate: form.authorisedDate,
    policyAccepted: form.policyAccepted,
    signatureFileName: form.signatureFileName,
    signatureDataUrl: form.signatureDataUrl,
    policyPdfName: form.policyPdfName,
    uploadedDocuments: form.uploadedDocuments,
    notifyEmail: CONTACT_EMAIL,
  }
}

export async function submitKyc(form: KycFormState): Promise<SubmitKycResult> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      error: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    }
  }

  const supabase = getSupabase()
  if (!supabase) {
    return { ok: false, error: 'Could not connect to Supabase.' }
  }

  const { data, error } = await supabase
    .from(tables.kycApplications)
    .insert({
      contact_email: form.contactEmail.trim().toLowerCase(),
      company_legal_name: form.companyLegalName.trim(),
      status: 'under_review',
      payload: serializeKycPayload(form),
    })
    .select('id')
    .single()

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Failed to save application.' }
  }

  saveKycApplicationId(data.id)
  saveKycPrefill(form)

  notifyOps({
    type: 'kyc_submitted',
    applicationId: data.id,
    company: form.companyLegalName,
    customerEmail: form.contactEmail,
  })

  return { ok: true, applicationId: data.id }
}

export async function linkKycToUser(userId: string, email: string) {
  const supabase = getSupabase()
  if (!supabase) return

  const normalizedEmail = email.trim().toLowerCase()
  let applicationId = getKycApplicationId()

  if (applicationId) {
    await supabase
      .from(tables.kycApplications)
      .update({ user_id: userId })
      .eq('id', applicationId)
      .eq('contact_email', normalizedEmail)
  } else {
    const { data: pending } = await supabase
      .from(tables.kycApplications)
      .select('id')
      .eq('contact_email', normalizedEmail)
      .is('user_id', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (pending) {
      await supabase.from(tables.kycApplications).update({ user_id: userId }).eq('id', pending.id)
      applicationId = pending.id
      saveKycApplicationId(pending.id)
    }
  }

  if (!applicationId) {
    const { data: linked } = await supabase
      .from(tables.kycApplications)
      .select('id')
      .eq('user_id', userId)
      .eq('contact_email', normalizedEmail)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    applicationId = linked?.id ?? null
  }

  await supabase.from(tables.profiles).upsert({
    id: userId,
    email: normalizedEmail,
    kyc_status: applicationId ? 'under_review' : 'none',
    kyc_application_id: applicationId,
  })
}
