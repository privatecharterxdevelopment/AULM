import { Link } from 'react-router-dom'
import { GREEN_HERO_VIDEO } from '../config/media'
import { GREEN_HOME } from '../data/green'
import { BackgroundLoopVideo } from './BackgroundLoopVideo'
import { GreenMarks } from './GreenMarks'
import { useT } from '../i18n'

type Props = {
  reveal: number
  active?: boolean
}

export function GreenSection({ reveal, active }: Props) {
  const { t } = useT()
  const titleIn = Math.min(1, reveal / 0.5)
  const restIn = Math.min(1, Math.max(0, (reveal - 0.18) / 0.5))

  return (
    <section className="green-home" aria-label={t.home.green.aria}>
      <div className="green-home-pin">
        <div className="vault-frame green-home-frame">
          <BackgroundLoopVideo
            className="vault-frame-image green-home-video"
            src={GREEN_HERO_VIDEO}
            active={active ?? reveal > 0.08}
          />
          <div className="green-home-shade" aria-hidden />
          <div
            className="green-home-copy"
            style={{
              opacity: titleIn,
              transform: `translateY(${(1 - titleIn) * 18}px)`,
            }}
          >
            <p className="green-home-eyebrow">{t.home.green.eyebrow}</p>
            <h2 className="green-home-title">
              {t.home.green.title1}
              <br />
              {t.home.green.title2}
            </h2>
            <div
              className="green-home-body"
              style={{
                opacity: restIn,
                transform: `translateY(${(1 - restIn) * 12}px)`,
              }}
            >
              <p>{t.home.green.lead}</p>
              <GreenMarks />
              <Link to={GREEN_HOME.href} className="green-home-cta">
                {t.home.green.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
