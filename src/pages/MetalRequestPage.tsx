import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { MetalTradeForm } from '../components/MetalTradeForm'
import { type MetalId } from '../data/metals'
import { interpolate, usePageTitle, useT } from '../i18n'

const IDS: MetalId[] = ['gold', 'silver', 'copper']

function isMetalId(id: string | undefined): id is MetalId {
  return !!id && IDS.includes(id as MetalId)
}

export function MetalRequestPage() {
  const { metalId, action } = useParams<{ metalId: string; action: string }>()
  const { t } = useT()
  const valid = isMetalId(metalId) && (action === 'buy' || action === 'sell')
  const name = isMetalId(metalId) ? t.metal[metalId].name : ''
  const side = action === 'sell' ? 'sell' : 'buy'
  const title = name
    ? interpolate(side === 'sell' ? t.metal.requestSell : t.metal.requestBuy, { name })
    : ''

  usePageTitle(title || undefined)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [metalId, action])

  if (!valid || !isMetalId(metalId)) {
    return <Navigate to="/" replace />
  }

  return (
    <section
      className="request-page"
      aria-label={interpolate(side === 'sell' ? t.metal.requestAriaSell : t.metal.requestAriaBuy, { name })}
    >
      <div className="request-sheet">
        <h1 className="request-title">{title}</h1>
        <MetalTradeForm metalId={metalId} metalName={name} initialSide={side} />
      </div>
    </section>
  )
}
