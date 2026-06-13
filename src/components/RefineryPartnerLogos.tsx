const PARTNERS = [
  {
    name: 'Government of Dubai, Department of Economy and Tourism',
    logo: '/refinery/partners/government-of-dubai.svg',
  },
  {
    name: 'IFZA Dubai',
    logo: '/refinery/partners/ifza.png',
  },
] as const

export function RefineryPartnerLogos() {
  return (
    <ul className="refinery-partner-logos" aria-label="Government of Dubai and IFZA">
      {PARTNERS.map((partner) => (
        <li key={partner.name} className="refinery-partner-logos-item">
          <img
            className="refinery-partner-logos-img"
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  )
}
