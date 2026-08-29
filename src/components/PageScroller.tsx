import { useEffect, useRef } from 'react'
import { setHeaderOnDark } from '../lib/headerOnDark'
import { AboutSection } from './AboutSection'
import { FaqSection } from './FaqSection'
import { Hero } from './Hero'
import { HOME_PAGE_COUNT, useDiscretePages } from '../hooks/useDiscretePages'
import { MiningSection } from './MiningSection'
import { NewsSection } from './NewsSection'
import { PeopleStripSection } from './PeopleStripSection'
import { GreenSection } from './GreenSection'
import { ProcedureSection } from './ProcedureSection'
import { RefinerySection } from './RefinerySection'
import { SourcingSection } from './SourcingSection'
import { SupplyChainSection } from './SupplyChainSection'
import { TradeSection } from './TradeSection'

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function segment(raw: number, start: number, end: number) {
  if (raw <= start) return 0
  if (raw >= end) return 1
  return (raw - start) / (end - start)
}

function tradePanelStyle(enter: number, exit: number) {
  const enterY = (1 - enter) * 100
  const exitY = exit * -14
  const scale = (0.985 + enter * 0.015) * (1 - exit * 0.04)
  return {
    opacity: exit > 0 ? 1 - exit : 1,
    transform: `translate3d(0, ${enterY + exitY}%, 0) scale(${scale})`,
    filter: exit > 0 ? `blur(${exit * 8}px)` : undefined,
  }
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

const LAST = HOME_PAGE_COUNT - 1

export function PageScroller() {
  const zoneRef = useRef<HTMLDivElement>(null)
  const { progress: raw, expand, page } = useDiscretePages(zoneRef)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    // Green (8) sits on light page chrome — black logo, not white.
    const darkHome = [false, false, true, true, true, true, true, true, false, false, false, false]
    if (page === 0) {
      setHeaderOnDark(expand >= 0.72)
      return
    }
    setHeaderOnDark(darkHome[page] ?? true)
  }, [page, expand])

  useEffect(() => () => setHeaderOnDark(false), [])

  const tradeIn = easeOutCubic(segment(raw, 0, 1 / LAST))
  const aboutIn = easeOutCubic(segment(raw, 1 / LAST, 2 / LAST))
  const miningIn = easeOutCubic(segment(raw, 2 / LAST, 3 / LAST))
  const peopleIn = easeOutCubic(segment(raw, 3 / LAST, 4 / LAST))
  const sourcingIn = easeOutCubic(segment(raw, 4 / LAST, 5 / LAST))
  const supplyIn = easeOutCubic(segment(raw, 5 / LAST, 6 / LAST))
  const refineryIn = easeOutCubic(segment(raw, 6 / LAST, 7 / LAST))
  const greenIn = easeOutCubic(segment(raw, 7 / LAST, 8 / LAST))
  const procedureIn = easeOutCubic(segment(raw, 8 / LAST, 9 / LAST))
  const newsIn = easeOutCubic(segment(raw, 9 / LAST, 10 / LAST))
  const faqIn = easeOutCubic(segment(raw, 10 / LAST, 1))

  const heroStyle = {
    transform: `scale(${1 - tradeIn * 0.02})`,
  }

  const tradeStyle = tradePanelStyle(tradeIn, aboutIn)
  const aboutStyle = panelStyle(aboutIn, miningIn)
  const miningStyle = panelStyle(miningIn, peopleIn)
  const peopleStyle = panelStyle(peopleIn, sourcingIn)
  const sourcingStyle = panelStyle(sourcingIn, supplyIn)
  const supplyStyle = panelStyle(supplyIn, refineryIn)
  const refineryStyle = panelStyle(refineryIn, greenIn)
  const greenStyle = panelStyle(greenIn, procedureIn)
  const procedureStyle = panelStyle(procedureIn, newsIn)
  const newsStyle = panelStyle(newsIn, faqIn)
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
          <Hero expand={expand} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--trade"
          style={tradeStyle}
          {...(tradeIn > 0.35 && aboutIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <TradeSection reveal={tradeIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--about"
          style={aboutStyle}
          {...(aboutIn > 0.35 && miningIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <AboutSection reveal={aboutIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--mining"
          style={miningStyle}
          {...(miningIn > 0.35 && peopleIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <MiningSection reveal={miningIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--people"
          style={peopleStyle}
          {...(peopleIn > 0.35 && sourcingIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <PeopleStripSection reveal={peopleIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--sourcing"
          style={sourcingStyle}
          {...(sourcingIn > 0.35 && supplyIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <SourcingSection reveal={sourcingIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--supply"
          style={supplyStyle}
          {...(supplyIn > 0.35 && refineryIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <SupplyChainSection reveal={supplyIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--refinery"
          style={refineryStyle}
          {...(refineryIn > 0.35 && greenIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <RefinerySection reveal={refineryIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--green"
          style={greenStyle}
          {...(greenIn > 0.35 && procedureIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <GreenSection reveal={greenIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--procedure"
          style={procedureStyle}
          {...(procedureIn > 0.35 && newsIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <ProcedureSection reveal={procedureIn} />
        </div>

        <div
          className="page-scroll-panel page-scroll-panel--news"
          style={newsStyle}
          {...(newsIn > 0.35 && faqIn < 0.35 ? { 'data-active': 'true' as const } : {})}
        >
          <NewsSection reveal={newsIn} />
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
