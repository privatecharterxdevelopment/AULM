import { type FormEvent, useState } from 'react'
import { type ContactFormValues, type ContactTopic } from '../data/contact'
import { submitContact } from '../utils/submitContact'
import { useT } from '../i18n'

const EMPTY: ContactFormValues = {
  topic: 'consulting',
  fullName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
}

const TOPIC_ORDER: ContactTopic[] = [
  'general',
  'trading',
  'refinery',
  'compliance',
  'consulting',
  'investment',
  'reservation',
  'account',
  'other',
]

type Props = {
  initialTopic?: ContactTopic
}

export function ContactForm({ initialTopic = 'consulting' }: Props) {
  const { t } = useT()
  const [form, setForm] = useState<ContactFormValues>({ ...EMPTY, topic: initialTopic })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  function updateField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t.contact.errorRequired)
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
      setError(result.error ?? t.contact.errorGeneric)
      return
    }

    setSent(true)
    setForm({ ...EMPTY, topic: initialTopic })
  }

  if (sent) {
    return (
      <div className="contact-page-success" role="status">
        <div className="contact-page-success-icon" aria-hidden>
          ✓
        </div>
        <h2 className="contact-page-success-title">{t.contact.sentTitle}</h2>
        <p className="contact-page-success-text">{t.contact.sentText}</p>
        <button
          type="button"
          className="metal-page-btn metal-page-btn--secondary contact-page-success-btn"
          onClick={() => setSent(false)}
        >
          {t.common.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="kyc-field">
        <label className="kyc-label" htmlFor="contact-topic">
          {t.contact.topic}
        </label>
        <select
          id="contact-topic"
          className="contact-select"
          value={form.topic}
          onChange={(e) => updateField('topic', e.target.value as ContactTopic)}
          required
        >
          {TOPIC_ORDER.map((value) => (
            <option key={value} value={value}>
              {t.contact.topics[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-form-row">
        <div className="kyc-field">
          <label className="kyc-label" htmlFor="contact-name">
            {t.contact.fullName}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder={t.contact.namePlaceholder}
            required
          />
        </div>
        <div className="kyc-field">
          <label className="kyc-label" htmlFor="contact-email">
            {t.contact.workEmail}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder={t.contact.emailPlaceholder}
            required
          />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="kyc-field">
          <label className="kyc-label" htmlFor="contact-company">
            {t.contact.company} <span className="contact-optional">{t.common.optional}</span>
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => updateField('company', e.target.value)}
            placeholder={t.contact.companyPlaceholder}
          />
        </div>
        <div className="kyc-field">
          <label className="kyc-label" htmlFor="contact-phone">
            {t.contact.phone} <span className="contact-optional">{t.common.optional}</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder={t.contact.phonePlaceholder}
          />
        </div>
      </div>

      <div className="kyc-field">
        <label className="kyc-label" htmlFor="contact-message">
          {t.contact.message}
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder={t.contact.messagePlaceholder}
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
        {submitting ? t.common.sending : t.contact.send}
      </button>

      <p className="contact-form-note">{t.contact.note}</p>
    </form>
  )
}
