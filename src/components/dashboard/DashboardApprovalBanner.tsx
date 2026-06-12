type Props = {
  status: string
}

export function DashboardApprovalBanner({ status }: Props) {
  if (status === 'approved') return null

  if (status === 'rejected') {
    return (
      <div className="dash-approval-banner dash-approval-banner--rejected" role="status">
        <strong>Application needs attention.</strong> Please contact support — we will guide you
        through the next steps.
      </div>
    )
  }

  return (
    <div className="dash-approval-banner" role="status">
      <strong>KYC under approval.</strong> This typically takes up to 48 hours. You can use Support
      and view your Application while we review. Orders, vault, and logistics unlock once approved.
    </div>
  )
}
