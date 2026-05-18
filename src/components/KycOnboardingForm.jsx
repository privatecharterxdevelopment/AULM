import { useState } from 'react'
import { CONTACT_EMAIL, LICENSE_NUMBER } from '../config/site'
import { submitInquiry } from '../utils/submitInquiry'

const EMPTY_UBO = {
  type: 'private',
  name: '',
  dob: '',
  nationality: '',
  address: '',
  ownership: '',
  occupation: '',
  employment: '',
  sourceOfWealth: '',
}

const EMPTY_FORM = {
  companyLegalName: '',
  tradeName: '',
  registrationNumber: '',
  incorporationCountry: '',
  registeredAddress: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  businessDescription: '',
  geoMarkets: '',
  annualRevenue: '',
  amlProcedures: '',
  complianceOfficerName: '',
  complianceOfficerEmail: '',
  authorisedName: '',
  authorisedTitle: '',
  authorisedDate: '',
}

function formatUboBlock(ubo, index) {
  const lines = [
    `UBO ${index + 1} (${ubo.type === 'corporate' ? 'Corporate' : 'Private'})`,
    `Name: ${ubo.name}`,
    `DOB: ${ubo.dob}`,
    `Nationality: ${ubo.nationality}`,
    `Address: ${ubo.address}`,
    `Ownership %: ${ubo.ownership}`,
    `Occupation: ${ubo.occupation}`,
    `Employment (5y): ${ubo.employment || '—'}`,
    `Source of wealth: ${ubo.sourceOfWealth}`,
  ]
  return lines.join('\n')
}

function buildPayload(form, ubos) {
  const flat = {
    'Company legal name': form.companyLegalName,
    'Trade name': form.tradeName || '—',
    'Registration no.': form.registrationNumber,
    'Country of incorporation': form.incorporationCountry,
    'Registered address': form.registeredAddress,
    'Primary contact': form.contactName,
    'Contact email': form.contactEmail,
    'Contact phone': form.contactPhone || '—',
    'Business activities': form.businessDescription,
    'Geographic markets': form.geoMarkets,
    'Annual revenue (USD)': form.annualRevenue || '—',
    'AML/CFT procedures': form.amlProcedures,
    'Compliance officer': form.complianceOfficerName,
    'Compliance email': form.complianceOfficerEmail,
    'Authorised signatory': form.authorisedName,
    'Signatory title': form.authorisedTitle,
    'Declaration date': form.authorisedDate,
    'UBO count': String(ubos.length),
  }

  ubos.forEach((ubo, i) => {
    flat[`UBO ${i + 1} summary`] = `${ubo.name} — ${ubo.ownership}% (${ubo.type})`
  })

  const bodyLines = [
    'KYB / UBO Onboarding',
    `IFZA License ${LICENSE_NUMBER}`,
    '',
    `Company: ${form.companyLegalName}`,
    `Registration: ${form.registrationNumber} · ${form.incorporationCountry}`,
    `Contact: ${form.contactName} <${form.contactEmail}>`,
    '',
    '— UBOs —',
    ...ubos.map((u, i) => formatUboBlock(u, i)),
    '',
    '— Business —',
    form.businessDescription,
    `Markets: ${form.geoMarkets}`,
    `Revenue: ${form.annualRevenue || '—'}`,
    '',
    '— AML —',
    form.amlProcedures,
    `Officer: ${form.complianceOfficerName} (${form.complianceOfficerEmail})`,
    '',
    `Signed: ${form.authorisedName}, ${form.authorisedTitle} · ${form.authorisedDate}`,
  ]

  return { flat, bodyLines }
}

export default function KycOnboardingForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [ubos, setUbos] = useState([{ ...EMPTY_UBO }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState(null)
  const [error, setError] = useState(null)

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUboChange = (index, field, value) => {
    setUbos((prev) => prev.map((ubo, i) => (i === index ? { ...ubo, [field]: value } : ubo)))
  }

  const addUbo = () => setUbos((prev) => [...prev, { ...EMPTY_UBO }])

  const removeUbo = (index) => {
    if (ubos.length <= 1) return
    setUbos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const { flat, bodyLines } = buildPayload(form, ubos)
    const subject = `AULM KYB / UBO — ${form.companyLegalName}`

    try {
      const result = await submitInquiry({
        formType: 'kyc-onboarding',
        subject,
        data: flat,
        bodyLines,
      })
      setDeliveryMethod(result.delivered)
      setIsSubmitted(true)
    } catch (err) {
      setError(err.message || 'Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="account-form-success">
        <h3>{deliveryMethod === 'server' ? 'KYC form sent' : 'Complete your email'}</h3>
        <p>
          {deliveryMethod === 'server' ? (
            <>
              Delivered to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Our compliance desk will
              review within two business days.
            </>
          ) : (
            <>
              Your mail app should open — please <strong>press Send</strong> so the KYB reaches{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </>
          )}
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setIsSubmitted(false)
            setDeliveryMethod(null)
            setForm(EMPTY_FORM)
            setUbos([{ ...EMPTY_UBO }])
          }}
        >
          Submit another form
        </button>
      </div>
    )
  }

  return (
    <div className="account-form-block kyc-form-block">
      <form onSubmit={handleSubmit} className="contact-form-inline account-form kyc-form">
        <div className="kyc-notice">
          <strong>Know Your Business (KYB)</strong> — for approved institutional mandates only. A UBO is any
          natural person who directly or indirectly owns or controls ≥25% of shares or voting rights. Fields
          marked * are required. IFZA License No. {LICENSE_NUMBER}.
        </div>

        <fieldset className="kyc-fieldset">
          <legend>Company</legend>
          <div className="form-row">
            <div className="form-group">
              <label className="kyc-label" htmlFor="companyLegalName">
                Legal entity name *
              </label>
              <input
                id="companyLegalName"
                type="text"
                name="companyLegalName"
                value={form.companyLegalName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="kyc-label" htmlFor="tradeName">
                Trade name
              </label>
              <input id="tradeName" type="text" name="tradeName" value={form.tradeName} onChange={handleFormChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="kyc-label" htmlFor="registrationNumber">
                Registration / license no. *
              </label>
              <input
                id="registrationNumber"
                type="text"
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="kyc-label" htmlFor="incorporationCountry">
                Country of incorporation *
              </label>
              <input
                id="incorporationCountry"
                type="text"
                name="incorporationCountry"
                value={form.incorporationCountry}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="kyc-label" htmlFor="registeredAddress">
              Registered address *
            </label>
            <input
              id="registeredAddress"
              type="text"
              name="registeredAddress"
              value={form.registeredAddress}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="kyc-label" htmlFor="contactName">
                Primary contact *
              </label>
              <input
                id="contactName"
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="kyc-label" htmlFor="contactEmail">
                Business email *
              </label>
              <input
                id="contactEmail"
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="kyc-label" htmlFor="contactPhone">
              Phone / WhatsApp
            </label>
            <input
              id="contactPhone"
              type="tel"
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        <fieldset className="kyc-fieldset">
          <legend>Ultimate beneficial owner(s)</legend>
          {ubos.map((ubo, index) => (
            <article key={index} className="kyc-ubo-card">
              <div className="kyc-ubo-card-head">
                <h3>UBO {index + 1}</h3>
                {ubos.length > 1 && (
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => removeUbo(index)}>
                    Remove
                  </button>
                )}
              </div>
              <div className="kyc-radio-row">
                <label>
                  <input
                    type="radio"
                    name={`ubo-type-${index}`}
                    checked={ubo.type === 'private'}
                    onChange={() => handleUboChange(index, 'type', 'private')}
                  />
                  Private individual
                </label>
                <label>
                  <input
                    type="radio"
                    name={`ubo-type-${index}`}
                    checked={ubo.type === 'corporate'}
                    onChange={() => handleUboChange(index, 'type', 'corporate')}
                  />
                  Corporate entity
                </label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="kyc-label">Full legal name *</label>
                  <input
                    type="text"
                    value={ubo.name}
                    onChange={(e) => handleUboChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="kyc-label">Ownership % *</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 25"
                    value={ubo.ownership}
                    onChange={(e) => handleUboChange(index, 'ownership', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="kyc-label">Date of birth *</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={ubo.dob}
                    onChange={(e) => handleUboChange(index, 'dob', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="kyc-label">Nationality *</label>
                  <input
                    type="text"
                    value={ubo.nationality}
                    onChange={(e) => handleUboChange(index, 'nationality', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="kyc-label">Residential address *</label>
                <input
                  type="text"
                  value={ubo.address}
                  onChange={(e) => handleUboChange(index, 'address', e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="kyc-label">Occupation *</label>
                  <input
                    type="text"
                    value={ubo.occupation}
                    onChange={(e) => handleUboChange(index, 'occupation', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="kyc-label">Employment history (last 5 years)</label>
                <textarea
                  rows={3}
                  value={ubo.employment}
                  onChange={(e) => handleUboChange(index, 'employment', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="kyc-label">Source of wealth *</label>
                <textarea
                  rows={3}
                  value={ubo.sourceOfWealth}
                  onChange={(e) => handleUboChange(index, 'sourceOfWealth', e.target.value)}
                  required
                />
              </div>
            </article>
          ))}
          <button type="button" className="btn btn-outline kyc-add-ubo" onClick={addUbo}>
            + Add UBO
          </button>
        </fieldset>

        <fieldset className="kyc-fieldset">
          <legend>Business activity</legend>
          <div className="form-group">
            <label className="kyc-label" htmlFor="businessDescription">
              Description of activities *
            </label>
            <textarea
              id="businessDescription"
              name="businessDescription"
              rows={4}
              value={form.businessDescription}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="kyc-label" htmlFor="geoMarkets">
                Geographic markets *
              </label>
              <input
                id="geoMarkets"
                type="text"
                name="geoMarkets"
                value={form.geoMarkets}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="kyc-label" htmlFor="annualRevenue">
                Annual revenue (USD)
              </label>
              <input
                id="annualRevenue"
                type="text"
                name="annualRevenue"
                value={form.annualRevenue}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="kyc-fieldset">
          <legend>AML / compliance</legend>
          <div className="form-group">
            <label className="kyc-label" htmlFor="amlProcedures">
              AML/CFT procedures in place *
            </label>
            <textarea
              id="amlProcedures"
              name="amlProcedures"
              rows={4}
              value={form.amlProcedures}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="kyc-label" htmlFor="complianceOfficerName">
                Compliance officer *
              </label>
              <input
                id="complianceOfficerName"
                type="text"
                name="complianceOfficerName"
                value={form.complianceOfficerName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="kyc-label" htmlFor="complianceOfficerEmail">
                Officer email *
              </label>
              <input
                id="complianceOfficerEmail"
                type="email"
                name="complianceOfficerEmail"
                value={form.complianceOfficerEmail}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="kyc-fieldset">
          <legend>Declaration</legend>
          <div className="form-group">
            <label className="kyc-label" htmlFor="authorisedName">
              Authorised signatory *
            </label>
            <input
              id="authorisedName"
              type="text"
              name="authorisedName"
              value={form.authorisedName}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="kyc-label" htmlFor="authorisedTitle">
                Title *
              </label>
              <input
                id="authorisedTitle"
                type="text"
                name="authorisedTitle"
                value={form.authorisedTitle}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="kyc-label" htmlFor="authorisedDate">
                Date *
              </label>
              <input
                id="authorisedDate"
                type="text"
                name="authorisedDate"
                placeholder="DD/MM/YYYY"
                value={form.authorisedDate}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <p className="kyc-declaration">
            I declare that the information provided is true and complete. I authorise AULM to verify this
            information for AML/CFT and OECD due diligence purposes.
          </p>
        </fieldset>

        {error && <p className="kyc-form-error">{error}</p>}

        <div className="kyc-form-actions">
          <button type="button" className="btn btn-outline" onClick={() => window.print()}>
            Print / save PDF
          </button>
          <button type="submit" className="btn btn-primary account-form-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Submit KYB to AULM'}
          </button>
        </div>

        <p className="account-form-note">
          Confidential · {CONTACT_EMAIL} · Submissions use the same delivery as open-account inquiries (Postmark
          when configured, otherwise your mail app).
        </p>
      </form>
    </div>
  )
}
