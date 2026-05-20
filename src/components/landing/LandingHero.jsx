export default function LandingHero({ label, title, lead, actions, minimal = true }) {
  return (
    <section className={`landing-hero page-header refinery-hero ${minimal ? 'landing-hero--minimal' : ''}`}>
      <div className="landing-app__inner landing-hero__inner">
        {label && <span className="label">{label}</span>}
        <h1>{title}</h1>
        {lead && <p className="landing-hero__lead">{lead}</p>}
        {actions && <div className="landing-hero__actions">{actions}</div>}
      </div>
    </section>
  )
}
