type Variant = 'corporate' | 'commodity'

type Props = {
  variant?: Variant
  className?: string
  floating?: boolean
  large?: boolean
  hero?: boolean
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
}: Props) {
  return (
    <div
      className={`aulm-card-scene${floating ? ' aulm-card-scene--float' : ''}${large ? ' aulm-card-scene--large' : ''}${hero ? ' aulm-card-scene--hero' : ''} ${className}`.trim()}
    >
      <article className={`aulm-card aulm-card--${variant}`}>
        <div className="aulm-card-shine" aria-hidden />
        <div className="aulm-card-glare" aria-hidden />
        <div className="aulm-card-top">
          <img src="/aulm-logo.svg" alt="" className="aulm-card-logo" draggable={false} />
          <span className="aulm-card-soon">Coming soon</span>
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
        <p className="aulm-card-number">8592 · · · · · · · · 4271</p>
        <p className="aulm-card-name">AULM INSTITUTIONAL</p>
        <ul className="aulm-card-tags" aria-label="Commodities">
          {TAGS[variant].map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}
