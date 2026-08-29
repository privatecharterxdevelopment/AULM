import { Link } from 'react-router-dom'
import { REFINERY } from '../data/refinery'
import { REFINERY_HERO_VIDEO } from '../config/media'

type Props = {
  reveal: number
}

export function RefinerySection({ reveal }: Props) {
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section refinery-home" aria-label="Refinery">
      <video
        className="mining-video"
        src={REFINERY_HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="mining-overlay" aria-hidden />
      <div className="mining-content">
        <h2
          className="mining-title"
          style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
        >
          {REFINERY.tagline[0]}
          <br />
          {REFINERY.tagline[1]} {REFINERY.tagline[2]}
        </h2>
        <div
          className="mining-glass"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          <p>{REFINERY.lead}</p>
          <p>{REFINERY.tradeTerms}</p>
          <Link to="/refinery" className="mining-more">
            Refinery
          </Link>
        </div>
      </div>
    </section>
  )
}
