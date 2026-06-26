import { useState } from 'react'
import { AULM_BANK_CARD, AULM_BANK_CARD_BACK } from '../../cbos/brand'
import type { CbosCard } from '../../cbos/types'

type Props = {
  cards?: CbosCard[]
  /** Fill parent panel — card edge-to-edge */
  fill?: boolean
  /** Hide flip controls (home panel) */
  minimal?: boolean
}

const SLIDES = [
  { src: AULM_BANK_CARD, label: 'Commodity Bank' },
  { src: AULM_BANK_CARD_BACK, label: 'Card back' },
] as const

export function CbosCardStage({ cards = [], fill = false, minimal = false }: Props) {
  const issued = cards.map((c) => ({
    src: AULM_BANK_CARD,
    label: `${c.holderName} · ••${c.lastFour}`,
  }))
  const slides = [...SLIDES, ...issued]
  const [active, setActive] = useState(0)
  const current = slides[active] ?? SLIDES[0]

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setActive((i) => (i + 1) % slides.length)

  if (fill) {
    return (
      <div className="cbos-card-stage cbos-card-stage--fill">
        <img
          src={current.src}
          alt="AULM commodity bank card"
          className="cbos-card-stage__fill-img"
          draggable={false}
        />
        {slides.length > 1 && !minimal ? (
          <div className="cbos-card-stage__nav cbos-card-stage__nav--compact">
            <button type="button" className="cbos-card-stage__arrow" onClick={prev} aria-label="Previous card">←</button>
            <div className="cbos-card-stage__dots" role="tablist" aria-label="Cards">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={i === active ? 'is-active' : ''}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <button type="button" className="cbos-card-stage__arrow" onClick={next} aria-label="Next card">→</button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="cbos-card-stage">
      <div className="cbos-card-stage__stack">
        {slides.map((slide, i) => {
          if (i === active) return null
          const offset = i < active ? -1 : 1
          return (
            <div
              key={`${slide.label}-${i}`}
              className={`cbos-card-stage__back cbos-card-stage__back--${offset > 0 ? 'right' : 'left'}`}
              aria-hidden
            >
              <img src={slide.src} alt="" className="cbos-card-stage__img" draggable={false} />
            </div>
          )
        })}
        <div className="cbos-card-stage__front">
          <img src={current.src} alt="AULM commodity bank card" className="cbos-card-stage__img" draggable={false} />
        </div>
      </div>

      <p className="cbos-card-stage__label">{current.label}</p>

      <div className="cbos-card-stage__nav">
        <button type="button" className="cbos-card-stage__arrow" onClick={prev} aria-label="Previous card">←</button>
        <div className="cbos-card-stage__dots" role="tablist" aria-label="Cards">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? 'is-active' : ''}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button type="button" className="cbos-card-stage__arrow" onClick={next} aria-label="Next card">→</button>
      </div>
    </div>
  )
}
