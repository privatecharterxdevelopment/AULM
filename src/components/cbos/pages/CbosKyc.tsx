import { DashboardApplication } from '../../dashboard/DashboardApplication'
import { DashboardApprovalBanner } from '../../dashboard/DashboardApprovalBanner'
import { useAuth } from '../../../auth/AuthContext'
import { CbosGlass } from '../CbosGlass'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosKyc() {
  const { profile } = useAuth()
  const kycStatus = profile?.kyc_status ?? 'none'

  return (
    <CbosPage>
      <CbosPageHeader
        label="Compliance"
        title="KYC application"
        subtitle="Same onboarding flow as your institutional desk"
      />

      {kycStatus !== 'approved' ? (
        <CbosGlass className="cbos-verify-glass">
          <DashboardApprovalBanner status={kycStatus} />
        </CbosGlass>
      ) : null}

      <CbosGlass className="cbos-kyc-app-wrap">
        <DashboardApplication />
      </CbosGlass>
    </CbosPage>
  )
}
