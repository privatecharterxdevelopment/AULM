import { useState } from 'react'

const PERIODS = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'] as const

const SERIES: Record<(typeof PERIODS)[number], number[]> = {
  '1D': [1.341, 1.342, 1.3415, 1.343, 1.3428, 1.3433],
  '1W': [1.338, 1.34, 1.339, 1.341, 1.342, 1.343, 1.3433],
  '1M': [1.32, 1.325, 1.33, 1.335, 1.338, 1.341, 1.3433],
  '3M': [1.28, 1.29, 1.31, 1.32, 1.33, 1.34, 1.3433],
  '6M': [1.25, 1.27, 1.29, 1.31, 1.32, 1.33, 1.3433],
  '1Y': [1.22, 1.26, 1.28, 1.3, 1.32, 1.34, 1.3433],
  '5Y': [1.05, 1.12, 1.18, 1.24, 1.3, 1.34, 1.3433],
}

function buildPath(values: number[], width: number, height: number): string {
  const step = width / (values.length - 1)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pad = 6

  return values
    .map((v, i) => {
      const x = i * step
      const y = height - pad - ((v - min) / range) * (height - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

type Props = {
  rate: number
  change: number
}

export function CbosFxChart({ rate, change }: Props) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>('1Y')
  const w = 560
  const h = 140
  const line = buildPath(SERIES[period], w, h)
  const pct = ((change / rate) * 100).toFixed(2)

  return (
    <div className="cbos-flow-chart">
      <div className="cbos-flow-chart__meta">
        <div>
          <span className="cbos-flow-chart__meta-label">Current rate</span>
          <strong className="cbos-flow-chart__meta-value cbos-tabular">{rate.toFixed(4)}</strong>
        </div>
        <div>
          <span className="cbos-flow-chart__meta-label">Today&apos;s change</span>
          <strong className={`cbos-flow-chart__change cbos-tabular${change >= 0 ? ' is-up' : ' is-down'}`}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(4)} ({change >= 0 ? '+' : ''}{pct}%)
          </strong>
        </div>
      </div>

      <div className="cbos-flow-chart__periods" role="tablist" aria-label="Chart period">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={period === p}
            className={period === p ? 'is-active' : ''}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <svg className="cbos-flow-chart__svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
        <path d={line} fill="none" stroke="#b8942e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
