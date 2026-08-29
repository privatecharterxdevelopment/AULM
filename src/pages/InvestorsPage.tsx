import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { useHashScroll } from '../hooks/useHashScroll'
import { INVESTORS } from '../data/investors'
import { usePageTitle, useT } from '../i18n'

export function InvestorsPage() {
  const { t } = useT()
  const inv = t.investors
  useHashScroll()
  usePageTitle(inv.title)

  return (
    <div className="africa-page">
      <PageHero
        image="/company/locations/liechtenstein.jpg"
        imageAlt={inv.heroAlt}
        imagePosition="center 30%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={inv.eyebrow}
        title={inv.title}
        bar={[
          ...INVESTORS.quarters.map((q) => {
            const copy = inv.quarters[q.id as keyof typeof inv.quarters]
            return {
              title: copy.period,
              href: '#results',
              cta: q.pending ? t.common.noteArrow : t.common.readMoreArrow,
            }
          }),
          { title: inv.getInTouch, href: '/contact?topic=investment', cta: t.common.writeArrow },
        ]}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{inv.lead}</p>

          <p className="investors-results-label" id="results">
            {inv.resultsLabel}
            <span> · {inv.currencyNote}</span>
          </p>

          <div className="investors-quarters">
            {INVESTORS.quarters.map((q) => {
              const copy = inv.quarters[q.id as keyof typeof inv.quarters]
              return (
                <article
                  key={q.id}
                  className={`investors-quarter${q.pending ? ' is-pending' : ''}`}
                >
                  <p className="investors-quarter-period">{copy.period}</p>
                  <p className="investors-quarter-value">{copy.value}</p>
                  <p className="investors-quarter-status">{copy.status}</p>
                </article>
              )
            })}
          </div>

          {inv.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="africa-body-copy">
              {paragraph}
            </p>
          ))}

          <div className="investors-steps">
            {inv.steps.map((step) => (
              <article key={step.n} className="investors-step">
                <p className="investors-step-n">{step.n}</p>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="vault-body-actions investors-contact-actions africa-body-actions">
            <Link to="/contact?topic=investment" className="metal-page-btn metal-page-btn--primary">
              {inv.getInTouch}
              <BtnArrow />
            </Link>
          </div>

          <p className="investors-disclaimer">{inv.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
