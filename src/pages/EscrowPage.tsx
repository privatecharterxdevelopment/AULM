import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { ESCROW } from '../data/escrow'
import { useFrameExpand } from '../hooks/useFrameExpand'
import { getFrameStyle, getPinPadding } from '../lib/frameExpand'

export function EscrowPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const expand = useFrameExpand(heroRef)
  const taglineOpacity = Math.max(0, 1 - expand * 2.5)

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
          <div className="vault-frame escrow-frame" style={getFrameStyle(expand)}>
            <div className="escrow-frame-bg" aria-hidden>
              <img src="/cargo-cloud.png" alt="" className="escrow-frame-cloud" />
            </div>

            <div
              className="vault-frame-overlay vault-frame-overlay--hero escrow-frame-overlay"
              style={{ opacity: taglineOpacity }}
            >
              <p className="vault-hero-tagline">
                {ESCROW.tagline.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < ESCROW.tagline.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="expand-scroll-body">
        <div className="vault-body">
          <h1 className="vault-body-title">{ESCROW.title}</h1>
          <p className="vault-body-lead">{ESCROW.lead}</p>
          {ESCROW.copy.map((paragraph, i) => (
            <p key={i} className="vault-body-copy">
              {paragraph}
            </p>
          ))}

          <ul className="escrow-pillars">
            {ESCROW.pillars.map((pillar) => (
              <li key={pillar.title} className="escrow-pillar">
                <h2 className="escrow-pillar-title">{pillar.title}</h2>
                <p className="escrow-pillar-text">{pillar.text}</p>
              </li>
            ))}
          </ul>

          <div className="vault-body-actions">
            <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary">
              Open account
              <BtnArrow />
            </Link>
            <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
              Contact compliance
              <BtnArrow />
            </Link>
          </div>

          <p className="vault-body-disclaimer">{ESCROW.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
