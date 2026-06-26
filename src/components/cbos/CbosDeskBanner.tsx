type Props = {
  eyebrow: string
  title: string
  subtitle: string
  /** Set via brand.ts or pass per page */
  imageSrc?: string
}

export function CbosDeskBanner({ eyebrow, title, subtitle, imageSrc = '' }: Props) {
  const src = imageSrc?.trim()
  const hasImage = Boolean(src)

  return (
    <div
      className={`cbos-transfers-banner${hasImage ? ' has-image' : ''}`}
      style={hasImage ? { backgroundImage: `url(${src})` } : undefined}
    >
      <div className="cbos-transfers-banner__overlay">
        <p className="cbos-transfers-banner__eyebrow">{eyebrow}</p>
        <h1 className="cbos-transfers-banner__title">{title}</h1>
        <p className="cbos-transfers-banner__sub">{subtitle}</p>
      </div>
    </div>
  )
}
