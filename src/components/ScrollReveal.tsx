import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { CompanyStrategicMap } from './CompanyStrategicMap'

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

type StoryBadge = {
  logo: string
  logoAlt: string
  note: string
}

type StoryProps = {
  title: string
  body: string
  lead?: string
  subsections?: { title: string; body: string }[]
  badge?: StoryBadge
  locationsTitle?: string
  locationMap?: boolean
  index: number
  className?: string
}

/** Vault-style block with staggered title → body scroll animation. */
export function CompanyStoryBlock({
  title,
  body,
  lead,
  subsections,
  badge,
  locationsTitle,
  locationMap,
  index,
  className = '',
}: StoryProps) {
  const variant: ScrollRevealVariant = index % 2 === 0 ? 'left' : 'right'
  let reveal = 0
  const next = () => reveal++

  const titleI = next()
  const leadI = lead ? next() : -1
  const bodyI = next()
  const badgeI = badge ? next() : -1
  const locationsTitleI = locationsTitle ? next() : -1
  const locationMapI = locationMap ? next() : -1

  return (
    <ScrollReveal variant={variant} className={`company-story-panel ${className}`.trim()}>
      <div className="vault-body company-story-block company-story-block--wide">
        <h2
          className={`vault-body-title company-reveal-child${lead ? '' : ' vault-body-title--solo'}`}
          style={revealIndex(titleI)}
        >
          {title}
        </h2>
        {lead ? (
          <p className="vault-body-lead company-reveal-child" style={revealIndex(leadI)}>
            {lead}
          </p>
        ) : null}
        <p className="vault-body-copy company-reveal-child" style={revealIndex(bodyI)}>
          {body}
        </p>
        {badge ? (
          <div className="company-story-badge company-reveal-child" style={revealIndex(badgeI)}>
            <img
              src={badge.logo}
              alt={badge.logoAlt}
              className="company-story-badge-logo"
              loading="lazy"
              draggable={false}
            />
            <p className="company-story-badge-note">{badge.note}</p>
          </div>
        ) : null}
        {locationMap ? (
          <div className="company-story-locations">
            {locationsTitle ? (
              <h3 className="company-story-subtitle company-reveal-child" style={revealIndex(locationsTitleI)}>
                {locationsTitle}
              </h3>
            ) : null}
            <div className="company-reveal-child" style={revealIndex(locationMapI)}>
              <CompanyStrategicMap />
            </div>
          </div>
        ) : null}
        {subsections?.map((section) => {
          const sectionTitleI = next()
          const sectionBodyI = next()
          return (
            <div key={section.title} className="company-story-subsection">
              <h3
                className="company-story-subtitle company-reveal-child"
                style={revealIndex(sectionTitleI)}
              >
                {section.title}
              </h3>
              <p className="vault-body-copy company-reveal-child" style={revealIndex(sectionBodyI)}>
                {section.body}
              </p>
            </div>
          )
        })}
      </div>
    </ScrollReveal>
  )
}
