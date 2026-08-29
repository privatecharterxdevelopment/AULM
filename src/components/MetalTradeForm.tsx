import { type FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitContact } from '../utils/submitContact'
import type { MetalId } from '../data/metals'
import { interpolate, useT } from '../i18n'

type Side = 'buy' | 'sell'

type Props = {
  metalId: MetalId
  metalName: string
  initialSide: Side
}

export function MetalTradeForm({ metalId, metalName, initialSide }: Props) {
  const { t } = useT()
  const navigate = useNavigate()
  const [side, setSide] = useState<Side>(initialSide)
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setSide(initialSide)
    setSent(false)
    setError(null)
  }, [initialSide, metalId])

  function selectSide(next: Side) {
    setSide(next)
    setSent(false)
    navigate(`/${metalId}/${next}`, { replace: true })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!company.trim() || !email.trim() || !quantity.trim()) {
      setError(t.metal.errorRequired)
      return
    }

    setSubmitting(true)
    setError(null)

    const verb = side === 'sell' ? t.common.sell : t.common.buy
    const result = await submitContact({
      topic: 'trading',
      fullName: company.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: '',
      message: [
        `${verb} ${metalName}`,
        `Quantity: ${quantity.trim()}`,
        notes.trim() ? `Notes: ${notes.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })

    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? t.metal.errorGeneric)
      return
    }

    setSent(true)
    setQuantity('')
    setNotes('')
  }

  if (sent) {
    return (
      <div className="request-success" role="status">
        <p className="request-success-title">{t.common.sent}</p>
        <p className="request-success-text">{interpolate(t.metal.sentReply, { email })}</p>
        <button type="button" className="request-submit" onClick={() => setSent(false)}>
          {t.common.newRequest}
        </button>
      </div>
    )
  }

  return (
    <form className="request-form" onSubmit={(e) => void handleSubmit(e)} noValidate>
      <div className="request-toggle" role="tablist" aria-label={t.metal.buyOrSell}>
          <button
            type="button"
            role="tab"
            aria-selected={side === 'buy'}
            className={`request-toggle-btn${side === 'buy' ? ' is-active' : ''}`}
            onClick={() => selectSide('buy')}
          >
            {t.common.buy}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={side === 'sell'}
            className={`request-toggle-btn${side === 'sell' ? ' is-active' : ''}`}
            onClick={() => selectSide('sell')}
          >
            {t.common.sell}
          </button>
        </div>

      <div className="request-fields">
        <label className="request-field">
          <span>{t.metal.company}</span>
          <input
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </label>
        <label className="request-field">
          <span>{t.metal.workEmail}</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="request-field">
          <span>{t.metal.quantity}</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder={side === 'sell' ? t.metal.qtySellPlaceholder : t.metal.qtyBuyPlaceholder}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label className="request-field request-field--notes">
          <span>{t.metal.notes}</span>
          <textarea
            rows={3}
            placeholder={t.metal.notesPlaceholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
      </div>

      {error ? (
        <p className="request-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="request-submit" disabled={submitting}>
        {submitting ? t.common.sending : t.metal.sendRequest}
      </button>
    </form>
  )
}
