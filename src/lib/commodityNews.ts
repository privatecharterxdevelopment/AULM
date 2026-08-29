export type MarketHeadline = {
  title: string
  href: string
  date: string
  source: string
}

export const COMMODITY_RSS =
  'https://news.google.com/rss/search?q=gold+OR+silver+OR+copper+OR+%22precious+metals%22+when:7d&hl=en-US&gl=US&ceid=US:en'

const PRICE_TICKER =
  /current price of (gold|silver|copper)|prices today|as of (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
const NOISE = /copper mountain|ski|coaster|casino|theft/i
const METALS = /gold|silver|copper|precious|bullion|lbma|mining|metal|dor[eé]|refin|ore|kitco|spot/i

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function tag(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

function keepHeadline(rawTitle: string) {
  return Boolean(rawTitle) && !PRICE_TICKER.test(rawTitle) && !NOISE.test(rawTitle) && METALS.test(rawTitle)
}

function splitTitle(raw: string) {
  const cut = raw.lastIndexOf(' - ')
  if (cut < 12) return { title: raw, source: '' }
  return { title: raw.slice(0, cut).trim(), source: raw.slice(cut + 3).trim() }
}

export function parseCommodityRss(xml: string, limit = 8): MarketHeadline[] {
  const items: MarketHeadline[] = []
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? []

  for (const block of blocks) {
    const rawTitle = tag(block, 'title')
    if (!keepHeadline(rawTitle)) continue

    const sourceTag = tag(block, 'source')
    const { title, source } = splitTitle(rawTitle)
    const href = tag(block, 'link')
    const date = tag(block, 'pubDate')
    if (!href || !title) continue

    items.push({
      title,
      href,
      date,
      source: sourceTag || source || 'Markets',
    })
    if (items.length >= limit) break
  }

  return items
}

type Rss2JsonItem = {
  title?: string
  link?: string
  pubDate?: string
}

async function fromRss2Json(limit: number): Promise<MarketHeadline[]> {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(COMMODITY_RSS)}`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = (await res.json()) as { status?: string; items?: Rss2JsonItem[] }
  if (data.status !== 'ok' || !data.items) return []

  const items: MarketHeadline[] = []
  for (const item of data.items) {
    const rawTitle = item.title?.trim() ?? ''
    if (!keepHeadline(rawTitle)) continue
    const { title, source } = splitTitle(rawTitle)
    if (!item.link) continue
    items.push({
      title,
      href: item.link,
      date: item.pubDate ?? '',
      source: source || 'Markets',
    })
    if (items.length >= limit) break
  }
  return items
}

export async function fetchCommodityNews(limit = 8): Promise<MarketHeadline[]> {
  try {
    const local = await fetch('/api/commodity-news')
    if (local.ok) {
      const data = (await local.json()) as { items?: MarketHeadline[] }
      if (data.items?.length) return data.items.slice(0, limit)
    }
  } catch {
    /* static hosts have no /api — fall through */
  }

  try {
    return await fromRss2Json(limit)
  } catch {
    return []
  }
}

export function formatMarketDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
