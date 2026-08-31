import { defineConfig, loadEnv, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { COMMODITY_RSS, parseCommodityRss } from './src/lib/commodityNews'
import { googleAutocomplete, googlePlaceDetails } from './src/lib/placesGoogle'

let newsCache: { at: number; body: string } | null = null
const NEWS_TTL_MS = 90_000

async function commodityNewsJson() {
  const now = Date.now()
  if (newsCache && now - newsCache.at < NEWS_TTL_MS) return newsCache.body

  const res = await fetch(COMMODITY_RSS, {
    headers: { 'User-Agent': 'AULM-desk/1.0' },
  })
  if (!res.ok) throw new Error(`rss ${res.status}`)
  const xml = await res.text()
  const body = JSON.stringify({ items: parseCommodityRss(xml, 8) })
  newsCache = { at: now, body }
  return body
}

function mountCommodityNews(server: ViteDevServer | PreviewServer) {
  server.middlewares.use('/api/commodity-news', (_req, res) => {
    void commodityNewsJson()
      .then((body) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Cache-Control', 'public, max-age=60')
        res.end(body)
      })
      .catch(() => {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ items: [] }))
      })
  })
}

function placesKey() {
  const env = loadEnv('development', process.cwd(), '')
  return (env.GOOGLE_PLACES_API_KEY || env.VITE_GOOGLE_MAPS_API_KEY || '').trim()
}

function readJson(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

async function handlePlaces(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ ok: false, error: 'failed' }))
    return
  }

  let body: {
    action?: string
    input?: string
    placeId?: string
    language?: string
    sessionToken?: string
  }
  try {
    body = (await readJson(req)) as typeof body
  } catch {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false, error: 'failed' }))
    return
  }

  const language = body.language?.trim() || 'en'
  const sessionToken = body.sessionToken?.trim() || crypto.randomUUID()
  const key = placesKey()

  if (body.action === 'suggest') {
    const result = await googleAutocomplete(key, body.input?.trim() ?? '', language, sessionToken)
    res.end(JSON.stringify(result))
    return
  }
  if (body.action === 'confirm') {
    const result = await googlePlaceDetails(key, body.placeId ?? '', language, sessionToken)
    res.end(JSON.stringify(result))
    return
  }

  res.statusCode = 400
  res.end(JSON.stringify({ ok: false, error: 'failed' }))
}

function mountPlaces(server: ViteDevServer | PreviewServer) {
  server.middlewares.use('/api/places', (req, res) => {
    void handlePlaces(req, res)
  })
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'commodity-news',
      configureServer: mountCommodityNews,
      configurePreviewServer: mountCommodityNews,
    },
    {
      name: 'places-autocomplete',
      configureServer: mountPlaces,
      configurePreviewServer: mountPlaces,
    },
  ],
  server: {
    port: 5200,
    strictPort: true,
  },
  optimizeDeps: {
    include: ['tesseract.js', 'mrz'],
    exclude: ['@vladmandic/face-api'],
  },
})
