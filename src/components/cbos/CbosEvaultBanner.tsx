import { CbosDeskBanner } from './CbosDeskBanner'

type Props = {
  title?: string
  subtitle?: string
}

export function CbosEvaultBanner({
  title = 'E-Vault',
  subtitle = 'Fixed-yield investment · 3.4% flexible or 5.5% term lock',
}: Props) {
  return (
    <CbosDeskBanner
      eyebrow="Anlagegeschäft"
      title={title}
      subtitle={subtitle}
    />
  )
}
