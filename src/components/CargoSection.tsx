import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CargoPartnersCarousel } from './CargoPartnersCarousel'
import { useT } from '../i18n'

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

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function useSmoothCloudEnter(reveal: number) {
  const target = reveal < 0.04 ? 0 : easeOutCubic(Math.min(1, reveal))
  const [enter, setEnter] = useState(0)
  const enterRef = useRef(0)
  const targetRef = useRef(target)
  targetRef.current = target

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const t = targetRef.current
      const cur = enterRef.current
      const next = cur + (t - cur) * 0.11

      if (Math.abs(t - next) < 0.002) {
        enterRef.current = t
        setEnter(t)
        return
      }

      enterRef.current = next
      setEnter(next)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return enter
}

export function CargoSection({ reveal }: Props) {
  const { t } = useT()
  const titleIn = Math.min(1, reveal / 0.5)
  const cardsIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))
  const partnersIn = Math.min(1, Math.max(0, (reveal - 0.35) / 0.55))

  const cloudEnter = useSmoothCloudEnter(reveal)
  const cloudDriftY = (1 - cloudEnter) * 72
  const cloudDriftX = (1 - cloudEnter) * -14
  const cloudScale = 0.76 + cloudEnter * 0.24
  const cloudFloating = cloudEnter > 0.88

  return (
    <section className="cargo-section" aria-label={t.home.cargo.aria}>
      <div className="cargo-inner">
        <div
          className="cargo-cloud-bg"
          aria-hidden
          style={{
            opacity: cloudEnter * 0.4,
            transform: `translate3d(${cloudDriftX}px, ${cloudDriftY}px, 0)`,
          }}
        >
          <div className="cargo-cloud-scale-wrap" style={{ transform: `scale(${cloudScale})` }}>
            <div className={`cargo-cloud-float-wrap${cloudFloating ? ' is-floating' : ''}`}>
              <img src="/cargo-cloud.png" alt="" className="cargo-cloud-img" />
            </div>
          </div>
        </div>

        <header
          className="cargo-head cargo-stage-content"
          style={{
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 24}px)`,
          }}
        >
          <p className="cargo-eyebrow">{t.home.cargo.eyebrow}</p>
          <h2 className="cargo-title">{t.home.cargo.title}</h2>
        </header>

        <div
          className="cargo-cards cargo-stage-content"
          style={{
            opacity: cardsIn,
            transform: `translateY(${(1 - cardsIn) * 28}px) scale(${0.94 + cardsIn * 0.06})`,
          }}
        >
          <Link to="/logistics/import" className="cargo-card cargo-card--import">
            <span className="cargo-card-arrow cargo-card-arrow--up">
              <ArrowUpIcon />
            </span>
            <span className="cargo-card-label">{t.home.cargo.import}</span>
          </Link>

          <Link to="/logistics/export" className="cargo-card cargo-card--export">
            <span className="cargo-card-arrow cargo-card-arrow--down">
              <ArrowDownIcon />
            </span>
            <span className="cargo-card-label">{t.home.cargo.export}</span>
          </Link>
        </div>

        <div className="cargo-stage-content cargo-stage-content--carousel">
          <CargoPartnersCarousel visible={partnersIn} />
        </div>
      </div>
    </section>
  )
}
