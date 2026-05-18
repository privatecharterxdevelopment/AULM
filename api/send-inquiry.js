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

function renderTable(obj) {
  const rows = Object.entries(obj)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #eee;font-weight:600">${escapeHtml(k)}</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(v)}</td></tr>`
    )
    .join('')
  return `<table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { formType = 'inquiry', subject, data } = req.body || {}
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'Missing data' })

  const emailSubject = subject || `AULM ${formType}`
  const html = `<h2>AULM Web Inquiry — ${escapeHtml(formType)}</h2><p>Submitted via aulmtrading.com</p>${renderTable(data)}`

  const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@aulmtrading.com'

  if (!POSTMARK_API_TOKEN) {
    return res.status(501).json({
      ok: false,
      error: 'POSTMARK_API_TOKEN not configured',
      message: 'Email API not configured on server. Use mailto fallback.',
    })
  }

  try {
    const postmark = await import('postmark')
    const client = new postmark.ServerClient(POSTMARK_API_TOKEN)
    await client.sendEmail({
      From: FROM_EMAIL,
      To: RECIPIENT,
      Subject: emailSubject,
      HtmlBody: html,
      MessageStream: 'outbound',
    })
    return res.status(200).json({ ok: true, to: RECIPIENT })
  } catch (err) {
    console.error('send-inquiry error', err)
    return res.status(500).json({ ok: false, error: err.message || 'Send failed' })
  }
}
