import { defineConfig, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { COMMODITY_RSS, parseCommodityRss } from './src/lib/commodityNews'

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

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'commodity-news',
      configureServer: mountCommodityNews,
      configurePreviewServer: mountCommodityNews,
    },
  ],
  server: {
    port: 5200,
    strictPort: true,
  },
})
