import { useAuth } from '../../../auth/AuthContext'
import { DashboardLogistics } from '../../dashboard/DashboardLogistics'
import { DashboardLocked } from '../../dashboard/DashboardLocked'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosLogistics() {
  const { profile } = useAuth()
  const kycApproved = profile?.kyc_status === 'approved'

  return (
    <CbosPage>
      <CbosPageHeader label="Trading desk" title="Logistics" subtitle="Export and import route planning" />
      <div className="cbos-trading-wrap">
        {!kycApproved ? <DashboardLocked title="Logistics" /> : <DashboardLogistics />}
      </div>
    </CbosPage>
  )
}
