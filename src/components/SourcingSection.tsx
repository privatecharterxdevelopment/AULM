import { Link } from 'react-router-dom'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

export function SourcingSection({ reveal }: Props) {
  const { t } = useT()
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section sourcing-home" aria-label={t.home.sourcing.aria}>
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
          {t.home.sourcing.title1}
          <br />
          {t.home.sourcing.title2}
        </h2>
        <div
          className="mining-glass"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          <p>{t.home.sourcing.p1}</p>
          <p>{t.home.sourcing.p2}</p>
          <Link to="/responsible-sourcing" className="mining-more mining-more--btn">
            {t.common.explore}
          </Link>
        </div>
      </div>
    </section>
  )
}
