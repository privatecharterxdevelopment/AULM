import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { MetalTradeForm } from '../components/MetalTradeForm'
import { METALS, type MetalId } from '../data/metals'

const IDS: MetalId[] = ['gold', 'silver', 'copper']

function isMetalId(id: string | undefined): id is MetalId {
  return !!id && IDS.includes(id as MetalId)
}

export function MetalRequestPage() {
  const { metalId, action } = useParams<{ metalId: string; action: string }>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [metalId, action])

  if (!isMetalId(metalId) || (action !== 'buy' && action !== 'sell')) {
    return <Navigate to="/" replace />
  }

  const metal = METALS[metalId]
  const side = action === 'sell' ? 'sell' : 'buy'

  return (
    <section
      className="request-page"
      aria-label={`${side === 'sell' ? 'Sell' : 'Buy'} ${metal.name}`}
    >
      <div className="request-sheet">
        <h1 className="request-title">
          {side === 'sell' ? 'Sell' : 'Buy'} {metal.name}
        </h1>
        <MetalTradeForm metalId={metal.id} metalName={metal.name} initialSide={side} />
      </div>
    </section>
  )
}
