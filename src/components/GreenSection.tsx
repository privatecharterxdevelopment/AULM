import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GREEN_HERO_VIDEO } from '../config/media'
import { GREEN_HOME } from '../data/green'
import { GreenMarks } from './GreenMarks'

type Props = {
  reveal: number
}

function playVideo(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  void video.play().catch(() => {})
}

export function GreenSection({ reveal }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleIn = Math.min(1, reveal / 0.5)
  const restIn = Math.min(1, Math.max(0, (reveal - 0.18) / 0.5))

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    playVideo(video)
    const resume = () => playVideo(video)
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('focus', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('focus', resume)
    }
  }, [])

  return (
    <section className="green-home" aria-label="Climate">
      <div className="green-home-pin">
        <div className="vault-frame green-home-frame">
          <video
            ref={videoRef}
            className="vault-frame-image green-home-video"
            src={GREEN_HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={(e) => playVideo(e.currentTarget)}
          />
          <div className="green-home-shade" aria-hidden />
          <div
            className="green-home-copy"
            style={{
              opacity: titleIn,
              transform: `translateY(${(1 - titleIn) * 18}px)`,
            }}
          >
            <p className="green-home-eyebrow">{GREEN_HOME.eyebrow}</p>
            <h2 className="green-home-title">
              {GREEN_HOME.title[0]}
              <br />
              {GREEN_HOME.title[1]}
            </h2>
            <div
              className="green-home-body"
              style={{
                opacity: restIn,
                transform: `translateY(${(1 - restIn) * 12}px)`,
              }}
            >
              <p>{GREEN_HOME.lead}</p>
              <GreenMarks />
              <Link to={GREEN_HOME.href} className="green-home-cta">
                {GREEN_HOME.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
