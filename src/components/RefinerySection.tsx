import { Link } from 'react-router-dom'
import { REFINERY_HERO_VIDEO } from '../config/media'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

export function RefinerySection({ reveal }: Props) {
  const { t } = useT()
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section refinery-home" aria-label={t.home.refineryHome.aria}>
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
          {t.refinery.tagline[0]}
          <br />
          {t.refinery.tagline[1]} {t.refinery.tagline[2]}
        </h2>
        <div
          className="mining-glass"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          <p>{t.refinery.lead}</p>
          <p>{t.refinery.tradeTerms}</p>
          <Link to="/refinery" className="mining-more">
            {t.home.refineryHome.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
