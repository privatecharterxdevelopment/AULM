import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { useFrameExpand } from '../hooks/useFrameExpand'
import { getFrameStyle, getPinPadding } from '../lib/frameExpand'

export function VaultPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const expand = useFrameExpand(heroRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="expand-scroll-page">
      <div ref={heroRef} className="expand-scroll-hero">
        <div
          className={`expand-scroll-pin${expand >= 0.985 ? ' is-full' : ''}`}
          style={getPinPadding(expand)}
        >
          <div className="vault-frame" style={getFrameStyle(expand)}>
            <img src="/vault/vault-hero.png" alt="" className="vault-frame-image" />

            <div className="vault-frame-overlay vault-frame-overlay--hero">
              <p className="vault-hero-tagline">
                Accessible.
                <br />
                Safe.
                <br />
                Secured.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="expand-scroll-body">
        <div className="vault-body">
        <h1 className="vault-body-title">Institutional vaulting</h1>
        <p className="vault-body-lead">
          Custody through TransGuard, Brinks, Loomis and licensed banking partners — fully insured,
          multi-jurisdiction and built for professional desks only.
        </p>
        <p className="vault-body-copy">
          Store physical metal with verified logistics partners or allocate to a depot account to
          sell, trade or hold speculatively within a few clicks — always under written mandate and
          compliance review.
        </p>

        <div className="vault-body-actions">
          <Link to="/company" className="metal-page-btn metal-page-btn--primary">
            Contact sales
            <BtnArrow />
          </Link>
          <Link to="/company" className="metal-page-btn metal-page-btn--secondary">
            Get pricing
            <BtnArrow />
          </Link>
        </div>

        <p className="vault-body-disclaimer">
          AULM only works with verified partners such as banks, Brinks, TransGuard and in-house vault
          facilities across multiple jurisdictions. We never have access to physical goods and cannot
          provide them to third parties without authorisation. There are no online mandates or powers
          of attorney. All authorisations must be notarised, submitted in person at a compliance
          appointment together with security consignors. As a service, clients may simply store —
          transport costs apply via verified logistics partners such as TransGuard, Brinks, Loomis and
          others — or allocate metal to their depot account to sell, trade or hold speculatively
          within a few clicks.
        </p>
        </div>
      </section>
    </div>
  )
}
