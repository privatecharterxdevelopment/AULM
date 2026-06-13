import { useEffect, useRef, type ReactNode } from 'react'
import { BankingSliderSection } from './BankingSliderSection'
import { CargoSection } from './CargoSection'
import { FaqSection } from './FaqSection'
import { useDiscretePages } from '../hooks/useDiscretePages'
import { MiningSection } from './MiningSection'
import { SourcingSection } from './SourcingSection'
import { TradeSection } from './TradeSection'

type Props = {
  hero: ReactNode
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function segment(raw: number, start: number, end: number) {
  if (raw <= start) return 0
  if (raw >= end) return 1
  return (raw - start) / (end - start)
}

function panelStyle(enter: number, exit: number, blurAmount = 10) {
  const enterY = (1 - enter) * 100
  const exitY = exit * -14
  const enterX = (1 - enter) * 8
  const exitX = exit * -6
  const scale = (0.94 + enter * 0.06) * (1 - exit * 0.05)
  return {
    opacity: enter * (1 - exit),
    transform: `translate3d(${enterX + exitX}%, ${enterY + exitY}%, 0) scale(${scale})`,
    filter: exit > 0 ? `blur(${exit * blurAmount}px)` : undefined,
  }
}

const LAST = 6

export function PageScroller({ hero }: Props) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const { progress: raw } = useDiscretePages(zoneRef)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const tradeIn = easeOutCubic(segment(raw, 0, 1 / LAST))
  const miningIn = easeOutCubic(segment(raw, 1 / LAST, 2 / LAST))
  const sourcingIn = easeOutCubic(segment(raw, 2 / LAST, 3 / LAST))
  const logisticsIn = easeOutCubic(segment(raw, 3 / LAST, 4 / LAST))
  const bankingIn = easeOutCubic(segment(raw, 4 / LAST, 5 / LAST))
  const faqIn = easeOutCubic(segment(raw, 5 / LAST, 1))

  const heroStyle = {
    opacity: 1 - tradeIn,
    transform: `translate3d(${tradeIn * -6}%, ${tradeIn * -14}%, 0) scale(${1 - tradeIn * 0.05})`,
    filter: `blur(${tradeIn * 10}px)`,
  }

  const tradeStyle = panelStyle(tradeIn, miningIn)
  const miningStyle = panelStyle(miningIn, sourcingIn)
  const sourcingStyle = panelStyle(sourcingIn, logisticsIn)
  const logisticsStyle = panelStyle(logisticsIn, bankingIn)
  const bankingStyle = panelStyle(bankingIn, faqIn)
  const faqStyle = {
    opacity: faqIn,
    transform: `translate3d(${(1 - faqIn) * 8}%, ${(1 - faqIn) * 100}%, 0) scale(${0.94 + faqIn * 0.06})`,
  }

  return (
    <div ref={zoneRef} className="page-scroll-zone">
      <div className="page-scroll-stage">
        <div
          className="page-scroll-panel page-scroll-panel--hero"
          style={heroStyle}
          {...(tradeIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          {hero}
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--trade"
          style={tradeStyle}
          {...(tradeIn > 0.35 && miningIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <TradeSection reveal={tradeIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--mining"
          style={miningStyle}
          {...(miningIn > 0.35 && sourcingIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <MiningSection reveal={miningIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--sourcing"
          style={sourcingStyle}
          {...(sourcingIn > 0.35 && logisticsIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <SourcingSection reveal={sourcingIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--cargo"
          style={logisticsStyle}
          {...(logisticsIn > 0.35 && bankingIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <CargoSection reveal={logisticsIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--banking"
          style={bankingStyle}
          {...(bankingIn > 0.35 && faqIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <BankingSliderSection reveal={bankingIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--faq"
          style={faqStyle}
          {...(faqIn > 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <FaqSection reveal={faqIn} />
        </div>
      </div>
    </div>
  )
}
