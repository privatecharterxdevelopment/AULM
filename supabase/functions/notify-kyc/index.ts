// Deploy: supabase functions deploy notify-kyc
// Secrets: RESEND_API_KEY (optional — logs to console if missing)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { applicationId, company, email, to } = await req.json()
    const resendKey = Deno.env.get('RESEND_API_KEY')
    const from = Deno.env.get('NOTIFY_FROM') ?? 'AULM <onboarding@aulmtrading.com>'

    const subject = `New KYC/KYB application — ${company}`
    const html = `
      <h2>New KYC/KYB submission</h2>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Contact:</strong> ${email}</p>
      <p><strong>Application ID:</strong> ${applicationId}</p>
      <p>Review in Supabase → kyc_applications</p>
    `

    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to: [to ?? 'contact@aulmtrading.com'], subject, html }),
      })
    } else {
      console.log('KYC notify (no RESEND_API_KEY):', { to, subject, applicationId })
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
