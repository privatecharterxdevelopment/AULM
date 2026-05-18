import { useState } from 'react'
import { CONTACT_EMAIL } from '../config/site'
import { submitInquiry } from '../utils/submitInquiry'

const SERVICE_OPTIONS = [
  { value: 'sell-gold-institutional', label: 'Sell gold — LBMA minus negotiated discount' },
  { value: 'sell-dore', label: 'Sell doré gold (Africa / export route)' },
  { value: 'sell-scrap', label: 'Sell scrap gold' },
  { value: 'buy-bullion', label: 'Buy LBMA bullion from AULM' },
  { value: 'refinery-dubai', label: 'Refinery services Dubai' },
  { value: 'gold-import-dubai', label: 'Gold import coordination' },
  { value: 'banking-consulting', label: 'Transactional banking consulting' },
]

const INCOTERM_OPTIONS = [
  { value: '', label: 'Preferred Incoterm (optional)' },
  { value: 'CIF', label: 'CIF — Cost, Insurance & Freight' },
  { value: 'FOB', label: 'FOB — Free on Board' },
  { value: 'CFR', label: 'CFR — Cost & Freight' },
  { value: 'DAP', label: 'DAP — Delivered at Place' },
  { value: 'EXW', label: 'EXW — Ex Works' },
  { value: 'other', label: 'Other / to be agreed' },
]

const PRODUCT_OPTIONS = [
  { value: 'dore', label: 'Doré gold' },
  { value: 'scrap', label: 'Scrap gold' },
  { value: 'bullion', label: 'LBMA bullion (buy from AULM)' },
  { value: 'mixed', label: 'Mixed / other' },
]

const EMPTY_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  service: 'sell-gold-institutional',
  product: 'dore',
  volume: '',
  incoterm: '',
  message: '',
}

function buildMailtoBody(data) {
  return [
    `Inquiry: ${SERVICE_OPTIONS.find((o) => o.value === data.service)?.label || data.service}`,
    `Product: ${PRODUCT_OPTIONS.find((o) => o.value === data.product)?.label || data.product}`,
    `Incoterm: ${INCOTERM_OPTIONS.find((o) => o.value === data.incoterm)?.label || data.incoterm || '—'}`,
    `Name: ${data.name}`,
    `Company: ${data.company || '—'}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    `Country: ${data.country || '—'}`,
    `Estimated volume: ${data.volume || '—'}`,
    '',
    'Message:',
    data.message || '—',
  ].join('\n')
}

export default function AccountInquiryForm({
  defaultService = 'sell-gold-institutional',
  defaultProduct = 'dore',
  heading,
  subheading,
}) {
  const [formData, setFormData] = useState({ ...EMPTY_FORM, service: defaultService, product: defaultProduct })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState(null)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = `AULM Account Inquiry — ${SERVICE_OPTIONS.find((o) => o.value === formData.service)?.label || 'B2B'}`
    const bodyLines = buildMailtoBody(formData)
    const result = await submitInquiry({
      formType: 'open-account',
      subject,
      data: {
        Inquiry: SERVICE_OPTIONS.find((o) => o.value === formData.service)?.label || formData.service,
        Product: PRODUCT_OPTIONS.find((o) => o.value === formData.product)?.label || formData.product,
        Incoterm: INCOTERM_OPTIONS.find((o) => o.value === formData.incoterm)?.label || formData.incoterm || '—',
        Name: formData.name,
        Company: formData.company,
        Email: formData.email,
        Phone: formData.phone || '—',
        Country: formData.country,
        Volume: formData.volume || '—',
        Message: formData.message,
      },
      bodyLines,
    })

    setDeliveryMethod(result.delivered)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="account-form-success">
        <h3>{deliveryMethod === 'server' ? 'Inquiry sent' : 'Complete your email'}</h3>
        <p>
          {deliveryMethod === 'server' ? (
            <>
              Delivered to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We respond within one business
              day.
            </>
          ) : (
            <>
              Your mail app should open — please <strong>press Send</strong> so the message reaches{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Until you send, nothing arrives in our inbox.
            </>
          )}
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setIsSubmitted(false)
            setDeliveryMethod(null)
            setFormData({ ...EMPTY_FORM, service: defaultService, product: defaultProduct })
          }}
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <div className="account-form-block" id="open-account">
      {heading && <h2>{heading}</h2>}
      {subheading && <p className="account-form-lead">{subheading}</p>}

      <form onSubmit={handleSubmit} className="contact-form-inline account-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="company"
              placeholder="Institution / company *"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Business email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone / WhatsApp"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="country"
              placeholder="Country of incorporation *"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select name="product" value={formData.product} onChange={handleChange} required>
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="service" value={formData.service} onChange={handleChange} required>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="incoterm" value={formData.incoterm} onChange={handleChange}>
              {INCOTERM_OPTIONS.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="volume"
              placeholder="Lot size (e.g. 20 kg doré, CIF Dubai)"
              value={formData.volume}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Origin country, product form, expected volume — no documents needed in this step *"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary account-form-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Submit inquiry'}
        </button>

        <p className="account-form-note">
          Submissions go to <strong>{CONTACT_EMAIL}</strong> when Postmark is configured on the server; otherwise
          your mail app opens and you must press Send. We accept CIF, FOB, CFR and other Incoterms. LBMA discount
          negotiated per mandate. TT (MT103) only.
        </p>
      </form>
    </div>
  )
}
