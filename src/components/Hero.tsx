import { JetonLines } from './JetonText'

export function Hero() {
  return (
    <section id="home" className="metal-hero">
      <div className="hero-foot">
        <div className="hero-foot-inner">
          <h1 className="jeton-headline" aria-label="One platform for all commodities">
            <JetonLines lines={['One platform', 'for all commodities']} />
          </h1>
          <p className="jeton-subline">
            Institutional desk for gold, silver &amp; copper.
          </p>
        </div>
      </div>
    </section>
  )
}
