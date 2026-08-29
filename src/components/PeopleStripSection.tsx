import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PEOPLE_STRIP } from '../data/peopleStrip'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

const VISIBLE = 4

export function PeopleStripSection({ reveal }: Props) {
  const { t, dir } = useT()
  const [start, setStart] = useState(0)
  const panels = PEOPLE_STRIP.panels
  const maxStart = Math.max(0, panels.length - VISIBLE)
  const titleIn = Math.min(1, reveal / 0.5)
  const sign = dir === 'rtl' ? 1 : -1

  function move(step: -1 | 1) {
    setStart((s) => Math.min(maxStart, Math.max(0, s + step)))
  }

  return (
    <section className="people-strip" aria-label={t.home.people.title}>
      <div
        className="people-strip-track"
        style={{ transform: `translate3d(calc(${start} * ${sign * 25}vw), 0, 0)` }}
      >
        {panels.map((panel, i) => {
          const copy = t.home.people.panels[i]
          return (
            <article key={panel.src} className="people-strip-panel">
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
        {t.home.people.title}
      </h2>

      {maxStart > 0 ? (
        <div className="people-strip-nav">
          <button type="button" aria-label={t.home.people.prev} onClick={() => move(-1)} disabled={start === 0}>
            ←
          </button>
          <button
            type="button"
            aria-label={t.home.people.next}
            onClick={() => move(1)}
            disabled={start >= maxStart}
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  )
}
