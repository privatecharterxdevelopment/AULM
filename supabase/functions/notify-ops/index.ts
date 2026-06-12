// Deploy: supabase functions deploy notify-ops
// Secrets: RESEND_API_KEY, NOTIFY_FROM (optional)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OPS_EMAIL = 'contact@aulmtrading.com'

type Payload = {
  type: string
  to?: string
  customerEmail?: string
  company?: string
  applicationId?: string
  message?: string
  status?: string
  routeId?: string
  orderId?: string
  reference?: string
  orderType?: string
  metal?: string
  quantityOz?: number
  deliveryDate?: string
  origin?: string
  notes?: string
  from?: string
  destination?: string
  commodity?: string
  valueUsd?: number
}

async function sendEmail(to: string, subject: string, html: string) {
  const resendKey = Deno.env.get('RESEND_API_KEY')
  const from = Deno.env.get('NOTIFY_FROM') ?? 'AULM <onboarding@aulmtrading.com>'

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    })
    if (!res.ok) {
      console.error('Resend error:', await res.text())
    }
  } else {
    console.log('notify-ops (no RESEND_API_KEY):', { to, subject })
  }
}

function buildEmail(payload: Payload): { to: string; subject: string; html: string } | null {
  const opsTo = payload.to ?? OPS_EMAIL

  switch (payload.type) {
    case 'kyc_submitted':
      return {
        to: opsTo,
        subject: `New KYC/KYB application — ${payload.company ?? 'Unknown'}`,
        html: `
          <h2>New KYC/KYB submission</h2>
          <p><strong>Company:</strong> ${payload.company ?? '—'}</p>
          <p><strong>Contact:</strong> ${payload.customerEmail ?? '—'}</p>
          <p><strong>Application ID:</strong> ${payload.applicationId ?? '—'}</p>
          <p>Review in the admin panel or Supabase → aulm_modern_kyc_applications</p>
        `,
      }
    case 'support_message':
      return {
        to: opsTo,
        subject: `Support message — ${payload.customerEmail ?? 'customer'}`,
        html: `
          <h2>New support message</h2>
          <p><strong>From:</strong> ${payload.customerEmail ?? '—'} (${payload.company ?? '—'})</p>
          <p>${payload.message ?? ''}</p>
          <p>Reply in the admin panel → Support.</p>
        `,
      }
    case 'logistics_submitted':
      return {
        to: opsTo,
        subject: `Logistics mandate — ${payload.from ?? '?'} → ${payload.destination ?? '?'}`,
        html: `
          <h2>New logistics route mandate</h2>
          <p><strong>Customer:</strong> ${payload.customerEmail ?? '—'} (${payload.company ?? '—'})</p>
          <p><strong>Route:</strong> ${payload.from ?? '—'} → ${payload.destination ?? '—'}</p>
          <p><strong>Commodity:</strong> ${payload.commodity ?? '—'}</p>
          <p><strong>Value:</strong> $${payload.valueUsd?.toLocaleString() ?? '—'} USD</p>
          <p><strong>Request ID:</strong> ${payload.routeId ?? '—'}</p>
        `,
      }
    case 'order_submitted': {
      const typeLabel =
        payload.orderType === 'buy'
          ? 'Buy'
          : payload.orderType === 'sell'
            ? 'Sell'
            : 'Planned delivery'
      return {
        to: opsTo,
        subject: `${typeLabel} order — ${payload.reference ?? payload.metal ?? 'metal'}`,
        html: `
          <h2>New institutional order</h2>
          <p><strong>Reference:</strong> ${payload.reference ?? '—'}</p>
          <p><strong>Customer:</strong> ${payload.customerEmail ?? '—'} (${payload.company ?? '—'})</p>
          <p><strong>Type:</strong> ${typeLabel}</p>
          <p><strong>Metal:</strong> ${payload.metal ?? '—'}</p>
          ${payload.quantityOz ? `<p><strong>Quantity:</strong> ${payload.quantityOz} oz</p>` : ''}
          ${payload.valueUsd ? `<p><strong>Value:</strong> $${payload.valueUsd.toLocaleString()} USD</p>` : ''}
          ${payload.deliveryDate ? `<p><strong>Expected delivery:</strong> ${payload.deliveryDate}</p>` : ''}
          ${payload.origin ? `<p><strong>Origin:</strong> ${payload.origin}</p>` : ''}
          ${payload.notes ? `<p><strong>Notes:</strong> ${payload.notes}</p>` : ''}
          <p>Review in admin panel → Orders.</p>
        `,
      }
    }
    case 'kyc_status_changed':
      if (!payload.customerEmail) return null
      return {
        to: payload.customerEmail,
        subject: `AULM account — KYC ${payload.status ?? 'updated'}`,
        html: `
          <h2>Application update</h2>
          <p>Your KYC/KYB application for <strong>${payload.company ?? 'your company'}</strong> is now: <strong>${payload.status}</strong>.</p>
          ${
            payload.status === 'approved'
              ? '<p>Log in to your dashboard — trading, vault, payments, and logistics are now available.</p>'
              : '<p>Please contact contact@aulmtrading.com if you have questions.</p>'
          }
        `,
      }
    default:
      return null
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: Payload = await req.json()
    const primary = buildEmail(payload)

    if (primary) {
      await sendEmail(primary.to, primary.subject, primary.html)
    }

    // Ops copy for status changes (customer gets primary email)
    if (payload.type === 'kyc_status_changed') {
      const opsCopy = {
        to: OPS_EMAIL,
        subject: `KYC ${payload.status} — ${payload.company ?? payload.customerEmail}`,
        html: `<p>Application <strong>${payload.applicationId}</strong> for ${payload.company} (${payload.customerEmail}) marked <strong>${payload.status}</strong>.</p>`,
      }
      await sendEmail(opsCopy.to, opsCopy.subject, opsCopy.html)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
