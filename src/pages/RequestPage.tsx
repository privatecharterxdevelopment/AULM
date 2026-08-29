import { type FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { METALS, type MetalId } from '../data/metals'
import { submitContact } from '../utils/submitContact'

export type RequestKind = 'buy' | 'sell' | 'investors'

const KINDS: { id: RequestKind; label: string }[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'investors', label: 'Investors' },
]

const METAL_IDS: MetalId[] = ['gold', 'silver', 'copper']

function parseKind(value: string | null): RequestKind {
  if (value === 'buy' || value === 'sell' || value === 'investors') return value
  return 'buy'
}

function parseMetal(value: string | null): MetalId {
  if (value === 'gold' || value === 'silver' || value === 'copper') return value
  return 'gold'
}

const PLACEHOLDER: Record<RequestKind, string> = {
  buy: 'Metal specs, quantity, delivery.',
  sell: 'Lot, origin, assay, quantity.',
  investors: 'Who you are, indicative ticket, and timeline.',
}

const DESK_ONLY: RequestKind[] = ['investors']

export function RequestPage() {
  const [params, setParams] = useSearchParams()
  const kind = parseKind(params.get('type'))
  const metal = parseMetal(params.get('metal'))

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'AULM | Request'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  function setKind(next: RequestKind) {
    const nextParams = new URLSearchParams(params)
    nextParams.set('type', next)
    if (DESK_ONLY.includes(next)) nextParams.delete('metal')
    else if (!nextParams.get('metal')) nextParams.set('metal', metal)
    setParams(nextParams, { replace: true })
    setSent(false)
    setError(null)
  }

  function setMetal(next: MetalId) {
    const nextParams = new URLSearchParams(params)
    nextParams.set('type', kind)
    nextParams.set('metal', next)
    setParams(nextParams, { replace: true })
    setSent(false)
    setError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }

    setSubmitting(true)
    setError(null)

    const headline =
      kind === 'investors' ? 'Investors request' : `${kind === 'buy' ? 'Buy' : 'Sell'} ${METALS[metal].name}`

    const result = await submitContact({
      topic: kind === 'investors' ? 'investment' : 'trading',
      fullName: fullName.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: phone.trim(),
      message: [headline, message.trim()].join('\n\n'),
    })

    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSent(true)
    setMessage('')
  }

  const title =
    kind === 'investors' ? 'Investors request' : `${kind === 'buy' ? 'Buy' : 'Sell'} ${METALS[metal].name}`

  return (
    <section className="request-page" aria-label="Desk request">
      <div className="request-sheet">
        <h1 className="request-title">{title}</h1>

        <div className="request-toggle request-toggle--3" role="tablist" aria-label="Request type">
          {KINDS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={kind === item.id}
              className={`request-toggle-btn${kind === item.id ? ' is-active' : ''}`}
              onClick={() => setKind(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {!DESK_ONLY.includes(kind) ? (
          <div className="request-toggle request-toggle--3" role="tablist" aria-label="Metal">
            {METAL_IDS.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={metal === id}
                className={`request-toggle-btn${metal === id ? ' is-active' : ''}`}
                onClick={() => setMetal(id)}
              >
                {METALS[id].name}
              </button>
            ))}
          </div>
        ) : null}

        {sent ? (
          <div className="request-success" role="status">
            <p className="request-success-title">Sent</p>
            <p className="request-success-text">We will come back to you at the email you provided.</p>
          </div>
        ) : (
          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <div className="request-fields">
              <label className="request-field">
                <span>Full name</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                />
              </label>
              <label className="request-field">
                <span>Work email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@familyoffice.com"
                  required
                />
              </label>
              <label className="request-field">
                <span>Company</span>
                <input
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Family office / fund"
                />
              </label>
              <label className="request-field">
                <span>Phone</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 …"
                />
              </label>
              <label className="request-field">
                <span>Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={PLACEHOLDER[kind]}
                  rows={4}
                  required
                />
              </label>
            </div>

            {error ? (
              <p className="request-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="request-submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send to the desk'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
