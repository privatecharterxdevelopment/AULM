import { CONTACT_EMAIL } from '../config/site'
import type { ContactFormValues } from '../data/contact'
import { topicLabel } from '../data/contact'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

export async function submitContact(
  values: ContactFormValues,
): Promise<{ ok: boolean; error?: string }> {
  const topic = topicLabel(values.topic)

  if (isSupabaseConfigured) {
    const supabase = getSupabase()
    if (supabase) {
      const { error } = await supabase.functions.invoke('notify-ops', {
        body: {
          type: 'contact_inquiry',
          to: CONTACT_EMAIL,
          customerEmail: values.email,
          fullName: values.fullName,
          company: values.company || undefined,
          phone: values.phone || undefined,
          topic,
          message: values.message,
        },
      })
      if (error) return { ok: false, error: error.message }
      return { ok: true }
    }
  }

  const subject = `[${topic}] ${values.fullName}`
  const body = [
    `Topic: ${topic}`,
    `Name: ${values.fullName}`,
    values.company ? `Company: ${values.company}` : '',
    values.phone ? `Phone: ${values.phone}` : '',
    `Email: ${values.email}`,
    '',
    values.message,
  ]
    .filter(Boolean)
    .join('\n')

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { ok: true }
}
