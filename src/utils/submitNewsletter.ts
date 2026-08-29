import { CONTACT_EMAIL } from '../config/site'
import { notifyOps } from './notifyOps'
import { isSupabaseConfigured } from '../lib/supabase'

export async function submitNewsletter(email: string): Promise<{ ok: boolean; error?: string }> {
  const trimmed = email.trim()

  if (isSupabaseConfigured) {
    const result = await notifyOps({
      type: 'contact_inquiry',
      to: CONTACT_EMAIL,
      customerEmail: trimmed,
      topic: 'Newsletter',
      message: 'Newsletter signup from the News page.',
    })
    if (result.ok) return { ok: true }
  }

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent(trimmed)}`
  return { ok: true }
}
