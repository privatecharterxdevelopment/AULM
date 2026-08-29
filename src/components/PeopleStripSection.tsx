import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PEOPLE_STRIP } from '../data/peopleStrip'

type Props = {
  reveal: number
}

const VISIBLE = 4

export function PeopleStripSection({ reveal }: Props) {
  const [start, setStart] = useState(0)
  const panels = PEOPLE_STRIP.panels
  const maxStart = Math.max(0, panels.length - VISIBLE)
  const titleIn = Math.min(1, reveal / 0.5)

  function move(dir: -1 | 1) {
    setStart((s) => Math.min(maxStart, Math.max(0, s + dir)))
  }

  return (
    <section className="people-strip" aria-label={PEOPLE_STRIP.title}>
      <div
        className="people-strip-track"
        style={{ transform: `translate3d(calc(${start} * -25vw), 0, 0)` }}
      >
        {panels.map((panel) => (
          <article key={panel.src} className="people-strip-panel">
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
        {PEOPLE_STRIP.title}
      </h2>

      <div className="people-strip-nav">
        <button type="button" aria-label="Previous" onClick={() => move(-1)} disabled={start === 0}>
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => move(1)}
          disabled={start >= maxStart}
        >
          →
        </button>
      </div>
    </section>
  )
}
