import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { CONTACT_EMAIL } from '../../../config/site'
import { getSupabase, tables, type SupportMessage } from '../../../lib/supabase'
import { notifyOps } from '../../../utils/notifyOps'
import { CbosFlowPage } from '../flow/CbosFlowPage'

const SECTIONS = [
  { id: 'chat', label: 'Live chat' },
  { id: 'call', label: 'Request a call' },
  { id: 'escrow', label: 'Escrow help' },
  { id: 'payments', label: 'Payments & cards' },
  { id: 'compliance', label: 'Compliance & KYC' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

const STATUS_LABEL: Record<string, string> = {
  none: 'Not submitted',
  under_review: 'Under approval',
  approved: 'Approved',
  rejected: 'Needs attention',
}

const DESK_LINES = [
  { label: 'CommodityBank desk', value: '+971 4 123 4500', hours: 'Sun–Thu · 09:00–18:00 GST' },
  { label: 'Escrow operations', value: '+971 4 123 4501', hours: '24/7 for active mandates' },
  { label: 'Compliance', value: '+971 4 123 4502', hours: 'Sun–Thu · 10:00–17:00 GST' },
]

function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="cbos-settings-section__head">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  )
}

export function CbosSupport() {
  const { user, profile, refreshProfile } = useAuth()
  const [active, setActive] = useState<SectionId>('chat')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [sending, setSending] = useState(false)
  const [callTopic, setCallTopic] = useState('general')
  const [callPhone, setCallPhone] = useState('+971 50 123 4567')
  const [callWindow, setCallWindow] = useState('morning')
  const [callSent, setCallSent] = useState(false)

  const kycStatus = profile?.kyc_status ?? 'none'

  useEffect(() => {
    if (!user) return
    const supabase = getSupabase()
    if (!supabase) return
    void supabase
      .from(tables.supportMessages)
      .select('id, body, from_admin, created_at, user_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => setMessages(data ?? []))
  }, [user])

  const sendChat = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user) return
    const supabase = getSupabase()
    if (!supabase) return
    setSending(true)
    const body = message.trim()
    const { data, error } = await supabase
      .from(tables.supportMessages)
      .insert({ user_id: user.id, body, from_admin: false })
      .select('id, body, from_admin, created_at, user_id')
      .single()
    setSending(false)
    if (!error && data) {
      setMessages((prev) => [data as SupportMessage, ...prev])
      setMessage('')
      notifyOps({
        type: 'support_message',
        customerEmail: profile?.email ?? user.email,
        company: profile?.company_name ?? undefined,
        message: body,
      })
    }
  }

  const requestCall = (e: FormEvent) => {
    e.preventDefault()
    setCallSent(true)
    notifyOps({
      type: 'support_message',
      customerEmail: profile?.email ?? user?.email ?? CONTACT_EMAIL,
      company: profile?.company_name ?? undefined,
      message: `Callback request · ${callTopic} · ${callPhone} · ${callWindow}`,
    })
  }

  return (
    <CbosFlowPage title="Support">
      <div className="cbos-settings-flow cbos-support-flow">
        <nav className="cbos-settings-nav" aria-label="Support topics">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={active === s.id ? 'is-active' : ''}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="cbos-settings-main">
          {active === 'chat' ? (
            <section className="cbos-settings-section">
              <SectionHead
                title="Live chat"
                subtitle="Message the desk — typical reply within one business day."
              />
              <form className="cbos-support-chat" onSubmit={sendChat}>
                <textarea
                  rows={4}
                  placeholder="Describe your question…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <button type="submit" className="cbos-flow__continue" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
              {messages.length > 0 ? (
                <ul className="cbos-support-thread">
                  {[...messages]
                    .sort((a, b) => a.created_at.localeCompare(b.created_at))
                    .map((m, i) => (
                      <li
                        key={`${m.created_at}-${i}`}
                        className={`cbos-support-bubble${m.from_admin ? ' is-desk' : ' is-you'}`}
                      >
                        <p>{m.body}</p>
                        <time dateTime={m.created_at}>
                          {new Date(m.created_at).toLocaleString('en-GB')}
                          {m.from_admin ? ' · Desk' : ''}
                        </time>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="cbos-support-empty">No messages yet — start a conversation above.</p>
              )}
            </section>
          ) : null}

          {active === 'call' ? (
            <section className="cbos-settings-section">
              <SectionHead
                title="Request a call"
                subtitle="Choose a topic and window — we call you back on your nominated number."
              />
              <ul className="cbos-support-lines">
                {DESK_LINES.map((line) => (
                  <li key={line.label}>
                    <div>
                      <strong>{line.label}</strong>
                      <span>{line.hours}</span>
                    </div>
                    <a href={`tel:${line.value.replace(/\s/g, '')}`}>{line.value}</a>
                  </li>
                ))}
              </ul>
              <form className="cbos-support-call" onSubmit={requestCall}>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Topic</span>
                  <select value={callTopic} onChange={(e) => setCallTopic(e.target.value)}>
                    <option value="general">General banking</option>
                    <option value="escrow">Escrow mandate</option>
                    <option value="payments">Payments &amp; wires</option>
                    <option value="compliance">Compliance / KYC</option>
                  </select>
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Your phone</span>
                  <input type="tel" value={callPhone} onChange={(e) => setCallPhone(e.target.value)} required />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Preferred window</span>
                  <select value={callWindow} onChange={(e) => setCallWindow(e.target.value)}>
                    <option value="morning">Morning GST</option>
                    <option value="afternoon">Afternoon GST</option>
                    <option value="evening">Evening GST</option>
                  </select>
                </label>
                <button type="submit" className="cbos-flow__continue">
                  Request callback
                </button>
                {callSent ? (
                  <p className="cbos-support-sent" role="status">
                    Request received — the desk will call you within one business day.
                  </p>
                ) : null}
              </form>
            </section>
          ) : null}

          {active === 'escrow' ? (
            <section className="cbos-settings-section">
              <SectionHead
                title="Escrow help"
                subtitle="Mandates, clearing agents, certificates and release conditions."
              />
              <ul className="cbos-support-topics">
                <li>
                  <Link to="/bank/escrows">Open escrows</Link>
                  <span>Track funding, documents and arrival certificates.</span>
                </li>
                <li>
                  <Link to="/bank/escrows/new">Start new escrow</Link>
                  <span>Open a mandate and invite buyer, seller and clearing agent.</span>
                </li>
                <li>
                  <Link to="/bank/approvals">Pending approvals</Link>
                  <span>Sign-offs required before release.</span>
                </li>
              </ul>
              <p className="cbos-support-hint">
                Urgent escrow desk: <a href="tel:+97141234501">+971 4 123 4501</a>
              </p>
            </section>
          ) : null}

          {active === 'payments' ? (
            <section className="cbos-settings-section">
              <SectionHead title="Payments & cards" subtitle="Wires, FX, cards and account access." />
              <ul className="cbos-support-topics">
                <li>
                  <Link to="/bank/send">Send money</Link>
                  <span>Internal, international and scheduled transfers.</span>
                </li>
                <li>
                  <Link to="/bank/transfers">Payment history</Link>
                  <span>Track outgoing and incoming wires.</span>
                </li>
                <li>
                  <Link to="/bank/cards">Cards</Link>
                  <span>Limits, freeze and employee cards.</span>
                </li>
                <li>
                  <Link to="/bank/wallets">Cash accounts</Link>
                  <span>Balances and IBAN details.</span>
                </li>
              </ul>
            </section>
          ) : null}

          {active === 'compliance' ? (
            <section className="cbos-settings-section">
              <SectionHead title="Compliance & KYC" subtitle="Verification status and regulatory requests." />
              <p className={`cbos-support-kyc cbos-support-kyc--${kycStatus}`}>
                {STATUS_LABEL[kycStatus] ?? kycStatus}
              </p>
              <p className="cbos-support-hint">
                {kycStatus === 'approved'
                  ? 'Your institution is verified. Trading and logistics mandates are available.'
                  : kycStatus === 'under_review'
                    ? 'Your application is with compliance — we notify you by email.'
                    : 'Complete onboarding to unlock payments and mandates.'}
              </p>
              <div className="cbos-support-actions">
                <Link to="/bank/kyc" className="cbos-flow__continue cbos-flow__continue--link">
                  {kycStatus === 'approved' ? 'View application' : 'Continue KYC'}
                </Link>
                <button type="button" className="cbos-flow__link-btn" onClick={() => void refreshProfile()}>
                  Refresh status
                </button>
              </div>
              <p className="cbos-support-hint">
                Email compliance: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </CbosFlowPage>
  )
}
