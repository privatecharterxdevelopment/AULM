import { useCallback, useSyncExternalStore } from 'react'
import {
  getMetalSpotSnapshot,
  subscribeMetalSpot,
  type LiveMetalPrice,
} from '../lib/metalSpot'

export type { LiveMetalPrice }

export function useLiveMetalPrices(_intervalMs = 4000) {
  const snapshot = useSyncExternalStore(
    subscribeMetalSpot,
    getMetalSpotSnapshot,
    getMetalSpotSnapshot,
  )
  const setLive = useCallback((_next: boolean | ((prev: boolean) => boolean)) => {}, [])

  return {
    metals: snapshot.metals,
    gold: snapshot.gold,
    live: snapshot.live,
    setLive,
  }
}
