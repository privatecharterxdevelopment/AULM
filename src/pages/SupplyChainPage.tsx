import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { useHashScroll } from '../hooks/useHashScroll'
import { SUPPLY_CHAIN } from '../data/supplyChain'

export function SupplyChainPage() {
  useHashScroll()

  useEffect(() => {
    document.title = 'AULM | Supply chain'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  return (
    <div className="africa-page">
      <PageHero
        image="/logistics/supply-sea.jpg"
        imageAlt="Insured ocean freight into Dubai"
        imagePosition="center 40%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow="Procedure"
        title={SUPPLY_CHAIN.title}
        bar={SUPPLY_CHAIN.steps.map((step) => ({
          title: step.title,
          href: `#${step.n}`,
          cta: 'Read more →',
        }))}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{SUPPLY_CHAIN.pageLead}</p>

          <div className="supply-steps">
            {SUPPLY_CHAIN.steps.map((step) => (
              <article key={step.n} id={step.n} className="supply-step">
                <p className="supply-step-n">{step.n}</p>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          {SUPPLY_CHAIN.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="africa-body-copy">
              {paragraph}
            </p>
          ))}

          <div className="vault-body-actions africa-body-actions">
            <Link
              to="/company/procedure/supply-chain-due-diligence-policy"
              className="metal-page-btn metal-page-btn--primary"
            >
              Due diligence policy
              <BtnArrow />
            </Link>
            <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
              Contact us
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
