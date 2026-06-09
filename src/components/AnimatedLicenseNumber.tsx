import { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
}

export function AnimatedLicenseNumber({ value }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold: 0.35 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <p ref={ref} className="company-license-number" aria-label={value}>
      {value.split('').map((digit, i) => (
        <span
          key={`${digit}-${i}`}
          className={`company-license-digit${active ? ' is-in' : ''}`}
          style={{ transitionDelay: `${i * 0.09}s` }}
        >
          {digit}
        </span>
      ))}
    </p>
  )
}
