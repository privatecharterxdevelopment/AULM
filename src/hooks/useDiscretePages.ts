import { useEffect, useRef, useState, type RefObject } from 'react'

export const HOME_PAGE_COUNT = 7
const LOCK_MS = 850

export function useDiscretePages(
  containerRef: RefObject<HTMLElement | null>,
  pageCount = HOME_PAGE_COUNT,
) {
  const [page, setPage] = useState(0)
  const [progress, setProgress] = useState(0)
  const pageRef = useRef(0)
  const locked = useRef(false)
  const progressRef = useRef(0)

  useEffect(() => {
    pageRef.current = page
    const target = page / (pageCount - 1)
    let raf = 0

    const tick = () => {
      const cur = progressRef.current
      const next = cur + (target - cur) * 0.16
      if (Math.abs(target - next) < 0.001) {
        progressRef.current = target
        setProgress(target)
        return
      }
      progressRef.current = next
      setProgress(next)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [page, pageCount])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const go = (dir: 1 | -1) => {
      if (locked.current) return
      const next = pageRef.current + dir
      if (next < 0 || next >= pageCount) return
      locked.current = true
      pageRef.current = next
      setPage(next)
      window.setTimeout(() => {
        locked.current = false
      }, LOCK_MS)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < 8) return
      go(e.deltaY > 0 ? 1 : -1)
    }

    let touchY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0]?.clientY ?? touchY
      const diff = touchY - endY
      if (Math.abs(diff) < 48) return
      go(diff > 0 ? 1 : -1)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [containerRef, pageCount])

  return { page, progress }
}
