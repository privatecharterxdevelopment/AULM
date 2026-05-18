/**
 * Simple serverless handler for Vercel / Node.js.
 * Expects POST { payload: { ... } }
 * If SENDGRID_API_KEY env var present, uses SendGrid to send an email to contact@aulmtrading.com.
 * Otherwise returns 501 with payload so deployer can copy/send manually.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = req.body || {}
  const payload = body.payload || {}

  const recipient = 'contact@aulmtrading.com'
  const subject = 'KYC Onboarding Submission'

  // Basic HTML body
  const html = `<pre>${JSON.stringify(payload, null, 2)}</pre>`

  // If Postmark is configured, use it.
  const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@aulmtrading.com'

  if (!POSTMARK_API_TOKEN) {
    // Not configured: return 501 with payload for manual emailing.
    return res.status(501).json({ ok: false, error: 'POSTMARK_API_TOKEN not configured', payload })
  }

  try {
    const postmark = require('postmark')
    const client = new postmark.ServerClient(POSTMARK_API_TOKEN)

    // Build an HTML table from payload
    function renderTable(obj) {
      let rows = ''
      for (const k of Object.keys(obj)) {
        const v = obj[k]
        rows += `<tr><td style="padding:6px;border:1px solid #eee;font-family:Arial">${escapeHtml(k)}</td><td style="padding:6px;border:1px solid #eee;font-family:Arial">${escapeHtml(String(v || ''))}</td></tr>`
      }
      return `<table style="border-collapse:collapse;width:100%;">${rows}</table>`
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }

    const htmlBody = `<h2>KYC Onboarding Submission</h2><p>A submission was received via the web form.</p>${renderTable(payload)}<p>Printable form: <a href="${process.env.SITE_URL || ''}/kyc-form.html">Open printable KYC Form</a></p>`

    const sendResult = await client.sendEmail({
      From: FROM_EMAIL,
      To: recipient,
      Subject: subject,
      HtmlBody: htmlBody,
      TextBody: JSON.stringify(payload, null, 2)
    })

    return res.status(200).json({ ok: true, info: sendResult })
  } catch (err) {
    console.error('send-kyc error', err)
    return res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}
