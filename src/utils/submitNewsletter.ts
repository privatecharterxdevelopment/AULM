import { CONTACT_EMAIL } from '../config/site'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

export async function submitNewsletter(email: string): Promise<{ ok: boolean; error?: string }> {
  const trimmed = email.trim()

  if (isSupabaseConfigured) {
    const supabase = getSupabase()
    if (supabase) {
      const { error } = await supabase.functions.invoke('notify-ops', {
        body: {
          type: 'contact_inquiry',
          to: CONTACT_EMAIL,
          customerEmail: trimmed,
          topic: 'Newsletter',
          message: 'Newsletter signup from the News page.',
        },
      })
      if (!error) return { ok: true }
    }
  }

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent(trimmed)}`
  return { ok: true }
}
