import { useEffect, useSyncExternalStore, type RefObject } from 'react'

export const NARROW_CHROME_MQ = '(max-width: 900px)'

let dark = false
const listeners = new Set<() => void>()

export function isNarrowChrome() {
  return typeof window !== 'undefined' && window.matchMedia(NARROW_CHROME_MQ).matches
}

export function usePrefersNarrowChrome() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia(NARROW_CHROME_MQ)
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(NARROW_CHROME_MQ).matches,
    () => false,
  )
}

export function setHeaderOnDark(next: boolean) {
  if (dark === next) return
  dark = next
  listeners.forEach((fn) => fn())
}

export function useHeaderOnDark() {
  return useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange)
      return () => listeners.delete(onStoreChange)
    },
    () => dark,
    () => false,
  )
}

export function isPhotoHeroRoute(pathname: string) {
  return (
    pathname === '/africa' ||
    pathname === '/responsible-sourcing' ||
    pathname === '/investors' ||
    pathname === '/gold-supply-chain-dubai' ||
    pathname === '/tokenization' ||
    pathname === '/news' ||
    pathname.startsWith('/news/') ||
    pathname === '/legal' ||
    pathname === '/privacy'
  )
}

/** Pages that set header invert themselves (full-bleed or expand-frame heroes). */
export function isManagedDarkHeroRoute(pathname: string) {
  return (
    pathname === '/' ||
    pathname === '/refinery' ||
    pathname === '/company' ||
    isPhotoHeroRoute(pathname)
  )
}

/** White logo while the hero is on screen; optional expand gate for framed videos. */
export function useSyncHeaderOnDark(
  heroRef: RefObject<HTMLElement | null>,
  expand?: number,
  expandMin = 0.72,
) {
  useEffect(() => {
    const update = () => {
      const hero = heroRef.current
      if (!hero) {
        setHeaderOnDark(false)
        return
      }
      const inView = hero.getBoundingClientRect().bottom > 64
      const ready = expand === undefined ? true : expand >= expandMin
      setHeaderOnDark(inView && ready && !isNarrowChrome())
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const mq = window.matchMedia(NARROW_CHROME_MQ)
    mq.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      mq.removeEventListener('change', update)
      setHeaderOnDark(false)
    }
  }, [heroRef, expand, expandMin])
}
