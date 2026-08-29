import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Top of page, or jump to #id after a photo hero. */
export function useHashScroll() {
  const { hash } = useLocation()

  useEffect(() => {
    const id = hash.replace('#', '')
    let timer = 0
    if (!id) {
      window.scrollTo(0, 0)
      return
    }
    const go = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    go()
    timer = window.setTimeout(go, 80)
    return () => window.clearTimeout(timer)
  }, [hash])
}
