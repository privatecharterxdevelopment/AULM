import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEMO_EVAULT_POSITIONS } from '../../../cbos/mocks/demoData'
import { formatActivityDate, formatMoney } from '../../../cbos/lib/format'
import type { CbosEvaultPosition, CbosEvaultTerm } from '../../../cbos/types'
import { EVAULT_PRODUCTS, type EvaultProductId } from '../../../cbos/vaultDefaults'
import { CbosEvaultBanner } from '../CbosEvaultBanner'

function termLabel(term: CbosEvaultTerm): string {
  if (term === 'flexible') return 'Flexible · 3.4% APY'
  if (term === '6m') return '6 months · 5.5% APY'
  return '12 months · 5.5% APY'
}

function daysUntil(iso?: string): number | null {
  if (!iso) return null
  const target = new Date(iso)
  const now = new Date()
  target.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function CbosVault() {
  const [positions] = useState<CbosEvaultPosition[]>(DEMO_EVAULT_POSITIONS)
  const [selected, setSelected] = useState<EvaultProductId | null>(null)

  const totals = useMemo(() => {
    const principal = positions.reduce((s, p) => s + p.principal, 0)
    const accrued = positions.reduce((s, p) => s + p.accruedInterest, 0)
    const locked = positions.filter((p) => p.term !== 'flexible').reduce((s, p) => s + p.principal, 0)
    return { principal, accrued, locked, count: positions.length }
  }, [positions])

  return (
    <div className="cbos-transfers-page cbos-escrow-page cbos-vault-page">
      <article className="cbos-transfers-card">
        <CbosEvaultBanner />

        <div className="cbos-transfers-card__body">
          <div className="cbos-transfers-actions">
            <Link to="/bank/wallets" className="cbos-transfers-actions__btn cbos-transfers-actions__btn--solid">
              Fund from cash
            </Link>
            <Link to="/bank/documents" className="cbos-transfers-actions__btn">
              Statements
            </Link>
          </div>

          <div className="cbos-transfers-stats">
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Deposited</span>
              <span className="cbos-transfers-stat__value cbos-tabular">
                {formatMoney(totals.principal, 'USD').replace(/\.00$/, '')}
              </span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Accrued interest</span>
              <span className="cbos-transfers-stat__value cbos-tabular is-up">
                +{formatMoney(totals.accrued, 'USD')}
              </span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Locked capital</span>
              <span className="cbos-transfers-stat__value cbos-tabular">
                {formatMoney(totals.locked, 'USD').replace(/\.00$/, '')}
              </span>
            </article>
          </div>

          <header className="cbos-transfers-list__head">
            <div>
              <p className="cbos-transfers-list__eyebrow">Products</p>
              <h2 className="cbos-transfers-list__title">Choose a mandate</h2>
            </div>
          </header>

          <div className="cbos-vault-products">
            {EVAULT_PRODUCTS.map((product) => (
              <button
                key={product.id}
                type="button"
                className={`cbos-vault-product${selected === product.id ? ' is-selected' : ''}`}
                onClick={() => setSelected(product.id)}
              >
                <span className="cbos-vault-product__apy cbos-tabular">{product.apy}%</span>
                <span className="cbos-vault-product__label">{product.label}</span>
                <span className="cbos-vault-product__hint">{product.hint}</span>
                {product.lockMonths > 0 ? (
                  <span className="cbos-vault-product__lock">Capital blocked</span>
                ) : (
                  <span className="cbos-vault-product__lock is-open">Withdraw anytime</span>
                )}
              </button>
            ))}
          </div>

          {selected ? (
            <p className="cbos-vault-open-hint">
              Selected: <strong>{EVAULT_PRODUCTS.find((p) => p.id === selected)?.label}</strong> at{' '}
              {EVAULT_PRODUCTS.find((p) => p.id === selected)?.apy}% APY — transfer from your cash account to open.
              <Link to="/bank/wallets" className="cbos-vault-open-hint__link">
                Go to cash
              </Link>
            </p>
          ) : null}

          <header className="cbos-transfers-list__head">
            <div>
              <p className="cbos-transfers-list__eyebrow">Portfolio</p>
              <h2 className="cbos-transfers-list__title">Your positions</h2>
            </div>
            <span className="cbos-transfers-list__count">{totals.count} active</span>
          </header>

          <ul className="cbos-transfers-list">
            {positions.map((p) => {
              const days = daysUntil(p.unlockAt)
              return (
                <li key={p.id}>
                  <article className="cbos-transfers-row cbos-vault-row">
                    <span className="cbos-transfers-row__icon is-vault" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="10" width="14" height="10" rx="1.5" />
                        <circle cx="12" cy="15" r="2" />
                        <path d="M8 10V8a4 4 0 0 1 8 0v2" />
                      </svg>
                    </span>
                    <span className="cbos-transfers-row__main">
                      <span className="cbos-transfers-row__top">
                        <span className="cbos-transfers-row__name">{p.reference}</span>
                        <span className="cbos-transfers-row__amount cbos-tabular">
                          {formatMoney(p.principal, p.currency)}
                        </span>
                      </span>
                      <span className="cbos-transfers-row__bottom">
                        <span className="cbos-transfers-row__meta">{termLabel(p.term)}</span>
                        <span className="cbos-transfers-row__ref">
                          +{formatMoney(p.accruedInterest, p.currency)} accrued
                        </span>
                      </span>
                      <span className="cbos-vault-row__foot">
                        <span>Opened {formatActivityDate(p.openedAt)}</span>
                        {p.unlockAt ? (
                          <span>
                            {days !== null && days > 0
                              ? `Unlocks in ${days} days · ${formatActivityDate(p.unlockAt)}`
                              : `Unlocked · ${formatActivityDate(p.unlockAt)}`}
                          </span>
                        ) : (
                          <span>Flexible — no lock-up</span>
                        )}
                      </span>
                    </span>
                  </article>
                </li>
              )
            })}
          </ul>

          <p className="cbos-vault-disclaimer">
            E-Vault mandates are fixed-yield investment products. Locked terms block capital for 6 or 12 months at
            5.5% APY; flexible balances earn 3.4% APY with daily liquidity. Rates shown are annualised gross yields
            before tax.
          </p>
        </div>
      </article>
    </div>
  )
}
