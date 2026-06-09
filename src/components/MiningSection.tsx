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
            AULM operates to the highest responsible mining standards — OECD Due Diligence
            Guidance, hard-compliant sourcing and full traceability from pit to export.
          </p>
          <p>
            We work with licensed operators across Africa under global ESG frameworks, with
            independent audits, chain-of-custody documentation and zero tolerance for conflict
            minerals.
          </p>
        </div>
      </div>
    </section>
  )
}
