import { Link } from 'react-router-dom'
import { formatGoldPerGram } from '../data/metals'
import { useLiveMetalPrices } from '../hooks/useLiveMetalPrices'

export function GoldTicker() {
  const { gold } = useLiveMetalPrices()

  return (
    <Link
      to="/gold"
      className="header-chip header-gold"
      aria-label={`Gold ${formatGoldPerGram(gold.price)} per gram`}
    >
      <span className="header-gold-sym">AU</span>
      <span className="header-gold-px">{formatGoldPerGram(gold.price)}</span>
      <span className="header-gold-unit">/ g</span>
    </Link>
  )
}
