import { Link } from 'react-router-dom'
import { ABOUT_HOME } from '../data/about'

type Props = {
  reveal: number
}

export function AboutSection({ reveal }: Props) {
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section about-strip" aria-label="Who we are">
      <div className="about-strip-panels">
        <div className="about-strip-panel">
          <img src="/company/locations/switzerland.jpg" alt="Swiss Alps — AULM roots" />
          <p>Switzerland</p>
        </div>
        <div className="about-strip-panel">
          <img src="/company/locations/uae.jpg" alt="Dubai — licensed desk" />
          <p>Dubai</p>
        </div>
      </div>
      <div className="mining-overlay" aria-hidden />
      <div className="mining-content">
        <h2
          className="mining-title"
          style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
        >
          {ABOUT_HOME.title}
        </h2>
        <Link
          to="/company"
          className="mining-more mining-more--btn"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          Explore more
        </Link>
      </div>
    </section>
  )
}
