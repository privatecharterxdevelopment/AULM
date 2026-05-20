import { CONTACT_EMAIL, WHATSAPP_URL } from '../config/site'
import { WhatsAppIcon } from './WhatsAppBusinessButton'

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 6h16v12H4V6z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export default function HeaderContactIcons() {
  return (
    <div className="header-contact-icons">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="header-icon-btn"
        aria-label={`Email ${CONTACT_EMAIL}`}
      >
        <IconMail />
      </a>
      <a
        href={WHATSAPP_URL}
        className="header-icon-btn header-icon-btn--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Business"
      >
        <WhatsAppIcon size={18} />
      </a>
    </div>
  )
}
