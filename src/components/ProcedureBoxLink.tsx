import { Link } from 'react-router-dom'
import { BtnArrow } from './BtnArrow'
import { revealIndex } from './ScrollReveal'

type Props = {
  to: string
  children: string
  index?: number
}

export function ProcedureBoxLink({ to, children, index = 0 }: Props) {
  return (
    <li className="company-service-box" style={revealIndex(index)}>
      <Link to={to} className="company-service-box-inner procedure-box-link">
        <span className="procedure-box-link-label">{children}</span>
        <BtnArrow />
      </Link>
    </li>
  )
}

function DownArrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M12 19l-6-6M12 19l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ProcedureScrollDown() {
  return (
    <a href="#shipping-instructions" className="procedure-scroll-down" aria-label="Shipping instructions">
      <DownArrow />
    </a>
  )
}
