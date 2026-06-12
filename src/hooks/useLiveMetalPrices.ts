import { useEffect, useState } from 'react'
import { METAL_LIST, type MetalId } from '../data/metals'

export type LiveMetalPrice = {
  id: MetalId
  name: string
  price: number
  unit: string
  change: number
  history: number[]
}

const HISTORY_LEN = 48

function seedHistory(base: number, change: number): number[] {
  const pts: number[] = []
  let v = base * (1 - change / 100)
  for (let i = 0; i < HISTORY_LEN; i++) {
    const t = i / (HISTORY_LEN - 1)
    v = base * (1 - change / 100) + (base - base * (1 - change / 100)) * t
    pts.push(v + (Math.random() - 0.5) * base * 0.002)
  }
  pts[pts.length - 1] = base
  return pts
}

function initPrices(): LiveMetalPrice[] {
  return METAL_LIST.map((m) => ({
    id: m.id,
    name: m.name,
    price: m.price,
    unit: m.unit,
    change: m.change,
    history: seedHistory(m.price, m.change),
  }))
}

function tick(prev: LiveMetalPrice[]): LiveMetalPrice[] {
  return prev.map((m) => {
    const drift = (Math.random() - 0.48) * m.price * 0.0012
    const next = Math.max(m.price * 0.98, Math.min(m.price * 1.02, m.price + drift))
    const open = m.history[0] ?? next
    const change = ((next - open) / open) * 100
    const history = [...m.history.slice(1), next]
    return { ...m, price: next, change, history }
  })
}

export function useLiveMetalPrices(intervalMs = 4000) {
  const [metals, setMetals] = useState<LiveMetalPrice[]>(initPrices)
  const [live, setLive] = useState(true)

  useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => setMetals((m) => tick(m)), intervalMs)
    return () => window.clearInterval(id)
  }, [live, intervalMs])

  const gold = metals.find((m) => m.id === 'gold')!

  return { metals, gold, live, setLive }
}
