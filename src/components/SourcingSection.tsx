import { Link } from 'react-router-dom'

type Props = {
  reveal: number
}

export function SourcingSection({ reveal }: Props) {
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section sourcing-home" aria-label="Responsible sourcing">
      <img
        className="mining-video"
        src="/sourcing/responsible-sourcing.jpg"
        alt=""
      />
      <div className="mining-overlay" aria-hidden />
      <div className="mining-content">
        <h2
          className="mining-title"
          style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
        >
          Responsible
          <br />
          sourcing
        </h2>
        <div
          className="mining-glass"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          <p>
            Origin is the mandate. Inspected, state-approved mines — documented lots before a
            price, not after the metal has already moved.
          </p>
          <p>
            OECD due diligence starts at the pit. Chain of custody from the ground, not from a
            Dubai spreadsheet.
          </p>
          <Link to="/responsible-sourcing" className="mining-more mining-more--btn">
            Explore
          </Link>
        </div>
      </div>
    </section>
  )
}
