import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { BtnArrow } from '../BtnArrow'
import { PasswordInput } from '../PasswordInput'
import { ScrollPolicyReader } from './ScrollPolicyReader'
import { SignatureCapture } from './SignatureCapture'
import { CONTACT_EMAIL, LICENSE_NUMBER } from '../../config/site'
import {
  ACCOUNT_USE_OPTIONS,
  EMPTY_KYC_FORM,
  EMPTY_UBO,
  type AccountUseCase,
  type KycFormState,
} from '../../types/kyc'
import { useAuth } from '../../auth/AuthContext'
import { submitOnboarding } from '../../utils/submitOnboarding'

const STEPS = [
  { id: 'credentials', label: 'Login' },
  { id: 'company', label: 'Your business' },
  { id: 'account', label: 'Account' },
  { id: 'ubo', label: 'UBOs' },
  { id: 'business', label: 'Business' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'policy', label: 'Policies' },
  { id: 'review', label: 'Review' },
] as const

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string
  id?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="kyc-field">
      <label className="kyc-label" htmlFor={id}>
        {label}
        {required ? ' *' : ''}
      </label>
      {children}
    </div>
  )
}

function bankSectionTitle(role: KycFormState['counterpartyRole']) {
  if (role === 'seller') return 'Seller bank account'
  if (role === 'buyer') return 'Buyer bank account'
  if (role === 'both') return 'Settlement bank account'
  return 'Bank account'
}

export function KycWizard() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<KycFormState>({ ...EMPTY_KYC_FORM, ubos: [{ ...EMPTY_UBO }] })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const patch = (partial: Partial<KycFormState>) => setForm((f) => ({ ...f, ...partial }))

  const toggleUseCase = (id: AccountUseCase) => {
    const next = form.accountUseCases.includes(id)
      ? form.accountUseCases.filter((c) => c !== id)
      : [...form.accountUseCases, id]
    patch({ accountUseCases: next })
  }

  const progress = ((step + 1) / STEPS.length) * 100

  const validateStep = (): string | null => {
    switch (STEPS[step].id) {
      case 'credentials':
        if (!form.contactEmail.trim()) return 'Business email is required.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim()))
          return 'Enter a valid business email.'
        if (form.password.length < 8) return 'Password must be at least 8 characters.'
        if (form.password !== form.passwordConfirm) return 'Passwords do not match.'
        return null
      case 'policy':
        if (!form.policyScrolled) return 'Please scroll through the full policy document.'
        if (!form.policyAccepted) return 'Please accept the policies to continue.'
        if (!form.signatureDataUrl && !form.policyPdfName)
          return 'Please draw, upload your signature, or attach a signed policy PDF.'
        return null
      case 'company':
        if (!form.companyLegalName || !form.contactName)
          return 'Business name and representative are required.'
        if (!form.contactPhone || !form.registeredAddress || !form.registrationNumber)
          return 'Phone, address, and license / registration number are required.'
        if (!form.incorporationCountry) return 'Country of incorporation is required.'
        return null
      case 'account':
        if (form.accountUseCases.length === 0)
          return 'Select at least one primary use for your AULM account.'
        if (form.accountUseCases.includes('other') && !form.accountUseOther.trim())
          return 'Please specify your other account use.'
        if (!form.expectedTurnover.trim()) return 'Expected turnover is required.'
        if (!form.counterpartyRole) return 'Please indicate whether you act as seller, buyer, or both.'
        if (!form.bankAccountHolder || !form.bankName || !form.bankIban || !form.bankCountry)
          return 'Complete all required bank account fields.'
        if (form.aucbOpenAccount === null)
          return 'Please indicate whether you are interested in an AUCB account.'
        return null
      case 'ubo':
        for (const u of form.ubos) {
          if (!u.name || !u.ownership || !u.dob || !u.nationality || !u.address || !u.sourceOfWealth)
            return 'Complete all required UBO fields.'
        }
        return null
      case 'business':
        if (!form.businessDescription || !form.geoMarkets || !form.companySourceOfFunds)
          return 'Describe your business and source of funds.'
        return null
      case 'compliance':
        if (!form.amlProcedures || !form.complianceOfficerName || !form.complianceOfficerEmail)
          return 'AML / compliance details are required.'
        if (!form.authorisedName || !form.authorisedTitle || !form.authorisedDate)
          return 'Declaration signatory details are required.'
        return null
      default:
        return null
    }
  }

  const next = () => {
    const err = validateStep()
    if (err) {
      setError(err)
      return
    }
    setError(null)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const back = () => {
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  const onDocs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    patch({
      uploadedDocuments: [
        ...form.uploadedDocuments,
        ...files.map((f) => ({ name: f.name, size: f.size })),
      ],
    })
    e.target.value = ''
  }

  const handleSubmit = async () => {
    const err = validateStep()
    if (err) {
      setError(err)
      return
    }
    setSubmitting(true)
    setError(null)
    const result = await submitOnboarding(form, signUp)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/bank', { replace: true })
  }

  const currentStep = STEPS[step]

  return (
    <div className="kyc-wizard">
      <div className="kyc-wizard-top">
        <div className="kyc-wizard-progress" aria-hidden>
          <div className="kyc-wizard-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="kyc-wizard-meta" aria-live="polite">
          <span className="kyc-wizard-meta-count">
            {step + 1} / {STEPS.length}
          </span>
          <span className="kyc-wizard-meta-label">{currentStep.label}</span>
        </p>
      </div>

      <div className="kyc-wizard-panel">
        {STEPS[step].id === 'credentials' ? (
          <>
            <h2 className="kyc-wizard-title">Create your login</h2>
            <p className="kyc-wizard-lead">
              This email and password are your institutional dashboard access — one account for
              KYC, trading, and logistics.
            </p>
            <Field label="Business email" id="contactEmail" required>
              <input
                id="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={(e) => patch({ contactEmail: e.target.value })}
                autoComplete="email"
                required
              />
            </Field>
            <div className="kyc-grid">
              <Field label="Password" id="password" required>
                <PasswordInput
                  id="password"
                  value={form.password}
                  onChange={(v) => patch({ password: v })}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </Field>
              <Field label="Confirm password" id="passwordConfirm" required>
                <PasswordInput
                  id="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={(v) => patch({ passwordConfirm: v })}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </Field>
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'policy' ? (
          <>
            <h2 className="kyc-wizard-title">Responsible sourcing &amp; compliance</h2>
            <p className="kyc-wizard-lead">
              Read the full policy below. IFZA License {LICENSE_NUMBER}.
            </p>
            <ScrollPolicyReader
              accepted={form.policyAccepted}
              scrolled={form.policyScrolled}
              onAcceptedChange={(v) => patch({ policyAccepted: v })}
              onScrolledChange={(v) => patch({ policyScrolled: v })}
            />
            {form.policyAccepted ? (
              <div className="kyc-wizard-block kyc-wizard-block--sign">
                <h3 className="kyc-wizard-subtitle">Your signature</h3>
                <p className="kyc-wizard-block-lead">
                  Draw, upload an image, or attach a signed PDF.
                </p>
                <SignatureCapture
                  mode={form.signatureMode}
                  dataUrl={form.signatureDataUrl}
                  fileName={form.signatureFileName}
                  onModeChange={(signatureMode) => patch({ signatureMode })}
                  onChange={(signatureDataUrl, signatureFileName) =>
                    patch({ signatureDataUrl, signatureFileName, policyPdfName: null })
                  }
                />
                <p className="kyc-signature-or">or</p>
                <label className="kyc-docs-upload">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        patch({
                          policyPdfName: file.name,
                          signatureDataUrl: null,
                          signatureFileName: null,
                        })
                      }
                      e.target.value = ''
                    }}
                  />
                  <span className="kyc-docs-upload-inner">
                    <strong>Upload signed policy PDF</strong>
                    <span>
                      {form.policyPdfName
                        ? form.policyPdfName
                        : 'Fully executed acknowledgment document'}
                    </span>
                  </span>
                </label>
              </div>
            ) : null}
          </>
        ) : null}

        {STEPS[step].id === 'company' ? (
          <>
            <h2 className="kyc-wizard-title">Your business</h2>
            <p className="kyc-wizard-lead">
              Start with standard KYB details — policies and signature come later.
            </p>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">Entity &amp; representative</h3>
              <div className="kyc-grid">
                <Field label="Legal business name" id="companyLegalName" required>
                  <input
                    id="companyLegalName"
                    value={form.companyLegalName}
                    onChange={(e) => patch({ companyLegalName: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Trade name (if different)" id="tradeName">
                  <input
                    id="tradeName"
                    value={form.tradeName}
                    onChange={(e) => patch({ tradeName: e.target.value })}
                  />
                </Field>
                <Field label="Authorised representative" id="contactName" required>
                  <input
                    id="contactName"
                    value={form.contactName}
                    onChange={(e) => patch({ contactName: e.target.value })}
                    required
                  />
                </Field>
              </div>
              {form.contactEmail ? (
                <p className="kyc-wizard-block-lead">
                  Login email: <strong>{form.contactEmail}</strong>
                </p>
              ) : null}
            </div>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">Contact &amp; registration</h3>
              <div className="kyc-grid">
                <Field label="Phone / WhatsApp" id="contactPhone" required>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => patch({ contactPhone: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Country of incorporation" id="incorporationCountry" required>
                  <input
                    id="incorporationCountry"
                    value={form.incorporationCountry}
                    onChange={(e) => patch({ incorporationCountry: e.target.value })}
                    required
                  />
                </Field>
                <Field label="License / registration no." id="registrationNumber" required>
                  <input
                    id="registrationNumber"
                    value={form.registrationNumber}
                    onChange={(e) => patch({ registrationNumber: e.target.value })}
                    placeholder={`e.g. IFZA ${LICENSE_NUMBER}`}
                    required
                  />
                </Field>
              </div>
              <Field label="Registered address" id="registeredAddress" required>
                <input
                  id="registeredAddress"
                  value={form.registeredAddress}
                  onChange={(e) => patch({ registeredAddress: e.target.value })}
                  required
                />
              </Field>
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'account' ? (
          <>
            <h2 className="kyc-wizard-title">Account &amp; banking</h2>
            <p className="kyc-wizard-lead">
              How you plan to use AULM and where settlements should be routed.
            </p>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">Primary account use</h3>
              <p className="kyc-wizard-block-lead">Select all that apply.</p>
              <div className="kyc-check-group">
                {ACCOUNT_USE_OPTIONS.map((opt) => (
                  <label key={opt.id} className="kyc-check">
                    <input
                      type="checkbox"
                      checked={form.accountUseCases.includes(opt.id)}
                      onChange={() => toggleUseCase(opt.id)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {form.accountUseCases.includes('other') ? (
                <Field label="Other use (please specify)" id="accountUseOther" required>
                  <input
                    id="accountUseOther"
                    value={form.accountUseOther}
                    onChange={(e) => patch({ accountUseOther: e.target.value })}
                    required
                  />
                </Field>
              ) : null}
            </div>

            <Field label="Expected turnover (USD / year)" id="expectedTurnover" required>
              <input
                id="expectedTurnover"
                value={form.expectedTurnover}
                onChange={(e) => patch({ expectedTurnover: e.target.value })}
                placeholder="e.g. 5,000,000"
                required
              />
            </Field>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">Your role in transactions</h3>
              <p className="kyc-wizard-block-lead">
                We use this to label the settlement account below.
              </p>
              <div className="kyc-radio-stack">
                {(
                  [
                    ['seller', 'Seller — we sell commodities to AULM or its clients'],
                    ['buyer', 'Buyer — we purchase commodities from AULM'],
                    ['both', 'Both — we buy and sell through AULM'],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`kyc-radio-card${form.counterpartyRole === value ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="counterpartyRole"
                      checked={form.counterpartyRole === value}
                      onChange={() => patch({ counterpartyRole: value })}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {form.counterpartyRole ? (
              <div className="kyc-wizard-block kyc-wizard-block--inline">
                <h3 className="kyc-wizard-subtitle">{bankSectionTitle(form.counterpartyRole)}</h3>
                <p className="kyc-wizard-block-lead">
                  Account for settlements related to your declared role.
                </p>
                <div className="kyc-grid">
                  <Field label="Account holder" id="bankAccountHolder" required>
                    <input
                      id="bankAccountHolder"
                      value={form.bankAccountHolder}
                      onChange={(e) => patch({ bankAccountHolder: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label="Bank name" id="bankName" required>
                    <input
                      id="bankName"
                      value={form.bankName}
                      onChange={(e) => patch({ bankName: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label="IBAN / account number" id="bankIban" required>
                    <input
                      id="bankIban"
                      value={form.bankIban}
                      onChange={(e) => patch({ bankIban: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label="SWIFT / BIC" id="bankSwift">
                    <input
                      id="bankSwift"
                      value={form.bankSwift}
                      onChange={(e) => patch({ bankSwift: e.target.value })}
                    />
                  </Field>
                  <Field label="Bank country" id="bankCountry" required>
                    <input
                      id="bankCountry"
                      value={form.bankCountry}
                      onChange={(e) => patch({ bankCountry: e.target.value })}
                      required
                    />
                  </Field>
                </div>
              </div>
            ) : null}

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">AUCB — AULM Commodity Bank Corp</h3>
              <p className="kyc-wizard-block-lead">
                Would you like to open a bank account with AUCB when available?
              </p>
              <div className="kyc-radio-grid">
                <label className={`kyc-radio-card${form.aucbOpenAccount === true ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="aucbOpenAccount"
                    checked={form.aucbOpenAccount === true}
                    onChange={() => patch({ aucbOpenAccount: true })}
                  />
                  Yes, register my interest
                </label>
                <label className={`kyc-radio-card${form.aucbOpenAccount === false ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="aucbOpenAccount"
                    checked={form.aucbOpenAccount === false}
                    onChange={() => patch({ aucbOpenAccount: false })}
                  />
                  Not at this time
                </label>
              </div>
              {form.aucbOpenAccount === true ? (
                <div className="kyc-aucb-panel">
                  <span className="kyc-aucb-badge">Coming soon</span>
                  <p className="kyc-aucb-lead">
                    AUCB will offer institutional banking built for commodity flows:
                  </p>
                  <ul className="kyc-aucb-list">
                    <li>Instant transfers</li>
                    <li>Worldwide debit cards</li>
                    <li>Currency switches</li>
                    <li>Deposit accounts</li>
                    <li>Multiple currencies</li>
                    <li>And many more features</li>
                  </ul>
                </div>
              ) : null}
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'ubo' ? (
          <>
            <h2 className="kyc-wizard-title">Ultimate beneficial owners</h2>
            <p className="kyc-wizard-lead">
              Any natural person owning or controlling ≥25% of shares or voting rights.
            </p>
            {form.ubos.map((ubo, index) => (
              <article key={index} className="kyc-ubo-card">
                <div className="kyc-ubo-head">
                  <h3>UBO {index + 1}</h3>
                  {form.ubos.length > 1 ? (
                    <button
                      type="button"
                      className="kyc-ubo-remove"
                      onClick={() =>
                        patch({ ubos: form.ubos.filter((_, i) => i !== index) })
                      }
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="kyc-radio-grid">
                  <label className="kyc-radio">
                    <input
                      type="radio"
                      checked={ubo.type === 'private'}
                      onChange={() => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, type: 'private' }
                        patch({ ubos })
                      }}
                    />
                    Private individual
                  </label>
                  <label className="kyc-radio">
                    <input
                      type="radio"
                      checked={ubo.type === 'corporate'}
                      onChange={() => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, type: 'corporate' }
                        patch({ ubos })
                      }}
                    />
                    Corporate entity
                  </label>
                </div>
                <div className="kyc-grid">
                  <Field label="Full legal name" required>
                    <input
                      value={ubo.name}
                      onChange={(e) => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, name: e.target.value }
                        patch({ ubos })
                      }}
                      required
                    />
                  </Field>
                  <Field label="Ownership %" required>
                    <input
                      value={ubo.ownership}
                      onChange={(e) => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, ownership: e.target.value }
                        patch({ ubos })
                      }}
                      placeholder="e.g. 25"
                      required
                    />
                  </Field>
                  <Field label="Date of birth" required>
                    <input
                      value={ubo.dob}
                      onChange={(e) => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, dob: e.target.value }
                        patch({ ubos })
                      }}
                      placeholder="DD/MM/YYYY"
                      required
                    />
                  </Field>
                  <Field label="Nationality" required>
                    <input
                      value={ubo.nationality}
                      onChange={(e) => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, nationality: e.target.value }
                        patch({ ubos })
                      }}
                      required
                    />
                  </Field>
                </div>
                <Field label="Residential address" required>
                  <input
                    value={ubo.address}
                    onChange={(e) => {
                      const ubos = [...form.ubos]
                      ubos[index] = { ...ubo, address: e.target.value }
                      patch({ ubos })
                    }}
                    required
                  />
                </Field>
                <Field label="Occupation" required>
                  <input
                    value={ubo.occupation}
                    onChange={(e) => {
                      const ubos = [...form.ubos]
                      ubos[index] = { ...ubo, occupation: e.target.value }
                      patch({ ubos })
                    }}
                    required
                  />
                </Field>
                <Field label="Employment history (last 5 years)">
                  <textarea
                    rows={2}
                    value={ubo.employment}
                    onChange={(e) => {
                      const ubos = [...form.ubos]
                      ubos[index] = { ...ubo, employment: e.target.value }
                      patch({ ubos })
                    }}
                  />
                </Field>
                <Field label="Source of wealth" required>
                  <textarea
                    rows={3}
                    value={ubo.sourceOfWealth}
                    onChange={(e) => {
                      const ubos = [...form.ubos]
                      ubos[index] = { ...ubo, sourceOfWealth: e.target.value }
                      patch({ ubos })
                    }}
                    required
                  />
                </Field>
              </article>
            ))}
            <button
              type="button"
              className="metal-page-btn metal-page-btn--secondary"
              onClick={() => patch({ ubos: [...form.ubos, { ...EMPTY_UBO }] })}
            >
              + Add UBO
            </button>
          </>
        ) : null}

        {STEPS[step].id === 'business' ? (
          <>
            <h2 className="kyc-wizard-title">Business &amp; source of funds</h2>
            <Field label="Description of activities" id="businessDescription" required>
              <textarea
                id="businessDescription"
                rows={4}
                value={form.businessDescription}
                onChange={(e) => patch({ businessDescription: e.target.value })}
                required
              />
            </Field>
            <Field label="Geographic markets" id="geoMarkets" required>
              <input
                id="geoMarkets"
                value={form.geoMarkets}
                onChange={(e) => patch({ geoMarkets: e.target.value })}
                required
              />
            </Field>
            <Field label="Company source of funds" id="companySourceOfFunds" required>
              <textarea
                id="companySourceOfFunds"
                rows={4}
                value={form.companySourceOfFunds}
                onChange={(e) => patch({ companySourceOfFunds: e.target.value })}
                placeholder="Describe origin of capital, trading profits, investor funding, etc."
                required
              />
            </Field>
            <div className="kyc-grid">
              <Field label="Annual revenue (USD)" id="annualRevenue">
                <input
                  id="annualRevenue"
                  value={form.annualRevenue}
                  onChange={(e) => patch({ annualRevenue: e.target.value })}
                />
              </Field>
              <Field label="Annual tax paid (USD)" id="annualTaxPaid">
                <input
                  id="annualTaxPaid"
                  value={form.annualTaxPaid}
                  onChange={(e) => patch({ annualTaxPaid: e.target.value })}
                />
              </Field>
              <Field label="Auditor firm" id="auditorFirm">
                <input
                  id="auditorFirm"
                  value={form.auditorFirm}
                  onChange={(e) => patch({ auditorFirm: e.target.value })}
                  placeholder="If applicable"
                />
              </Field>
              <Field label="Lead auditor name" id="auditorName">
                <input
                  id="auditorName"
                  value={form.auditorName}
                  onChange={(e) => patch({ auditorName: e.target.value })}
                />
              </Field>
            </div>
            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">AULM logistics</h3>
              <p className="kyc-wizard-block-lead">Optional — tick if you need us to arrange corridors.</p>
              <div className="kyc-check-group">
                <label className="kyc-check">
                  <input
                    type="checkbox"
                    checked={form.aulmHandlesExport}
                    onChange={(e) => patch({ aulmHandlesExport: e.target.checked })}
                  />
                  <span>AULM should handle export logistics on our behalf</span>
                </label>
                <label className="kyc-check">
                  <input
                    type="checkbox"
                    checked={form.aulmHandlesImport}
                    onChange={(e) => patch({ aulmHandlesImport: e.target.checked })}
                  />
                  <span>AULM should handle import logistics on our behalf</span>
                </label>
              </div>
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'compliance' ? (
          <>
            <h2 className="kyc-wizard-title">AML &amp; compliance</h2>
            <Field label="AML/CFT procedures in place" id="amlProcedures" required>
              <textarea
                id="amlProcedures"
                rows={4}
                value={form.amlProcedures}
                onChange={(e) => patch({ amlProcedures: e.target.value })}
                required
              />
            </Field>
            <div className="kyc-grid">
              <Field label="Compliance officer" id="complianceOfficerName" required>
                <input
                  id="complianceOfficerName"
                  value={form.complianceOfficerName}
                  onChange={(e) => patch({ complianceOfficerName: e.target.value })}
                  required
                />
              </Field>
              <Field label="Officer email" id="complianceOfficerEmail" required>
                <input
                  id="complianceOfficerEmail"
                  type="email"
                  value={form.complianceOfficerEmail}
                  onChange={(e) => patch({ complianceOfficerEmail: e.target.value })}
                  required
                />
              </Field>
            </div>
            <h3 className="kyc-wizard-subtitle">Declaration</h3>
            <div className="kyc-grid">
              <Field label="Authorised signatory" id="authorisedName" required>
                <input
                  id="authorisedName"
                  value={form.authorisedName}
                  onChange={(e) => patch({ authorisedName: e.target.value })}
                  required
                />
              </Field>
              <Field label="Title" id="authorisedTitle" required>
                <input
                  id="authorisedTitle"
                  value={form.authorisedTitle}
                  onChange={(e) => patch({ authorisedTitle: e.target.value })}
                  required
                />
              </Field>
              <Field label="Date" id="authorisedDate" required>
                <input
                  id="authorisedDate"
                  value={form.authorisedDate}
                  onChange={(e) => patch({ authorisedDate: e.target.value })}
                  placeholder="DD/MM/YYYY"
                  required
                />
              </Field>
            </div>
            <p className="kyc-declaration-text">
              I declare that the information provided is true and complete. I authorise AULM to verify this
              information for AML/CFT and OECD due diligence purposes.
            </p>
            <label className="kyc-docs-upload">
              <input type="file" accept="application/pdf" multiple onChange={onDocs} />
              <span className="kyc-docs-upload-inner">
                <strong>Upload supporting PDFs</strong>
                <span>Corporate registry, licences, financials — optional at this stage</span>
              </span>
            </label>
            {form.uploadedDocuments.length > 0 ? (
              <ul className="kyc-docs-list">
                {form.uploadedDocuments.map((d) => (
                  <li key={d.name}>{d.name}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}

        {STEPS[step].id === 'review' ? (
          <>
            <h2 className="kyc-wizard-title">Review &amp; submit</h2>
            <dl className="kyc-review">
              <dt>Company</dt>
              <dd>{form.companyLegalName}</dd>
              <dt>Contact</dt>
              <dd>
                {form.contactName} · {form.contactEmail}
              </dd>
              <dt>Account use</dt>
              <dd>
                {form.accountUseCases
                  .map((id) => ACCOUNT_USE_OPTIONS.find((o) => o.id === id)?.label ?? id)
                  .join(' · ')}
                {form.accountUseOther ? ` (${form.accountUseOther})` : ''}
              </dd>
              <dt>Expected turnover</dt>
              <dd>{form.expectedTurnover || '—'} USD / year</dd>
              <dt>Role / bank</dt>
              <dd>
                {form.counterpartyRole || '—'} · {form.bankName || '—'} ({form.bankCountry || '—'})
              </dd>
              <dt>AUCB interest</dt>
              <dd>
                {form.aucbOpenAccount === true
                  ? 'Yes — coming soon'
                  : form.aucbOpenAccount === false
                    ? 'No'
                    : '—'}
              </dd>
              <dt>Source of funds</dt>
              <dd>
                {form.companySourceOfFunds.length > 120
                  ? `${form.companySourceOfFunds.slice(0, 120)}…`
                  : form.companySourceOfFunds}
              </dd>
              <dt>Revenue / tax</dt>
              <dd>
                {form.annualRevenue || '—'} / {form.annualTaxPaid || '—'} USD
              </dd>
              <dt>UBOs</dt>
              <dd>{form.ubos.length}</dd>
              <dt>AULM logistics</dt>
              <dd>
                Import: {form.aulmHandlesImport ? 'Yes' : 'No'} · Export:{' '}
                {form.aulmHandlesExport ? 'Yes' : 'No'}
              </dd>
              <dt>Policies</dt>
              <dd>Accepted · Signature on file</dd>
            </dl>
          </>
        ) : null}
      </div>

      {error ? <p className="kyc-error">{error}</p> : null}

      <div className="kyc-wizard-actions">
        {step > 0 ? (
          <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={back}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" className="metal-page-btn metal-page-btn--primary" onClick={next}>
            Continue
            <BtnArrow />
          </button>
        ) : (
          <button
            type="button"
            className="metal-page-btn metal-page-btn--primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Opening account…' : 'Submit & open account'}
            <BtnArrow />
          </button>
        )}
      </div>

      <p className="kyc-footnote">
        Confidential · {CONTACT_EMAIL} · Required for trading, payments &amp; logistics mandates.
      </p>
    </div>
  )
}
