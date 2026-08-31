// Deploy: supabase functions deploy places --project-ref oubecmstqtzdnevyqavu --no-verify-jwt
// Secret: supabase secrets set GOOGLE_PLACES_API_KEY=... --project-ref oubecmstqtzdnevyqavu

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type PlacePrediction = {
  placeId?: string
  text?: { text?: string }
  structuredFormat?: {
    mainText?: { text?: string }
    secondaryText?: { text?: string }
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function googleJson(key: string, url: string, init: RequestInit, fieldMask: string) {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': fieldMask,
    },
  })
  const data = await res.json().catch(() => null)
  return { ok: res.ok, data }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, error: 'failed' }, 405)

  const key = Deno.env.get('GOOGLE_PLACES_API_KEY')?.trim() ?? ''
  if (!key) return json({ ok: false, error: 'unconfigured' }, 503)

  let body: {
    action?: string
    input?: string
    placeId?: string
    language?: string
    sessionToken?: string
  }
  try {
    body = await req.json()
  } catch {
    return json({ ok: false, error: 'failed' }, 400)
  }

  const language = body.language?.trim() || 'en'
  const sessionToken = body.sessionToken?.trim() || crypto.randomUUID()

  if (body.action === 'suggest') {
    const input = body.input?.trim() ?? ''
    if (input.length < 3) return json({ ok: true, suggestions: [] })
    const result = await googleJson(
      key,
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        method: 'POST',
        body: JSON.stringify({
          input,
          languageCode: language,
          sessionToken,
          includeQueryPredictions: false,
        }),
      },
      'suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat',
    )
    if (!result.ok) return json({ ok: false, error: 'failed' }, 502)
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
    return json({ ok: true, suggestions })
  }

  if (body.action === 'confirm') {
    const placeId = (body.placeId ?? '').replace(/^places\//, '')
    if (!placeId) return json({ ok: false, error: 'failed' }, 400)
    const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`)
    url.searchParams.set('languageCode', language)
    url.searchParams.set('sessionToken', sessionToken)
    const result = await googleJson(
      key,
      url.toString(),
      { method: 'GET' },
      'id,formattedAddress',
    )
    if (!result.ok) return json({ ok: false, error: 'failed' }, 502)
    const place = result.data as {
      id?: string
      formattedAddress?: string
    } | null
    const formatted = place?.formattedAddress?.trim() ?? ''
    const resolvedId = (place?.id ?? placeId).replace(/^places\//, '')
    if (!formatted || !resolvedId) return json({ ok: false, error: 'failed' }, 502)
    return json({ ok: true, address: { formatted, placeId: resolvedId } })
  }

  return json({ ok: false, error: 'failed' }, 400)
})
