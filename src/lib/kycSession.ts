import type { KycFormState } from '../types/kyc'

export const KYC_APPLICATION_ID_KEY = 'aulm_kyc_application_id'
export const KYC_PREFILL_KEY = 'aulm_kyc_prefill'

export function saveKycApplicationId(id: string) {
  sessionStorage.setItem(KYC_APPLICATION_ID_KEY, id)
}

export function getKycApplicationId(): string | null {
  return sessionStorage.getItem(KYC_APPLICATION_ID_KEY)
}

export function saveKycPrefill(form: KycFormState) {
  sessionStorage.setItem(
    KYC_PREFILL_KEY,
    JSON.stringify({
      email: form.contactEmail,
      fullName: form.contactName,
      companyName: form.companyLegalName,
    }),
  )
}

export function getKycPrefill(): {
  email: string
  fullName: string
  companyName: string
} | null {
  const raw = sessionStorage.getItem(KYC_PREFILL_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as { email: string; fullName: string; companyName: string }
  } catch {
    return null
  }
}

export function hasKycSubmission(): boolean {
  return Boolean(getKycApplicationId() || getKycPrefill())
}

export function clearKycSession() {
  sessionStorage.removeItem(KYC_APPLICATION_ID_KEY)
  sessionStorage.removeItem(KYC_PREFILL_KEY)
}
