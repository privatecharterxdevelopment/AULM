import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from '../../cbos/lib/format'
import type { CbosDashboardSummary } from '../../cbos/types'
import type { LiveMetalPrice } from '../../hooks/useLiveMetalPrices'

type Props = {
  summary: CbosDashboardSummary
  gold: LiveMetalPrice
  silver?: LiveMetalPrice
  hideBalance?: boolean
}

function MetricIcon({ children }: { children: ReactNode }) {
  return (
    <span className="cbos-hero-metric__icon" aria-hidden>
      {children}
    </span>
  )
}

type TileProps = {
  to: string
  title: string
  tag: string
  value: string
  delta?: number
  icon: ReactNode
}

function MetricTile({ to, title, tag, value, delta, icon }: TileProps) {
  return (
    <Link to={to} className="cbos-hero-metric cbos-hero-metric--tile">
      <MetricIcon>{icon}</MetricIcon>
      <span className="cbos-hero-metric__body">
        <span className="cbos-hero-metric__row">
          <span className="cbos-hero-metric__title">{title}</span>
          <span className="cbos-hero-metric__tag">{tag}</span>
        </span>
        <span className="cbos-hero-metric__value cbos-tabular">{value}</span>
        {delta !== undefined ? (
          <span className={`cbos-hero-metric__delta${delta >= 0 ? ' is-up' : ' is-down'}`}>
            {delta >= 0 ? '+' : ''}
            {delta.toFixed(1)}%
          </span>
        ) : null}
      </span>
    </Link>
  )
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function CbosHeroMetrics({ summary, gold, silver, hideBalance = false }: Props) {
  const cur = summary.currency
  const masked = (v: string) => (hideBalance ? '••••••' : v)
  const silverPx = silver?.price ?? gold.price * 0.012

  return (
    <div className="cbos-hero-metrics cbos-hero-metrics--below">
      <MetricTile
        to="/bank/orders?metal=gold"
        title="Gold spot"
        tag="XAU"
        value={masked(formatMoney(gold.price, 'USD'))}
        delta={gold.change}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
            <circle cx="12" cy="12" r="7" />
            <path d="M9 12h6M12 9v6" />
          </svg>
        }
      />

      <MetricTile
        to="/bank/orders?metal=silver"
        title="Silver spot"
        tag="XAG"
        value={masked(formatMoney(silverPx, 'USD'))}
        delta={silver?.change}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
            <path d="M8 16l4-10 4 10H8z" />
          </svg>
        }
      />

      <MetricTile
        to="/bank/vault"
        title="E-Vault"
        tag="APY"
        value={masked(formatMoney(summary.evaultBalance, cur))}
        delta={3.4}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
            <rect x="5" y="10" width="14" height="10" rx="1.5" />
            <circle cx="12" cy="15" r="2" />
            <path d="M8 10V8a4 4 0 0 1 8 0v2" />
          </svg>
        }
      />

      <MetricTile
        to="/bank/wallets"
        title="Cash"
        tag={cur}
        value={masked(formatMoney(summary.cashBalance, cur))}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M3 11h18M7 15h2" />
          </svg>
        }
      />

      <MetricTile
        to="/bank/escrows"
        title="Escrow"
        tag={cur}
        value={masked(formatMoney(summary.escrowBalance, cur))}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
            <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        }
      />

      <MetricTile
        to="/bank/cards"
        title="Card MTD"
        tag="USD"
        value={masked(formatMoney(summary.cardSpendingMtd, 'USD'))}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M3 10h18M7 15h4" />
          </svg>
        }
      />
    </div>
  )
}
