import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BankingHeroVideo } from '../components/banking/BankingHeroVideo'
import { BtnArrow } from '../components/BtnArrow'
import { BANKING } from '../data/banking'
import { useFrameExpand } from '../hooks/useFrameExpand'
import { getFrameStyle, getPinPadding } from '../lib/frameExpand'

export function BankingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const expand = useFrameExpand(heroRef)
  const taglineOpacity = Math.max(0, 1 - expand * 2.5)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="expand-scroll-page banking-page">
      <div ref={heroRef} className="expand-scroll-hero">
        <div
          className={`expand-scroll-pin${expand >= 0.985 ? ' is-full' : ''}`}
          style={getPinPadding(expand)}
        >
          <div className="vault-frame banking-frame" style={getFrameStyle(expand)}>
            <BankingHeroVideo
              videos={BANKING.heroVideos}
              tagline={BANKING.tagline}
              taglineOpacity={taglineOpacity}
            />
          </div>
        </div>
      </div>

      <section className="expand-scroll-body">
        <div className="vault-body">
          <p className="banking-page-soon">Coming soon</p>
          <h1 className="vault-body-title">{BANKING.title}</h1>
          <p className="vault-body-lead">{BANKING.lead}</p>
          {BANKING.copy.map((paragraph, i) => (
            <p key={i} className="vault-body-copy">
              {paragraph}
            </p>
          ))}

          <ul className="banking-pillars">
            {BANKING.pillars.map((pillar) => (
              <li key={pillar.title} className="banking-pillar">
                <h2 className="banking-pillar-title">{pillar.title}</h2>
                <p className="banking-pillar-text">{pillar.text}</p>
              </li>
            ))}
          </ul>

          <div className="vault-body-actions">
            <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary">
              Open account
              <BtnArrow />
            </Link>
            <Link to="/escrow" className="metal-page-btn metal-page-btn--secondary">
              Escrow
              <BtnArrow />
            </Link>
          </div>

          <p className="vault-body-disclaimer">{BANKING.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
