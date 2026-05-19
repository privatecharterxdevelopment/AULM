import { CONTACT_EMAIL } from '../config/site'

export function buildMailtoUrl({ subject, bodyLines }) {
  const subjectEnc = encodeURIComponent(subject)
  const bodyEnc = encodeURIComponent(bodyLines.join('\n'))
  return `mailto:${CONTACT_EMAIL}?subject=${subjectEnc}&body=${bodyEnc}`
}

/**
 * Tries server-side email first (Postmark on Vercel).
 * Falls back to the user's mail client if API is not configured or Postmark fails.
 */
export async function submitInquiry({ formType, subject, data, bodyLines }) {
  const mailtoFallback = (warning) => {
    window.location.href = buildMailtoUrl({ subject, bodyLines })
    return { ok: true, delivered: 'mailto', to: CONTACT_EMAIL, warning }
  }

  try {
    const res = await fetch('/api/send-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, subject, data }),
    })

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return mailtoFallback('Email API unavailable — use your mail app to send.')
    }

    const json = await res.json().catch(() => ({}))

    if (res.ok && json.ok) {
      return { ok: true, delivered: 'server', to: json.to || CONTACT_EMAIL }
    }

    if (res.status === 501 || res.status === 500) {
      const warning = json.hint || json.error || json.message || 'Email could not be sent automatically'
      return mailtoFallback(warning)
    }

    throw new Error(json.error || `Request failed (${res.status})`)
  } catch (err) {
    return mailtoFallback(err.message || 'Network error')
  }
}
