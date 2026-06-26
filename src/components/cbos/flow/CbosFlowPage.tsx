import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  title: string
  children: ReactNode
}

export function CbosFlowPage({ title, children }: Props) {
  const navigate = useNavigate()

  return (
    <div className="cbos-flow">
      <header className="cbos-flow__head">
        <h1 className="cbos-flow__title">{title}</h1>
        <button
          type="button"
          className="cbos-flow__close"
          aria-label="Close"
          onClick={() => navigate('/bank')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </header>
      <div className="cbos-flow__body">{children}</div>
    </div>
  )
}
