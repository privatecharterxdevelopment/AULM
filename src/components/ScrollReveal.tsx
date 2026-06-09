import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export type ScrollRevealVariant = 'up' | 'left' | 'right' | 'scale' | 'blur'

export function revealIndex(i: number): CSSProperties {
  return { '--i': i } as CSSProperties
}

type Props = {
  children: ReactNode
  className?: string
  variant?: ScrollRevealVariant
}

export function ScrollReveal({ children, className = '', variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.18, rootMargin: '-6% 0px -4% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant}${visible ? ' is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

type StoryProps = {
  title: string
  body: string
  lead?: string
  index: number
  className?: string
}

/** Vault-style block with staggered title → body scroll animation. */
export function CompanyStoryBlock({ title, body, lead, index, className = '' }: StoryProps) {
  const variant: ScrollRevealVariant = index % 2 === 0 ? 'left' : 'right'
  let childIndex = 0

  return (
    <ScrollReveal variant={variant} className={`company-story-panel ${className}`.trim()}>
      <div className="vault-body company-story-block">
        <h2
          className={`vault-body-title company-reveal-child${lead ? '' : ' vault-body-title--solo'}`}
          style={revealIndex(childIndex++)}
        >
          {title}
        </h2>
        {lead ? (
          <p className="vault-body-lead company-reveal-child" style={revealIndex(childIndex++)}>
            {lead}
          </p>
        ) : null}
        <p className="vault-body-copy company-reveal-child" style={revealIndex(childIndex)}>
          {body}
        </p>
      </div>
    </ScrollReveal>
  )
}
