import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CbosBalanceChart } from './CbosBalanceChart'
import { CbosCurrencyPicker } from './CbosCurrencyPicker'
import { CbosHeroMetrics } from './CbosHeroMetrics'
import { formatHolding } from '../../cbos/lib/format'
import type { CbosDashboardSummary, CbosWallet } from '../../cbos/types'
import type { LiveMetalPrice } from '../../hooks/useLiveMetalPrices'

type Period = '7d' | '30d' | '90d' | 'ytd'

type Props = {
  summary: CbosDashboardSummary
  gold: LiveMetalPrice
  silver?: LiveMetalPrice
  wallets: CbosWallet[]
  hideBalance?: boolean
  onToggleHide?: () => void
}

const PERIODS: { id: Period; label: string }[] = [
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: '90d', label: '90D' },
  { id: 'ytd', label: 'YTD' },
]

function periodCaption(id: Period): string {
  const now = new Date()
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleDateString('en-US', { month: 'long' })
  if (id === '30d') return `Balance (${prev} – ${month})`
  if (id === '7d') return 'Balance (last 7 days)'
  if (id === '90d') return 'Balance (last 90 days)'
  return `Balance (${now.getFullYear()})`
}

export function CbosBalanceHero({
  summary,
  gold,
  silver,
  wallets,
  hideBalance = false,
  onToggleHide,
}: Props) {
  const [period, setPeriod] = useState<Period>('30d')
  const cur = summary.currency

  return (
    <section className="cbos-overview">
      <article className="cbos-overview__balance cbos-overview__balance--light">
        <CbosBalanceChart />

        <div className="cbos-overview__balance-head">
          <div className="cbos-bank-hero__periods" role="tablist" aria-label="Statement period">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={period === p.id}
                className={period === p.id ? 'is-active' : ''}
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          {onToggleHide ? (
            <button type="button" className="cbos-bank-hero__hide" onClick={onToggleHide}>
              {hideBalance ? 'Show' : 'Hide'}
            </button>
          ) : null}
        </div>

        <div className="cbos-overview__balance-main">
          <div className="cbos-overview__balance-copy">
            <p className="cbos-overview__label">{periodCaption(period)}</p>
            <div className="cbos-overview__amount cbos-tabular" aria-live="polite">
              {hideBalance ? (
                '••• ••• •••'
              ) : (
                <>
                  {formatHolding(summary.totalBalance)}
                  <CbosCurrencyPicker wallets={wallets} currency={cur} hideBalance={hideBalance} />
                </>
              )}
            </div>
          </div>

          <div className="cbos-bank-hero__quick-icons" aria-label="Balance actions">
            <Link to="/bank/send" className="cbos-bank-hero__quick" title="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </Link>
            <Link to="/bank/receive" className="cbos-bank-hero__quick" title="Receive">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Link>
            <Link to="/bank/exchange" className="cbos-bank-hero__quick" title="Exchange">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M7 16V4M7 4 3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" />
              </svg>
            </Link>
            <Link to="/bank/documents" className="cbos-bank-hero__quick" title="Statements">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      <CbosHeroMetrics
        summary={summary}
        gold={gold}
        silver={silver}
        hideBalance={hideBalance}
      />
    </section>
  )
}
