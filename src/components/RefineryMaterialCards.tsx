import { useState } from 'react'

type Material = {
  id: string
  title: string
  text: string
  image: string
}

type Props = {
  materials: readonly Material[]
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`refinery-pillar-plus-icon${open ? ' is-open' : ''}`}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 3.5v11M3.5 9h11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MaterialCard({
  material,
  expanded,
  onToggle,
}: {
  material: Material
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <article className={`refinery-pillar-card${expanded ? ' is-expanded' : ''}`}>
      <div className="refinery-pillar-card-media">
        <img src={material.image} alt="" className="refinery-pillar-card-image" />
        <div className="refinery-pillar-card-shine" aria-hidden />

        <div className="refinery-pillar-card-foot">
          <h2 className="refinery-pillar-card-title">{material.title}</h2>
          <button
            type="button"
            className="refinery-pillar-plus"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={
              expanded ? `Hide details for ${material.title}` : `Show details for ${material.title}`
            }
          >
            <PlusIcon open={expanded} />
          </button>
        </div>
      </div>

      <div className="refinery-pillar-card-detail">
        <div className="refinery-pillar-card-detail-inner">
          <p className="refinery-pillar-card-text">{material.text}</p>
        </div>
      </div>
    </article>
  )
}

export function RefineryMaterialCards({ materials }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="refinery-materials-grid" aria-label="Acceptable material">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          expanded={expandedId === material.id}
          onToggle={() =>
            setExpandedId((cur) => (cur === material.id ? null : material.id))
          }
        />
      ))}
    </div>
  )
}
