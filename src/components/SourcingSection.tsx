import { useEffect, useState } from 'react'

const SLOGANS = [
  'B2B only — built for institutional desks.',
  'Compliance support, documented end to end.',
  'OECD-aligned sourcing. Hard-compliant flows.',
  'The fastest onboarding in commodities.',
]

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
  reveal: number
}

export function SourcingSection({ reveal }: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const titleReveal = Math.min(1, reveal / 0.55)
  const titleY = (1 - titleReveal) * 28
  const copyReveal = Math.min(1, Math.max(0, (reveal - 0.15) / 0.45))
  const logosIn = Math.min(1, Math.max(0, (reveal - 0.45) / 0.45))

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % SLOGANS.length)
        setVisible(true)
      }, 380)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="sourcing-section" aria-label="Responsible sourcing">
      <div className="sourcing-inner">
        <div className="sourcing-top">
          <header
            className="sourcing-head"
            style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}
          >
            <h2 className="sourcing-title">Responsible sourcing</h2>
          </header>

          <p className={`sourcing-slogan${visible ? ' is-visible' : ''}`} aria-live="polite">
            {SLOGANS[index]}
          </p>

          <p
            className="sourcing-copy"
            style={{
              opacity: copyReveal,
              transform: `translateY(${(1 - copyReveal) * 16}px)`,
            }}
          >
            We work exclusively with professional counterparties — supporting compliance,
            documentation and settlement so your desk can go live faster than anywhere else in
            physical commodities.
          </p>
        </div>

        <div
          className="sourcing-logos"
          style={{
            opacity: logosIn,
            transform: `translateY(${(1 - logosIn) * 16}px)`,
          }}
          aria-label="Compliance partners"
        >
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
      </div>
    </section>
  )
}
