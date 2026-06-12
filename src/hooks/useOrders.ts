import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { getSupabase, tables, type Order } from '../lib/supabase'

export function useOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }
    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from(tables.orders)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setOrders((data ?? []) as Order[])
    setLoading(false)
  }, [user])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { orders, loading, refresh }
}

export function makeOrderReference() {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `AULM-${new Date().getFullYear()}-${suffix}`
}
