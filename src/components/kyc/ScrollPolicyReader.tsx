import { useCallback, useRef, useState } from 'react'
import { CONTACT_EMAIL } from '../../config/site'
import { POLICY_SECTIONS } from '../../data/responsibleSourcing'
import { useT } from '../../i18n'

type Props = {
  accepted: boolean
  scrolled: boolean
  onAcceptedChange: (v: boolean) => void
  onScrolledChange: (v: boolean) => void
}

export function ScrollPolicyReader({
  accepted,
  scrolled,
  onAcceptedChange,
  onScrolledChange,
}: Props) {
  const { t } = useT()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 48
    if (atBottom) {
      onScrolledChange(true)
      setShowHint(false)
    }
  }, [onScrolledChange])

  return (
    <div className="kyc-policy">
      <p className="kyc-policy-intro">{t.sourcingPage.intro}</p>

      <div
        ref={scrollRef}
        className="kyc-policy-scroll"
        onScroll={checkScroll}
        tabIndex={0}
        role="region"
        aria-label={t.kyc.policy.regionAria}
      >
        {POLICY_SECTIONS.map((section) => {
          const copy = t.sourcingPage.policy[section.id as keyof typeof t.sourcingPage.policy]
          return (
            <article key={section.id} className="kyc-policy-section">
              <h3>{copy.title}</h3>
              {copy.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {copy.bullets.length ? (
                <ul>
                  {copy.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          )
        })}

        <article className="kyc-policy-section kyc-policy-section--ack">
          <h3>{t.sourcingPage.ackTitle}</h3>
          <p>{t.sourcingPage.ackLead}</p>
          <ul>
            {t.sourcingPage.ackItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="kyc-policy-contact">
            {t.sourcingPage.ackQuestions}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </article>
      </div>

      {showHint && !scrolled ? (
        <p className="kyc-policy-hint">{t.kyc.policy.hint}</p>
      ) : null}

      {scrolled ? (
        <label className="kyc-check kyc-check--policy">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => onAcceptedChange(e.target.checked)}
          />
          <span>{t.kyc.policy.accept}</span>
        </label>
      ) : null}
    </div>
  )
}
