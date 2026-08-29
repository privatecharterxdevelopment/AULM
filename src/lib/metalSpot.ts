import { METAL_LIST, type MetalId } from '../data/metals'

export type LiveMetalPrice = {
  id: MetalId
  name: string
  price: number
  unit: string
  change: number
  history: number[]
}

const API = 'https://api.gold-api.com/price'
const POLL_MS = 30_000
const HISTORY_LEN = 48
const OPEN_KEY = 'aulm-metal-day-open-v1'
const HISTORY_KEY = 'aulm-metal-history-v1'

const SYMBOL: Record<MetalId, string> = {
  gold: 'XAU',
  silver: 'XAG',
  copper: 'HG',
}

type SpotJson = {
  price?: number
  updatedAt?: string
}

type DayBook = {
  date: string
  open: Partial<Record<MetalId, number>>
  last: Partial<Record<MetalId, number>>
}

function dayOpen(id: MetalId, livePrice: number): number {
  const stored = readJson<DayBook>(OPEN_KEY)
  const date = todayUTC()
  if (stored?.date === date && typeof stored.open[id] === 'number') {
    writeJson(OPEN_KEY, {
      ...stored,
      last: { ...stored.last, [id]: livePrice },
    })
    return stored.open[id] as number
  }
  const prevClose = stored?.last[id]
  const openPx = typeof prevClose === 'number' ? prevClose : livePrice
  writeJson(OPEN_KEY, {
    date,
    open: { ...(stored?.date === date ? stored.open : stored?.last), [id]: openPx },
    last: { ...stored?.last, [id]: livePrice },
  })
  return openPx
}

function mergeHistory(id: MetalId, price: number): number[] {
  const all = readJson<Partial<Record<MetalId, number[]>>>(HISTORY_KEY) ?? {}
  const prev = all[id]?.filter((n) => Number.isFinite(n)) ?? []
  const last = prev[prev.length - 1]
  const history =
    last != null && Math.abs(last - price) < price * 1e-8
      ? prev
      : [...prev, price].slice(-HISTORY_LEN)
  writeJson(HISTORY_KEY, { ...all, [id]: history })
  return history
}

export type MetalSpotState = {
  metals: LiveMetalPrice[]
  gold: LiveMetalPrice
  live: boolean
  updatedAt: string | null
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10)
}

function fallbackMetals(): LiveMetalPrice[] {
  return METAL_LIST.map((m) => ({
    id: m.id,
    name: m.name,
    price: m.price,
    unit: m.unit,
    change: m.change,
    history: [m.price],
  }))
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota / private mode */
  }
}

async function fetchSpot(id: MetalId): Promise<number | null> {
  const res = await fetch(`${API}/${SYMBOL[id]}`)
  if (!res.ok) return null
  const data = (await res.json()) as SpotJson
  return typeof data.price === 'number' && Number.isFinite(data.price) ? data.price : null
}

let snapshot: MetalSpotState = (() => {
  const metals = fallbackMetals()
  return { metals, gold: metals[0]!, live: false, updatedAt: null }
})()

const listeners = new Set<() => void>()
let timer = 0
let inFlight = false

function emit() {
  listeners.forEach((fn) => fn())
}

async function refresh() {
  if (inFlight) return
  inFlight = true
  try {
    const results = await Promise.all(METAL_LIST.map((m) => fetchSpot(m.id)))
    const next = METAL_LIST.map((m, i) => {
      const price = results[i] ?? snapshot.metals.find((x) => x.id === m.id)?.price ?? m.price
      const open = dayOpen(m.id, price)
      const change = open > 0 ? ((price - open) / open) * 100 : 0
      return {
        id: m.id,
        name: m.name,
        price,
        unit: m.unit,
        change,
        history: mergeHistory(m.id, price),
      } satisfies LiveMetalPrice
    })
    const fetched = results.some((n) => n != null)
    snapshot = {
      metals: next,
      gold: next.find((m) => m.id === 'gold') ?? next[0]!,
      live: fetched,
      updatedAt: fetched ? new Date().toISOString() : snapshot.updatedAt,
    }
    emit()
  } catch {
    snapshot = { ...snapshot, live: false }
    emit()
  } finally {
    inFlight = false
  }
}

function ensurePolling() {
  if (timer) return
  void refresh()
  timer = window.setInterval(() => void refresh(), POLL_MS)
}

function stopPolling() {
  if (!timer) return
  window.clearInterval(timer)
  timer = 0
}

export function subscribeMetalSpot(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  ensurePolling()
  return () => {
    listeners.delete(onStoreChange)
    if (listeners.size === 0) stopPolling()
  }
}

export function getMetalSpotSnapshot() {
  return snapshot
}
