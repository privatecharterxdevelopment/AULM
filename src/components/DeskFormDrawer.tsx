import { type FormEvent, useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { GOLD_SLOTS_2026 } from '../config/site'
import { DESK_FORM_COPY, type DeskFormKind } from '../data/deskFiles'
import { submitContact } from '../utils/submitContact'
import { useT } from '../i18n'

type Props = {
  kind: DeskFormKind
  onClose: () => void
}

export function DeskFormDrawer({ kind, onClose }: Props) {
  const { t, interpolate } = useT()
  const meta = DESK_FORM_COPY[kind]
  const copy = t.desk.forms[kind]
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
      setError(t.contact.errorRequired)
      return
    }
    if (meta.askAccount && !openAccount) {
      setError(t.desk.errorAccount)
      return
    }

    setSubmitting(true)
    setError(null)

    const extras = [
      copy.headline,
      meta.askAccount
        ? interpolate(t.desk.openAccountLine, {
            answer: openAccount === 'yes' ? t.common.yes : t.common.notYet,
          })
        : '',
      message.trim(),
    ].filter(Boolean)

    const result = await submitContact({
      topic: meta.topic,
      fullName: fullName.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: phone.trim(),
      message: extras.join('\n\n'),
    })

    setSubmitting(false)
    if (!result.ok) {
      setError(result.error ?? t.contact.errorGeneric)
      return
    }
    setSent(true)
  }

  const lead = interpolate(copy.lead, { slots: GOLD_SLOTS_2026 })
  const notice = 'notice' in copy ? copy.notice : undefined

  return (
    <div className="desk-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="desk-drawer-backdrop" aria-label={t.common.close} onClick={onClose} />
      <div className="desk-drawer-panel">
        <button type="button" className="desk-drawer-close" onClick={onClose} aria-label={t.common.close}>
          ×
        </button>

        {sent ? (
          <div className="request-success" role="status">
            <p className="request-success-title">{t.common.sent}</p>
            <p className="request-success-text">{t.desk.sentText}</p>
            {meta.askAccount && openAccount === 'yes' ? (
              <Link to="/onboarding" className="request-submit desk-drawer-cta">
                {t.desk.rows['onboarding-pack'].link}
              </Link>
            ) : (
              <button type="button" className="request-submit" onClick={onClose}>
                {t.common.close}
              </button>
            )}
          </div>
        ) : (
          <form className="request-form" onSubmit={handleSubmit} noValidate>
            <h2 id={titleId} className="request-title">
              {copy.title}
            </h2>
            <p className="desk-drawer-lead">{lead}</p>

            {notice ? (
              <ul className="desk-drawer-notice">
                {notice.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}

            {meta.askAccount ? (
              <>
                <p className="desk-drawer-hint">{t.desk.askAccount}</p>
                <div className="request-toggle" role="radiogroup" aria-label={t.desk.askAccountAria}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={openAccount === 'yes'}
                    className={`request-toggle-btn${openAccount === 'yes' ? ' is-active' : ''}`}
                    onClick={() => setOpenAccount('yes')}
                  >
                    {t.common.yes}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={openAccount === 'not-yet'}
                    className={`request-toggle-btn${openAccount === 'not-yet' ? ' is-active' : ''}`}
                    onClick={() => setOpenAccount('not-yet')}
                  >
                    {t.common.notYet}
                  </button>
                </div>
              </>
            ) : null}

            <div className="request-fields">
              <label className="request-field">
                <span>{t.contact.fullName}</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  required
                />
              </label>
              <label className="request-field">
                <span>{t.contact.workEmail}</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contact.emailPlaceholder}
                  required
                />
              </label>
              <label className="request-field">
                <span>{t.contact.company}</span>
                <input
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t.desk.familyOfficePlaceholder}
                />
              </label>
              <label className="request-field">
                <span>{t.contact.phone}</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.contact.phonePlaceholder}
                />
              </label>
              <label className="request-field">
                <span>{t.contact.message}</span>
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
              {submitting ? t.common.sending : t.desk.sendToDesk}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
