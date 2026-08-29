import { useEffect, useRef } from 'react'
import { HOME_HERO_VIDEO } from '../config/media'
import { getFrameStyle, getPinPadding } from '../lib/frameExpand'
import { JetonLines } from './JetonText'
import { useT } from '../i18n'

function playHeroVideo(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  void video.play().catch(() => {})
}

type Props = {
  expand?: number
}

export function Hero({ expand = 0 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const full = expand >= 0.985
  const { t } = useT()

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
      <div
        className={`metal-hero-pin${full ? ' is-full' : ''}`}
        style={getPinPadding(expand)}
      >
        <div className="vault-frame hero-frame" style={getFrameStyle(expand)}>
          <video
            ref={videoRef}
            className="vault-frame-image hero-video"
            src={`${HOME_HERO_VIDEO}?v=4`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={(e) => playHeroVideo(e.currentTarget)}
          />
          <div className="vault-frame-overlay vault-frame-overlay--hero hero-frame-copy">
            <h1 className="jeton-headline" aria-label={t.home.hero.aria}>
              <JetonLines lines={[t.home.hero.line1, t.home.hero.line2]} />
            </h1>
            <p className="jeton-subline">
              {t.home.hero.sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
