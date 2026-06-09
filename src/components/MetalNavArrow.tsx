import { Link } from 'react-router-dom'
import type { MetalData } from '../data/metals'

type Props = {
  metal: MetalData
  direction: 'prev' | 'next'
}

function ArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {direction === 'prev' ? (
        <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

export function MetalNavArrow({ metal, direction }: Props) {
  const label = direction === 'prev' ? `Previous: ${metal.name}` : `Next: ${metal.name}`

  return (
    <Link
      to={`/${metal.id}`}
      state={{ slide: direction === 'prev' ? -1 : 1 }}
      className={`metal-nav-arrow metal-nav-arrow--${direction}`}
      aria-label={label}
    >
      <ArrowIcon direction={direction} />
      <span className="metal-nav-arrow-label">{metal.name}</span>
      <span className={`metal-nav-dot metal-nav-dot--${metal.id}`} aria-hidden />
    </Link>
  )
}
