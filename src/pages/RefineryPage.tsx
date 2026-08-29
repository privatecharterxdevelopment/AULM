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
import { usePageTitle, useT } from '../i18n'

export function RefineryPage() {
  const { t } = useT()
  const r = t.refinery
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const expand = useFrameExpand(heroRef)
  useSyncHeaderOnDark(heroRef, expand)
  usePageTitle(t.nav.refinery)

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

  const materials = REFINERY.materials.map((material) => {
    const copy = r.materials[material.id as keyof typeof r.materials]
    return {
      ...material,
      title: copy.title,
      text: copy.text,
      purity: copy.purity,
    }
  })

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
                {r.tagline.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < r.tagline.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="refinery-section refinery-section--intro">
        <div className="refinery-section-inner vault-body">
          <h1 className="vault-body-title">{r.title}</h1>
          <p className="vault-body-lead">{r.lead}</p>
          <p className="vault-body-copy refinery-trade-terms">{r.tradeTerms}</p>
          <RefineryPartnerLogos />
        </div>
      </section>

      <section className="refinery-section refinery-section--materials">
        <div className="refinery-section-inner">
          <header className="vault-body refinery-section-head">
            <p className="refinery-section-eyebrow">{r.materialsEyebrow}</p>
            <h2 className="refinery-section-title">{r.materialsTitle}</h2>
            <p className="refinery-section-sub">{r.materialsSub}</p>
          </header>
          <RefineryMaterialCards
            materials={materials}
            finenessLabel={r.materialsFineness}
            ariaLabel={r.materialsEyebrow}
          />
        </div>
      </section>

      <section className="refinery-section refinery-section--sell" aria-label={r.sell.aria}>
        <div className="refinery-sell-inner">
          <p className="refinery-sell-eyebrow">{r.sell.eyebrow}</p>
          <h2 className="refinery-sell-title">{r.sell.title}</h2>
          <p className="refinery-sell-lead">{r.sell.lead}</p>
          <ul className="refinery-sell-benefits">
            {r.sell.benefits.map((benefit) => (
              <li key={benefit} className="refinery-sell-benefit">
                {benefit}
              </li>
            ))}
          </ul>
          <div className="refinery-sell-actions">
            <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary">
              {t.common.completeKyc}
              <BtnArrow />
            </Link>
            <Link to="/company/procedure" className="metal-page-btn metal-page-btn--secondary">
              {t.common.seeProcedure}
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="refinery-section refinery-section--faq">
        <div className="refinery-section-inner vault-body">
          <RefineryFaq items={r.faq} />
          <p className="vault-body-disclaimer refinery-disclaimer">{r.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
