import { Link } from 'react-router-dom'
import { BANKING } from '../../data/banking'
import { BANKING_PRE_APPLY_PATH } from '../../data/bankingFlow'
import { BtnArrow } from '../BtnArrow'
import { ScrollReveal } from '../ScrollReveal'

function preApplyUrl() {
  if (typeof window === 'undefined') return BANKING_PRE_APPLY_PATH
  return `${window.location.origin}${BANKING_PRE_APPLY_PATH}`
}

function qrImageSrc(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(url)}`
}

export function BankingPreApplyQr() {
  const url = preApplyUrl()

  return (
    <section className="banking-flow-section banking-preapply-section" aria-labelledby="banking-preapply-title">
      <div className="banking-jeton-section-inner">
        <ScrollReveal variant="up">
          <div className="banking-flow-block">
            <div className="banking-jeton-split banking-flow-split">
              <div className="banking-flow-media">
                <div className="banking-preapply-qr-wrap">
                  <img
                    src={qrImageSrc(url)}
                    alt="QR code to open the AULM banking pre-application form"
                    className="banking-preapply-qr"
                    width={240}
                    height={240}
                    draggable={false}
                  />
                  <p className="banking-preapply-scan">Scan with your phone</p>
                </div>
              </div>

              <div className="banking-flow-copy banking-preapply-copy">
                <p className="banking-flow-step">06</p>
                <h2 className="banking-jeton-h2" id="banking-preapply-title">
                  Ready to pre-apply?
                </h2>
                <p className="banking-jeton-body">
                  Start your institutional banking application in minutes — on mobile or desktop. Already
                  onboarded? Open the same form from your dashboard.
                </p>
                <div className="banking-preapply-actions">
                  <Link to={BANKING_PRE_APPLY_PATH} className="metal-page-btn metal-page-btn--primary">
                    Open pre-application
                    <BtnArrow />
                  </Link>
                  <Link to="/bank" className="banking-preapply-dashboard-link">
                    Or continue from dashboard
                  </Link>
                </div>
                <p className="banking-jeton-disclaimer banking-preapply-disclaimer">{BANKING.disclaimer}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
