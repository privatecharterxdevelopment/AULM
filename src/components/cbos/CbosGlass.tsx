import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  stagger?: number
  pad?: boolean
}

export function CbosGlass({ children, className = '', stagger, pad = true }: Props) {
  const style = stagger !== undefined ? { animationDelay: `${stagger}ms` } : undefined

  return (
    <div
      className={`cbos-glass${pad ? ' cbos-glass--pad' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
