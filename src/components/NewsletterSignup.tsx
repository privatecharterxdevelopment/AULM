import { type FormEvent, useState } from 'react'
import { submitNewsletter } from '../utils/submitNewsletter'
import { useT } from '../i18n'

export function NewsletterSignup() {
  const { t } = useT()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.news.newsletterError)
      return
    }

    setSubmitting(true)
    setError(null)
    const result = await submitNewsletter(email)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? t.news.newsletterFail)
      return
    }

    setSent(true)
    setEmail('')
  }

  return (
    <div className="newsletter" id="newsletter">
      {sent ? (
        <p className="newsletter-done" role="status">
          {t.news.newsletterDone}
        </p>
      ) : (
        <>
          <div className="newsletter-copy">
            <p className="newsletter-label">{t.news.newsletterLabel}</p>
            <p className="newsletter-lead">{t.news.newsletterLead}</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <label className="visually-hidden" htmlFor="news-email">
              {t.news.newsletterEmail}
            </label>
            <input
              id="news-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
              }}
              placeholder={t.news.newsletterEmail}
              required
            />
            <button type="submit" className="metal-page-btn metal-page-btn--primary" disabled={submitting}>
              {submitting ? t.common.sending : t.news.subscribe}
            </button>
          </form>
          {error ? (
            <p className="newsletter-error" role="alert">
              {error}
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}
