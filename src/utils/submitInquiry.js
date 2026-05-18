import { CONTACT_EMAIL } from '../config/site'

export function buildMailtoUrl({ subject, bodyLines }) {
  const subjectEnc = encodeURIComponent(subject)
  const bodyEnc = encodeURIComponent(bodyLines.join('\n'))
  return `mailto:${CONTACT_EMAIL}?subject=${subjectEnc}&body=${bodyEnc}`
}

/**
 * Tries server-side email first (Postmark on Vercel).
 * Falls back to opening the user's mail client if API is not configured.
 */
export async function submitInquiry({ formType, subject, data, bodyLines }) {
  try {
    const res = await fetch('/api/send-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, subject, data }),
    })
    const json = await res.json().catch(() => ({}))

    if (res.ok && json.ok) {
      return { ok: true, delivered: 'server', to: json.to || CONTACT_EMAIL }
    }

    if (res.status === 501) {
      window.location.href = buildMailtoUrl({ subject, bodyLines })
      return { ok: true, delivered: 'mailto', to: CONTACT_EMAIL }
    }

    throw new Error(json.error || `Request failed (${res.status})`)
  } catch (err) {
    window.location.href = buildMailtoUrl({ subject, bodyLines })
    return { ok: true, delivered: 'mailto', to: CONTACT_EMAIL, warning: err.message }
  }
}
