import { useEffect, useRef, useState, type RefObject } from 'react'

export const HOME_PAGE_COUNT = 12
const LOCK_MS = 850
const EXPAND_DONE_MS = 320

/** Same distance as the banking video spacer (~90dvh) before the next page. */
function expandRange() {
  return Math.max(640, window.innerHeight * 0.9)
}

export function useDiscretePages(
  containerRef: RefObject<HTMLElement | null>,
  pageCount = HOME_PAGE_COUNT,
) {
  const [page, setPage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [expand, setExpand] = useState(0)
  const pageRef = useRef(0)
  const locked = useRef(false)
  const expandGate = useRef(false)
  const progressRef = useRef(0)
  const expandRef = useRef(0)

  useEffect(() => {
    pageRef.current = page
    const target = page / (pageCount - 1)
    let raf = 0

    const tick = () => {
      const cur = progressRef.current
      const next = cur + (target - cur) * 0.09
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

    const commitExpand = (value: number) => {
      const next = Math.min(1, Math.max(0, value))
      const reachedFull = expandRef.current < 1 && next >= 1
      expandRef.current = next
      setExpand(next)
      if (reachedFull) {
        expandGate.current = true
        window.setTimeout(() => {
          expandGate.current = false
        }, EXPAND_DONE_MS)
      }
      return next
    }

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

    const onHeroScroll = (delta: number) => {
      const range = expandRange()
      const down = delta > 0
      if (down && expandRef.current < 1) {
        commitExpand(expandRef.current + delta / range)
        return true
      }
      if (down && expandRef.current >= 1) {
        if (expandGate.current || locked.current) return true
        go(1)
        return true
      }
      if (!down && expandRef.current > 0) {
        commitExpand(expandRef.current + delta / range)
        return true
      }
      return false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (pageRef.current === 0) {
        if (onHeroScroll(e.deltaY)) return
      }

      if (expandGate.current || locked.current) return
      if (Math.abs(e.deltaY) < 8) return
      go(e.deltaY > 0 ? 1 : -1)
    }

    let touchStartY = 0
    let touchY = 0
    let consumedHero = false
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
      touchY = touchStartY
      consumedHero = false
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY
      const dy = touchY - y
      touchY = y
      if (pageRef.current !== 0) return
      if (onHeroScroll(dy)) {
        e.preventDefault()
        consumedHero = true
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (consumedHero || expandGate.current) return
      const endY = e.changedTouches[0]?.clientY ?? touchY
      const diff = touchStartY - endY
      if (pageRef.current === 0 && onHeroScroll(diff)) return
      if (Math.abs(diff) < 48) return
      go(diff > 0 ? 1 : -1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [containerRef, pageCount])

  return { page, progress, expand }
}
