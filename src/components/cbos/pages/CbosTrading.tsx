import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { DashboardOverview } from '../../dashboard/DashboardOverview'
import { useLiveMetalPrices } from '../../../hooks/useLiveMetalPrices'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosTrading() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const { gold } = useLiveMetalPrices()
  const kycApproved = profile?.kyc_status === 'approved'

  return (
    <CbosPage>
      <CbosPageHeader
        label="Trading desk"
        title="Commodity trading"
        subtitle="Orders, metals & desk workflows"
        action={
          <Link to="/bank/orders" className="cbos-btn">
            New order
          </Link>
        }
      />
      <div className="cbos-trading-wrap">
        <DashboardOverview
          gold={gold}
          kycApproved={kycApproved}
          onGoToOrders={kycApproved ? () => navigate('/bank/orders') : undefined}
        />
      </div>
    </CbosPage>
  )
}
