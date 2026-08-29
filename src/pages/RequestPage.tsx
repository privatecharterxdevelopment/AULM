import { Navigate, useSearchParams } from 'react-router-dom'

export function RequestPage() {
  const [params] = useSearchParams()
  const type = params.get('type')
  const topic =
    type === 'investors' ? 'investment' : type === 'buy' || type === 'sell' ? 'trading' : 'general'
  return <Navigate to={`/contact?topic=${topic}`} replace />
}
