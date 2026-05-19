import { DEFAULT_HERO_IMAGE } from '../config/site'

/**
 * Left-aligned page hero with subtle background image.
 */
export default function PageHero({ label, title, description, children, image = DEFAULT_HERO_IMAGE }) {
  return (
    <section
      className="page-hero"
      style={{ '--page-hero-image': `url(${image})` }}
    >
      <div className="container page-hero__inner">
        {label && <span className="page-hero__label">{label}</span>}
        <h1>{title}</h1>
        {description && <p className="page-hero__lead">{description}</p>}
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </section>
  )
}
