import { useState } from 'react'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

type FaqItemProps = {
  q: string
  a: string
  index: number
  open: number | null
  setOpen: (i: number | null) => void
}

function FaqItem({ q, a, index, open, setOpen }: FaqItemProps) {
  const isOpen = open === index
  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={isOpen}
        onClick={() => setOpen(isOpen ? null : index)}
      >
        {q}
        <span aria-hidden>+</span>
      </button>
      {isOpen ? <p className="faq-a">{a}</p> : null}
    </div>
  )
}

export function FaqSection({ reveal }: Props) {
  const { t } = useT()
  const items = t.home.faq.items
  const [open, setOpen] = useState<number | null>(0)
  const headIn = Math.min(1, reveal / 0.45)
  const listIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))

  return (
    <section className="faq-section" aria-label={t.home.faq.aria} id="faq">
      <div className="faq-section-inner">
        <header
          className="faq-section-head"
          style={{
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 20}px)`,
          }}
        >
          <p className="faq-section-label">{t.home.faq.label}</p>
          <h2 className="faq-section-title">{t.home.faq.title}</h2>
        </header>

        <div
          className="faq-list"
          style={{
            opacity: listIn,
            transform: `translateY(${(1 - listIn) * 16}px)`,
          }}
        >
          <div className="faq-row">
            {items.slice(0, 4).map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} open={open} setOpen={setOpen} />
            ))}
          </div>
          <div className="faq-row">
            {items.slice(4).map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i + 4} open={open} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
