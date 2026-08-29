import { CONTACT_EMAIL } from '../config/site'
import type { ContactFormValues } from '../data/contact'
import { topicLabel } from '../data/contact'
import { notifyOps } from './notifyOps'
import { isSupabaseConfigured } from '../lib/supabase'

export async function submitContact(
  values: ContactFormValues,
): Promise<{ ok: boolean; error?: string }> {
  const topic = topicLabel(values.topic)

  if (isSupabaseConfigured) {
    const result = await notifyOps({
      type: 'contact_inquiry',
      to: CONTACT_EMAIL,
      customerEmail: values.email,
      fullName: values.fullName,
      company: values.company || undefined,
      phone: values.phone || undefined,
      topic,
      message: values.message,
    })
    if (!result.ok) return { ok: false, error: result.error ?? 'Could not send email.' }
    return { ok: true }
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
