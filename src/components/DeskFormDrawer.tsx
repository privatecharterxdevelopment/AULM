import { type FormEvent, useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { DESK_FORM_COPY, type DeskFormKind } from '../data/deskFiles'
import { submitContact } from '../utils/submitContact'

type Props = {
  kind: DeskFormKind
  onClose: () => void
}

export function DeskFormDrawer({ kind, onClose }: Props) {
  const copy = DESK_FORM_COPY[kind]
  const titleId = useId()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [openAccount, setOpenAccount] = useState<'yes' | 'not-yet' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    if (copy.askAccount && !openAccount) {
      setError('Please say whether you want to open an account now.')
      return
    }

    setSubmitting(true)
    setError(null)

    const extras = [
      copy.headline,
      copy.askAccount
        ? `Open account now in order to start trading: ${openAccount === 'yes' ? 'Yes' : 'Not yet'}`
        : '',
      message.trim(),
    ].filter(Boolean)

    const result = await submitContact({
      topic: copy.topic,
      fullName: fullName.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: phone.trim(),
      message: extras.join('\n\n'),
    })

    setSubmitting(false)
    if (!result.ok) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }
    setSent(true)
  }

  return (
    <div className="desk-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="desk-drawer-backdrop" aria-label="Close" onClick={onClose} />
      <div className="desk-drawer-panel">
        <button type="button" className="desk-drawer-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {sent ? (
          <div className="request-success" role="status">
            <p className="request-success-title">Sent</p>
            <p className="request-success-text">We will come back to you at the email you provided.</p>
            {copy.askAccount && openAccount === 'yes' ? (
              <Link to="/onboarding" className="request-submit desk-drawer-cta">
                Open account
              </Link>
            ) : (
              <button type="button" className="request-submit" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        ) : (
          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <h2 id={titleId} className="request-title">
              {copy.title}
            </h2>
            <p className="desk-drawer-lead">{copy.lead}</p>

            {copy.notice ? (
              <ul className="desk-drawer-notice">
                {copy.notice.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}

            {copy.askAccount ? (
              <>
                <p className="desk-drawer-hint">Open an account now in order to start trading?</p>
                <div className="request-toggle" role="radiogroup" aria-label="Open account now in order to start trading">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={openAccount === 'yes'}
                    className={`request-toggle-btn${openAccount === 'yes' ? ' is-active' : ''}`}
                    onClick={() => setOpenAccount('yes')}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={openAccount === 'not-yet'}
                    className={`request-toggle-btn${openAccount === 'not-yet' ? ' is-active' : ''}`}
                    onClick={() => setOpenAccount('not-yet')}
                  >
                    Not yet
                  </button>
                </div>
              </>
            ) : null}

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
                  placeholder={copy.placeholder}
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
    </div>
  )
}
