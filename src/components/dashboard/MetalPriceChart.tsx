import { formatChange, formatPrice } from '../../data/metals'
import type { LiveMetalPrice } from '../../hooks/useLiveMetalPrices'

type Props = {
  metal: LiveMetalPrice
  compact?: boolean
}

export function MetalPriceChart({ metal, compact }: Props) {
  const { history, price, change, unit, name } = metal
  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const w = compact ? 280 : 100
  const h = compact ? 56 : 100
  const pad = 4

  const points = history
    .map((v, i) => {
      const x = pad + (i / (history.length - 1)) * (w - pad * 2)
      const y = pad + (1 - (v - min) / range) * (h - pad * 2)
      return `${x},${y}`
    })
    .join(' ')

  const isUp = change >= 0

  return (
    <div className={`dash-chart${compact ? ' dash-chart--compact' : ''}`}>
      <div className="dash-chart-head">
        <div>
          <span className="dash-chart-name">{name}</span>
          <span className="dash-chart-price">{formatPrice(price)}</span>
          <span className="dash-chart-unit">{unit}</span>
        </div>
        <span className={`dash-chart-change${isUp ? ' is-up' : ' is-down'}`}>
          {formatChange(change)}
        </span>
      </div>
      <svg
        className="dash-chart-svg"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          className={`dash-chart-line${isUp ? ' is-up' : ' is-down'}`}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  )
}
