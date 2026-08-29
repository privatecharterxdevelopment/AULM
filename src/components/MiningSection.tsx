import { Link } from 'react-router-dom'

type Props = {
  reveal: number
}

export function MiningSection({ reveal }: Props) {
  const titleReveal = Math.min(1, reveal / 0.55)
  const boxReveal = Math.min(1, Math.max(0, (reveal - 0.2) / 0.5))
  const titleY = (1 - titleReveal) * 28
  const boxY = (1 - boxReveal) * 24

  return (
    <section className="mining-section" aria-label="Responsible mining worldwide">
      <video
        className="mining-video"
        src="/videos/mining.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="mining-overlay" aria-hidden />

      <div className="mining-content">
        <h2
          className="mining-title"
          style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
        >
          Responsible mining
          <br />
          worldwide
        </h2>

        <div
          className="mining-glass"
          style={{ opacity: boxReveal, transform: `translateY(${boxY}px)` }}
        >
          <p>
            We are on the ground in Africa — developing local projects and widening our presence.
            Artisanal and local mines sell into a documented desk, not arbitrary agents.
          </p>
          <p>
            We are working toward our own export licence so locally mined gold can be processed in
            a closed loop — fair terms, OECD due diligence, and the lightest practicable footprint.
          </p>
          <Link to="/africa" className="mining-more">
            Local projects
          </Link>
        </div>
      </div>
    </section>
  )
}
