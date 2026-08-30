import { Link } from 'react-router-dom'
import { MINING_HERO_POSTER, MINING_HERO_VIDEO } from '../config/media'
import { BackgroundLoopVideo } from './BackgroundLoopVideo'
import { useT } from '../i18n'

type Props = {
  reveal: number
  active?: boolean
}

export function MiningSection({ reveal, active }: Props) {
  const { t } = useT()
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section" aria-label={t.home.mining.aria}>
      <BackgroundLoopVideo
        className="mining-video"
        src={`${MINING_HERO_VIDEO}?v=5`}
        poster={MINING_HERO_POSTER}
        active={active ?? reveal > 0.08}
      />

      <div className="mining-overlay" aria-hidden />

      <div className="mining-content">
        <h2
          className="mining-title"
          style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
        >
          {t.home.mining.title1}
          <br />
          {t.home.mining.title2}
        </h2>

        <div
          className="mining-glass"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          <p>{t.home.mining.p1}</p>
          <p>{t.home.mining.p2}</p>
          <Link to="/africa" className="mining-more">
            {t.common.localProjects}
          </Link>
        </div>
      </div>
    </section>
  )
}
