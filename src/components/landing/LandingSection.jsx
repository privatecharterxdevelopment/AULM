export default function LandingSection({ title, lead, variant, children, id, className = '' }) {
  const sectionClass = ['landing-section', variant && `landing-section--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={sectionClass}>
      <div className="landing-app__inner">
        {title && <h2 className="landing-section__title">{title}</h2>}
        {lead && <p className="landing-section__lead">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
