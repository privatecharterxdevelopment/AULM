// Deploy: supabase functions deploy notify-ops --project-ref oubecmstqtzdnevyqavu --no-verify-jwt
// Secrets: AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY (SES) and/or RESEND_API_KEY
// Optional: NOTIFY_FROM  (default AULM <no-reply@aulmtrading.com>)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OPS_EMAIL = 'contact@aulmtrading.com'
const DEFAULT_FROM = 'AULM <no-reply@aulmtrading.com>'

type UboDetail = {
  type?: string
  name?: string
  ownership?: string
  dob?: string
  nationality?: string
  address?: string
  occupation?: string
  employment?: string
  sourceOfWealth?: string
  identity?: string
}

type KycDetails = {
  companyLegalName?: string
  tradeName?: string
  registrationNumber?: string
  incorporationCountry?: string
  registeredAddress?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  accountUse?: string
  accountUseOther?: string
  expectedTurnover?: string
  counterpartyRole?: string
  bankAccountHolder?: string
  bankName?: string
  bankIban?: string
  bankSwift?: string
  bankCountry?: string
  aucbOpenAccount?: string
  ubos?: UboDetail[]
  businessDescription?: string
  geoMarkets?: string
  companySourceOfFunds?: string
  annualRevenue?: string
  annualTaxPaid?: string
  auditorName?: string
  auditorFirm?: string
  amlProcedures?: string
  complianceOfficerName?: string
  complianceOfficerEmail?: string
  authorisedName?: string
  authorisedTitle?: string
  authorisedDate?: string
  policyAccepted?: boolean
  signatureOnFile?: boolean
  signatureFileName?: string
  policyPdfName?: string
  documents?: string[]
}

type Payload = {
  type: string
  to?: string
  customerEmail?: string
  fullName?: string
  topic?: string
  phone?: string
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
  jurisdiction?: string
  expectedVolume?: string
  kycDetails?: KycDetails
}

function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function dash(value: unknown): string {
  const text = String(value ?? '').trim()
  return text ? esc(text) : '—'
}

function row(label: string, value: unknown): string {
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:6px 0;color:#111;vertical-align:top">${dash(value)}</td></tr>`
}

function table(rows: string): string {
  return `<table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>`
}

function wrap(title: string, inner: string, note: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111">
  <div style="max-width:640px;margin:24px auto;padding:28px 32px;background:#fff;border:1px solid #ececee">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888">AULM Precious Metal Trader</p>
    <h1 style="margin:0 0 20px;font-size:20px;font-weight:600">${esc(title)}</h1>
    ${inner}
    <p style="margin:28px 0 0;font-size:12px;color:#888;line-height:1.5">${note}</p>
  </div>
</body>
</html>`
}

function kycHtml(details: KycDetails | undefined, extra?: { applicationId?: string }): string {
  const d = details ?? {}
  const ubos = (d.ubos ?? [])
    .map((u, i) => {
      return `<h3 style="margin:18px 0 8px;font-size:14px">UBO ${i + 1}</h3>${table(
        row('Type', u.type) +
          row('Name', u.name) +
          row('Ownership', u.ownership ? `${u.ownership}%` : '') +
          row('Date of birth', u.dob) +
          row('Nationality', u.nationality) +
          row('Address', u.address) +
          row('Occupation', u.occupation) +
          row('Employment (5y)', u.employment) +
          row('Source of wealth', u.sourceOfWealth) +
          row('Identity checks', u.identity),
      )}`
    })
    .join('')

  const docs = (d.documents ?? []).length
    ? `<ul style="margin:8px 0 0;padding-left:18px">${d.documents!.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
    : '—'

  return `
    ${extra?.applicationId ? `<p><strong>Application ID:</strong> ${esc(extra.applicationId)}</p>` : ''}
    <h2 style="margin:20px 0 8px;font-size:15px">Company</h2>
    ${table(
      row('Legal name', d.companyLegalName) +
        row('Trade name', d.tradeName) +
        row('Registration / licence', d.registrationNumber) +
        row('Country of incorporation', d.incorporationCountry) +
        row('Registered address', d.registeredAddress),
    )}
    <h2 style="margin:20px 0 8px;font-size:15px">Contact</h2>
    ${table(
      row('Representative', d.contactName) +
        row('Email', d.contactEmail) +
        row('Phone', d.contactPhone),
    )}
    <h2 style="margin:20px 0 8px;font-size:15px">Account &amp; settlement</h2>
    ${table(
      row('Account use', d.accountUse) +
        row('Other use', d.accountUseOther) +
        row('Expected turnover (USD / year)', d.expectedTurnover) +
        row('Role', d.counterpartyRole) +
        row('Account holder', d.bankAccountHolder) +
        row('Bank', d.bankName) +
        row('IBAN / account', d.bankIban) +
        row('SWIFT / BIC', d.bankSwift) +
        row('Bank country', d.bankCountry) +
        row('Open AUCB account', d.aucbOpenAccount),
    )}
    <h2 style="margin:20px 0 8px;font-size:15px">Ultimate beneficial owners</h2>
    ${ubos || '<p>—</p>'}
    <h2 style="margin:20px 0 8px;font-size:15px">Business</h2>
    ${table(
      row('Activities', d.businessDescription) +
        row('Geographic markets', d.geoMarkets) +
        row('Source of funds', d.companySourceOfFunds) +
        row('Annual revenue (USD)', d.annualRevenue) +
        row('Annual tax paid (USD)', d.annualTaxPaid) +
        row('Auditor firm', d.auditorFirm) +
        row('Lead auditor', d.auditorName),
    )}
    <h2 style="margin:20px 0 8px;font-size:15px">AML &amp; declaration</h2>
    ${table(
      row('AML/CFT procedures', d.amlProcedures) +
        row('Compliance officer', d.complianceOfficerName) +
        row('Officer email', d.complianceOfficerEmail) +
        row('Authorised signatory', d.authorisedName) +
        row('Title', d.authorisedTitle) +
        row('Date', d.authorisedDate) +
        row('Policies accepted', d.policyAccepted ? 'Yes' : 'No') +
        row('Signature on file', d.signatureOnFile ? d.signatureFileName || 'Yes' : 'No') +
        row('Signed policy PDF', d.policyPdfName),
    )}
    <h2 style="margin:20px 0 8px;font-size:15px">Uploaded files</h2>
    ${docs}
  `
}

function maybeRow(label: string, value: unknown): string {
  const text = String(value ?? '').trim()
  return text ? row(label, text) : ''
}

function contactHtml(payload: Payload): string {
  return table(
    row('Topic', payload.topic) +
      row('Name', payload.fullName) +
      row('Email', payload.customerEmail) +
      maybeRow('Company', payload.company) +
      maybeRow('Phone', payload.phone) +
      maybeRow('Jurisdiction', payload.jurisdiction) +
      maybeRow('Expected volume', payload.expectedVolume),
  ) +
    `<h2 style="margin:20px 0 8px;font-size:15px">Message</h2>
     <p style="white-space:pre-wrap;margin:0">${dash(payload.message)}</p>`
}

async function sendViaResend(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
  from: string
  apiKey: string
}): Promise<void> {
  const body: Record<string, unknown> = {
    from: opts.from,
    to: [opts.to],
    subject: opts.subject,
    html: opts.html,
  }
  if (opts.replyTo) body.reply_to = opts.replyTo

  const post = async () =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

  let res = await post()
  if (!res.ok) {
    await new Promise((r) => setTimeout(r, 400))
    res = await post()
  }
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend ${res.status}: ${text}`)
  }
}

async function sendViaSes(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
  from: string
}): Promise<void> {
  const accessKeyId = Deno.env.get('AWS_ACCESS_KEY_ID') ?? ''
  const secretAccessKey = Deno.env.get('AWS_SECRET_ACCESS_KEY') ?? ''
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('Neither RESEND_API_KEY nor AWS SES credentials are set')
  }

  const { SESv2Client, SendEmailCommand } = await import('npm:@aws-sdk/client-sesv2@3')
  const client = new SESv2Client({
    region: Deno.env.get('AWS_REGION') || 'eu-north-1',
    credentials: { accessKeyId, secretAccessKey },
  })

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: opts.from,
      Destination: { ToAddresses: [opts.to] },
      ReplyToAddresses: opts.replyTo ? [opts.replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: opts.subject, Charset: 'UTF-8' },
          Body: { Html: { Data: opts.html, Charset: 'UTF-8' } },
        },
      },
    }),
  )
}

async function sendEmail(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<void> {
  const from = Deno.env.get('NOTIFY_FROM') ?? DEFAULT_FROM
  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (resendKey) {
    await sendViaResend({ ...opts, from, apiKey: resendKey })
    return
  }
  await sendViaSes({ ...opts, from })
}

function applicantCopyNote(): string {
  return `This is a copy of what you sent to AULM. This mailbox is no-reply@aulmtrading.com — to reach the desk, write to ${OPS_EMAIL} or reply to this email.`
}

function opsNote(): string {
  return `Automated desk notification from no-reply@aulmtrading.com. Reply goes to the counterparty where a Reply-To is set.`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: Payload = await req.json()
    const opsTo = OPS_EMAIL
    const jobs: Promise<void>[] = []

    if (payload.type === 'contact_inquiry' || payload.type === 'banking_preapply') {
      jobs.push(
        sendEmail({
          to: opsTo,
          replyTo: payload.customerEmail || OPS_EMAIL,
          subject: `Contact — ${payload.topic ?? 'General'} — ${payload.fullName ?? payload.customerEmail ?? 'inquiry'}`,
          html: wrap('New contact form submission', contactHtml(payload), opsNote()),
        }),
      )
      if (payload.customerEmail && payload.customerEmail.toLowerCase() !== opsTo.toLowerCase()) {
        jobs.push(
          sendEmail({
            to: payload.customerEmail,
            replyTo: OPS_EMAIL,
            subject: `Copy of your inquiry to AULM — ${payload.topic ?? 'General'}`,
            html: wrap(
              'We received your inquiry',
              `<p>The desk has your message. A copy of what you submitted is below. We reply within one business day.</p>${contactHtml(payload)}`,
              applicantCopyNote(),
            ),
          }),
        )
      }
    } else if (payload.type === 'kyc_submitted' || payload.type === 'kyc_applicant_receipt') {
      const detailsHtml = kycHtml(payload.kycDetails, { applicationId: payload.applicationId })
      jobs.push(
        sendEmail({
          to: opsTo,
          replyTo: payload.customerEmail || OPS_EMAIL,
          subject: `KYC/KYB — ${payload.company ?? payload.kycDetails?.companyLegalName ?? 'application'} — ${payload.applicationId ?? ''}`.trim(),
          html: wrap(
            'New KYC/KYB application',
            `<p>Full submission below. Applicant copy sent to ${dash(payload.customerEmail)}.</p>${detailsHtml}`,
            opsNote(),
          ),
        }),
      )
      if (payload.customerEmail) {
        jobs.push(
          sendEmail({
            to: payload.customerEmail,
            replyTo: OPS_EMAIL,
            subject: `Copy of your KYC/KYB application to AULM — ${payload.company ?? 'application'}`,
            html: wrap(
              'We received your KYC/KYB file',
              `<p>Compliance has your application. A copy of the details you submitted is below. If we need more documents we will write to this address.</p>${detailsHtml}`,
              applicantCopyNote(),
            ),
          }),
        )
      }
    } else if (payload.type === 'support_message') {
      jobs.push(
        sendEmail({
          to: opsTo,
          replyTo: payload.customerEmail || OPS_EMAIL,
          subject: `Support message — ${payload.customerEmail ?? 'customer'}`,
          html: wrap(
            'New support message',
            table(row('From', payload.customerEmail) + row('Company', payload.company)) +
              `<p style="white-space:pre-wrap">${dash(payload.message)}</p>`,
            opsNote(),
          ),
        }),
      )
    } else if (payload.type === 'logistics_submitted') {
      jobs.push(
        sendEmail({
          to: opsTo,
          replyTo: payload.customerEmail || OPS_EMAIL,
          subject: `Logistics mandate — ${payload.from ?? '?'} → ${payload.destination ?? '?'}`,
          html: wrap(
            'New logistics route mandate',
            table(
              row('Customer', payload.customerEmail) +
                row('Company', payload.company) +
                row('Route', `${payload.from ?? '—'} → ${payload.destination ?? '—'}`) +
                row('Commodity', payload.commodity) +
                row('Value', payload.valueUsd != null ? `$${payload.valueUsd.toLocaleString()} USD` : '') +
                row('Request ID', payload.routeId),
            ),
            opsNote(),
          ),
        }),
      )
    } else if (payload.type === 'order_submitted') {
      const typeLabel =
        payload.orderType === 'buy' ? 'Buy' : payload.orderType === 'sell' ? 'Sell' : 'Planned delivery'
      jobs.push(
        sendEmail({
          to: opsTo,
          replyTo: payload.customerEmail || OPS_EMAIL,
          subject: `${typeLabel} order — ${payload.reference ?? payload.metal ?? 'metal'}`,
          html: wrap(
            'New institutional order',
            table(
              row('Reference', payload.reference) +
                row('Customer', payload.customerEmail) +
                row('Company', payload.company) +
                row('Type', typeLabel) +
                row('Metal', payload.metal) +
                row('Quantity', payload.quantityOz ? `${payload.quantityOz} oz` : '') +
                row('Value', payload.valueUsd != null ? `$${payload.valueUsd.toLocaleString()} USD` : '') +
                row('Expected delivery', payload.deliveryDate) +
                row('Origin', payload.origin) +
                row('Notes', payload.notes),
            ),
            opsNote(),
          ),
        }),
      )
    } else if (payload.type === 'kyc_status_changed') {
      if (payload.customerEmail) {
        jobs.push(
          sendEmail({
            to: payload.customerEmail,
            replyTo: OPS_EMAIL,
            subject: `AULM account — KYC ${payload.status ?? 'updated'}`,
            html: wrap(
              'Application update',
              `<p>Your KYC/KYB application for <strong>${dash(payload.company)}</strong> is now: <strong>${dash(payload.status)}</strong>.</p>
              ${
                payload.status === 'approved'
                  ? '<p>You may now sell gold to AULM. Our desk will contact you — there is no public login.</p>'
                  : payload.status === 'more_docs'
                    ? `<p>Please send the additional documents requested:</p><p>${dash(payload.notes)}</p>`
                    : `<p>Please write to ${OPS_EMAIL} if you have questions.</p>`
              }`,
              applicantCopyNote(),
            ),
          }),
        )
      }
      jobs.push(
        sendEmail({
          to: OPS_EMAIL,
          subject: `KYC ${payload.status} — ${payload.company ?? payload.customerEmail}`,
          html: wrap(
            'KYC status changed',
            table(
              row('Application ID', payload.applicationId) +
                row('Company', payload.company) +
                row('Email', payload.customerEmail) +
                row('Status', payload.status) +
                row('Notes', payload.notes),
            ),
            opsNote(),
          ),
        }),
      )
    } else {
      return new Response(JSON.stringify({ ok: false, error: `Unknown notify type: ${payload.type}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const results = await Promise.allSettled(jobs)
    const failed = results.filter((r) => r.status === 'rejected') as PromiseRejectedResult[]
    if (failed.length) {
      const error = failed.map((f) => String(f.reason)).join(' | ')
      console.error('notify-ops send failed:', error)
      return new Response(JSON.stringify({ ok: false, error }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, sent: jobs.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('notify-ops error:', err)
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
