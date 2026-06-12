import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function ConfettiBurst() {
  useEffect(() => {
    const duration = 2800
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#111', '#c9a227', '#e8e8e8'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#111', '#c9a227', '#e8e8e8'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#111', '#c9a227', '#f5f5f5', '#888'],
    })
    frame()
  }, [])

  return null
}
