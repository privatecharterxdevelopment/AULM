import { useEffect, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { BANKING } from '../../data/banking'
import { BtnArrow } from '../BtnArrow'
import { JetonLines } from '../JetonText'

const SNAP_LOCK_MS = 650
const WHEEL_THRESHOLD = 16

type Props = {
  scrollProgress: number
}

export function BankingPageHero({ scrollProgress }: Props) {
  const copyFade = Math.max(0, 1 - scrollProgress * 1.4)

  return (
    <div
      className="banking-page-hero"
      style={{
        opacity: copyFade,
        pointerEvents: copyFade > 0.2 ? 'auto' : 'none',
      }}
    >
      <div
        className="banking-page-hero-copy"
        style={{
          transform: `translateY(${scrollProgress * -20}px)`,
        }}
      >
        <h1 className="jeton-headline banking-page-hero-title" aria-label={BANKING.heroHeadline.join(' ')}>
          <JetonLines lines={[...BANKING.heroHeadline]} />
        </h1>
        <p className="banking-page-hero-sub">{BANKING.heroSubline}</p>
        <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary banking-page-hero-cta">
          Get AULM Card
          <BtnArrow />
        </Link>
      </div>
    </div>
  )
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function nearestIndex(y: number, anchors: number[]) {
  let index = 0
  let min = Infinity
  for (let i = 0; i < anchors.length; i++) {
    const d = Math.abs(y - anchors[i])
    if (d < min) {
      min = d
      index = i
    }
  }
  return index
}

export function useBankingScroll(expandRef: RefObject<HTMLElement | null>) {
  const [cardProgress, setCardProgress] = useState(0)
  const [heroProgress, setHeroProgress] = useState(0)
  const [featuresProgress, setFeaturesProgress] = useState(0)
  const [cardOpacity, setCardOpacity] = useState(1)

  useEffect(() => {
    let snapLocked = false
    let snapTimer = 0
    let touchStartY = 0

    const getAnchors = () => {
      const vh = window.innerHeight
      const anchors = [0, vh, 2 * vh]
      const expand = expandRef.current
      if (expand) anchors.push(expand.offsetTop)
      return { anchors, vh, expand }
    }

    const lockSnap = () => {
      snapLocked = true
      window.clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => {
        snapLocked = false
      }, SNAP_LOCK_MS)
    }

    const scrollToY = (target: number) => {
      if (Math.abs(window.scrollY - target) < 6) return
      lockSnap()
      window.scrollTo({ top: target, behavior: 'smooth' })
    }

    const scrollToIndex = (index: number) => {
      const { anchors } = getAnchors()
      const i = Math.min(anchors.length - 1, Math.max(0, index))
      scrollToY(anchors[i])
    }

    const isInExpandTrack = (y: number, vh: number, expand: HTMLElement) => {
      const top = expand.offsetTop
      const end = top + expand.offsetHeight - vh
      return y > top + 6 && y < end - 6
    }

    const isPastSnapZone = (y: number, vh: number, expand: HTMLElement | null) => {
      if (!expand) return y > 2 * vh + 8
      const end = expand.offsetTop + expand.offsetHeight - vh
      return y >= end - 8
    }

    const updateProgress = () => {
      const vh = window.innerHeight
      const y = window.scrollY

      setCardProgress(clamp01(y / vh))
      setHeroProgress(clamp01(y / (vh * 0.4)))
      setFeaturesProgress(y >= vh * 0.42 ? 1 : clamp01((y - vh * 0.42) / (vh * 0.38)))

      if (y <= vh) setCardOpacity(1)
      else setCardOpacity(Math.max(0, 1 - clamp01((y - vh) / (vh * 0.05))))
    }

    const onWheel = (e: WheelEvent) => {
      const { anchors, vh, expand } = getAnchors()
      const y = window.scrollY

      if (expand && isPastSnapZone(y, vh, expand)) return

      if (expand) {
        const top = expand.offsetTop
        const end = top + expand.offsetHeight - vh

        if (isInExpandTrack(y, vh, expand)) return

        if (e.deltaY > 0 && y >= top - 8 && y <= top + 8) return
        if (e.deltaY < 0 && y <= top + 8 && y >= top - 8) {
          e.preventDefault()
          if (!snapLocked) scrollToIndex(2)
          return
        }
        if (e.deltaY > 0 && y >= end - 8) return
      }

      e.preventDefault()
      if (snapLocked || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return

      const cur = nearestIndex(y, anchors)
      scrollToIndex(cur + (e.deltaY > 0 ? 1 : -1))
    }

    const onTouchEnd = (e: TouchEvent) => {
      const { anchors, vh, expand } = getAnchors()
      const y = window.scrollY
      if (expand && isPastSnapZone(y, vh, expand)) return
      if (expand && isInExpandTrack(y, vh, expand)) return
      if (snapLocked) return

      const dy = touchStartY - (e.changedTouches[0]?.clientY ?? touchStartY)
      if (Math.abs(dy) < 40) return

      const cur = nearestIndex(y, anchors)
      scrollToIndex(cur + (dy > 0 ? 1 : -1))
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const { anchors, vh, expand } = getAnchors()
      const y = window.scrollY
      if (expand && isPastSnapZone(y, vh, expand)) return
      if (expand && isInExpandTrack(y, vh, expand)) return
      if (snapLocked) return

      const cur = nearestIndex(y, anchors)
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        scrollToIndex(cur + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        scrollToIndex(cur - 1)
      }
    }

    window.scrollTo(0, 0)
    updateProgress()

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(snapTimer)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expandRef])

  return { cardProgress, heroProgress, featuresProgress, cardOpacity }
}
