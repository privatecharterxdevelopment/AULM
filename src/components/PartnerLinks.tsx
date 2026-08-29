import type { CSSProperties } from 'react'

const PARTNERS = [
  { name: 'OECD', href: 'https://www.oecd.org/en/topics/sub-issues/due-diligence-guidance-for-responsible-business-conduct.html' },
  { name: 'LBMA', href: 'https://www.lbma.org.uk/' },
  { name: 'IFZA', href: 'https://ifza.com/' },
  { name: 'UAE Customs', href: 'https://u.ae/en/information-and-services/finance-and-investment/customs-or-import-tax' },
  { name: 'SWIFT', href: 'https://www.swift.com/' },
  { name: 'Brinks', href: 'https://www.brinks.com/' },
] as const

function PartnerArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17 17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Props = {
  className?: string
  style?: CSSProperties
}

export function PartnerLinks({ className = 'sourcing-logos', style }: Props) {
  return (
    <div className={className} style={style} aria-label="Compliance partners">
      {PARTNERS.map((partner) => (
        <a
          key={partner.name}
          href={partner.href}
          className="sourcing-partner-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {partner.name}
          <PartnerArrow />
        </a>
      ))}
    </div>
  )
}
