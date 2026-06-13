import { useState } from 'react'

type FaqItem = {
  q: string
  a: string
}

type Props = {
  items: readonly FaqItem[]
}

export function RefineryFaq({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="refinery-faq">
      <h2 className="refinery-faq-title">FAQ</h2>
      <div className="refinery-faq-list">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className={`refinery-faq-item${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="refinery-faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span aria-hidden>+</span>
              </button>
              {isOpen ? <p className="refinery-faq-a">{item.a}</p> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
