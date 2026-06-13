import { useEffect, useRef } from 'react'
import { HOME_HERO_VIDEO } from '../config/media'
import { JetonLines } from './JetonText'

function playHeroVideo(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  void video.play().catch(() => {})
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    playHeroVideo(video)

    const resume = () => playHeroVideo(video)
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('focus', resume)

    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('focus', resume)
    }
  }, [])

  return (
    <section id="home" className="metal-hero">
      <div className="hero-video-wrap" aria-hidden>
        <video
          ref={videoRef}
          className="hero-video"
          src={`${HOME_HERO_VIDEO}?v=3`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={(e) => playHeroVideo(e.currentTarget)}
        />
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-foot">
        <div className="hero-foot-inner">
          <h1 className="jeton-headline" aria-label="One platform for all commodities">
            <JetonLines lines={['One platform', 'for all commodities']} />
          </h1>
          <p className="jeton-subline">
            Institutional desk for gold, silver &amp; copper.
          </p>
        </div>
      </div>
    </section>
  )
}
