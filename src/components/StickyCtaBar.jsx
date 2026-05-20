import { Link } from 'react-router-dom'

export default function StickyCtaBar({ label, to, className = '' }) {
  const isHash = typeof to === 'string' && to.startsWith('#')
  return (
    <div className={`sticky-cta-bar ${className}`.trim()}>
      {isHash ? (
        <a href={to} className="btn btn-primary sticky-cta-bar__btn">
          {label}
        </a>
      ) : (
        <Link to={to} className="btn btn-primary sticky-cta-bar__btn">
          {label}
        </Link>
      )}
    </div>
  )
}
