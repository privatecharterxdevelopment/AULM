export type AddressSuggestion = {
  placeId: string
  text: string
  mainText: string
  secondaryText: string
}

export type VerifiedAddress = {
  formatted: string
  placeId: string
}

export type PlacesError = 'unconfigured' | 'vague' | 'failed'

type PlacePrediction = {
  placeId?: string
  text?: { text?: string }
  structuredFormat?: {
    mainText?: { text?: string }
    secondaryText?: { text?: string }
  }
}

async function googleJson(key: string, url: string, init: RequestInit, fieldMask: string) {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': fieldMask,
      ...(init.headers ?? {}),
    },
  })
  const data: unknown = await res.json().catch(() => null)
  if (!res.ok) return { ok: false as const, error: 'failed' as const, data }
  return { ok: true as const, data }
}

export async function googleAutocomplete(
  key: string,
  input: string,
  languageCode: string,
  sessionToken: string,
): Promise<{ ok: true; suggestions: AddressSuggestion[] } | { ok: false; error: PlacesError }> {
  if (!key.trim()) return { ok: false, error: 'unconfigured' }
  const result = await googleJson(
    key,
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      body: JSON.stringify({
        input,
        languageCode,
        sessionToken,
        includeQueryPredictions: false,
      }),
    },
    'suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat',
  )
  if (!result.ok) return { ok: false, error: result.error }

  const suggestions = (
    (result.data as { suggestions?: { placePrediction?: PlacePrediction }[] } | null)?.suggestions ?? []
  )
    .map((item) => item.placePrediction)
    .filter((pred): pred is PlacePrediction => Boolean(pred?.placeId))
    .map((pred) => ({
      placeId: pred.placeId!,
      text: pred.text?.text ?? '',
      mainText: pred.structuredFormat?.mainText?.text ?? pred.text?.text ?? '',
      secondaryText: pred.structuredFormat?.secondaryText?.text ?? '',
    }))
    .filter((row) => row.placeId && row.mainText)

  return { ok: true, suggestions }
}

export async function googlePlaceDetails(
  key: string,
  placeId: string,
  languageCode: string,
  sessionToken: string,
): Promise<{ ok: true; address: VerifiedAddress } | { ok: false; error: PlacesError }> {
  if (!key.trim()) return { ok: false, error: 'unconfigured' }
  const id = placeId.replace(/^places\//, '')
  const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`)
  url.searchParams.set('languageCode', languageCode)
  url.searchParams.set('sessionToken', sessionToken)

  const result = await googleJson(
    key,
    url.toString(),
    { method: 'GET' },
    'id,formattedAddress',
  )
  if (!result.ok) return { ok: false, error: result.error }

  const place = result.data as {
    id?: string
    formattedAddress?: string
  } | null
  const formatted = place?.formattedAddress?.trim() ?? ''
  const resolvedId = (place?.id ?? id).replace(/^places\//, '')
  if (!formatted || !resolvedId) return { ok: false, error: 'failed' }
  return { ok: true, address: { formatted, placeId: resolvedId } }
}
