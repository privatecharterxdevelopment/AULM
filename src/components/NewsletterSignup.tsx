import { type FormEvent, useState } from 'react'
import { submitNewsletter } from '../utils/submitNewsletter'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid work email.')
      return
    }

    setSubmitting(true)
    setError(null)
    const result = await submitNewsletter(email)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? 'Could not subscribe. Email us instead.')
      return
    }

    setSent(true)
    setEmail('')
  }

  return (
    <div className="newsletter" id="newsletter">
      {sent ? (
        <p className="newsletter-done" role="status">
          You are on the list. We write when there is something from the desk.
        </p>
      ) : (
        <>
          <div className="newsletter-copy">
            <p className="newsletter-label">Newsletter</p>
            <p className="newsletter-lead">
              Desk notes on gold, silver and copper — markets, procedure and operations. No retail
              tips.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <label className="visually-hidden" htmlFor="news-email">
              Work email
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
              placeholder="Work email"
              required
            />
            <button type="submit" className="metal-page-btn metal-page-btn--primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Subscribe'}
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
