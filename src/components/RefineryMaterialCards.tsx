type Material = {
  id: string
  title: string
  text: string
  purity: string
}

type Props = {
  materials: readonly Material[]
  finenessLabel: string
  ariaLabel: string
}

export function RefineryMaterialCards({ materials, finenessLabel, ariaLabel }: Props) {
  return (
    <div className="refinery-materials-grid" aria-label={ariaLabel}>
      {materials.map((material) => (
        <article key={material.id} className="refinery-pillar-card">
          <h2 className="refinery-pillar-card-title">{material.title}</h2>
          <p className="refinery-pillar-card-purity">
            <span>{finenessLabel}</span>
            <strong>{material.purity}</strong>
          </p>
          <p className="refinery-pillar-card-text">{material.text}</p>
        </article>
      ))}
    </div>
  )
}
