import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCbos } from '../../../cbos/context/CbosContext'
import { DEMO_CONTACTS } from '../../../cbos/mocks/demoData'
import { formatMoney } from '../../../cbos/lib/format'
import type { CbosContact, CbosWallet } from '../../../cbos/types'
import { CbosFlowAccountField, walletAvailable } from '../flow/CbosFlowAccountField'
import { CbosFlowPage } from '../flow/CbosFlowPage'

type SendMode = 'quick' | 'international'
type RecipientKind = 'private' | 'business'

function contactPhoto(c: CbosContact): string {
  return c.photoUrl ?? `https://i.pravatar.cc/96?u=${encodeURIComponent(c.id)}`
}

export function CbosSend() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { api } = useCbos()
  const [wallets, setWallets] = useState<CbosWallet[]>([])
  const [fromId, setFromId] = useState('')
  const [mode, setMode] = useState<SendMode>('quick')
  const [selectedContact, setSelectedContact] = useState<string | null>(searchParams.get('to'))
  const [contactBookOpen, setContactBookOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [recipientKind, setRecipientKind] = useState<RecipientKind>('business')
  const [name, setName] = useState(searchParams.get('to') ?? '')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [iban, setIban] = useState(searchParams.get('iban') ?? '')
  const [swift, setSwift] = useState('')
  const [reference, setReference] = useState('')

  useEffect(() => {
    void api.listWallets().then(({ items }) => {
      const usable = items.filter((w) => (w.balances.available ?? 0) > 0)
      setWallets(usable)
      setFromId(usable[0]?.id ?? '')
    })
  }, [api])

  const from = wallets.find((w) => w.id === fromId)
  const contacts = useMemo(() => DEMO_CONTACTS.filter((c) => c.kind !== 'team'), [])
  const quickContacts = contacts.slice(0, 7)

  const matchedContact = contacts.find((c) => c.name === selectedContact)

  const pickContact = (c: CbosContact) => {
    setSelectedContact(c.name)
    setName(c.name)
    setContactBookOpen(false)
  }

  useEffect(() => {
    if (matchedContact) setName(matchedContact.name)
  }, [matchedContact])

  const continueFlow = () => {
    const params = new URLSearchParams()
    if (name) params.set('to', name)
    if (iban) params.set('iban', iban)
    if (amount) params.set('amount', amount)
    if (reference) params.set('ref', reference)
    navigate(`/bank/transfers?${params.toString()}`)
  }

  const sym = from?.currency === 'EUR' ? '€' : from?.currency === 'GBP' ? '£' : '$'

  return (
    <CbosFlowPage title="Send money">
      <div className="cbos-flow-send">
        <div className="cbos-flow-tabs" role="tablist" aria-label="Send type">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'quick'}
            className={mode === 'quick' ? 'is-active' : ''}
            onClick={() => setMode('quick')}
          >
            Saved payee
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'international'}
            className={mode === 'international' ? 'is-active' : ''}
            onClick={() => setMode('international')}
          >
            International
          </button>
        </div>

        {from ? (
          <div className="cbos-flow-accounts-box cbos-flow-accounts-box--single">
            <CbosFlowAccountField label="From" wallets={wallets} value={fromId} onChange={setFromId} />
          </div>
        ) : null}

        {mode === 'quick' ? (
          <>
            <div className="cbos-flow-send__contacts" aria-label="Saved payees">
              {quickContacts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`cbos-flow-send__contact${selectedContact === c.name ? ' is-active' : ''}`}
                  onClick={() => pickContact(c)}
                >
                  <img src={contactPhoto(c)} alt="" loading="lazy" draggable={false} />
                  <span>{c.name.split(' ')[0]}</span>
                </button>
              ))}
              <button
                type="button"
                className={`cbos-flow-send__contact cbos-flow-send__contact--add${contactBookOpen ? ' is-active' : ''}`}
                onClick={() => setContactBookOpen((v) => !v)}
                aria-expanded={contactBookOpen}
              >
                <span className="cbos-flow-send__contact-add-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span>Contact book</span>
              </button>
            </div>

            {contactBookOpen ? (
              <div className="cbos-flow-send__contact-book">
                <p className="cbos-flow-send__contact-book-label">Choose from contact book</p>
                <ul className="cbos-flow-send__contact-book-list">
                  {contacts.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        className={`cbos-flow-send__contact-book-item${selectedContact === c.name ? ' is-active' : ''}`}
                        onClick={() => pickContact(c)}
                      >
                        <img src={contactPhoto(c)} alt="" loading="lazy" draggable={false} />
                        <span className="cbos-flow-send__contact-book-copy">
                          <strong>{c.name}</strong>
                          <span>{c.role}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedContact ? (
              <p className="cbos-flow-send__recipient">
                To <strong>{selectedContact}</strong>
                {matchedContact?.role ? <span> · {matchedContact.role}</span> : null}
              </p>
            ) : (
              <p className="cbos-flow-send__recipient cbos-flow-send__recipient--muted">Select a saved payee</p>
            )}
          </>
        ) : (
          <div className="cbos-flow-send__intl">
            <div className="cbos-flow-segment cbos-flow-segment--text" role="group" aria-label="Recipient type">
              <button
                type="button"
                className={recipientKind === 'private' ? 'is-active' : ''}
                onClick={() => setRecipientKind('private')}
              >
                Private
              </button>
              <button
                type="button"
                className={recipientKind === 'business' ? 'is-active' : ''}
                onClick={() => setRecipientKind('business')}
              >
                Business
              </button>
            </div>

            <label className="cbos-flow-field cbos-flow-field--compact">
              <span>{recipientKind === 'business' ? 'Company name' : 'Full name'}</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="cbos-flow-field cbos-flow-field--compact">
              <span>Reference</span>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="INV-2026-001"
              />
            </label>
            <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
              <span>Address</span>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
            </label>
            <label className="cbos-flow-field cbos-flow-field--compact">
              <span>City</span>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
            </label>
            <label className="cbos-flow-field cbos-flow-field--compact">
              <span>Country</span>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" />
            </label>
            <label className="cbos-flow-field cbos-flow-field--compact">
              <span>IBAN</span>
              <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="CH93 0076 2011 6238 5295 7" />
            </label>
            <label className="cbos-flow-field cbos-flow-field--compact">
              <span>SWIFT / BIC</span>
              <input type="text" value={swift} onChange={(e) => setSwift(e.target.value)} placeholder="UBSWCHZH80A" />
            </label>
          </div>
        )}

        <label className="cbos-flow-amount cbos-flow-amount--send">
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ''))}
            aria-label="Amount to send"
            placeholder="0"
          />
          <span className="cbos-flow-amount__display cbos-tabular">
            {sym}
            {amount || '0'}
          </span>
        </label>

        {from && amount ? (
          <p className="cbos-flow-exchange__hint">
            Available {formatMoney(walletAvailable(from), from.currency)}
          </p>
        ) : null}

        <button
          type="button"
          className="cbos-flow__continue"
          disabled={mode === 'quick' ? !selectedContact || !amount : !name || !iban || !amount}
          onClick={continueFlow}
        >
          Continue
        </button>
      </div>
    </CbosFlowPage>
  )
}
