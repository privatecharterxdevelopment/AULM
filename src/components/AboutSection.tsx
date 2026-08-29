import { Link } from 'react-router-dom'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

export function AboutSection({ reveal }: Props) {
  const { t } = useT()
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section about-strip" aria-label={t.home.about.aria}>
      <div className="about-strip-panels">
        <div className="about-strip-panel">
          <img src="/company/locations/switzerland.jpg?v=2" alt={t.home.about.switzerlandAlt} />
          <p>{t.home.about.switzerland}</p>
        </div>
        <div className="about-strip-panel">
          <img src="/company/locations/uae.jpg" alt={t.home.about.dubaiAlt} />
          <p>{t.home.about.dubai}</p>
        </div>
      </div>
      <div className="mining-overlay" aria-hidden />
      <div className="mining-content">
        <h2
          className="mining-title about-strip-title"
          style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
        >
          <span className="about-strip-title-row">{t.home.about.title1}</span>
          <span className="about-strip-title-row">{t.home.about.title2}</span>
        </h2>
        <Link
          to="/company"
          className="mining-more mining-more--btn"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          {t.common.exploreMore}
        </Link>
      </div>
    </section>
  )
}
