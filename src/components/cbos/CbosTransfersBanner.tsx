import { TRANSFERS_BANNER_IMG } from '../../cbos/brand'
import { CbosDeskBanner } from './CbosDeskBanner'

type Props = {
  imageSrc?: string
}

export function CbosTransfersBanner({ imageSrc = TRANSFERS_BANNER_IMG }: Props) {
  return (
    <CbosDeskBanner
      eyebrow="Payments"
      title="Transfers"
      subtitle="Payroll, vendors & international wires"
      imageSrc={imageSrc}
    />
  )
}
