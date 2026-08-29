import { useEffect, useState } from 'react'
import { fetchCommodityNews, type MarketHeadline } from '../lib/commodityNews'

export function useCommodityNews(limit = 6) {
  const [items, setItems] = useState<MarketHeadline[]>([])
  const [live, setLive] = useState(false)

  useEffect(() => {
    let active = true
    fetchCommodityNews(limit).then((next) => {
      if (!active) return
      setItems(next)
      setLive(next.length > 0)
    })
    return () => {
      active = false
    }
  }, [limit])

  return { items, live }
}
