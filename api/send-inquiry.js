/**
 * POST { formType, subject, data }
 * Sends inquiry to contact@aulmtrading.com via Postmark when POSTMARK_API_TOKEN is set.
 */

const RECIPIENT = 'contact@aulmtrading.com'

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatValue(value) {
  if (value == null || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

function renderTable(obj) {
  const rows = Object.entries(obj)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #eee;font-weight:600;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px;border:1px solid #eee;white-space:pre-wrap">${escapeHtml(formatValue(v))}</td></tr>`
    )
    .join('')
  return `<table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>`
}

function parseBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

function pickReplyTo(data) {
  if (!data || typeof data !== 'object') return null
  const candidates = [
    data.Email,
    data['Contact email'],
    data.email,
    data['Compliance email'],
  ]
  const email = candidates.find((v) => typeof v === 'string' && v.includes('@'))
  return email || null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = parseBody(req)
  const { formType = 'inquiry', subject, data } = body
  if (!data || typeof data !== 'object') return res.status(400).json({ ok: false, error: 'Missing data' })

  const emailSubject = subject || `AULM ${formType}`
  const textBody = Object.entries(data)
    .map(([k, v]) => `${k}: ${formatValue(v)}`)
    .join('\n')
  const html = `<h2>AULM Web Inquiry — ${escapeHtml(formType)}</h2><p>Submitted via aulmtrading.com</p>${renderTable(data)}`

  const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@aulmtrading.com'

  if (!POSTMARK_API_TOKEN) {
    return res.status(501).json({
      ok: false,
      error: 'POSTMARK_API_TOKEN not configured',
      message: 'Set POSTMARK_API_TOKEN in Vercel project settings (Postmark Server API token).',
    })
  }

  try {
    const postmark = await import('postmark')
    const client = new postmark.ServerClient(POSTMARK_API_TOKEN)
    const replyTo = pickReplyTo(data)

    const message = {
      From: FROM_EMAIL,
      To: RECIPIENT,
      Subject: emailSubject,
      HtmlBody: html,
      TextBody: textBody,
      MessageStream: 'outbound',
    }
    if (replyTo) message.ReplyTo = replyTo

    await client.sendEmail(message)
    return res.status(200).json({ ok: true, to: RECIPIENT })
  } catch (err) {
    console.error('send-inquiry error', err)
    const msg = err.message || 'Send failed'
    const hint = msg.includes('valid Server token')
      ? 'Use a Postmark Server API token (not Account token) in Vercel → POSTMARK_API_TOKEN.'
      : msg.includes('Sender Signature')
        ? 'Verify FROM_EMAIL as a sender in Postmark.'
        : null
    return res.status(500).json({ ok: false, error: msg, hint })
  }
}
