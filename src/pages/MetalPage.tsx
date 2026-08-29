import { useEffect, type CSSProperties } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { MetalNavArrow } from '../components/MetalNavArrow'
import { TradeTitleWord } from '../components/TradeTitleWord'
import {
  METALS,
  formatChange,
  formatPrice,
  getAdjacentMetals,
  type MetalId,
} from '../data/metals'
import { useLiveMetalPrices } from '../hooks/useLiveMetalPrices'

const IDS: MetalId[] = ['gold', 'silver', 'copper']

function isMetalId(id: string | undefined): id is MetalId {
  return !!id && IDS.includes(id as MetalId)
}

export function MetalPage() {
  const { metalId } = useParams<{ metalId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { metals } = useLiveMetalPrices()
  const slide = (location.state as { slide?: number } | null)?.slide ?? 0
  const actionParam = new URLSearchParams(location.search).get('action')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [metalId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isMetalId(metalId)) return
      const { prev, next } = getAdjacentMetals(metalId)
      if (e.key === 'ArrowLeft') navigate(`/${prev.id}`, { state: { slide: -1 } })
      if (e.key === 'ArrowRight') navigate(`/${next.id}`, { state: { slide: 1 } })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [metalId, navigate])

  if (!isMetalId(metalId)) {
    return <Navigate to="/" replace />
  }

  if (actionParam === 'buy' || actionParam === 'sell' || actionParam === 'liquidate') {
    const side = actionParam === 'buy' ? 'buy' : 'sell'
    return <Navigate to={`/${metalId}/${side}`} replace />
  }

  const metal = METALS[metalId]
  const quote = metals.find((m) => m.id === metalId)
  const price = quote?.price ?? metal.price
  const change = quote?.change ?? metal.change
  const { prev, next } = getAdjacentMetals(metalId)
  const isUp = change >= 0
  const desk = metal.desk
  const photoContain = metal.id !== 'gold'

  return (
    <div className="metal-desk-page">
      <section className="metal-page" aria-label={`Trade ${metal.name}`}>
        <MetalNavArrow metal={prev} direction="prev" />
        <MetalNavArrow metal={next} direction="next" />

        <div
          key={metalId}
          className="metal-page-inner"
          style={{ '--metal-slide': slide } as CSSProperties}
        >
          <div className="metal-page-layout">
            <div className="metal-page-content">
              <h1 className="metal-page-title">
                Trade {metal.name} <TradeTitleWord />
              </h1>

              <p className={`metal-page-price${isUp ? ' is-up' : ' is-down'}`}>
                <span className="metal-page-price-value">
                  {formatPrice(price)}
                  <span className="metal-page-price-unit"> {metal.unit}</span>
                </span>
                <span className="metal-page-price-change">{formatChange(change)}</span>
              </p>

              <p className="metal-page-copy">{metal.description}</p>

              <div className="metal-page-actions">
                <Link to={`/${metal.id}/buy`} className="metal-page-btn metal-page-btn--primary">
                  Buy {metal.name}
                  <BtnArrow />
                </Link>
                <Link to={`/${metal.id}/sell`} className="metal-page-btn metal-page-btn--secondary">
                  Sell {metal.name}
                  <BtnArrow />
                </Link>
              </div>
            </div>

            <div className={`metal-page-visual metal-page-visual--${metal.id}`}>
              <img src={metal.image} alt="" className="metal-page-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="metal-desk" aria-label={`${metal.name} desk`}>
        <div className="metal-desk-inner">
          <figure className={`metal-desk-photo${photoContain ? ' is-contain' : ''}`}>
            <img src={desk.photo} alt={desk.photoAlt} />
          </figure>

          <p className="refinery-section-eyebrow">{metal.name}</p>
          <h2 className="vault-body-title">{desk.lead}</h2>

          {desk.copy.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="vault-body-copy">
              {paragraph}
            </p>
          ))}

          <ul className="metal-desk-forms">
            {desk.forms.map((form) => (
              <li key={form}>{form}</li>
            ))}
          </ul>

          <p className="metal-desk-who">{desk.who}</p>
          <p className="metal-desk-minima">{desk.minima}</p>

          <div className="investors-steps metal-desk-steps">
            {desk.steps.map((step) => (
              <article key={step.n} className="investors-step">
                <p className="investors-step-n">{step.n}</p>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="vault-body-actions">
            <Link to={`/${metal.id}/buy`} className="metal-page-btn metal-page-btn--primary">
              Buy {metal.name}
              <BtnArrow />
            </Link>
            <Link to={`/${metal.id}/sell`} className="metal-page-btn metal-page-btn--secondary">
              Sell {metal.name}
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
