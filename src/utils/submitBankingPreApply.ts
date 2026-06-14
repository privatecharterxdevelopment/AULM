import { CONTACT_EMAIL } from '../config/site'
import type { BankingPreApplyValues } from '../data/bankingPreApply'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

export async function submitBankingPreApply(
  values: BankingPreApplyValues,
): Promise<{ ok: boolean; error?: string }> {
  if (isSupabaseConfigured) {
    const supabase = getSupabase()
    if (supabase) {
      const { error } = await supabase.functions.invoke('notify-ops', {
        body: {
          type: 'banking_preapply',
          to: CONTACT_EMAIL,
          customerEmail: values.email,
          fullName: values.fullName,
          company: values.company || undefined,
          phone: values.phone || undefined,
          jurisdiction: values.jurisdiction || undefined,
          expectedVolume: values.expectedVolume || undefined,
          message: values.message || undefined,
        },
      })
      if (error) return { ok: false, error: error.message }
      return { ok: true }
    }
  }

  const subject = `[Banking pre-application] ${values.company || values.fullName}`
  const body = [
    'Banking pre-application',
    `Name: ${values.fullName}`,
    values.company ? `Company: ${values.company}` : '',
    values.phone ? `Phone: ${values.phone}` : '',
    `Email: ${values.email}`,
    values.jurisdiction ? `Jurisdiction: ${values.jurisdiction}` : '',
    values.expectedVolume ? `Expected volume: ${values.expectedVolume}` : '',
    '',
    values.message || '(No additional notes)',
  ]
    .filter(Boolean)
    .join('\n')

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { ok: true }
}
