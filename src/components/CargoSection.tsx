import { Link } from 'react-router-dom'

function ArrowUpIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19V5M12 5l-6 6M12 5l6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M12 19l-6-6M12 19l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Props = {
  reveal: number
}

export function CargoSection({ reveal }: Props) {
  const titleIn = Math.min(1, reveal / 0.5)
  const cardsIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))

  return (
    <section className="cargo-section" aria-label="Certified cargo and shipments">
      <div className="cargo-inner">
        <header
          className="cargo-head"
          style={{
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 24}px)`,
          }}
        >
          <p className="cargo-eyebrow">Global logistics</p>
          <h2 className="cargo-title">Certified cargo & shipments</h2>
        </header>

        <div
          className="cargo-cards"
          style={{
            opacity: cardsIn,
            transform: `translateY(${(1 - cardsIn) * 28}px) scale(${0.94 + cardsIn * 0.06})`,
          }}
        >
          <Link to="/logistics/import" className="cargo-card cargo-card--import">
            <span className="cargo-card-arrow cargo-card-arrow--up">
              <ArrowUpIcon />
            </span>
            <span className="cargo-card-label">Import</span>
          </Link>

          <Link to="/logistics/export" className="cargo-card cargo-card--export">
            <span className="cargo-card-arrow cargo-card-arrow--down">
              <ArrowDownIcon />
            </span>
            <span className="cargo-card-label">Export</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
