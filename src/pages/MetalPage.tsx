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

const IDS: MetalId[] = ['gold', 'silver', 'copper']

function isMetalId(id: string | undefined): id is MetalId {
  return !!id && IDS.includes(id as MetalId)
}

export function MetalPage() {
  const { metalId } = useParams<{ metalId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const slide = (location.state as { slide?: number } | null)?.slide ?? 0

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

  const metal = METALS[metalId]
  const { prev, next } = getAdjacentMetals(metalId)
  const isUp = metal.change >= 0

  const actionParam = new URLSearchParams(location.search).get('action')
  const action =
    actionParam === 'sell' || actionParam === 'liquidate' || actionParam === 'buy'
      ? actionParam
      : 'buy'
  const primaryLabel =
    action === 'sell'
      ? 'Sell now'
      : action === 'liquidate'
        ? 'Liquidate now'
        : 'Trade now'

  return (
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
              {action === 'sell'
                ? 'Sell'
                : action === 'liquidate'
                  ? 'Liquidate'
                  : 'Trade'}{' '}
              {metal.name} {action === 'buy' ? <TradeTitleWord /> : null}
            </h1>

            <p className={`metal-page-price${isUp ? ' is-up' : ' is-down'}`}>
              <span className="metal-page-price-value">
                {formatPrice(metal.price)}
                <span className="metal-page-price-unit"> {metal.unit}</span>
              </span>
              <span className="metal-page-price-change">{formatChange(metal.change)}</span>
            </p>

            <p className="metal-page-copy">{metal.description}</p>

            <div className="metal-page-actions">
              <Link
                to={`/${metalId}${action !== 'buy' ? `?action=${action}` : ''}`}
                className="metal-page-btn metal-page-btn--primary"
              >
                {primaryLabel}
                <BtnArrow />
              </Link>
              <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
                Contact sales
                <BtnArrow />
              </Link>
              <Link to="/vault" className="metal-page-btn metal-page-btn--secondary">
                Vault service
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
  )
}
