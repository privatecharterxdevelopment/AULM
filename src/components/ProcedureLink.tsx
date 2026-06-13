import { Link } from 'react-router-dom'

function ExternalArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17 17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Props = {
  to: string
  children: string
}

export function ProcedureLink({ to, children }: Props) {
  return (
    <Link to={to} className="sourcing-partner-link procedure-link">
      {children}
      <ExternalArrow />
    </Link>
  )
}
