import {
  CONTACT_EMAIL,
  LICENSE_NUMBER,
  OFFICE_ADDRESS_LINES,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from '../config/site'

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
      <p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          WhatsApp {WHATSAPP_DISPLAY}
        </a>
      </p>
      {showLicense && <p className="site-contact-details__license">IFZA License No. {LICENSE_NUMBER}</p>}
    </div>
  )
}
