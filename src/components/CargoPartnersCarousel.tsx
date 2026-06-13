const PARTNERS = [
  { name: 'Hong Kong Air Cargo', logo: '/cargo-logos/hongkong-air-cargo.svg', large: true },
  { name: 'SWISS WorldCargo', logo: '/cargo-logos/swiss-worldcargo.svg' },
  { name: 'Ghana Airport Cargo Centre', logo: '/cargo-logos/gacc.svg' },
  { name: "Brink's", logo: '/cargo-logos/brinks.svg' },
  { name: 'Transguard Group', logo: '/cargo-logos/transguard.png' },
  { name: 'Lufthansa Cargo', logo: '/cargo-logos/lufthansa-cargo.svg' },
  { name: 'Emirates SkyCargo', logo: '/cargo-logos/emirates-skycargo.svg' },
]

type Props = {
  visible?: number
}

export function CargoPartnersCarousel({ visible = 1 }: Props) {
  const items = [...PARTNERS, ...PARTNERS]

  return (
    <div
      className="cargo-partners"
      style={{
        opacity: visible,
        transform: `translateY(${(1 - visible) * 16}px)`,
      }}
      aria-label="Certified logistics partners"
    >
      <div className="cargo-partners-viewport">
        <div className="cargo-partners-track">
          {items.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className={`cargo-partners-item${partner.large ? ' cargo-partners-item--large' : ''}`}
            >
              <img
                className="cargo-partners-logo"
                src={partner.logo}
                alt={partner.name}
                width={128}
                height={32}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
