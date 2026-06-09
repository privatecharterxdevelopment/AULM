import { useState } from 'react'
import { LOGISTICS_FAQ } from '../data/logistics'

type Props = {
  reveal: number
}

type FaqItemProps = {
  item: (typeof LOGISTICS_FAQ)[number]
  index: number
  open: number | null
  setOpen: (i: number | null) => void
}

function FaqItem({ item, index, open, setOpen }: FaqItemProps) {
  const isOpen = open === index
  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={isOpen}
        onClick={() => setOpen(isOpen ? null : index)}
      >
        {item.q}
        <span aria-hidden>+</span>
      </button>
      {isOpen ? <p className="faq-a">{item.a}</p> : null}
    </div>
  )
}

export function FaqSection({ reveal }: Props) {
  const [open, setOpen] = useState<number | null>(0)
  const headIn = Math.min(1, reveal / 0.45)
  const listIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))

  return (
    <section className="faq-section" aria-label="FAQ" id="faq">
      <div className="faq-section-inner">
        <header
          className="faq-section-head"
          style={{
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 20}px)`,
          }}
        >
          <p className="faq-section-label">FAQ</p>
          <h2 className="faq-section-title">Institutional inquiries</h2>
        </header>

        <div
          className="faq-list"
          style={{
            opacity: listIn,
            transform: `translateY(${(1 - listIn) * 16}px)`,
          }}
        >
          <div className="faq-row">
            {LOGISTICS_FAQ.slice(0, 4).map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} open={open} setOpen={setOpen} />
            ))}
          </div>
          <div className="faq-row">
            {LOGISTICS_FAQ.slice(4).map((item, i) => (
              <FaqItem key={item.q} item={item} index={i + 4} open={open} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
