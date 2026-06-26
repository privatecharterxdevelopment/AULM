const STATUS_LABEL: Record<string, string> = {
  none: 'Not submitted',
  under_review: 'Under approval',
  approved: 'Approved',
  rejected: 'Needs attention',
}

type Props = {
  kycStatus: string
  message: string
  messages: { body: string; created_at: string; from_admin?: boolean }[]
  sending: boolean
  onMessageChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onRefresh: () => void
}

export function DashboardSupport({
  kycStatus,
  message,
  messages,
  sending,
  onMessageChange,
  onSubmit,
  onRefresh,
}: Props) {
  const statusLabel = STATUS_LABEL[kycStatus] ?? kycStatus

  return (
    <div className="dash-section">
      <div className="dash-grid">
        <section className="dash-card">
          <h2 className="dash-card-title">KYC / KYB status</h2>
          <p className={`dash-status dash-status--${kycStatus}`}>{statusLabel}</p>
          <p className="dash-card-text">
            {kycStatus === 'under_review'
              ? 'Your application is with our compliance desk. We will notify you by email.'
              : kycStatus === 'approved'
                ? 'Your institution is verified. Trading and logistics mandates are available.'
                : kycStatus === 'rejected'
                  ? 'Please contact support for next steps.'
                  : 'Complete KYC/KYB onboarding to open mandates.'}
          </p>
        </section>

        <section className="dash-card dash-card--support">
          <h2 className="dash-card-title">Chat with support</h2>
          <p className="dash-card-text">
            Message our compliance and logistics desk. We typically reply within one business day.
          </p>
          <form className="dash-support-form" onSubmit={onSubmit}>
            <textarea
              rows={3}
              placeholder="Your message…"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              required
            />
            <button
              type="submit"
              className="metal-page-btn metal-page-btn--secondary"
              disabled={sending}
            >
              {sending ? 'Sending…' : 'Send message'}
            </button>
          </form>
          {messages.length > 0 ? (
            <ul className="dash-messages admin-chat">
              {[...messages]
                .sort((a, b) => a.created_at.localeCompare(b.created_at))
                .map((m, i) => (
                  <li
                    key={`${m.created_at}-${i}`}
                    className={`admin-chat-bubble${m.from_admin ? ' is-admin' : ' is-customer'}`}
                  >
                    <p>{m.body}</p>
                    <time dateTime={m.created_at}>
                      {new Date(m.created_at).toLocaleString('en-GB')}
                      {m.from_admin ? ' · Compliance' : ''}
                    </time>
                  </li>
                ))}
            </ul>
          ) : null}
        </section>
      </div>

      <button type="button" className="dash-refresh" onClick={onRefresh}>
        Refresh status
      </button>
    </div>
  )
}
