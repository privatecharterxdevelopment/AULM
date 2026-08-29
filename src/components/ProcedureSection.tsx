import { Link } from 'react-router-dom'

type Props = {
  reveal: number
}

const TILES = [
  {
    href: '/company/procedure/dubai',
    label: 'Dubai intake',
    copy: 'Customs, secure transfer and refinery handover at the IFZA desk.',
  },
  {
    href: '/company/procedure/shipping-procedures-and-instructions',
    label: 'Commercial cargo',
    copy: 'Value cargo, airway bill and pre-arrival documents for air freight.',
  },
  {
    href: '/company/procedure/gold-hand-carry-procedures',
    label: 'Gold hand-carry',
    copy: 'Declaration, VAT and meet-and-greet for impure gold into DXB.',
  },
  {
    href: '/company/procedure/dore-buying-procedures',
    label: 'Doré buying',
    copy: 'Onboarding, assay and settlement within 48 hours of accepted fire assay.',
  },
] as const

export function ProcedureSection({ reveal }: Props) {
  const headIn = Math.min(1, reveal / 0.45)
  const listIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))

  return (
    <section className="procedure-home" aria-label="Procedure">
      <div className="procedure-home-inner">
        <header
          className="faq-section-head"
          style={{
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 20}px)`,
          }}
        >
          <p className="faq-section-label">Procedure</p>
          <h2 className="faq-section-title">How the desk moves metal</h2>
        </header>

        <div
          className="procedure-home-grid"
          style={{
            opacity: listIn,
            transform: `translateY(${(1 - listIn) * 16}px)`,
          }}
        >
          {TILES.map((tile) => (
            <Link key={tile.href} to={tile.href} className="procedure-home-tile">
              <h3>{tile.label}</h3>
              <p>{tile.copy}</p>
              <span>Open →</span>
            </Link>
          ))}
        </div>

        <p
          className="procedure-home-all"
          style={{
            opacity: listIn,
            transform: `translateY(${(1 - listIn) * 16}px)`,
          }}
        >
          <Link to="/company/procedure" className="procedure-home-more">
            More procedures
          </Link>
        </p>
      </div>
    </section>
  )
}
