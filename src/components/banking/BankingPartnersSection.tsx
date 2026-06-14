import cardHandImage from '../../assets/banking/BacksideBANKCommodityAULM.png'
import { ScrollReveal } from '../ScrollReveal'

export function BankingPartnersSection() {
  return (
    <section className="banking-flow-section banking-partners-section" aria-label="AULM card">
      <div className="banking-jeton-section-inner">
        <ScrollReveal variant="up">
          <div className="banking-flow-panel banking-partners-panel">
            <div className="banking-partners-media">
              <img
                src={cardHandImage}
                alt="AULM commodity banking card held in hand"
                className="banking-partners-hero-img"
                width={1376}
                height={768}
                draggable={false}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
