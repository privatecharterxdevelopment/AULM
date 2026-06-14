import type { BankingFlowSection as FlowSection } from '../../data/bankingFlow'
import { revealIndex, ScrollReveal } from '../ScrollReveal'
import { BankingFlowVisual } from './BankingFlowVisual'

type Props = {
  section: FlowSection
  index: number
}

export function BankingFlowSection({ section, index }: Props) {
  const reverse = index % 2 === 1
  const boxed = section.panel === 'grey'

  const split = (
    <div className={`banking-jeton-split banking-flow-split${reverse ? ' banking-flow-split--reverse' : ''}`}>
      <div className="banking-flow-media company-reveal-child" style={revealIndex(0)}>
        <BankingFlowVisual visual={section.visual} />
      </div>
      <div className="banking-flow-copy">
        <p className="banking-flow-step company-reveal-child" style={revealIndex(1)}>
          {section.step}
        </p>
        <h2 className="banking-jeton-h2 company-reveal-child" id={`banking-flow-${section.id}`} style={revealIndex(2)}>
          {section.title}
        </h2>
        <p className="banking-jeton-body company-reveal-child" style={revealIndex(3)}>
          {section.body}
        </p>
      </div>
    </div>
  )

  return (
    <section
      className="banking-flow-section"
      aria-labelledby={`banking-flow-${section.id}`}
    >
      <div className="banking-jeton-section-inner">
        <ScrollReveal variant="up">
          {boxed ? <div className="banking-flow-panel">{split}</div> : <div className="banking-flow-block">{split}</div>}
        </ScrollReveal>
      </div>
    </section>
  )
}
