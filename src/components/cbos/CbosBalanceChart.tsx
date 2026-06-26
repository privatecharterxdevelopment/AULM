/** Decorative balance trend — no axes, sparkline only */
const SERIES = [0.58, 0.54, 0.61, 0.57, 0.63, 0.6, 0.68, 0.72, 0.69, 0.76, 0.74, 0.82, 0.78, 0.85, 0.88, 0.84, 0.91, 0.95]

function buildPath(values: number[], width: number, height: number, padY = 8): string {
  const step = width / (values.length - 1)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  return values
    .map((v, i) => {
      const x = i * step
      const y = height - padY - ((v - min) / range) * (height - padY * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

type Props = {
  className?: string
}

export function CbosBalanceChart({ className = '' }: Props) {
  const w = 400
  const h = 120
  const line = buildPath(SERIES, w, h)
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <div className={`cbos-balance-chart${className ? ` ${className}` : ''}`} aria-hidden>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cbos-balance-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(15, 15, 18, 0.07)" />
            <stop offset="100%" stopColor="rgba(15, 15, 18, 0)" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#cbos-balance-chart-fill)" />
        <path d={line} fill="none" stroke="rgba(15, 15, 18, 0.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
