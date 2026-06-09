export type Metal = 'gold' | 'silver' | 'copper'

const RATIO: Record<Metal, number> = {
  gold: 0,
  silver: 1,
  copper: 0.55,
}

export function scrollToMetal(metal: Metal) {
  const track = document.getElementById('metal-scroll')
  if (!track) return

  const scrollable = track.offsetHeight - window.innerHeight
  const top = track.offsetTop + RATIO[metal] * scrollable
  window.scrollTo({ top, behavior: 'smooth' })
}
