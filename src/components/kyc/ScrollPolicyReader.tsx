import { useCallback, useRef, useState } from 'react'
import {
  POLICY_ACKNOWLEDGMENT_ITEMS,
  POLICY_SECTIONS,
  RESPONSIBLE_SOURCING_INTRO,
} from '../../data/responsibleSourcing'

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
      <p className="kyc-policy-intro">{RESPONSIBLE_SOURCING_INTRO}</p>

      <div
        ref={scrollRef}
        className="kyc-policy-scroll"
        onScroll={checkScroll}
        tabIndex={0}
        role="region"
        aria-label="Responsible sourcing policies"
      >
        {POLICY_SECTIONS.map((section) => (
          <article key={section.id} className="kyc-policy-section">
            <h3>{section.title}</h3>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}

        <article className="kyc-policy-section kyc-policy-section--ack">
          <h3>Customer acknowledgment</h3>
          <p>
            AULM Precious Metal Trader confirms commitment to the highest ethical and responsible sourcing
            standards. By proceeding, you acknowledge receipt and understanding of:
          </p>
          <ul>
            {POLICY_ACKNOWLEDGMENT_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="kyc-policy-contact">
            Questions: <a href="mailto:contact@aulmtrading.com">contact@aulmtrading.com</a>
          </p>
        </article>
      </div>

      {showHint && !scrolled ? (
        <p className="kyc-policy-hint">Scroll to the end to continue</p>
      ) : null}

      {scrolled ? (
        <label className="kyc-check kyc-check--policy">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => onAcceptedChange(e.target.checked)}
          />
          <span>
            I hereby confirm that I have read, understood, and accept AULM Trading&apos;s responsible sourcing
            and compliance policies on behalf of my organisation.
          </span>
        </label>
      ) : null}
    </div>
  )
}
