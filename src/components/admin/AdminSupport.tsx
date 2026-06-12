import { useMemo, useState } from 'react'
import { getSupabase, tables, type Profile, type SupportMessage } from '../../lib/supabase'

type Thread = {
  userId: string
  profile: Profile | null
  messages: SupportMessage[]
}

type Props = {
  messages: SupportMessage[]
  profiles: Profile[]
  onRefresh: () => void
}

export function AdminSupport({ messages, profiles, onRefresh }: Props) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const profileMap = useMemo(() => {
    const m = new Map<string, Profile>()
    for (const p of profiles) m.set(p.id, p)
    return m
  }, [profiles])

  const threads = useMemo(() => {
    const map = new Map<string, SupportMessage[]>()
    for (const msg of messages) {
      const list = map.get(msg.user_id) ?? []
      list.push(msg)
      map.set(msg.user_id, list)
    }
    const result: Thread[] = []
    for (const [userId, msgs] of map) {
      msgs.sort((a, b) => a.created_at.localeCompare(b.created_at))
      result.push({ userId, profile: profileMap.get(userId) ?? null, messages: msgs })
    }
    result.sort((a, b) => {
      const aLast = a.messages[a.messages.length - 1]?.created_at ?? ''
      const bLast = b.messages[b.messages.length - 1]?.created_at ?? ''
      return bLast.localeCompare(aLast)
    })
    return result
  }, [messages, profileMap])

  const active =
    threads.find((t) => t.userId === selectedUser) ?? threads[0] ?? null

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!active || !reply.trim()) return
    const supabase = getSupabase()
    if (!supabase) return
    setSending(true)
    setError(null)
    const { error: insertErr } = await supabase.from(tables.supportMessages).insert({
      user_id: active.userId,
      body: reply.trim(),
      from_admin: true,
    })
    setSending(false)
    if (insertErr) {
      setError(insertErr.message)
      return
    }
    setReply('')
    onRefresh()
  }

  return (
    <div className="dash-section admin-support">
      <section className="dash-card">
        <h2 className="dash-card-title">Support inbox</h2>
        <p className="dash-card-text">{threads.length} conversations</p>

        {threads.length === 0 ? (
          <p className="dash-card-text">No support messages yet.</p>
        ) : (
          <div className="admin-support-grid">
            <ul className="admin-thread-list">
              {threads.map((t) => {
                const last = t.messages[t.messages.length - 1]
                const label = t.profile?.company_name ?? t.profile?.email ?? t.userId.slice(0, 8)
                const isActive = active?.userId === t.userId
                return (
                  <li key={t.userId}>
                    <button
                      type="button"
                      className={`admin-thread-btn${isActive ? ' is-active' : ''}`}
                      onClick={() => setSelectedUser(t.userId)}
                    >
                      <span className="admin-thread-label">{label}</span>
                      <span className="admin-thread-preview">{last?.body.slice(0, 60)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {active ? (
              <div className="admin-thread-panel">
                <header className="admin-thread-header">
                  <h3>{active.profile?.company_name ?? 'Customer'}</h3>
                  <p>
                    {active.profile?.email} · KYC: {active.profile?.kyc_status ?? '—'}
                  </p>
                </header>
                <ul className="admin-chat">
                  {active.messages.map((m) => (
                    <li
                      key={m.id}
                      className={`admin-chat-bubble${m.from_admin ? ' is-admin' : ' is-customer'}`}
                    >
                      <p>{m.body}</p>
                      <time dateTime={m.created_at}>
                        {new Date(m.created_at).toLocaleString('en-GB')}
                        {m.from_admin ? ' · Compliance' : ' · Customer'}
                      </time>
                    </li>
                  ))}
                </ul>
                <form className="admin-reply-form" onSubmit={sendReply}>
                  <textarea
                    className="dash-input dash-input--area"
                    rows={3}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Reply to customer…"
                    required
                  />
                  {error ? <p className="kyc-error">{error}</p> : null}
                  <button
                    type="submit"
                    className="metal-page-btn metal-page-btn--primary"
                    disabled={sending}
                  >
                    {sending ? 'Sending…' : 'Send reply'}
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  )
}
