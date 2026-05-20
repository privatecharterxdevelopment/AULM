import {
  CONTACT_EMAIL,
  LICENSE_NUMBER,
  OFFICE_ADDRESS_LINES,
} from '../config/site'
import WhatsAppBusinessButton from './WhatsAppBusinessButton'

export default function SiteContactDetails({ showLicense = true, className = '' }) {
  return (
    <div className={`site-contact-details ${className}`.trim()}>
      <address>
        {OFFICE_ADDRESS_LINES.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </address>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <div className="site-contact-details__whatsapp">
        <WhatsAppBusinessButton />
      </div>
      {showLicense && <p className="site-contact-details__license">IFZA License No. {LICENSE_NUMBER}</p>}
    </div>
  )
}
