import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { BtnArrow } from '../BtnArrow'
import { ScrollPolicyReader } from './ScrollPolicyReader'
import { SignatureCapture } from './SignatureCapture'
import { PhoneField } from './PhoneField'
import { AddressAutocomplete } from './AddressAutocomplete'
import { KycDocSlot } from './KycDocSlot'
import { UboIdentityVerify } from './UboIdentityVerify'
import { CONTACT_EMAIL, KYC_ONBOARDING_FILENAME, KYC_ONBOARDING_PDF, LICENSE_NUMBER } from '../../config/site'
import { formatE164, softPhoneStatus } from '../../data/dialCodes'
import { uboOwnershipComplete, uboOwnershipTotal } from '../../lib/uboOwnership'
import {
  ACCOUNT_USE_OPTIONS,
  COUNTERPARTY_ROLE_OPTIONS,
  EMPTY_KYC_FORM,
  EMPTY_UBO,
  EMPTY_UBO_IDENTITY,
  KYC_DOC_SLOTS,
  uboIdentityCaptured,
  type AccountUseCase,
  type KycDocKey,
  type KycFormState,
  type UboIdentity,
} from '../../types/kyc'
import { submitKyc } from '../../utils/submitKyc'
import { revokeUboIdentity } from '../../lib/kycIdCapture'
import { useT } from '../../i18n'

const STEPS = [
  { id: 'company' },
  { id: 'account' },
  { id: 'ubo' },
  { id: 'business' },
  { id: 'compliance' },
  { id: 'policy' },
  { id: 'review' },
  { id: 'identity' },
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

function identityReady(entry: UboIdentity | undefined) {
  return uboIdentityCaptured(entry)
}

export function KycWizard() {
  const { t, interpolate } = useT()
  const navigate = useNavigate()
  const k = t.kyc

  const bankSectionTitle = (role: KycFormState['counterpartyRole']) => {
    if (role === 'seller' || role === 'agent') return k.account.bankSeller
    if (role === 'buyer') return k.account.bankBuyer
    if (role === 'both') return k.account.bankBoth
    return k.account.bankDefault
  }
  const [step, setStep] = useState(() => {
    if (!import.meta.env.DEV || typeof window === 'undefined') return 0
    const wanted = new URLSearchParams(window.location.search).get('step')
    const index = STEPS.findIndex((s) => s.id === wanted)
    return index >= 0 ? index : 0
  })
  const [form, setForm] = useState<KycFormState>({
    ...EMPTY_KYC_FORM,
    ubos: [{ ...EMPTY_UBO }],
    uboIdentities: [{ ...EMPTY_UBO_IDENTITY }],
    kycDocuments: { ...EMPTY_KYC_FORM.kycDocuments },
  })
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
      case 'policy':
        if (!form.policyScrolled) return k.errors.scrollPolicy
        if (!form.policyAccepted) return k.errors.acceptPolicy
        if (!form.signatureDataUrl && !form.policyPdfName) return k.errors.signature
        return null
      case 'company':
        if (!form.packDownloaded) return k.errors.packDownload
        if (!form.companyLegalName || !form.contactName) return k.errors.businessName
        if (!form.contactEmail.trim()) return k.errors.emailRequired
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim()))
          return k.errors.emailInvalid
        if (softPhoneStatus(form.contactPhoneNational) === 'empty') return k.errors.phoneRequired
        if (!form.registrationNumber) return k.errors.addressLicense
        if (!form.registeredAddressPlaceId || !form.registeredAddress) return k.errors.addressPick
        if (!form.incorporationCountry) return k.errors.country
        return null
      case 'account':
        if (form.accountUseCases.length === 0) return k.errors.useCase
        if (form.accountUseCases.includes('other') && !form.accountUseOther.trim())
          return k.errors.otherUse
        if (!form.expectedTurnover.trim()) return k.errors.turnover
        if (!form.counterpartyRole) return k.errors.role
        if (!form.bankAccountHolder || !form.bankName || !form.bankIban || !form.bankCountry)
          return k.errors.bank
        return null
      case 'ubo':
        for (const u of form.ubos) {
          if (!u.name || !u.ownership || !u.dob || !u.nationality || !u.sourceOfWealth)
            return k.errors.uboFields
          if (!u.addressPlaceId || !u.address) return k.errors.uboAddressPick
        }
        if (!uboOwnershipComplete(form.ubos)) return k.errors.uboTotal
        return null
      case 'business':
        if (!form.businessDescription || !form.geoMarkets || !form.companySourceOfFunds)
          return k.errors.businessFunds
        return null
      case 'compliance':
        if (!form.amlProcedures || !form.complianceOfficerName || !form.complianceOfficerEmail)
          return k.errors.aml
        if (!form.authorisedName || !form.authorisedTitle || !form.authorisedDate)
          return k.errors.declaration
        for (const slot of KYC_DOC_SLOTS) {
          if (!form.kycDocuments[slot.key]) {
            const title = k.docs[slot.key as Exclude<KycDocKey, 'onboardingPack'>].title
            return interpolate(k.errors.uploadSlot, { title })
          }
        }
        return null
      case 'identity':
        if (!form.kycDocuments.onboardingPack) return k.errors.onboardingPack
        if (form.ubos.some((_, i) => !identityReady(form.uboIdentities[i])))
          return k.errors.identity
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

  const setDoc = (key: KycDocKey, file: KycFormState['kycDocuments'][KycDocKey]) => {
    patch({ kycDocuments: { ...form.kycDocuments, [key]: file } })
  }

  const handleSubmit = async () => {
    const err = validateStep()
    if (err) {
      setError(err)
      return
    }
    setSubmitting(true)
    setError(null)
    const result = await submitKyc({
      ...form,
      contactPhone: formatE164(form.contactDial, form.contactPhoneNational),
    })
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/onboarding/complete', { replace: true })
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
          <span className="kyc-wizard-meta-label">{k.steps[currentStep.id]}</span>
        </p>
      </div>

      <div className="kyc-wizard-panel">
        {STEPS[step].id === 'policy' ? (
          <>
            <h2 className="kyc-wizard-title">{k.policy.title}</h2>
            <p className="kyc-wizard-lead">
              {interpolate(k.policy.lead, { license: LICENSE_NUMBER })}
            </p>
            <ScrollPolicyReader
              accepted={form.policyAccepted}
              scrolled={form.policyScrolled}
              onAcceptedChange={(v) => patch({ policyAccepted: v })}
              onScrolledChange={(v) => patch({ policyScrolled: v })}
            />
            {form.policyAccepted ? (
              <div className="kyc-wizard-block kyc-wizard-block--sign">
                <h3 className="kyc-wizard-subtitle">{k.policy.signature}</h3>
                <p className="kyc-wizard-block-lead">{k.policy.signatureLead}</p>
                <SignatureCapture
                  mode={form.signatureMode}
                  dataUrl={form.signatureDataUrl}
                  fileName={form.signatureFileName}
                  onModeChange={(signatureMode) => patch({ signatureMode })}
                  onChange={(signatureDataUrl, signatureFileName) =>
                    patch({ signatureDataUrl, signatureFileName, policyPdfName: null })
                  }
                />
                <p className="kyc-signature-or">{t.common.or}</p>
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
                    <strong>{k.policy.uploadPdf}</strong>
                    <span>
                      {form.policyPdfName ? form.policyPdfName : k.policy.uploadPdfHint}
                    </span>
                  </span>
                </label>
              </div>
            ) : null}
          </>
        ) : null}

        {STEPS[step].id === 'company' ? (
          <>
            <h2 className="kyc-wizard-title">{k.company.title}</h2>
            <p className="kyc-wizard-lead">{k.company.lead}</p>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">{k.company.entity}</h3>
              <div className="kyc-grid">
                <Field label={k.company.legalName} id="companyLegalName" required>
                  <input
                    id="companyLegalName"
                    value={form.companyLegalName}
                    onChange={(e) => patch({ companyLegalName: e.target.value })}
                    required
                  />
                </Field>
                <Field label={k.company.tradeName} id="tradeName">
                  <input
                    id="tradeName"
                    value={form.tradeName}
                    onChange={(e) => patch({ tradeName: e.target.value })}
                  />
                </Field>
                <Field label={k.company.representative} id="contactName" required>
                  <input
                    id="contactName"
                    value={form.contactName}
                    onChange={(e) => patch({ contactName: e.target.value })}
                    required
                  />
                </Field>
                <Field label={k.company.email} id="contactEmail" required>
                  <input
                    id="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => patch({ contactEmail: e.target.value })}
                    autoComplete="email"
                    required
                  />
                </Field>
              </div>
            </div>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">{k.company.contactReg}</h3>
              <div className="kyc-grid">
                <Field label={k.company.phone} id="contactPhone" required>
                  <PhoneField
                    id="contactPhone"
                    dial={form.contactDial}
                    national={form.contactPhoneNational}
                    onDial={(contactDial) =>
                      patch({
                        contactDial,
                        contactPhone: formatE164(contactDial, form.contactPhoneNational),
                      })
                    }
                    onNational={(contactPhoneNational) =>
                      patch({
                        contactPhoneNational,
                        contactPhone: formatE164(form.contactDial, contactPhoneNational),
                      })
                    }
                  />
                </Field>
                <Field label={k.company.country} id="incorporationCountry" required>
                  <input
                    id="incorporationCountry"
                    value={form.incorporationCountry}
                    onChange={(e) => patch({ incorporationCountry: e.target.value })}
                    required
                  />
                </Field>
                <Field label={k.company.registration} id="registrationNumber" required>
                  <input
                    id="registrationNumber"
                    value={form.registrationNumber}
                    onChange={(e) => patch({ registrationNumber: e.target.value })}
                    placeholder={interpolate(k.company.registrationPlaceholder, { license: LICENSE_NUMBER })}
                    required
                  />
                </Field>
              </div>
              <Field label={k.company.address} id="registeredAddress" required>
                <AddressAutocomplete
                  id="registeredAddress"
                  value={form.registeredAddress}
                  placeId={form.registeredAddressPlaceId}
                  onChange={({ formatted, placeId }) =>
                    patch({ registeredAddress: formatted, registeredAddressPlaceId: placeId })
                  }
                />
              </Field>
            </div>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">{k.company.packTitle}</h3>
              <p className="kyc-wizard-block-lead">{k.company.packLead}</p>
              <a
                href={KYC_ONBOARDING_PDF}
                download={KYC_ONBOARDING_FILENAME}
                className={`metal-page-btn metal-page-btn--secondary kyc-pack-download${form.packDownloaded ? ' is-done' : ''}`}
                onClick={() => patch({ packDownloaded: true })}
              >
                {form.packDownloaded ? k.company.packDownloaded : k.company.packDownload}
                <BtnArrow />
              </a>
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'account' ? (
          <>
            <h2 className="kyc-wizard-title">{k.account.title}</h2>
            <p className="kyc-wizard-lead">{k.account.lead}</p>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">{k.account.useTitle}</h3>
              <p className="kyc-wizard-block-lead">{k.account.useLead}</p>
              <div className="kyc-check-group">
                {ACCOUNT_USE_OPTIONS.map((opt) => (
                  <label key={opt.id} className="kyc-check">
                    <input
                      type="checkbox"
                      checked={form.accountUseCases.includes(opt.id)}
                      onChange={() => toggleUseCase(opt.id)}
                    />
                    <span>{k.account.use[opt.id]}</span>
                  </label>
                ))}
              </div>
              {form.accountUseCases.includes('other') ? (
                <Field label={k.account.otherUse} id="accountUseOther" required>
                  <input
                    id="accountUseOther"
                    value={form.accountUseOther}
                    onChange={(e) => patch({ accountUseOther: e.target.value })}
                    required
                  />
                </Field>
              ) : null}
            </div>

            <Field label={k.account.turnover} id="expectedTurnover" required>
              <input
                id="expectedTurnover"
                value={form.expectedTurnover}
                onChange={(e) => patch({ expectedTurnover: e.target.value })}
                placeholder={k.account.turnoverPlaceholder}
                required
              />
            </Field>

            <div className="kyc-wizard-block kyc-wizard-block--inline">
              <h3 className="kyc-wizard-subtitle">{k.account.roleTitle}</h3>
              <p className="kyc-wizard-block-lead">{k.account.roleLead}</p>
              <div className="kyc-radio-stack">
                {COUNTERPARTY_ROLE_OPTIONS.map(({ value }) => (
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
                    {k.account.role[value]}
                  </label>
                ))}
              </div>
            </div>

            {form.counterpartyRole ? (
              <div className="kyc-wizard-block kyc-wizard-block--inline">
                <h3 className="kyc-wizard-subtitle">{bankSectionTitle(form.counterpartyRole)}</h3>
                <p className="kyc-wizard-block-lead">{k.account.bankLead}</p>
                <div className="kyc-grid">
                  <Field label={k.account.holder} id="bankAccountHolder" required>
                    <input
                      id="bankAccountHolder"
                      value={form.bankAccountHolder}
                      onChange={(e) => patch({ bankAccountHolder: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label={k.account.bankName} id="bankName" required>
                    <input
                      id="bankName"
                      value={form.bankName}
                      onChange={(e) => patch({ bankName: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label={k.account.iban} id="bankIban" required>
                    <input
                      id="bankIban"
                      value={form.bankIban}
                      onChange={(e) => patch({ bankIban: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label={k.account.swift} id="bankSwift">
                    <input
                      id="bankSwift"
                      value={form.bankSwift}
                      onChange={(e) => patch({ bankSwift: e.target.value })}
                    />
                  </Field>
                  <Field label={k.account.bankCountry} id="bankCountry" required>
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
          </>
        ) : null}

        {STEPS[step].id === 'ubo' ? (
          <>
            <h2 className="kyc-wizard-title">{k.ubo.title}</h2>
            <p className="kyc-wizard-lead">{k.ubo.lead}</p>
            <p className={`kyc-ubo-total${uboOwnershipComplete(form.ubos) ? ' is-ok' : ' is-short'}`}>
              {interpolate(k.ubo.total, {
                pct: uboOwnershipTotal(form.ubos).toFixed(1).replace(/\.0$/, ''),
              })}
              {uboOwnershipComplete(form.ubos) ? k.ubo.complete : k.ubo.mustEqual}
            </p>
            {form.ubos.map((ubo, index) => (
              <article key={index} className="kyc-ubo-card">
                <div className="kyc-ubo-head">
                  <h3>{interpolate(k.ubo.heading, { n: index + 1 })}</h3>
                  {form.ubos.length > 1 ? (
                    <button
                      type="button"
                      className="kyc-ubo-remove"
                      onClick={() => {
                        const identity = form.uboIdentities[index]
                        if (identity) revokeUboIdentity(identity)
                        patch({
                          ubos: form.ubos.filter((_, i) => i !== index),
                          uboIdentities: form.uboIdentities.filter((_, i) => i !== index),
                        })
                      }}
                    >
                      {k.ubo.remove}
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
                    {k.ubo.private}
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
                    {k.ubo.corporate}
                  </label>
                </div>
                <div className="kyc-grid">
                  <Field label={k.ubo.fullName} required>
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
                  <Field label={k.ubo.ownership} required>
                    <input
                      value={ubo.ownership}
                      onChange={(e) => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, ownership: e.target.value }
                        patch({ ubos })
                      }}
                      placeholder={k.ubo.ownershipPlaceholder}
                      required
                    />
                  </Field>
                  <Field label={k.ubo.dob} required>
                    <input
                      value={ubo.dob}
                      onChange={(e) => {
                        const ubos = [...form.ubos]
                        ubos[index] = { ...ubo, dob: e.target.value }
                        patch({ ubos })
                      }}
                      placeholder={k.ubo.dobPlaceholder}
                      required
                    />
                  </Field>
                  <Field label={k.ubo.nationality} required>
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
                <Field label={k.ubo.address} id={`ubo-address-${index}`} required>
                  <AddressAutocomplete
                    id={`ubo-address-${index}`}
                    value={ubo.address}
                    placeId={ubo.addressPlaceId}
                    onChange={({ formatted, placeId }) => {
                      const ubos = [...form.ubos]
                      ubos[index] = { ...ubo, address: formatted, addressPlaceId: placeId }
                      patch({ ubos })
                    }}
                  />
                </Field>
                <Field label={k.ubo.occupation} required>
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
                <Field label={k.ubo.employment}>
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
                <Field label={k.ubo.wealth} required>
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
              onClick={() =>
                patch({
                  ubos: [...form.ubos, { ...EMPTY_UBO }],
                  uboIdentities: [...form.uboIdentities, { ...EMPTY_UBO_IDENTITY }],
                })
              }
            >
              {k.ubo.add}
            </button>
          </>
        ) : null}

        {STEPS[step].id === 'business' ? (
          <>
            <h2 className="kyc-wizard-title">{k.business.title}</h2>
            <Field label={k.business.activities} id="businessDescription" required>
              <textarea
                id="businessDescription"
                rows={4}
                value={form.businessDescription}
                onChange={(e) => patch({ businessDescription: e.target.value })}
                required
              />
            </Field>
            <Field label={k.business.markets} id="geoMarkets" required>
              <input
                id="geoMarkets"
                value={form.geoMarkets}
                onChange={(e) => patch({ geoMarkets: e.target.value })}
                required
              />
            </Field>
            <Field label={k.business.funds} id="companySourceOfFunds" required>
              <textarea
                id="companySourceOfFunds"
                rows={4}
                value={form.companySourceOfFunds}
                onChange={(e) => patch({ companySourceOfFunds: e.target.value })}
                placeholder={k.business.fundsPlaceholder}
                required
              />
            </Field>
            <div className="kyc-grid">
              <Field label={k.business.revenue} id="annualRevenue">
                <input
                  id="annualRevenue"
                  value={form.annualRevenue}
                  onChange={(e) => patch({ annualRevenue: e.target.value })}
                />
              </Field>
              <Field label={k.business.tax} id="annualTaxPaid">
                <input
                  id="annualTaxPaid"
                  value={form.annualTaxPaid}
                  onChange={(e) => patch({ annualTaxPaid: e.target.value })}
                />
              </Field>
              <Field label={k.business.auditorFirm} id="auditorFirm">
                <input
                  id="auditorFirm"
                  value={form.auditorFirm}
                  onChange={(e) => patch({ auditorFirm: e.target.value })}
                  placeholder={k.business.ifApplicable}
                />
              </Field>
              <Field label={k.business.auditorName} id="auditorName">
                <input
                  id="auditorName"
                  value={form.auditorName}
                  onChange={(e) => patch({ auditorName: e.target.value })}
                />
              </Field>
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'compliance' ? (
          <>
            <h2 className="kyc-wizard-title">{k.compliance.title}</h2>
            <Field label={k.compliance.aml} id="amlProcedures" required>
              <textarea
                id="amlProcedures"
                rows={4}
                value={form.amlProcedures}
                onChange={(e) => patch({ amlProcedures: e.target.value })}
                required
              />
            </Field>
            <div className="kyc-grid">
              <Field label={k.compliance.officer} id="complianceOfficerName" required>
                <input
                  id="complianceOfficerName"
                  value={form.complianceOfficerName}
                  onChange={(e) => patch({ complianceOfficerName: e.target.value })}
                  required
                />
              </Field>
              <Field label={k.compliance.officerEmail} id="complianceOfficerEmail" required>
                <input
                  id="complianceOfficerEmail"
                  type="email"
                  value={form.complianceOfficerEmail}
                  onChange={(e) => patch({ complianceOfficerEmail: e.target.value })}
                  required
                />
              </Field>
            </div>
            <h3 className="kyc-wizard-subtitle">{k.compliance.declaration}</h3>
            <div className="kyc-grid">
              <Field label={k.compliance.signatory} id="authorisedName" required>
                <input
                  id="authorisedName"
                  value={form.authorisedName}
                  onChange={(e) => patch({ authorisedName: e.target.value })}
                  required
                />
              </Field>
              <Field label={k.compliance.titleField} id="authorisedTitle" required>
                <input
                  id="authorisedTitle"
                  value={form.authorisedTitle}
                  onChange={(e) => patch({ authorisedTitle: e.target.value })}
                  required
                />
              </Field>
              <Field label={k.compliance.date} id="authorisedDate" required>
                <input
                  id="authorisedDate"
                  value={form.authorisedDate}
                  onChange={(e) => patch({ authorisedDate: e.target.value })}
                  placeholder={k.compliance.datePlaceholder}
                  required
                />
              </Field>
            </div>
            <p className="kyc-declaration-text">{k.compliance.declarationText}</p>
            <div className="kyc-doc-slots">
              {KYC_DOC_SLOTS.map((slot) => {
                const copy = k.docs[slot.key as Exclude<KycDocKey, 'onboardingPack'>]
                return (
                  <KycDocSlot
                    key={slot.key}
                    id={`kyc-doc-${slot.key}`}
                    title={copy.title}
                    hint={copy.hint}
                    file={form.kycDocuments[slot.key]}
                    onFile={(file) => setDoc(slot.key, file)}
                  />
                )
              })}
            </div>
          </>
        ) : null}

        {STEPS[step].id === 'review' ? (
          <>
            <h2 className="kyc-wizard-title">{k.review.title}</h2>
            <dl className="kyc-review">
              <dt>{k.review.company}</dt>
              <dd>{form.companyLegalName}</dd>
              <dt>{k.review.contact}</dt>
              <dd>
                {form.contactName} · {form.contactEmail}
              </dd>
              <dt>{k.review.accountUse}</dt>
              <dd>
                {form.accountUseCases.map((id) => k.account.use[id]).join(' · ')}
                {form.accountUseOther ? ` (${form.accountUseOther})` : ''}
              </dd>
              <dt>{k.review.turnover}</dt>
              <dd>{interpolate(k.review.turnoverValue, { value: form.expectedTurnover || '—' })}</dd>
              <dt>{k.review.roleBank}</dt>
              <dd>
                {form.counterpartyRole || '—'} · {form.bankName || '—'} ({form.bankCountry || '—'})
              </dd>
              <dt>{k.review.funds}</dt>
              <dd>
                {form.companySourceOfFunds.length > 120
                  ? `${form.companySourceOfFunds.slice(0, 120)}…`
                  : form.companySourceOfFunds}
              </dd>
              <dt>{k.review.revenueTax}</dt>
              <dd>
                {interpolate(k.review.revenueTaxValue, {
                  revenue: form.annualRevenue || '—',
                  tax: form.annualTaxPaid || '—',
                })}
              </dd>
              <dt>{k.review.ubos}</dt>
              <dd>
                {form.ubos.length} · {uboOwnershipTotal(form.ubos).toFixed(0)}%
              </dd>
              <dt>{k.review.documents}</dt>
              <dd>
                {interpolate(k.review.documentsValue, {
                  have: KYC_DOC_SLOTS.filter((slot) => form.kycDocuments[slot.key]).length,
                  need: KYC_DOC_SLOTS.length,
                })}
              </dd>
              <dt>{k.review.policies}</dt>
              <dd>{k.review.policiesValue}</dd>
            </dl>
          </>
        ) : null}

        {STEPS[step].id === 'identity' ? (
          <>
            <h2 className="kyc-wizard-title">{k.identity.title}</h2>
            <p className="kyc-wizard-lead">{k.identity.lead}</p>
            <KycDocSlot
              id="kyc-doc-onboarding"
              title={k.identity.packTitle}
              hint={k.identity.packHint}
              file={form.kycDocuments.onboardingPack}
              onFile={(file) => setDoc('onboardingPack', file)}
            />
            {form.ubos.map((ubo, index) => (
              <UboIdentityVerify
                key={index}
                uboName={ubo.name || interpolate(k.ubo.heading, { n: index + 1 })}
                value={form.uboIdentities[index] ?? { ...EMPTY_UBO_IDENTITY }}
                onChange={(next) => {
                  const uboIdentities = [...form.uboIdentities]
                  uboIdentities[index] = next
                  patch({ uboIdentities })
                }}
              />
            ))}
          </>
        ) : null}
      </div>

      {error ? <p className="kyc-error">{error}</p> : null}

      <div className="kyc-wizard-actions">
        {step > 0 ? (
          <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={back}>
            {k.actions.back}
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            className="metal-page-btn metal-page-btn--primary"
            onClick={next}
            disabled={STEPS[step].id === 'company' && !form.packDownloaded}
          >
            {k.actions.continue}
            <BtnArrow />
          </button>
        ) : (
          <button
            type="button"
            className="metal-page-btn metal-page-btn--primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? k.actions.submitting : k.actions.submit}
            <BtnArrow />
          </button>
        )}
      </div>

      <p className="kyc-footnote">
        {interpolate(k.actions.footnote, { email: CONTACT_EMAIL })}
      </p>
    </div>
  )
}
