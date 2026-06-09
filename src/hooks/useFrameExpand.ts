import { useEffect, useState, type RefObject } from 'react'

/** 0 → 1 while user scrolls through the hero spacer (before content scrolls in). */
export function useFrameExpand(heroRef: RefObject<HTMLElement | null>) {
  const [expand, setExpand] = useState(0)

  useEffect(() => {
    const update = () => {
      const hero = heroRef.current
      if (!hero) return

      const top = hero.offsetTop
      const range = hero.offsetHeight - window.innerHeight
      if (range <= 0) {
        setExpand(1)
        return
      }

      const raw = (window.scrollY - top) / range
      setExpand(Math.min(1, Math.max(0, raw)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [heroRef])

  return expand
}
