import { BANKING_WIDGETS } from '../../data/banking'

type Props = {
  progress: number
}

export function BankingFeaturesSection({ progress }: Props) {
  return (
    <div className="banking-page-features">
      <div className="banking-page-widgets">
        {BANKING_WIDGETS.map((widget, i) => {
          const widgetIn = Math.min(1, Math.max(0, (progress - i * 0.06) / 0.28))
          return (
            <article
              key={widget.id}
              className="banking-page-widget"
              style={{
                opacity: widgetIn,
                transform: `translateY(${(1 - widgetIn) * 16}px)`,
              }}
            >
              <h2 className="banking-page-widget-title">{widget.title}</h2>
              <p className="banking-page-widget-text">{widget.text}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
