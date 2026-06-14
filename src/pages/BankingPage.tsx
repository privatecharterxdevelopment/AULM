import { useRef } from 'react'
import { BankingExpandSection } from '../components/banking/BankingExpandSection'
import { BankingFeaturesSection } from '../components/banking/BankingFeaturesSection'
import { BankingFlowSection } from '../components/banking/BankingFlowSection'
import { BankingPartnersSection } from '../components/banking/BankingPartnersSection'
import { BankingPageCard } from '../components/banking/BankingPageCard'
import { BankingPageHero, useBankingScroll } from '../components/banking/BankingPageHero'
import { BankingPreApplyQr } from '../components/banking/BankingPreApplyQr'
import { BankingTreasurySection } from '../components/banking/BankingTreasurySection'
import { BANKING } from '../data/banking'
import { BANKING_FLOW_SECTIONS } from '../data/bankingFlow'

export function BankingPage() {
  const expandRef = useRef<HTMLDivElement>(null)
  const { cardProgress, heroProgress, featuresProgress, cardOpacity } = useBankingScroll(expandRef)

  return (
    <div className="banking-page">
      <BankingPageCard cardProgress={cardProgress} cardOpacity={cardOpacity} />

      <section className="banking-page-section banking-page-section--hero" aria-label="AULM Banking hero">
        <BankingPageHero scrollProgress={heroProgress} />
      </section>

      <section className="banking-page-section banking-page-section--features" aria-label="Banking features">
        <BankingFeaturesSection progress={featuresProgress} />
      </section>

      <section className="banking-page-section banking-page-section--treasury" aria-label="Commodity treasury">
        <div className="banking-page-section-body">
          <BankingTreasurySection />
          <p className="banking-page-disclaimer">{BANKING.disclaimer}</p>
        </div>
      </section>

      <BankingExpandSection ref={expandRef} />

      <div className="expand-scroll-body banking-flow-body">
        {BANKING_FLOW_SECTIONS.map((section, index) => (
          <BankingFlowSection key={section.id} section={section} index={index} />
        ))}
        <BankingPartnersSection />
        <BankingPreApplyQr />
      </div>
    </div>
  )
}
