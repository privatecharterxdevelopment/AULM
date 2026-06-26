type Variant = 'corporate' | 'commodity'

type Props = {
  variant?: Variant
  className?: string
  floating?: boolean
  large?: boolean
  hero?: boolean
  showSoon?: boolean
  lastFour?: string
  holderName?: string
}

const TAGS: Record<Variant, string[]> = {
  corporate: ['Multi-Ccy', 'SWIFT', 'In-App', 'MT103'],
  commodity: ['Au', 'Ag', 'Cu', 'Oil', 'Gas'],
}

export function AulmCorporateCard({
  variant = 'corporate',
  className = '',
  floating = true,
  large = false,
  hero = false,
  showSoon = true,
  lastFour,
  holderName = 'AULM INSTITUTIONAL',
}: Props) {
  const number = lastFour ? `8592 · · · · · · · · ${lastFour}` : '8592 · · · · · · · · 4271'

  return (
    <div
      className={`aulm-card-scene${floating ? ' aulm-card-scene--float' : ''}${large ? ' aulm-card-scene--large' : ''}${hero ? ' aulm-card-scene--hero' : ''} ${className}`.trim()}
    >
      <article className={`aulm-card aulm-card--${variant}`}>
        <div className="aulm-card-shine" aria-hidden />
        <div className="aulm-card-glare" aria-hidden />
        <div className="aulm-card-top">
          <img src="/aulm-logo.svg" alt="" className="aulm-card-logo" draggable={false} />
          {showSoon ? <span className="aulm-card-soon">Coming soon</span> : null}
        </div>
        <div className="aulm-card-chip-row">
          <div className="aulm-card-chip" aria-hidden />
          <svg className="aulm-card-contactless" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M8.5 12.5a4 4 0 0 1 5.5 0M6 10a7.5 7.5 0 0 1 10.5 0M3.5 7.5a11 11 0 0 1 16 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="aulm-card-number">{number}</p>
        <p className="aulm-card-name">{holderName}</p>
        <ul className="aulm-card-tags" aria-label="Commodities">
          {TAGS[variant].map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}
