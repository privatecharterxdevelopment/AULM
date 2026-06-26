import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function CbosPage({ children }: Props) {
  return <div className="cbos-page">{children}</div>
}
