import { METAL_LIST } from '../data/metals'
import { MetalCard } from './MetalCard'
import { useT } from '../i18n'

type Props = {
  reveal: number
}

export function TradeSection({ reveal }: Props) {
  const { t } = useT()
  const titleReveal = Math.min(1, reveal / 0.55)
  const titleY = (1 - titleReveal) * 36

  return (
    <section id="trade" className="trade-section" aria-label={t.home.trade.aria}>
      <div className="trade-inner">
        <div className="trade-stack">
          <header className="trade-head" style={{ opacity: titleReveal, transform: `translateY(${titleY}px)` }}>
            <h2 className="jeton-headline trade-headline">
              <span className="trade-headline-row">{t.home.trade.line1}</span>
              <span className="trade-headline-row">{t.home.trade.line2}</span>
            </h2>
          </header>

          <div className="trade-cards">
            {METAL_LIST.map((metal, i) => (
              <MetalCard key={metal.id} metal={metal} reveal={reveal} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
