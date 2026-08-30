import { HOME_HERO_VIDEO } from '../config/media'
import { getFrameStyle, getPinPadding } from '../lib/frameExpand'
import { BackgroundLoopVideo } from './BackgroundLoopVideo'
import { JetonLines } from './JetonText'
import { useT } from '../i18n'

type Props = {
  expand?: number
  active?: boolean
}

export function Hero({ expand = 0, active = true }: Props) {
  const full = expand >= 0.985
  const { t } = useT()

  return (
    <section id="home" className="metal-hero">
      <div
        className={`metal-hero-pin${full ? ' is-full' : ''}`}
        style={getPinPadding(expand)}
      >
        <div className="vault-frame hero-frame" style={getFrameStyle(expand)}>
          <BackgroundLoopVideo
            className="vault-frame-image hero-video"
            src={`${HOME_HERO_VIDEO}?v=4`}
            active={active}
          />
          <div className="vault-frame-overlay vault-frame-overlay--hero hero-frame-copy">
            <h1 className="jeton-headline" aria-label={t.home.hero.aria}>
              <JetonLines lines={[t.home.hero.line1, t.home.hero.line2]} />
            </h1>
            <p className="jeton-subline">
              {t.home.hero.sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
