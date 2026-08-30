import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  className?: string
  active: boolean
  poster?: string
}

function play(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  void video.play().catch(() => {})
}

export function BackgroundLoopVideo({ src, className, active, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(active)

  useEffect(() => {
    if (active) setLoad(true)
  }, [active])

  useEffect(() => {
    const video = ref.current
    if (!video || !load) return
    if (active) play(video)
    else video.pause()

    const resume = () => {
      if (document.visibilityState === 'visible' && active) play(video)
    }
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('focus', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('focus', resume)
    }
  }, [active, load, src])

  return (
    <video
      ref={ref}
      className={className}
      src={load ? src : undefined}
      poster={poster}
      autoPlay={active}
      muted
      loop
      playsInline
      preload={load ? 'auto' : 'none'}
      onLoadedData={(e) => {
        if (active) play(e.currentTarget)
      }}
    />
  )
}
