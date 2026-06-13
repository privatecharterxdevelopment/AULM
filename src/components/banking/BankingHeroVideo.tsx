import { useEffect, useRef, useState } from 'react'
import { AulmCorporateCard } from './AulmCorporateCard'

type Props = {
  videos: readonly string[]
  tagline: readonly string[]
  taglineOpacity?: number
}

export function BankingHeroVideo({ videos, tagline, taglineOpacity = 1 }: Props) {
  const [index, setIndex] = useState(0)
  const refs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((video, i) => {
      if (!video) return
      video.muted = true
      if (i === index) void video.play().catch(() => {})
      else video.pause()
    })
  }, [index])

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % videos.length)
    }, 9000)
    return () => clearInterval(id)
  }, [videos.length])

  return (
    <div className="banking-hero-media">
      {videos.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el
          }}
          className={`banking-hero-video${i === index ? ' is-active' : ''}`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ))}
      <div className="banking-hero-video-overlay" aria-hidden />

      <div className="banking-hero-card-loop" aria-hidden>
        <AulmCorporateCard variant="corporate" floating />
        <AulmCorporateCard variant="commodity" floating />
      </div>

      <div className="banking-hero-tagline-wrap" style={{ opacity: taglineOpacity }}>
        <p className="vault-hero-tagline banking-hero-tagline">
          {tagline.map((line, i) => (
            <span key={line}>
              {line}
              {i < tagline.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
