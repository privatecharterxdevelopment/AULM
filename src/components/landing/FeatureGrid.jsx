import { Link } from 'react-router-dom'

export default function FeatureGrid({ items, columns = 2, className = '' }) {
  const gridClass = ['landing-feature-grid', `landing-feature-grid--${columns}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={gridClass}>
      {items.map((item) => (
        <article
          key={item.id || item.title}
          className={`landing-feature-card${item.wide ? ' landing-feature-card--wide' : ''}`}
        >
          {item.step && <span className="landing-feature-card__step">{item.step}</span>}
          <h3>{item.title}</h3>
          {item.body && <p>{item.body}</p>}
          {item.children}
          {item.to && (
            <Link to={item.to} className="landing-feature-card__link">
              {item.linkLabel || 'Learn more →'}
            </Link>
          )}
        </article>
      ))}
    </div>
  )
}
