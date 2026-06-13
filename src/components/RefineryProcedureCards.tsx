import { useState } from 'react'

type Step = {
  id: string
  title: string
  text: string
}

type Props = {
  steps: readonly Step[]
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`refinery-procedure-plus-icon${open ? ' is-open' : ''}`}
      width="16"
      height="16"
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

export function RefineryProcedureCards({ steps }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <ul className="refinery-procedure-grid" aria-label="Standard procedure">
      {steps.map((step) => {
        const isOpen = openId === step.id
        return (
          <li key={step.id}>
            <article className={`refinery-procedure-card${isOpen ? ' is-open' : ''}`}>
              <div className="refinery-procedure-card-top">
                <h3 className="refinery-procedure-card-title">{step.title}</h3>
                <button
                  type="button"
                  className="refinery-procedure-plus"
                  aria-expanded={isOpen}
                  aria-label={
                    isOpen ? `Hide details for ${step.title}` : `Show details for ${step.title}`
                  }
                  onClick={() => setOpenId(isOpen ? null : step.id)}
                >
                  <PlusIcon open={isOpen} />
                </button>
              </div>
              {isOpen ? <p className="refinery-procedure-card-text">{step.text}</p> : null}
            </article>
          </li>
        )
      })}
    </ul>
  )
}
