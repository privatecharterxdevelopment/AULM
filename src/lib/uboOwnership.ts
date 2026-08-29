import type { UboEntry } from '../types/kyc'

export function parseOwnership(value: string) {
  const n = Number(String(value).replace('%', '').replace(',', '.').trim())
  return Number.isFinite(n) ? n : 0
}

export function uboOwnershipTotal(ubos: UboEntry[]) {
  return ubos.reduce((sum, ubo) => sum + parseOwnership(ubo.ownership), 0)
}

export function uboOwnershipComplete(ubos: UboEntry[]) {
  return Math.abs(uboOwnershipTotal(ubos) - 100) < 0.05
}
