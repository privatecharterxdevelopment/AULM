import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSyncHeaderOnDark } from '../lib/headerOnDark'

export type PageHeroCrumb = {
  label: string
  to?: string
}

export type PageHeroBarItem = {
  title: string
  href: string
  cta: string
}

type Props = {
  image: string
  imageAlt: string
  imagePosition?: string
  crumbs: PageHeroCrumb[]
  eyebrow: string
  title: string
  bar: PageHeroBarItem[]
  label?: string
}

function BarHref({ href, children }: { href: string; children: string }) {
  if (href.startsWith('#')) {
    return <a href={href}>{children}</a>
  }
  return <Link to={href}>{children}</Link>
}

export function PageHero({
  image,
  imageAlt,
  imagePosition = 'center center',
  crumbs,
  eyebrow,
  title,
  bar,
  label,
}: Props) {
  const heroRef = useRef<HTMLElement>(null)
  useSyncHeaderOnDark(heroRef)

  return (
    <section ref={heroRef} className="page-hero" aria-label={label ?? title}>
      <img
        className="page-hero-img"
        src={image}
        alt={imageAlt}
        style={{ objectPosition: imagePosition }}
      />
      <div className="page-hero-shade" aria-hidden />

      <div className="page-hero-inner">
        <nav className="page-hero-nav" aria-label="Breadcrumb">
          {crumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`}>
              {i > 0 ? <span aria-hidden> · </span> : null}
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : crumb.label}
            </span>
          ))}
        </nav>
        <p className="page-hero-eyebrow">{eyebrow}</p>
        <h1 className="page-hero-title">{title}</h1>

        {bar.length > 0 ? (
          <div
            className="page-hero-bar"
            style={{
              gridTemplateColumns: `repeat(${Math.min(bar.length, 4)}, minmax(0, 1fr))`,
            }}
          >
            {bar.map((item) => (
              <div key={item.title}>
                <p>{item.title}</p>
                <BarHref href={item.href}>{item.cta}</BarHref>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
