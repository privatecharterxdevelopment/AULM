type Props = {
  title: string
}

export function DashboardLocked({ title }: Props) {
  return (
    <div className="dash-section">
      <section className="dash-card dash-card--locked">
        <h2 className="dash-card-title">{title}</h2>
        <p className="dash-card-text">
          Available once your KYC/KYB application is approved. We will notify you by email — usually
          within 48 hours.
        </p>
      </section>
    </div>
  )
}
