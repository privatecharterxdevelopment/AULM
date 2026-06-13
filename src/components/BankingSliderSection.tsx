import { Link } from 'react-router-dom'
import cardImage from '../assets/banking/AULM_Commodity_trade-Photoroom.png'
import { BtnArrow } from './BtnArrow'

type Props = {
  reveal: number
}

export function BankingSliderSection({ reveal }: Props) {
  const titleIn = Math.min(1, reveal / 0.45)
  const ctaIn = Math.min(1, Math.max(0, (reveal - 0.2) / 0.38))

  return (
    <section className="banking-section" aria-label="AULM Banking">
      <img
        src={cardImage}
        alt="AULM institutional card"
        className="banking-card-image"
        width={2400}
        height={1340}
        draggable={false}
      />

      <div className="banking-inner">
        <div
          className="banking-content"
          style={{
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 20}px)`,
          }}
        >
          <header className="banking-head">
            <p className="banking-eyebrow">AULM Banking</p>
            <h2 className="banking-title">Commodity banking</h2>
            <p className="banking-copy">
              Connect buyers and sellers on one desk — international settlements, multi-currency
              rails and verified counterparty flows for gold, metals, energy and structured offtake.
            </p>
          </header>

          <div
            className="banking-actions"
            style={{
              opacity: ctaIn,
              transform: `translateY(${(1 - ctaIn) * 10}px)`,
            }}
          >
            <Link to="/banking" className="metal-page-btn metal-page-btn--primary">
              Explore
              <BtnArrow />
            </Link>
            <Link to="/contact" className="banking-contact-link">
              <svg
                className="banking-contact-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  d="M3 14v3a2 2 0 0 0 2 2h1M21 14v3a2 2 0 0 1-2 2h-1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 14a9 9 0 0 1 18 0M6 14v-1a6 6 0 0 1 12 0v1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
