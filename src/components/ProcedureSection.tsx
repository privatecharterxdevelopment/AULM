import { Link } from 'react-router-dom'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

const TILE_HREFS = [
  '/company/procedure/dubai',
  '/company/procedure/shipping-procedures-and-instructions',
  '/company/procedure/gold-hand-carry-procedures',
  '/company/procedure/dore-buying-procedures',
] as const

export function ProcedureSection({ reveal }: Props) {
  const { t } = useT()
  const headIn = Math.min(1, reveal / 0.45)
  const listIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))

  return (
    <section className="procedure-home" aria-label={t.home.procedure.aria}>
      <div className="procedure-home-inner">
        <header
          className="faq-section-head"
          style={{
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 20}px)`,
          }}
        >
          <p className="faq-section-label">{t.home.procedure.label}</p>
          <h2 className="faq-section-title">{t.home.procedure.title}</h2>
        </header>

        <div
          className="procedure-home-grid"
          style={{
            opacity: listIn,
            transform: `translateY(${(1 - listIn) * 16}px)`,
          }}
        >
          {t.home.procedure.tiles.map((tile, i) => (
            <Link key={TILE_HREFS[i]} to={TILE_HREFS[i]} className="procedure-home-tile">
              <h3>{tile.label}</h3>
              <p>{tile.copy}</p>
              <span>{t.home.procedure.open}</span>
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
            {t.common.moreProcedures}
          </Link>
        </p>
      </div>
    </section>
  )
}
