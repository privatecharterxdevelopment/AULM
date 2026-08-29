import { Link } from 'react-router-dom'
import { SUPPLY_STRIP } from '../data/supplyChain'

type Props = {
  reveal: number
}

export function SupplyChainSection({ reveal }: Props) {
  const titleIn = Math.min(1, reveal / 0.5)

  return (
    <section className="people-strip supply-strip" aria-label={SUPPLY_STRIP.title}>
      <div className="people-strip-track">
        {SUPPLY_STRIP.panels.map((panel) => (
          <article key={panel.src} className={`people-strip-panel supply-strip-panel--${panel.fit}`}>
            <img src={panel.src} alt={panel.alt} />
            <div className="people-strip-shade" aria-hidden />
            <div className="people-strip-caption">
              <p>{panel.line}</p>
              <Link to={panel.href}>{panel.cta} →</Link>
            </div>
          </article>
        ))}
      </div>

      <h2
        className="people-strip-title"
        style={{ opacity: titleIn, transform: `translateY(${(1 - titleIn) * 18}px)` }}
      >
        {SUPPLY_STRIP.title}
      </h2>
    </section>
  )
}
