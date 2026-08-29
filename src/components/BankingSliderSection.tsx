import { Link } from 'react-router-dom'
import { BtnArrow } from './BtnArrow'

type Props = {
  reveal: number
  eyebrow: string
  title: string
  copy: string
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
  asColumn?: boolean
}

export function BankingSliderSection({
  reveal,
  eyebrow,
  title,
  copy,
  ctaLabel,
  ctaHref,
  ctaExternal,
  asColumn = false,
}: Props) {
  const titleIn = Math.min(1, reveal / 0.45)
  const ctaIn = Math.min(1, Math.max(0, (reveal - 0.2) / 0.38))

  const ctaClass = 'metal-page-btn metal-page-btn--primary'
  const cta = ctaExternal ? (
    <a href={ctaHref} className={ctaClass}>
      {ctaLabel}
      <BtnArrow />
    </a>
  ) : (
    <Link to={ctaHref} className={ctaClass}>
      {ctaLabel}
      <BtnArrow />
    </Link>
  )

  const content = (
    <div
      className={`banking-content${asColumn ? ' banking-content--column' : ''}`}
      style={{
        opacity: titleIn,
        transform: `translateY(${(1 - titleIn) * 20}px)`,
      }}
    >
      <header className="banking-head">
        <p className="banking-eyebrow">{eyebrow}</p>
        <h2 className="banking-title">{title}</h2>
        <p className="banking-copy">{copy}</p>
      </header>

      <div
        className="banking-actions"
        style={{
          opacity: ctaIn,
          transform: `translateY(${(1 - ctaIn) * 10}px)`,
        }}
      >
        {cta}
      </div>
    </div>
  )

  if (asColumn) return content

  return (
    <section className="banking-section" aria-label={title}>
      <div className="banking-inner">{content}</div>
    </section>
  )
}
