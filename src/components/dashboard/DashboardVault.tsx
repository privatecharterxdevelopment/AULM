import { useState } from 'react'
import { DEMO_DEPOSITED_USD, formatUsd, formatUsdPrecise } from '../../data/dashboard'
import { formatPrice } from '../../data/metals'
import type { LiveMetalPrice } from '../../hooks/useLiveMetalPrices'
import { MetalPriceChart } from './MetalPriceChart'

type Props = {
  metals: LiveMetalPrice[]
  gold: LiveMetalPrice
  kycApproved: boolean
}

export function DashboardVault({ metals, gold, kycApproved }: Props) {
  const [exchangeUsd, setExchangeUsd] = useState('100000')
  const usd = Math.max(0, Number.parseFloat(exchangeUsd.replace(/,/g, '')) || 0)
  const goldOz = usd / gold.price
  const depositedOz = DEMO_DEPOSITED_USD / gold.price

  return (
    <div className="dash-section">
      <div className="dash-stat-row dash-stat-row--duo">
        <article className="dash-stat dash-stat--wide">
          <p className="dash-stat-label">Deposited balance</p>
          <p className="dash-stat-value">{formatUsd(DEMO_DEPOSITED_USD)}</p>
          <p className="dash-stat-hint">≈ {depositedOz.toFixed(3)} troy oz gold at live spot</p>
        </article>
        <article className="dash-stat dash-stat--wide">
          <p className="dash-stat-label">Spot gold</p>
          <p className="dash-stat-value">{formatPrice(gold.price)}</p>
          <p className="dash-stat-hint">Live desk · updates every 4s</p>
        </article>
      </div>

      <section className="dash-card">
        <h2 className="dash-card-title">Precious metals — live</h2>
        <div className="dash-chart-grid">
          {metals.map((m) => (
            <MetalPriceChart key={m.id} metal={m} compact />
          ))}
        </div>
      </section>

      <section className="dash-card">
        <h2 className="dash-card-title">Exchange to gold</h2>
        <p className="dash-card-text">
          Preview allocation at live spot. Settlement executes after compliance approval.
        </p>
        <div className="dash-exchange">
          <div className="dash-field">
            <label className="dash-field-label" htmlFor="exchangeUsd">
              USD amount
            </label>
            <input
              id="exchangeUsd"
              className="dash-input"
              type="text"
              inputMode="decimal"
              value={exchangeUsd}
              onChange={(e) => setExchangeUsd(e.target.value)}
              disabled={!kycApproved}
            />
          </div>
          <span className="dash-exchange-arrow" aria-hidden>
            →
          </span>
          <div className="dash-field">
            <span className="dash-field-label">Gold (troy oz)</span>
            <p className="dash-exchange-result">{goldOz.toFixed(4)} oz</p>
            <p className="dash-stat-hint">@ {formatUsdPrecise(gold.price)}/oz</p>
          </div>
        </div>
        <button
          type="button"
          className="metal-page-btn metal-page-btn--primary"
          disabled={!kycApproved || usd <= 0}
        >
          {kycApproved ? 'Request exchange' : 'KYC required'}
        </button>
      </section>
    </div>
  )
}
