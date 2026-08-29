import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { RefineryFaq } from '../components/RefineryFaq'
import { RefineryMaterialCards } from '../components/RefineryMaterialCards'
import { RefineryPartnerLogos } from '../components/RefineryPartnerLogos'
import { REFINERY } from '../data/refinery'
import { REFINERY_HERO_VIDEO } from '../config/media'
import { useFrameExpand } from '../hooks/useFrameExpand'
import { useSyncHeaderOnDark } from '../lib/headerOnDark'
import { getFrameStyle, getPinPadding } from '../lib/frameExpand'

export function RefineryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const expand = useFrameExpand(heroRef)
  useSyncHeaderOnDark(heroRef, expand)

  useEffect(() => {
    window.scrollTo(0, 0)
    const video = videoRef.current
    if (!video) return

    video.muted = true
    const play = () => {
      void video.play().catch(() => {})
    }

    if (video.readyState >= 2) play()
    else video.addEventListener('loadeddata', play, { once: true })

    return () => video.removeEventListener('loadeddata', play)
  }, [])

  return (
    <div className="expand-scroll-page refinery-page">
      <div ref={heroRef} className="expand-scroll-hero">
        <div
          className={`expand-scroll-pin${expand >= 0.985 ? ' is-full' : ''}`}
          style={getPinPadding(expand)}
        >
          <div className="vault-frame refinery-frame" style={getFrameStyle(expand)}>
            <video
              ref={videoRef}
              className="vault-frame-image refinery-frame-video"
              src={REFINERY_HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="refinery-frame-whiten" aria-hidden />

            <div className="vault-frame-overlay vault-frame-overlay--hero refinery-frame-overlay">
              <p className="vault-hero-tagline refinery-hero-tagline">
                {REFINERY.tagline.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < REFINERY.tagline.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="refinery-section refinery-section--intro">
        <div className="refinery-section-inner vault-body">
          <h1 className="vault-body-title">{REFINERY.title}</h1>
          <p className="vault-body-lead">{REFINERY.lead}</p>
          <p className="vault-body-copy refinery-trade-terms">{REFINERY.tradeTerms}</p>
          <RefineryPartnerLogos />
        </div>
      </section>

      <section className="refinery-section refinery-section--materials">
        <div className="refinery-section-inner">
          <header className="vault-body refinery-section-head">
            <p className="refinery-section-eyebrow">What we buy</p>
            <h2 className="refinery-section-title">Doré · Dust · Nuggets · Bullion</h2>
            <p className="refinery-section-sub">
              Four institutional intake forms — each lot subject to supply-chain verification and
              compliance clearance before purchase.
            </p>
          </header>
          <RefineryMaterialCards materials={REFINERY.materials} />
        </div>
      </section>

      <section className="refinery-section refinery-section--sell" aria-label="Sell to AULM">
        <div className="refinery-sell-inner">
          <p className="refinery-sell-eyebrow">{REFINERY.sell.eyebrow}</p>
          <h2 className="refinery-sell-title">{REFINERY.sell.title}</h2>
          <p className="refinery-sell-lead">{REFINERY.sell.lead}</p>
          <ul className="refinery-sell-benefits">
            {REFINERY.sell.benefits.map((benefit) => (
              <li key={benefit} className="refinery-sell-benefit">
                {benefit}
              </li>
            ))}
          </ul>
          <div className="refinery-sell-actions">
            <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary">
              Complete KYC
              <BtnArrow />
            </Link>
            <Link to="/company/procedure" className="metal-page-btn metal-page-btn--secondary">
              See procedure
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="refinery-section refinery-section--faq">
        <div className="refinery-section-inner vault-body">
          <RefineryFaq items={REFINERY.faq} />
          <p className="vault-body-disclaimer refinery-disclaimer">{REFINERY.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
