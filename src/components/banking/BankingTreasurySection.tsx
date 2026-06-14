import { useState } from 'react'
import { BANKING, BANKING_STEPS } from '../../data/banking'

export function BankingTreasurySection() {
  const [step, setStep] = useState(0)
  const activeStep = BANKING_STEPS[step]

  return (
    <div className="banking-page-treasury">
      <div className="banking-page-treasury-inner">
        <p className="banking-page-treasury-eyebrow">{BANKING.unifyBody}</p>
        <h2 className="banking-page-treasury-title">{BANKING.unifyTitle}</h2>

        <div className="banking-page-treasury-steps">
          <div className="banking-page-treasury-steps-nav" role="tablist" aria-label="Treasury setup steps">
            {BANKING_STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={step === i}
                className={`banking-page-treasury-step-btn${step === i ? ' is-active' : ''}`}
                onClick={() => setStep(i)}
              >
                <span className="banking-page-treasury-step-num">{s.id}</span>
                {s.label}
              </button>
            ))}
          </div>

          <div className="banking-page-treasury-steps-panel" role="tabpanel">
            <h3 className="banking-page-treasury-step-title">{activeStep.title}</h3>
            <p className="banking-page-treasury-step-body">{activeStep.body}</p>
            <div className="banking-page-treasury-steps-visual" aria-hidden>
              <div
                className="banking-page-treasury-steps-bar"
                style={{ width: `${((step + 1) / BANKING_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
