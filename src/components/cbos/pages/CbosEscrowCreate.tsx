import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BUYER_ARRIVAL_CERT_LABEL,
  CLEARING_AGENTS,
  CLEARING_CERTIFICATE_LABEL,
  DEFAULT_ADMIN_TERMS,
  ESCROW_CREATE_PHASES,
  ESCROW_PARTICIPANT_ROLES,
  RELEASE_DOC_LABELS,
  SELLER_DOC_LABELS,
  escrowFlatStepCount,
  escrowStepMeta,
} from '../../../cbos/escrowDefaults'
import type { CbosCurrency } from '../../../cbos/types'
import { CbosEscrowBanner } from '../CbosEscrowBanner'
import { CbosEscrowDocUpload } from '../escrow/CbosEscrowDocUpload'

type Participant = {
  id: string
  email: string
  phone: string
  role: string
}

const COMMODITIES = [
  { code: 'XAU', label: 'Gold' },
  { code: 'XAG', label: 'Silver' },
  { code: 'XPT', label: 'Platinum' },
]

const INCOTERMS = ['CIF', 'FOB', 'CFR', 'EXW', 'DAP', 'DDP', 'FCA'] as const

const CURRENCIES: CbosCurrency[] = ['USD', 'EUR', 'GBP', 'CHF', 'AED']

const TOTAL_STEPS = escrowFlatStepCount()

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

function defaultDeliveryDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString().slice(0, 10)
}

export function CbosEscrowCreate() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const [title, setTitle] = useState('Gold bullion purchase')
  const [commodity, setCommodity] = useState('XAU')
  const [amount, setAmount] = useState('500')
  const [unit, setUnit] = useState('kg')
  const [value, setValue] = useState('1850000')
  const [currency, setCurrency] = useState<CbosCurrency>('USD')

  const [incoterm, setIncoterm] = useState<(typeof INCOTERMS)[number]>('CIF')
  const [origin, setOrigin] = useState('Peru')
  const [destination, setDestination] = useState('Dubai IFZA')
  const [location, setLocation] = useState('Jebel Ali Port')
  const [deliveryDate, setDeliveryDate] = useState(defaultDeliveryDate)

  const [participants, setParticipants] = useState<Participant[]>([
    { id: uid(), email: '', phone: '', role: 'Buyer' },
    { id: uid(), email: '', phone: '', role: 'Seller' },
    { id: uid(), email: '', phone: '', role: 'Clearing agent' },
  ])

  const [adminTerms, setAdminTerms] = useState(DEFAULT_ADMIN_TERMS)
  const [requireTermsAcceptance, setRequireTermsAcceptance] = useState(true)

  const [sellerDocs, setSellerDocs] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SELLER_DOC_LABELS.map((d) => [d, true])),
  )
  const [sellerUploads, setSellerUploads] = useState<Record<string, string>>({})

  const [clearingAgent, setClearingAgent] = useState<(typeof CLEARING_AGENTS)[number]>('Brinks')
  const [requireBuyerCertUpload, setRequireBuyerCertUpload] = useState(true)

  const [releaseDocs, setReleaseDocs] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(RELEASE_DOC_LABELS.map((d) => [d, true])),
  )

  const { phaseIdx, phase } = escrowStepMeta(step)

  const requiredSellerDocs = useMemo(
    () => SELLER_DOC_LABELS.filter((d) => sellerDocs[d]),
    [sellerDocs],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const addParticipant = () => {
    setParticipants((p) => [...p, { id: uid(), email: '', phone: '', role: 'Inspector' }])
  }

  const updateParticipant = (id: string, patch: Partial<Participant>) => {
    setParticipants((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }

  const removeParticipant = (id: string) => {
    setParticipants((p) => (p.length <= 2 ? p : p.filter((x) => x.id !== id)))
  }

  const submit = () => {
    navigate('/bank/escrows')
  }

  const flatFromPhaseSub = (pi: number, si: number) => {
    let n = 0
    for (let i = 0; i < pi; i++) n += ESCROW_CREATE_PHASES[i].subs.length
    return n + si
  }

  return (
    <div className="cbos-transfers-page cbos-escrow-page">
      <article className="cbos-transfers-card">
        <CbosEscrowBanner
          title="Open escrow"
          subtitle="Open mandate, invite parties, clearing agent delivers certificate to buyer."
        />

        <div className="cbos-transfers-card__body cbos-escrow-create__body">
          <div className="cbos-escrow-create__top">
            <Link to="/bank/escrows" className="cbos-escrow-create__back">
              ← All escrows
            </Link>
          </div>

          <div className="cbos-escrow-create__phase-bar" aria-label="Escrow phases">
            {ESCROW_CREATE_PHASES.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`cbos-escrow-create__phase-pill${i === phaseIdx ? ' is-active' : ''}${i < phaseIdx ? ' is-done' : ''}`}
                onClick={() => setStep(flatFromPhaseSub(i, 0))}
              >
                {p.label}
              </button>
            ))}
          </div>

          <nav className="cbos-escrow-create__steps" aria-label={`${phase.label} steps`}>
            {phase.subs.map((label, i) => {
              const flat = flatFromPhaseSub(phaseIdx, i)
              return (
                <button
                  key={label}
                  type="button"
                  className={flat === step ? 'is-active' : flat < step ? 'is-done' : ''}
                  onClick={() => setStep(flat)}
                >
                  {label}
                </button>
              )
            })}
          </nav>

          {step === 0 ? (
            <section className="cbos-escrow-create__section">
              <h2>Deal metrics</h2>
              <p className="cbos-escrow-create__hint">
                Step 1 of the mandate — buyer funds escrow; seller sees blocked funds until release clears.
              </p>
              <div className="cbos-escrow-create__grid">
                <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
                  <span>Deal title</span>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Commodity</span>
                  <select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
                    {COMMODITIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label} ({c.code})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Quantity</span>
                  <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Unit</span>
                  <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Transaction value</span>
                  <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Currency</span>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value as CbosCurrency)}>
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="cbos-escrow-create__section">
              <h2>Delivery &amp; trade terms</h2>
              <p className="cbos-escrow-create__hint">
                Incoterms, routing and seller&apos;s committed delivery date for the commodity.
              </p>
              <div className="cbos-escrow-create__grid">
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Incoterm</span>
                  <select value={incoterm} onChange={(e) => setIncoterm(e.target.value as (typeof INCOTERMS)[number])}>
                    {INCOTERMS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Delivery date (seller)</span>
                  <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Origin country</span>
                  <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact">
                  <span>Destination</span>
                  <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </label>
                <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
                  <span>Port / location</span>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="cbos-escrow-create__section">
              <h2>Admin framework conditions</h2>
              <p className="cbos-escrow-create__hint">
                Mandate terms every invitee must accept before the escrow becomes active.
              </p>
              <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
                <span>Framework conditions</span>
                <textarea
                  className="cbos-escrow-create__terms"
                  rows={10}
                  value={adminTerms}
                  onChange={(e) => setAdminTerms(e.target.value)}
                />
              </label>
              <label className="cbos-escrow-create__terms-check">
                <input
                  type="checkbox"
                  checked={requireTermsAcceptance}
                  onChange={(e) => setRequireTermsAcceptance(e.target.checked)}
                />
                <span>Require acceptance from all invitees before funding &amp; clearing</span>
              </label>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="cbos-escrow-create__section">
              <h2>Invite parties</h2>
              <p className="cbos-escrow-create__hint">
                Buyer, seller, clearing agent and other roles. Each party accepts framework conditions after invite.
              </p>
              <ul className="cbos-escrow-create__participants">
                {participants.map((p) => (
                  <li key={p.id} className="cbos-escrow-create__participant">
                    <label className="cbos-flow-field cbos-flow-field--compact">
                      <span>Email</span>
                      <input
                        type="email"
                        value={p.email}
                        placeholder="name@company.com"
                        onChange={(e) => updateParticipant(p.id, { email: e.target.value })}
                      />
                    </label>
                    <label className="cbos-flow-field cbos-flow-field--compact">
                      <span>SMS</span>
                      <input
                        type="tel"
                        value={p.phone}
                        placeholder="+971 …"
                        onChange={(e) => updateParticipant(p.id, { phone: e.target.value })}
                      />
                    </label>
                    <label className="cbos-flow-field cbos-flow-field--compact">
                      <span>Role</span>
                      <select value={p.role} onChange={(e) => updateParticipant(p.id, { role: e.target.value })}>
                        {ESCROW_PARTICIPANT_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      className="cbos-escrow-create__remove"
                      onClick={() => removeParticipant(p.id)}
                      aria-label="Remove participant"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="cbos-escrow-create__add" onClick={addParticipant}>
                + Add participant
              </button>
            </section>
          ) : null}

          {step === 4 ? (
            <section className="cbos-escrow-create__section">
              <h2>Seller documents</h2>
              <p className="cbos-escrow-create__hint">
                Required before the clearing agent may take custody of the goods.
              </p>
              <ul className="cbos-escrow-create__checks cbos-escrow-create__checks--docs">
                {SELLER_DOC_LABELS.map((doc) => (
                  <li key={doc}>
                    <label>
                      <input
                        type="checkbox"
                        checked={sellerDocs[doc] ?? false}
                        onChange={(e) => setSellerDocs((d) => ({ ...d, [doc]: e.target.checked }))}
                      />
                      <span>{doc}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {requiredSellerDocs.length > 0 ? (
                <div className="cbos-escrow-create__uploads">
                  <p className="cbos-escrow-create__uploads-label">Reference templates (optional)</p>
                  {requiredSellerDocs.map((doc) => (
                    <CbosEscrowDocUpload
                      key={doc}
                      label={doc}
                      required={false}
                      fileName={sellerUploads[doc]}
                      hint="Admin template for seller"
                      onUpload={(name) => setSellerUploads((u) => ({ ...u, [doc]: name }))}
                      onRemove={() =>
                        setSellerUploads((u) => {
                          const next = { ...u }
                          delete next[doc]
                          return next
                        })
                      }
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {step === 5 ? (
            <section className="cbos-escrow-create__section">
              <h2>Clearing agent</h2>
              <p className="cbos-escrow-create__hint">
                The clearing agent takes custody of the commodity, handles customs/logistics clearance and issues the
                official arrival certificate to the buyer — not a transport carrier.
              </p>
              <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
                <span>Approved clearing agent</span>
                <select
                  value={clearingAgent}
                  onChange={(e) => setClearingAgent(e.target.value as (typeof CLEARING_AGENTS)[number])}
                >
                  {CLEARING_AGENTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
              <div className="cbos-escrow-clearing-chain">
                <div className="cbos-escrow-clearing-chain__step">
                  <span className="cbos-escrow-clearing-chain__num">1</span>
                  <p>
                    <strong>Clearing agent</strong> handles the goods through customs &amp; custody
                  </p>
                </div>
                <div className="cbos-escrow-clearing-chain__step">
                  <span className="cbos-escrow-clearing-chain__num">2</span>
                  <p>
                    <strong>Certificate to buyer</strong> — agent delivers signed arrival certificate
                  </p>
                </div>
                <div className="cbos-escrow-clearing-chain__step">
                  <span className="cbos-escrow-clearing-chain__num">3</span>
                  <p>
                    <strong>Buyer uploads</strong> — seller sees proof the goods arrived
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {step === 6 ? (
            <section className="cbos-escrow-create__section">
              <h2>Arrival certificate</h2>
              <p className="cbos-escrow-create__hint">
                After the clearing agent delivers the certificate to the buyer, the buyer must upload it to the escrow.
                The seller is notified and can verify arrival before release.
              </p>
              <div className="cbos-escrow-create__summary">
                <p>
                  <strong>{CLEARING_CERTIFICATE_LABEL}</strong> — issued by {clearingAgent} to buyer (off-platform or
                  in-app notification).
                </p>
                <p>
                  <strong>{BUYER_ARRIVAL_CERT_LABEL}</strong> — buyer uploads copy; visible to seller immediately.
                </p>
              </div>
              <label className="cbos-escrow-create__terms-check">
                <input
                  type="checkbox"
                  checked={requireBuyerCertUpload}
                  onChange={(e) => setRequireBuyerCertUpload(e.target.checked)}
                />
                <span>Block seller payout until buyer uploads arrival certificate</span>
              </label>
            </section>
          ) : null}

          {step === 7 ? (
            <section className="cbos-escrow-create__section">
              <h2>Release conditions</h2>
              <p className="cbos-escrow-create__hint">
                Final documents after buyer certificate is on file and assay is approved.
              </p>
              <ul className="cbos-escrow-create__checks">
                {RELEASE_DOC_LABELS.map((doc) => (
                  <li key={doc}>
                    <label>
                      <input
                        type="checkbox"
                        checked={releaseDocs[doc] ?? false}
                        onChange={(e) => setReleaseDocs((d) => ({ ...d, [doc]: e.target.checked }))}
                      />
                      <span>{doc}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="cbos-escrow-create__summary">
                <p>
                  <strong>{title}</strong> · {amount} {unit} {commodity} · {incoterm} {origin} → {destination}
                </p>
                <p>
                  Delivery <strong>{deliveryDate}</strong> · Clearing agent <strong>{clearingAgent}</strong>
                </p>
                <p>Buyer must upload arrival certificate before seller release.</p>
              </div>
            </section>
          ) : null}

          <footer className="cbos-escrow-create__foot">
            {step > 0 ? (
              <button type="button" className="cbos-escrow-create__nav" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            {step < TOTAL_STEPS - 1 ? (
              <button type="button" className="cbos-flow__continue" onClick={() => setStep((s) => s + 1)}>
                Continue
              </button>
            ) : (
              <button type="button" className="cbos-flow__continue" onClick={submit}>
                Create escrow &amp; send invites
              </button>
            )}
          </footer>
        </div>
      </article>
    </div>
  )
}
