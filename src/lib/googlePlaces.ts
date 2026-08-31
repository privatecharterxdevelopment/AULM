import { getSupabase, isSupabaseConfigured } from './supabase'
import {
  googleAutocomplete,
  googlePlaceDetails,
  type AddressSuggestion,
  type PlacesError,
  type VerifiedAddress,
} from './placesGoogle'

export type { AddressSuggestion, VerifiedAddress }

type SuggestResult =
  | { ok: true; suggestions: AddressSuggestion[] }
  | { ok: false; error: PlacesError }

type ConfirmResult =
  | { ok: true; address: VerifiedAddress }
  | { ok: false; error: PlacesError }

type PlacesBody =
  | { action: 'suggest'; input: string; language: string; sessionToken: string }
  | { action: 'confirm'; placeId: string; language: string; sessionToken: string }

function viteKey() {
  return (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() ?? ''
}

function readError(value: unknown): PlacesError {
  if (value === 'unconfigured' || value === 'vague' || value === 'failed') return value
  return 'failed'
}

async function placesRpc(body: PlacesBody): Promise<Record<string, unknown> | null> {
  if (isSupabaseConfigured) {
    const supabase = getSupabase()
    if (supabase) {
      const { data, error } = await supabase.functions.invoke('places', { body })
      if (!error && data && typeof data === 'object') return data as Record<string, unknown>
    }
  }

  if (import.meta.env.DEV) {
    const res = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return ((await res.json().catch(() => null)) as Record<string, unknown> | null) ?? null
  }

  return null
}

export async function suggestAddresses(
  input: string,
  language: string,
  sessionToken: string,
): Promise<SuggestResult> {
  const key = viteKey()
  if (key && !import.meta.env.DEV) {
    return googleAutocomplete(key, input, language, sessionToken)
  }

  const data = await placesRpc({ action: 'suggest', input, language, sessionToken })
  if (data && data.ok === true && Array.isArray(data.suggestions)) {
    return { ok: true, suggestions: data.suggestions as AddressSuggestion[] }
  }
  if (data && data.ok === false) return { ok: false, error: readError(data.error) }
  if (key) return googleAutocomplete(key, input, language, sessionToken)
  return { ok: false, error: 'unconfigured' }
}

export async function confirmAddress(
  placeId: string,
  language: string,
  sessionToken: string,
): Promise<ConfirmResult> {
  const key = viteKey()
  if (key && !import.meta.env.DEV) {
    return googlePlaceDetails(key, placeId, language, sessionToken)
  }

  const data = await placesRpc({ action: 'confirm', placeId, language, sessionToken })
  if (data && data.ok === true && data.address && typeof data.address === 'object') {
    const address = data.address as VerifiedAddress
    if (address.formatted && address.placeId) return { ok: true, address }
  }
  if (data && data.ok === false) return { ok: false, error: readError(data.error) }
  if (key) return googlePlaceDetails(key, placeId, language, sessionToken)
  return { ok: false, error: 'unconfigured' }
}

export function addressIsVerified(formatted: string, placeId: string) {
  return Boolean(formatted.trim() && placeId.trim())
}
