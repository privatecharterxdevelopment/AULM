import type { CbosEscrowStatus } from '../../../cbos/types'

const STEPS = [
  { key: 'open', label: 'Open escrow' },
  { key: 'invite', label: 'Invite parties' },
  { key: 'accept', label: 'Accept & fund' },
  { key: 'seller', label: 'Seller docs' },
  { key: 'clearing', label: 'Clearing agent' },
  { key: 'arrival', label: 'Arrival cert' },
  { key: 'release', label: 'Release' },
  { key: 'done', label: 'Done' },
] as const

function stepIndex(status: CbosEscrowStatus): number {
  if (status === 'completed' || status === 'refunded' || status === 'disputed') return 7
  if (['under_review', 'approved', 'released'].includes(status)) return 6
  if (status === 'in_progress') return 5
  if (status === 'funded' || status === 'awaiting_documents') return 3
  if (status === 'awaiting_funding') return 2
  if (status === 'awaiting_participants') return 1
  return 0
}

type Props = {
  status: CbosEscrowStatus
}

export function CbosEscrowFlowTimeline({ status }: Props) {
  const active = stepIndex(status)

  return (
    <nav className="cbos-escrow-flow" aria-label="Escrow progress">
      <ol className="cbos-escrow-flow__steps">
        {STEPS.map((step, i) => (
          <li
            key={step.key}
            className={`cbos-escrow-flow__step${i < active ? ' is-done' : ''}${i === active ? ' is-active' : ''}`}
          >
            <span className="cbos-escrow-flow__dot" aria-hidden />
            <span className="cbos-escrow-flow__label">{step.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
