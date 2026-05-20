import { Link } from 'react-router-dom'

function stepText(item) {
  return item.text || item.body || ''
}

export default function FeatureGrid({ items, columns = 2, className = '', lead }) {
  const hasImages = items.some((item) => item.image)
  const gridClass = [
    hasImages ? 'process-steps-grid process-steps-grid--landing' : 'landing-feature-grid',
    !hasImages && `landing-feature-grid--${columns}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      {lead && <p className={hasImages ? 'process-steps-lead' : 'landing-section__lead'}>{lead}</p>}
      <div className={gridClass}>
        {items.map((item, index) =>
          hasImages ? (
            <article key={item.id || item.title} className="process-step-card">
              <div
                className="process-step-card__visual"
                style={{ backgroundImage: `url("${item.image}")` }}
                role="img"
                aria-hidden="true"
              />
              <span className="process-step-card__num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{stepText(item)}</p>
              {item.to && (
                <Link to={item.to} className="process-step-card__link">
                  {item.linkLabel || 'Learn more →'}
                </Link>
              )}
            </article>
          ) : (
            <article
              key={item.id || item.title}
              className={`landing-feature-card${item.wide ? ' landing-feature-card--wide' : ''}`}
            >
              {item.step && <span className="landing-feature-card__step">{item.step}</span>}
              <h3>{item.title}</h3>
              {stepText(item) && <p>{stepText(item)}</p>}
              {item.children}
              {item.to && (
                <Link to={item.to} className="landing-feature-card__link">
                  {item.linkLabel || 'Learn more →'}
                </Link>
              )}
            </article>
          )
        )}
      </div>
    </>
  )
}
