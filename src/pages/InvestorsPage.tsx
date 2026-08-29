import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { useHashScroll } from '../hooks/useHashScroll'
import { INVESTORS } from '../data/investors'

export function InvestorsPage() {
  useHashScroll()

  useEffect(() => {
    document.title = 'AULM | Investors'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  return (
    <div className="africa-page">
      <PageHero
        image="/company/locations/liechtenstein.jpg"
        imageAlt="Liechtenstein — backing behind the desk"
        imagePosition="center 30%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow="Company"
        title={INVESTORS.title}
        bar={[
          ...INVESTORS.quarters.map((q) => ({
            title: q.period,
            href: '#results',
            cta: q.pending ? 'Note →' : 'Read more →',
          })),
          { title: 'Get in touch', href: '/request?type=investors', cta: 'Write →' },
        ]}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{INVESTORS.lead}</p>

          <p className="investors-results-label" id="results">
            {INVESTORS.resultsLabel}
            <span> · {INVESTORS.currencyNote}</span>
          </p>

          <div className="investors-quarters">
            {INVESTORS.quarters.map((q) => (
              <article
                key={q.id}
                className={`investors-quarter${q.pending ? ' is-pending' : ''}`}
              >
                <p className="investors-quarter-period">{q.period}</p>
                <p className="investors-quarter-value">{q.value}</p>
                <p className="investors-quarter-status">{q.status}</p>
              </article>
            ))}
          </div>

          {INVESTORS.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="africa-body-copy">
              {paragraph}
            </p>
          ))}

          <div className="investors-steps">
            {INVESTORS.steps.map((step) => (
              <article key={step.n} className="investors-step">
                <p className="investors-step-n">{step.n}</p>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="vault-body-actions investors-contact-actions africa-body-actions">
            <Link to="/request?type=investors" className="metal-page-btn metal-page-btn--primary">
              Get in touch
              <BtnArrow />
            </Link>
          </div>

          <p className="investors-disclaimer">{INVESTORS.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
