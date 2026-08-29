import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BANKING_PRE_APPLY_EMPTY, type BankingPreApplyValues } from '../data/bankingPreApply'
import { submitBankingPreApply } from '../utils/submitBankingPreApply'

export function BankingPreApplyPage() {
  const [form, setForm] = useState<BankingPreApplyValues>(BANKING_PRE_APPLY_EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)

    document.title = 'AULM Banking pre-application'

    return () => {
      document.head.removeChild(robots)
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  function updateField<K extends keyof BankingPreApplyValues>(key: K, value: BankingPreApplyValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.company.trim()) {
      setError('Please fill in your name, company and email.')
      return
    }

    setSubmitting(true)
    setError(null)

    const result = await submitBankingPreApply({
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      jurisdiction: form.jurisdiction.trim(),
      expectedVolume: form.expectedVolume.trim(),
      message: form.message.trim(),
    })

    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSent(true)
    setForm(BANKING_PRE_APPLY_EMPTY)
  }

  return (
    <div className="banking-preapply-page">
      <div className="banking-preapply-page-inner">
        <header className="banking-preapply-page-header">
          <p className="banking-preapply-page-eyebrow">Banking · Pre-application</p>
          <h1 className="banking-preapply-page-title">Institutional banking interest</h1>
          <p className="banking-preapply-page-lead">
            Tell us about your desk. This form is not indexed — use it from the banking page QR code or
            your dashboard. Our team responds within one business day.
          </p>
        </header>

        {sent ? (
          <div className="banking-preapply-success">
            <h2>Application received</h2>
            <p>We will contact you at the email provided to continue onboarding.</p>
            <Link to="/bank" className="metal-page-btn metal-page-btn--primary">
              Back to dashboard
            </Link>
          </div>
        ) : (
          <form className="banking-preapply-form" onSubmit={handleSubmit} noValidate>
            <label className="banking-preapply-field">
              <span>Full name</span>
              <input
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                required
              />
            </label>

            <label className="banking-preapply-field">
              <span>Company</span>
              <input
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
                required
              />
            </label>

            <label className="banking-preapply-field">
              <span>Work email</span>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
            </label>

            <label className="banking-preapply-field">
              <span>Phone</span>
              <input
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </label>

            <label className="banking-preapply-field">
              <span>Jurisdiction</span>
              <input
                type="text"
                placeholder="e.g. UAE, Switzerland, UK"
                value={form.jurisdiction}
                onChange={(e) => updateField('jurisdiction', e.target.value)}
              />
            </label>

            <label className="banking-preapply-field">
              <span>Expected monthly volume (optional)</span>
              <input
                type="text"
                placeholder="e.g. USD 5M+ commodity settlements"
                value={form.expectedVolume}
                onChange={(e) => updateField('expectedVolume', e.target.value)}
              />
            </label>

            <label className="banking-preapply-field banking-preapply-field--full">
              <span>Notes (optional)</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Corridors, currencies, escrow needs…"
              />
            </label>

            {error ? <p className="banking-preapply-error">{error}</p> : null}

            <button type="submit" className="metal-page-btn metal-page-btn--primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Submit pre-application'}
            </button>
          </form>
        )}

        <p className="banking-preapply-page-foot">
          <Link to="/banking">← Back to banking</Link>
        </p>
      </div>
    </div>
  )
}
