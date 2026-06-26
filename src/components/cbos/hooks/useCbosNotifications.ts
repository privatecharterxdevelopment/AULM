import { useEffect, useState } from 'react'
import { useCbos } from '../../../cbos/context/CbosContext'
import type { CbosNotification } from '../../../cbos/types'

export function useCbosNotifications() {
  const { api } = useCbos()
  const [items, setItems] = useState<CbosNotification[]>([])

  useEffect(() => {
    void api.listNotifications().then(({ items: list }) => setItems(list))
  }, [api])

  const unread = items.filter((n) => !n.read).length

  const markRead = (id: string) => {
    void api.markNotificationRead(id).then(() => {
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    })
  }

  const markAllRead = () => {
    const unreadIds = items.filter((n) => !n.read).map((n) => n.id)
    void Promise.all(unreadIds.map((id) => api.markNotificationRead(id))).then(() => {
      setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    })
  }

  return { items, unread, markRead, markAllRead }
}
