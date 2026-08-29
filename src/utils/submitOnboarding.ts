import type { KycFormState } from '../types/kyc'
import { getSupabase, isSupabaseConfigured, tables } from '../lib/supabase'
import { saveKycApplicationId } from '../lib/kycSession'
import { serializeKycPayload, buildKycEmailDetails } from './submitKyc'
import { notifyOps } from './notifyOps'

export type OnboardingResult = { ok: true } | { ok: false; error: string }

export async function submitOnboarding(
  form: KycFormState,
  signUp: (
    email: string,
    password: string,
    meta: { fullName: string; companyName: string },
  ) => Promise<{ error?: string }>,
): Promise<OnboardingResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'Supabase is not configured.' }
  }

  const supabase = getSupabase()
  if (!supabase) {
    return { ok: false, error: 'Could not connect to Supabase.' }
  }

  const email = form.contactEmail.trim().toLowerCase()

  const authResult = await signUp(email, form.password, {
    fullName: form.contactName.trim(),
    companyName: form.companyLegalName.trim(),
  })
  if (authResult.error) {
    return { ok: false, error: authResult.error }
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (userError || !userId) {
    return { ok: false, error: 'Account created but session missing. Please log in.' }
  }

  const { data, error } = await supabase
    .from(tables.kycApplications)
    .insert({
      contact_email: email,
      company_legal_name: form.companyLegalName.trim(),
      status: 'under_review',
      user_id: userId,
      payload: serializeKycPayload(form),
    })
    .select('id')
    .single()

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Failed to save your application.' }
  }

  saveKycApplicationId(data.id)

  await supabase.from(tables.profiles).upsert({
    id: userId,
    email,
    full_name: form.contactName.trim(),
    company_name: form.companyLegalName.trim(),
    kyc_status: 'under_review',
    kyc_application_id: data.id,
  })

  const mail = await notifyOps({
    type: 'kyc_submitted',
    applicationId: data.id,
    company: form.companyLegalName.trim(),
    customerEmail: email,
    fullName: form.contactName.trim(),
    phone: form.contactPhone,
    kycDetails: buildKycEmailDetails({
      ...form,
      contactEmail: email,
    }),
  })

  if (!mail.ok) {
    return {
      ok: false,
      error: `Application saved (${data.id}) but emails could not be sent. Write to contact@aulmtrading.com with this ID. ${mail.error ?? ''}`.trim(),
    }
  }

  sessionStorage.setItem('aulm_dashboard_welcome', '1')

  return { ok: true }
}
