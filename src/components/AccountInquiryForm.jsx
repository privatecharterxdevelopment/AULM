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

const STEPS = [
  { id: 'company', label: 'Company' },
  { id: 'mandate', label: 'Trade' },
  { id: 'license', label: 'License' },
  { id: 'declarations', label: 'Confirm' },
  { id: 'review', label: 'Submit' },
]

const DECLARATIONS = [
  {
    key: 'declareConflictFree',
    label:
      'I hereby confirm that any gold supplied to AULM is free of conflict, complies with OECD Due Diligence Guidance, and is not sourced from sanctioned jurisdictions or high-risk ASM without full due diligence documentation.',
  },
  {
    key: 'declareLicensed',
    label:
      'We are licensed under applicable law (including UAE law where relevant) and hold an active trade license authorizing B2B precious metals / gold trading.',
  },
  {
    key: 'declareAml',
    label:
      'We maintain AML/CFT procedures, can identify ultimate beneficial owners (UBOs), and will provide KYC/KYB and origin documentation upon request per shipment.',
  },
  {
    key: 'declareSettlement',
    label:
      'We understand settlement is bank-to-bank only (SWIFT MT103 / telegraphic transfer) between approved institutional accounts — no cash, cryptocurrency, or third-party payment agents.',
  },
  {
    key: 'declareB2b',
    label: 'We are an institutional or corporate counterparty — not a retail walk-in or cash-for-gold customer.',
  },
  {
    key: 'declareAccurate',
    label: 'The information provided in this onboarding is true and complete to the best of our knowledge.',
  },
]

const EMPTY_FORM = {
  name: '',
  company: '',
  tradeName: '',
  email: '',
  phone: '',
  country: '',
  registrationNumber: '',
  service: 'sell-gold-institutional',
  product: 'dore',
  volume: '',
  incoterm: '',
  originCountry: '',
  routing: '',
  message: '',
  licenseJurisdiction: '',
  licenseNumber: '',
  licenseGoldActivity: 'yes',
  freeZone: '',
  complianceOfficerName: '',
  complianceOfficerEmail: '',
  declareConflictFree: false,
  declareLicensed: false,
  declareAml: false,
  declareSettlement: false,
  declareB2b: false,
  declareAccurate: false,
}

function labelFor(options, value) {
  return options.find((o) => o.value === value)?.label || value || '—'
}

function buildPayload(data) {
  const flat = {
    'Contact name': data.name,
    'Company legal name': data.company,
    'Trade name': data.tradeName || '—',
    'Business email': data.email,
    Phone: data.phone || '—',
    'Country of incorporation': data.country,
    'Company registration no.': data.registrationNumber || '—',
    Inquiry: labelFor(SERVICE_OPTIONS, data.service),
    Product: labelFor(PRODUCT_OPTIONS, data.product),
    Incoterm: labelFor(INCOTERM_OPTIONS, data.incoterm),
    'Estimated volume': data.volume || '—',
    'Origin country': data.originCountry || '—',
    'Routing / corridor': data.routing || '—',
    'License jurisdiction': data.licenseJurisdiction || '—',
    'Trade license no.': data.licenseNumber || '—',
    'Gold activity on license': data.licenseGoldActivity,
    'Free zone / DMCC': data.freeZone || '—',
    'Compliance officer': data.complianceOfficerName || '—',
    'Compliance email': data.complianceOfficerEmail || '—',
    'Conflict-free declaration': data.declareConflictFree ? 'Yes' : 'No',
    'Licensed B2B declaration': data.declareLicensed ? 'Yes' : 'No',
    'AML declaration': data.declareAml ? 'Yes' : 'No',
    'Settlement declaration': data.declareSettlement ? 'Yes' : 'No',
    'B2B declaration': data.declareB2b ? 'Yes' : 'No',
    'Accuracy declaration': data.declareAccurate ? 'Yes' : 'No',
    'Additional notes': data.message || '—',
  }

  const bodyLines = [
    'AULM — B2B account / seller onboarding',
    '',
    '— Company —',
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Trade name: ${data.tradeName || '—'}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    `Country: ${data.country}`,
    `Registration: ${data.registrationNumber || '—'}`,
    '',
    '— Trade mandate —',
    `Service: ${labelFor(SERVICE_OPTIONS, data.service)}`,
    `Product: ${labelFor(PRODUCT_OPTIONS, data.product)}`,
    `Volume: ${data.volume || '—'}`,
    `Incoterm: ${labelFor(INCOTERM_OPTIONS, data.incoterm)}`,
    `Origin: ${data.originCountry || '—'}`,
    `Routing: ${data.routing || '—'}`,
    '',
    '— Licensing —',
    `Jurisdiction: ${data.licenseJurisdiction || '—'}`,
    `License no.: ${data.licenseNumber || '—'}`,
    `Gold on license: ${data.licenseGoldActivity}`,
    `Free zone: ${data.freeZone || '—'}`,
    `Compliance: ${data.complianceOfficerName || '—'} (${data.complianceOfficerEmail || '—'})`,
    '',
    '— Declarations (all confirmed) —',
    ...DECLARATIONS.map((d) => `[✓] ${d.label}`),
    '',
    '— Notes —',
    data.message || '—',
  ]

  return { flat, bodyLines }
}

function validateStep(step, data) {
  switch (step) {
    case 0:
      return Boolean(data.name && data.company && data.email && data.phone && data.country)
    case 1:
      return Boolean(data.service && data.product && data.originCountry && data.volume)
    case 2:
      return Boolean(data.licenseJurisdiction && data.licenseNumber)
    case 3:
      return DECLARATIONS.every((d) => data[d.key])
    default:
      return true
  }
}

export default function AccountInquiryForm({
  defaultService = 'sell-gold-institutional',
  defaultProduct = 'dore',
  heading,
  subheading,
}) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
    service: defaultService,
    product: defaultProduct,
  })
  const [stepError, setStepError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState(null)
  const [submitWarning, setSubmitWarning] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setStepError(null)
  }

  const goNext = () => {
    if (!validateStep(step, formData)) {
      setStepError('Please complete all required fields on this step.')
      return
    }
    setStepError(null)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setStepError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(3, formData)) {
      setStepError('Please confirm all declarations before submitting.')
      setStep(3)
      return
    }

    setIsSubmitting(true)
    const { flat, bodyLines } = buildPayload(formData)
    const subject = `AULM Account Onboarding — ${labelFor(SERVICE_OPTIONS, formData.service)}`
    const result = await submitInquiry({
      formType: 'open-account',
      subject,
      data: flat,
      bodyLines,
    })

    setDeliveryMethod(result.delivered)
    setSubmitWarning(result.warning || null)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setDeliveryMethod(null)
    setSubmitWarning(null)
    setStep(0)
    setStepError(null)
    setFormData({ ...EMPTY_FORM, service: defaultService, product: defaultProduct })
  }

  if (isSubmitted) {
    return (
      <div className="account-form-success">
        <h3>{deliveryMethod === 'server' ? 'Onboarding submitted' : 'Complete your email'}</h3>
        <p>
          {deliveryMethod === 'server' ? (
            <>
              Delivered to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We respond within one business
              day.
            </>
          ) : (
            <>
              Your mail app should open — please <strong>press Send</strong> so the message reaches{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </>
          )}
        </p>
        {submitWarning && deliveryMethod === 'mailto' && (
          <p className="account-form-note" style={{ marginTop: 12, color: 'rgba(255, 200, 100, 0.85)' }}>
            Note: {submitWarning}
          </p>
        )}
        <button type="button" className="btn btn-outline" onClick={resetForm}>
          Submit another file
        </button>
      </div>
    )
  }

  const isLastStep = step === STEPS.length - 1

  return (
    <div className="account-form-block onboarding-wizard" id="open-account">
      {heading && <h2>{heading}</h2>}
      {subheading && <p className="account-form-lead">{subheading}</p>}

      <nav className="onboarding-steps" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`onboarding-steps__item${i === step ? ' onboarding-steps__item--active' : ''}${i < step ? ' onboarding-steps__item--done' : ''}`}
          >
            <span className="onboarding-steps__num">{i + 1}</span>
            <span className="onboarding-steps__label">{s.label}</span>
          </span>
        ))}
      </nav>

      <form onSubmit={isLastStep ? handleSubmit : (e) => e.preventDefault()} className="contact-form-inline account-form">
        {step === 0 && (
          <div className="onboarding-panel">
            <h3 className="onboarding-panel__title">Company &amp; contact</h3>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="name" placeholder="Full name (authorised signatory) *" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="company" placeholder="Legal company name *" value={formData.company} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="tradeName" placeholder="Trade name (if different)" value={formData.tradeName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="registrationNumber" placeholder="Company registration no." value={formData.registrationNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="email" name="email" placeholder="Business email *" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder="Phone / WhatsApp *" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <input type="text" name="country" placeholder="Country of incorporation *" value={formData.country} onChange={handleChange} required />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-panel">
            <h3 className="onboarding-panel__title">Trade mandate</h3>
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
                <input type="text" name="volume" placeholder="Estimated volume (e.g. 20 kg doré / month) *" value={formData.volume} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <select name="incoterm" value={formData.incoterm} onChange={handleChange}>
                  {INCOTERM_OPTIONS.map((opt) => (
                    <option key={opt.value || 'empty'} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="originCountry" placeholder="Gold origin country *" value={formData.originCountry} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="routing" placeholder="Corridor (e.g. Ghana → Dubai CIF)" value={formData.routing} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Brief mandate notes (mine source, purity, timing) — optional here"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-panel">
            <h3 className="onboarding-panel__title">Licensing &amp; compliance contact</h3>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="licenseJurisdiction"
                  placeholder="License jurisdiction (e.g. UAE, DMCC, IFZA) *"
                  value={formData.licenseJurisdiction}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="Trade license number *"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <select name="licenseGoldActivity" value={formData.licenseGoldActivity} onChange={handleChange} required>
                  <option value="yes">License includes gold / precious metals activity</option>
                  <option value="pending">Activity pending / in application</option>
                  <option value="partner">Trading via licensed partner entity</option>
                </select>
              </div>
              <div className="form-group">
                <input type="text" name="freeZone" placeholder="DMCC / Free Zone (if applicable)" value={formData.freeZone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="complianceOfficerName" placeholder="Compliance officer name" value={formData.complianceOfficerName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="email" name="complianceOfficerEmail" placeholder="Compliance officer email" value={formData.complianceOfficerEmail} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-panel">
            <h3 className="onboarding-panel__title">Declarations</h3>
            <p className="onboarding-panel__lead">Required for all B2B gold mandates. Please confirm each statement.</p>
            <ul className="onboarding-declarations">
              {DECLARATIONS.map((d) => (
                <li key={d.key}>
                  <label className="onboarding-checkbox">
                    <input type="checkbox" name={d.key} checked={formData[d.key]} onChange={handleChange} required />
                    <span>{d.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-panel">
            <h3 className="onboarding-panel__title">Review &amp; submit</h3>
            <dl className="onboarding-review">
              <dt>Company</dt>
              <dd>
                {formData.company}
                {formData.tradeName ? ` (${formData.tradeName})` : ''} · {formData.country}
              </dd>
              <dt>Contact</dt>
              <dd>
                {formData.name} · {formData.email} · {formData.phone || '—'}
              </dd>
              <dt>Mandate</dt>
              <dd>
                {labelFor(SERVICE_OPTIONS, formData.service)} — {labelFor(PRODUCT_OPTIONS, formData.product)}
              </dd>
              <dt>Volume / origin</dt>
              <dd>
                {formData.volume} · Origin: {formData.originCountry}
                {formData.routing ? ` · ${formData.routing}` : ''}
              </dd>
              <dt>License</dt>
              <dd>
                {formData.licenseJurisdiction} · {formData.licenseNumber} ({formData.licenseGoldActivity})
              </dd>
              <dt>Declarations</dt>
              <dd>All six confirmations accepted</dd>
            </dl>
            <p className="account-form-note">No documents uploaded in this step — we request files per shipment after approval.</p>
          </div>
        )}

        {stepError && <p className="onboarding-error">{stepError}</p>}

        <div className="onboarding-actions">
          {step > 0 && (
            <button type="button" className="btn btn-outline" onClick={goBack}>
              Back
            </button>
          )}
          {!isLastStep ? (
            <button type="button" className="btn btn-primary" onClick={goNext}>
              Continue
            </button>
          ) : (
            <button type="submit" className="btn btn-primary account-form-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Submit onboarding'}
            </button>
          )}
        </div>

        <p className="account-form-note">
          Submissions go to <strong>{CONTACT_EMAIL}</strong>. Settlement: TT (MT103) only. LBMA discount negotiated per
          mandate after assay.
        </p>
      </form>
    </div>
  )
}
