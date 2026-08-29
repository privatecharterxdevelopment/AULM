import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { TOKENIZATION } from '../data/tokenization'

export function TokenizationPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'AULM | Tokenization'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  return (
    <div className="africa-page">
      <PageHero
        image="/company/locations/hong-kong.jpg"
        imageAlt="Hong Kong — network node"
        imagePosition="center 30%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow={TOKENIZATION.eyebrow}
        title={TOKENIZATION.title}
        bar={[
          { title: 'Physical gold', href: '/gold', cta: 'Trade →' },
          { title: 'The desk', href: '/company', cta: 'About →' },
          { title: 'Procedure', href: '/company/procedure', cta: 'Read more →' },
          { title: 'Contact us', href: '/contact', cta: 'Write →' },
        ]}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{TOKENIZATION.lead}</p>
          <p className="africa-body-copy">
            The public desk remains physical gold, silver and copper — documented chain of custody
            and bank-to-bank settlement. No tokens are issued against this site.
          </p>

          <div className="vault-body-actions investors-contact-actions africa-body-actions">
            <Link to="/gold" className="metal-page-btn metal-page-btn--primary">
              Physical gold
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
