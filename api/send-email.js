// Simple serverless email endpoint for Vercel / Netlify function usage.
// Accepts { to, subject, html } JSON body. If SENDGRID_API_KEY env var is set,
// it will attempt to send via SendGrid. Otherwise it returns 501 with instructions.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')
  try {
    const { to, subject, html } = req.body || {}
    if (!to || !subject || !html) return res.status(400).send('Missing fields')

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
    const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@aulmtrading.com'

    if (!SENDGRID_API_KEY) {
      // Not configured: for now write the payload to logs and return guidance
      console.log('Email payload (not sent - no SENDGRID_API_KEY):', { to, subject })
      return res.status(501).json({ message: 'Email service not configured. Set SENDGRID_API_KEY and FROM_EMAIL env vars.' })
    }

    // Use SendGrid Web API
    const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: FROM_EMAIL },
        subject,
        content: [{ type: 'text/html', value: html }]
      })
    })

    if (!sgRes.ok) {
      const text = await sgRes.text()
      console.error('SendGrid error', sgRes.status, text)
      return res.status(502).send('SendGrid error: ' + text)
    }

    return res.status(200).json({ message: 'sent' })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server error')
  }
}
