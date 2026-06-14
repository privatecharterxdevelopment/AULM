import { forwardRef, useEffect, useRef } from 'react'
import { BANKING_SECTION_VIDEO } from '../../config/media'
import { BANKING } from '../../data/banking'
import { useFrameExpand } from '../../hooks/useFrameExpand'
import { getFrameStyle, getPinPadding } from '../../lib/frameExpand'

function playVideo(video: HTMLVideoElement) {
  video.muted = true
  void video.play().catch(() => {})
}

export const BankingExpandSection = forwardRef<HTMLDivElement>(function BankingExpandSection(_, ref) {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const expand = useFrameExpand(heroRef)

  const setRefs = (node: HTMLDivElement | null) => {
    heroRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => playVideo(video)
    if (video.readyState >= 2) play()
    else video.addEventListener('loadeddata', play, { once: true })

    return () => video.removeEventListener('loadeddata', play)
  }, [])

  return (
    <div ref={setRefs} className="banking-expand-hero" aria-label="AULM Banking video">
      <div
        className={`expand-scroll-pin${expand >= 0.985 ? ' is-full' : ''}`}
        style={getPinPadding(expand)}
      >
        <div className="vault-frame" style={getFrameStyle(expand)}>
          <video
            ref={videoRef}
            className="vault-frame-image banking-expand-video"
            src={`${BANKING_SECTION_VIDEO}?v=3`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={(e) => playVideo(e.currentTarget)}
          />

          <div className="vault-frame-overlay vault-frame-overlay--hero">
            <p className="vault-hero-tagline">
              {BANKING.videoTagline.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < BANKING.videoTagline.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>

            <div className="banking-expand-card-brands" aria-label="Accepted card networks">
              <img src="/banking/mastercard.png" alt="Mastercard" className="banking-expand-brand banking-expand-brand--mastercard" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
