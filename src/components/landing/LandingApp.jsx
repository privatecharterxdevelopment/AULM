import StickyCtaBar from '../StickyCtaBar'

export default function LandingApp({ children, sticky }) {
  return (
    <div className={`landing-app ${sticky ? 'landing-with-sticky-cta' : ''}`}>
      {children}
      {sticky && <StickyCtaBar label={sticky.label} to={sticky.to} className={sticky.className} />}
    </div>
  )
}
