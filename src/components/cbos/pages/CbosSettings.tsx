import { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/AuthContext'
import { useCbos } from '../../../cbos/context/CbosContext'
import { cardsProvider } from '../../../cbos/mocks/cards'
import { formatMoney } from '../../../cbos/lib/format'
import type { CbosCard } from '../../../cbos/types'
import { CbosFlowPage } from '../flow/CbosFlowPage'

const SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'address', label: 'Address' },
  { id: 'security', label: 'Security & 2FA' },
  { id: 'cards', label: 'Cards' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'sessions', label: 'Devices' },
  { id: 'business', label: 'Business' },
  { id: 'preferences', label: 'Preferences' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

const DEMO_SESSIONS = [
  { id: 's1', device: 'MacBook Pro · Safari', location: 'Dubai, UAE', current: true, lastActive: 'Now' },
  { id: 's2', device: 'iPhone 15 Pro · AULM App', location: 'Dubai, UAE', current: false, lastActive: '2h ago' },
  { id: 's3', device: 'Windows · Chrome', location: 'Zurich, CH', current: false, lastActive: 'Yesterday' },
]

function SettingsToggle({
  checked,
  onChange,
  label,
  hint,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  hint?: string
  id: string
}) {
  return (
    <label className="cbos-settings-toggle" htmlFor={id}>
      <span className="cbos-settings-toggle__copy">
        <span className="cbos-settings-toggle__label">{label}</span>
        {hint ? <span className="cbos-settings-toggle__hint">{hint}</span> : null}
      </span>
      <span className="cbos-settings-toggle__switch">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="cbos-settings-toggle__track" aria-hidden />
      </span>
    </label>
  )
}

function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="cbos-settings-section__head">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  )
}

export function CbosSettings() {
  const { profile } = useAuth()
  const { orgName, orgRole, bankLicenseRef, isLiveDb } = useCbos()

  const [active, setActive] = useState<SectionId>('profile')
  const [cards, setCards] = useState<CbosCard[]>([])

  const [fullName, setFullName] = useState(profile?.full_name ?? 'Demo Desk')
  const [email] = useState(profile?.email ?? 'demo@aulm.com')
  const [phone, setPhone] = useState('+971 50 123 4567')
  const [dateOfBirth, setDateOfBirth] = useState('1988-04-12')
  const [nationality, setNationality] = useState('Switzerland')

  const [street, setStreet] = useState('IFZA Business Park, DDP')
  const [city, setCity] = useState('Dubai')
  const [postal, setPostal] = useState('00000')
  const [country, setCountry] = useState('United Arab Emirates')
  const [mailingSame, setMailingSame] = useState(true)

  const [twoFa, setTwoFa] = useState(true)
  const [authenticator, setAuthenticator] = useState(true)
  const [smsFallback, setSmsFallback] = useState(false)
  const [biometric, setBiometric] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const [pushPayments, setPushPayments] = useState(true)
  const [pushSecurity, setPushSecurity] = useState(true)
  const [emailStatements, setEmailStatements] = useState(true)
  const [emailMarketing, setEmailMarketing] = useState(false)

  const [shareAnalytics, setShareAnalytics] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  const [language, setLanguage] = useState('en')
  const [defaultCurrency, setDefaultCurrency] = useState('USD')
  const [appearance, setAppearance] = useState('light')

  useEffect(() => {
    setCards(cardsProvider.list())
  }, [])

  const refreshCards = () => setCards(cardsProvider.list())

  const toggleFreeze = (id: string) => {
    cardsProvider.toggleFreeze(id)
    refreshCards()
  }

  const scrollTo = (id: SectionId) => {
    setActive(id)
    document.getElementById(`settings-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <CbosFlowPage title="Settings">
      <div className="cbos-settings-flow">
        <nav className="cbos-settings-nav" aria-label="Settings sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={active === s.id ? 'is-active' : ''}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="cbos-settings-main">
          <section id="settings-profile" className="cbos-settings-section">
            <SectionHead title="Profile" subtitle="Personal details linked to your account and KYC." />
            <div className="cbos-settings-profile">
              <span className="cbos-settings-profile__avatar" aria-hidden>
                {(fullName || 'U').charAt(0).toUpperCase()}
              </span>
              <button type="button" className="cbos-settings-profile__photo">
                Change photo
              </button>
            </div>
            <div className="cbos-settings-fields">
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Full name</span>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Email</span>
                <input type="email" value={email} readOnly className="is-readonly" />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Mobile</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Date of birth</span>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Nationality</span>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} />
              </label>
            </div>
            <p className="cbos-settings-kyc">
              KYC status:{' '}
              <span className={`cbos-settings-kyc__pill is-${profile?.kyc_status ?? 'approved'}`}>
                {(profile?.kyc_status ?? 'approved').replace('_', ' ')}
              </span>
            </p>
          </section>

          <section id="settings-address" className="cbos-settings-section">
            <SectionHead title="Address" subtitle="Residential and correspondence address for statements and compliance." />
            <div className="cbos-settings-fields">
              <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
                <span>Street &amp; building</span>
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>City</span>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Postal code</span>
                <input type="text" value={postal} onChange={(e) => setPostal(e.target.value)} />
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact cbos-flow-field--full">
                <span>Country</span>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
              </label>
            </div>
            <div className="cbos-settings-toggles">
              <SettingsToggle
                id="mailing-same"
                label="Mailing address same as residential"
                checked={mailingSame}
                onChange={setMailingSame}
              />
            </div>
          </section>

          <section id="settings-security" className="cbos-settings-section">
            <SectionHead title="Security &amp; 2FA" subtitle="Protect your account with strong authentication." />
            <div className="cbos-settings-actions">
              <button type="button" className="cbos-settings-action">
                Change password
              </button>
              <button type="button" className="cbos-settings-action">
                View backup codes
              </button>
            </div>
            <div className="cbos-settings-toggles">
              <SettingsToggle
                id="2fa-master"
                label="Two-factor authentication (2FA)"
                hint="Required for payments above $50,000"
                checked={twoFa}
                onChange={setTwoFa}
              />
              <SettingsToggle
                id="2fa-auth"
                label="Authenticator app"
                hint="Google Authenticator, 1Password, Authy"
                checked={authenticator}
                onChange={setAuthenticator}
              />
              <SettingsToggle
                id="2fa-sms"
                label="SMS fallback"
                hint="One-time codes to your registered mobile"
                checked={smsFallback}
                onChange={setSmsFallback}
              />
              <SettingsToggle
                id="biometric"
                label="Biometric unlock"
                hint="Face ID / Touch ID on trusted devices"
                checked={biometric}
                onChange={setBiometric}
              />
              <SettingsToggle
                id="login-alerts"
                label="Login alerts"
                hint="Email when a new device signs in"
                checked={loginAlerts}
                onChange={setLoginAlerts}
              />
            </div>
          </section>

          <section id="settings-cards" className="cbos-settings-section">
            <SectionHead title="Cards" subtitle="Freeze cards, limits, and contactless controls." />
            <ul className="cbos-settings-cards">
              {cards.map((c) => (
                <li key={c.id} className={c.isFrozen ? 'is-frozen' : ''}>
                  <div className="cbos-settings-cards__info">
                    <span className="cbos-settings-cards__pan">•••• {c.lastFour}</span>
                    <span className="cbos-settings-cards__meta">
                      {c.holderName} · {c.cardType.replace('_', ' ')}
                      {c.spendLimit ? ` · Limit ${formatMoney(c.spendLimit, c.currency)}` : ''}
                    </span>
                  </div>
                  <div className="cbos-settings-cards__actions">
                    <button type="button" className="cbos-settings-action cbos-settings-action--sm">
                      PIN
                    </button>
                    <button type="button" className="cbos-settings-action cbos-settings-action--sm">
                      Limits
                    </button>
                    <button
                      type="button"
                      className={`cbos-settings-freeze${c.isFrozen ? ' is-frozen' : ''}`}
                      onClick={() => toggleFreeze(c.id)}
                    >
                      {c.isFrozen ? 'Unfreeze' : 'Freeze'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cbos-settings-toggles">
              <SettingsToggle id="contactless" label="Contactless payments" checked onChange={() => {}} />
              <SettingsToggle id="online" label="Online payments" checked onChange={() => {}} />
              <SettingsToggle id="atm" label="ATM withdrawals" checked onChange={() => {}} />
            </div>
          </section>

          <section id="settings-notifications" className="cbos-settings-section">
            <SectionHead title="Notifications" subtitle="Choose how we reach you." />
            <div className="cbos-settings-toggles">
              <SettingsToggle
                id="push-pay"
                label="Payment alerts"
                hint="Incoming, outgoing, and failed transfers"
                checked={pushPayments}
                onChange={setPushPayments}
              />
              <SettingsToggle
                id="push-sec"
                label="Security alerts"
                hint="Logins, card use, and approval requests"
                checked={pushSecurity}
                onChange={setPushSecurity}
              />
              <SettingsToggle
                id="email-stmt"
                label="Monthly statements by email"
                checked={emailStatements}
                onChange={setEmailStatements}
              />
              <SettingsToggle
                id="email-mkt"
                label="Product updates & marketing"
                checked={emailMarketing}
                onChange={setEmailMarketing}
              />
            </div>
          </section>

          <section id="settings-privacy" className="cbos-settings-section">
            <SectionHead title="Privacy" subtitle="Control your data and visibility." />
            <div className="cbos-settings-toggles">
              <SettingsToggle
                id="balance-hide"
                label="Show balance on home screen"
                checked={showBalance}
                onChange={setShowBalance}
              />
              <SettingsToggle
                id="analytics"
                label="Usage analytics"
                hint="Help improve AULM with anonymised data"
                checked={shareAnalytics}
                onChange={setShareAnalytics}
              />
            </div>
            <div className="cbos-settings-actions">
              <button type="button" className="cbos-settings-action">
                Download my data
              </button>
              <button type="button" className="cbos-settings-action cbos-settings-action--danger">
                Close account
              </button>
            </div>
          </section>

          <section id="settings-sessions" className="cbos-settings-section">
            <SectionHead title="Devices & sessions" subtitle="Where you&apos;re signed in." />
            <ul className="cbos-settings-sessions">
              {DEMO_SESSIONS.map((s) => (
                <li key={s.id}>
                  <div>
                    <strong>
                      {s.device}
                      {s.current ? <span className="cbos-settings-sessions__badge">This device</span> : null}
                    </strong>
                    <span>
                      {s.location} · {s.lastActive}
                    </span>
                  </div>
                  {!s.current ? (
                    <button type="button" className="cbos-settings-action cbos-settings-action--sm">
                      Sign out
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
            <button type="button" className="cbos-settings-action cbos-settings-action--danger">
              Sign out all other devices
            </button>
          </section>

          <section id="settings-business" className="cbos-settings-section">
            <SectionHead title="Business" subtitle="Organization and regulatory details." />
            <dl className="cbos-settings-dl">
              <div>
                <dt>Organization</dt>
                <dd>{orgName}</dd>
              </div>
              <div>
                <dt>Your role</dt>
                <dd>{orgRole.replace(/_/g, ' ')}</dd>
              </div>
              <div>
                <dt>Tax ID</dt>
                <dd>AE-TRN-100234567890003</dd>
              </div>
              {bankLicenseRef ? (
                <div>
                  <dt>Bank license ref</dt>
                  <dd>{bankLicenseRef}</dd>
                </div>
              ) : null}
              <div>
                <dt>Data environment</dt>
                <dd>{isLiveDb ? 'Supabase CBOS (live)' : 'Demo mock provider'}</dd>
              </div>
            </dl>
          </section>

          <section id="settings-preferences" className="cbos-settings-section">
            <SectionHead title="Preferences" subtitle="Language, currency, and appearance." />
            <div className="cbos-settings-fields">
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Language</span>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Default currency</span>
                <select value={defaultCurrency} onChange={(e) => setDefaultCurrency(e.target.value)}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CHF">CHF</option>
                  <option value="AED">AED</option>
                </select>
              </label>
              <label className="cbos-flow-field cbos-flow-field--compact">
                <span>Appearance</span>
                <select value={appearance} onChange={(e) => setAppearance(e.target.value)}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </label>
            </div>
          </section>

          <footer className="cbos-settings-foot">
            <button type="button" className="cbos-flow__continue">
              Save changes
            </button>
          </footer>
        </div>
      </div>
    </CbosFlowPage>
  )
}
