import { Link } from 'react-router-dom'
import type { MetalData } from '../data/metals'

type Props = {
  metal: MetalData
  reveal: number
  index: number
}

export function MetalCard({ metal, reveal, index }: Props) {
  const delay = index * 0.08
  const cardReveal = Math.min(1, Math.max(0, (reveal - 0.25 - delay) / 0.45))
  const y = (1 - cardReveal) * 32
  const scale = 0.94 + cardReveal * 0.06

  return (
    <Link
      id={metal.id}
      to={`/${metal.id}`}
      className={`metal-card metal-card--${metal.accent}`}
      style={{
        opacity: cardReveal,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <span className="metal-card-visual">
        <img src={metal.image} alt="" className="metal-card-image" />
        <span className="metal-card-shine" aria-hidden />
      </span>
      <span className="metal-card-body">
        <h3 className="metal-card-title">{metal.name}</h3>
      </span>
    </Link>
  )
}
