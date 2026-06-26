import { useAuth } from '../../../auth/AuthContext'
import { DashboardOrders } from '../../dashboard/DashboardOrders'
import { DashboardLocked } from '../../dashboard/DashboardLocked'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosOrders() {
  const { profile } = useAuth()
  const kycApproved = profile?.kyc_status === 'approved'

  return (
    <CbosPage>
      <CbosPageHeader label="Trading desk" title="Orders" subtitle="Buy, sell and delivery instructions" />
      <div className="cbos-trading-wrap">
        {!kycApproved ? <DashboardLocked title="Orders" /> : <DashboardOrders />}
      </div>
    </CbosPage>
  )
}
