import { AULM_BANK_CARD } from '../../cbos/brand'

type Props = {
  cardProgress: number
  cardOpacity?: number
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function BankingPageCard({ cardProgress, cardOpacity = 1 }: Props) {
  const t = easeOutCubic(clamp01(cardProgress))
  const rotateZ = lerp(90, 0, t)
  const rotateX = lerp(10, 6, t)
  const rotateY = lerp(-8, -2, t)

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Hero: center on bottom edge → half visible above, half clipped below
  const heroX = vw * 0.5
  const heroY = vh

  // Section 2: left of right edge — more card visible
  const endX = vw * 0.87
  const endY = vh * 0.5
  const scale = lerp(1, 1.12, t)

  const x = lerp(heroX, endX, t)
  const y = lerp(heroY, endY, t)

  return (
    <div
      className="banking-page-card-layer"
      style={{
        left: x,
        top: y,
        opacity: cardOpacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
      aria-hidden
    >
      <div
        className="banking-page-card-tilt"
        style={{
          transform: `rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <img
          src={AULM_BANK_CARD}
          alt="AULM commodity banking card"
          className="banking-page-card-img"
          width={1340}
          height={2400}
          draggable={false}
        />
      </div>
    </div>
  )
}
