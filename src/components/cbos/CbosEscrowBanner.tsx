import { ESCROW_BANNER_IMG } from '../../cbos/brand'
import { CbosDeskBanner } from './CbosDeskBanner'

type Props = {
  imageSrc?: string
  title?: string
  subtitle?: string
}

export function CbosEscrowBanner({
  imageSrc = ESCROW_BANNER_IMG,
  title = 'Escrow',
  subtitle = 'Commodity settlement · buyer & seller linked',
}: Props) {
  return (
    <CbosDeskBanner
      eyebrow="Treasury"
      title={title}
      subtitle={subtitle}
      imageSrc={imageSrc}
    />
  )
}
