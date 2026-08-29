import { type FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CONTACT_TOPICS,
  isContactTopic,
  type ContactFormValues,
  type ContactTopic,
} from '../data/contact'
import { COMPANY } from '../data/company'
import { CONTACT_EMAIL } from '../config/site'
import { submitContact } from '../utils/submitContact'

const EMPTY_FORM: ContactFormValues = {
  topic: 'consulting',
  fullName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
}

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const topicParam = searchParams.get('topic')
  const initialTopic: ContactTopic = isContactTopic(topicParam) ? topicParam : 'consulting'
  const isInvestment = initialTopic === 'investment'

  const [entered, setEntered] = useState(false)
  const [form, setForm] = useState<ContactFormValues>({ ...EMPTY_FORM, topic: initialTopic })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  function updateField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }

    setSubmitting(true)
    setError(null)

    const result = await submitContact({
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    })

    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? 'Something went wrong. Please try again or email us directly.')
      return
    }

    setSent(true)
    setForm({ ...EMPTY_FORM, topic: initialTopic })
  }

  return (
    <div className={`contact-page${entered ? ' is-entered' : ''}`}>
      <div className="contact-page-inner">
        <aside className="contact-page-intro">
          <p className="contact-page-eyebrow">Contact us</p>
          <h1 className="contact-page-title">
            {isInvestment ? 'Invest in AULM' : 'Dubai desk'}
          </h1>
          <p className="contact-page-lead">
            {isInvestment
              ? 'Write to the desk if you want to invest in the company. Tell us who you are and the size you have in mind — we come back within one business day.'
              : 'Institutional gold, silver and copper. Write with the mandate — metal, volume, origin or destination. We reply within one business day.'}
          </p>

          <dl className="contact-page-desk">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>
                {COMPANY.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{COMPANY.hours}</dd>
            </div>
            <div>
              <dt>License</dt>
              <dd>
                {COMPANY.licenseLine} {COMPANY.licenseNumber}
              </dd>
            </div>
          </dl>

          <p className="contact-page-note">{COMPANY.meetingNote}</p>
        </aside>

        <div className="contact-page-form-wrap">
          {sent ? (
            <div className="contact-page-success" role="status">
              <div className="contact-page-success-icon" aria-hidden>
                ✓
              </div>
              <h2 className="contact-page-success-title">Message sent</h2>
              <p className="contact-page-success-text">
                Thanks for reaching out. We&apos;ll get back to you at the email you provided.
              </p>
              <button
                type="button"
                className="metal-page-btn metal-page-btn--secondary contact-page-success-btn"
                onClick={() => setSent(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="kyc-field">
                <label className="kyc-label" htmlFor="contact-topic">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  className="contact-select"
                  value={form.topic}
                  onChange={(e) => updateField('topic', e.target.value as ContactTopic)}
                  required
                >
                  {CONTACT_TOPICS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-form-row">
                <div className="kyc-field">
                  <label className="kyc-label" htmlFor="contact-name">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className="kyc-field">
                  <label className="kyc-label" htmlFor="contact-email">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="kyc-field">
                  <label className="kyc-label" htmlFor="contact-company">
                    Company <span className="contact-optional">optional</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="kyc-field">
                  <label className="kyc-label" htmlFor="contact-phone">
                    Phone <span className="contact-optional">optional</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+971 …"
                  />
                </div>
              </div>

              <div className="kyc-field">
                <label className="kyc-label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Describe your inquiry — product, volume, timeline, or questions."
                  rows={5}
                  required
                />
              </div>

              {error ? (
                <p className="contact-form-error" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="metal-page-btn metal-page-btn--primary contact-form-submit"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>

              <p className="contact-form-note">
                By submitting, you agree we may contact you about your inquiry. We never share your
                details with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
