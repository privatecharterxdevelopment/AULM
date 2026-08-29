import { Link } from 'react-router-dom'
import { SUPPLY_STRIP } from '../data/supplyChain'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

export function SupplyChainSection({ reveal }: Props) {
  const { t } = useT()
  const titleIn = Math.min(1, reveal / 0.5)

  return (
    <section className="people-strip supply-strip" aria-label={t.home.supply.title}>
      <div className="people-strip-track">
        {SUPPLY_STRIP.panels.map((panel, i) => {
          const copy = t.home.supply.panels[i]
          return (
            <article key={panel.src} className={`people-strip-panel supply-strip-panel--${panel.fit}`}>
              <img src={panel.src} alt={copy?.alt ?? panel.alt} />
              <div className="people-strip-shade" aria-hidden />
              <div className="people-strip-caption">
                <p>{copy?.line ?? panel.line}</p>
                <Link to={panel.href}>{copy?.cta ?? panel.cta} →</Link>
              </div>
            </article>
          )
        })}
      </div>

      <h2
        className="people-strip-title"
        style={{ opacity: titleIn, transform: `translateY(${(1 - titleIn) * 18}px)` }}
      >
        {t.home.supply.title}
      </h2>
    </section>
  )
}
