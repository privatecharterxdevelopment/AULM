import { useEffect, useState } from 'react'

export function useMetalScroll(trackId: string) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const track = document.getElementById(trackId)
    if (!track) return

    const update = () => {
      const rect = track.getBoundingClientRect()
      const scrollable = track.offsetHeight - window.innerHeight
      if (scrollable <= 0) {
        setProgress(0)
        return
      }
      const scrolled = Math.min(scrollable, Math.max(0, -rect.top))
      setProgress(scrolled / scrollable)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [trackId])

  return progress
}
