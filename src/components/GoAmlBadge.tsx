import {
  GOAML_FIU_URL,
  GOAML_PORTAL_URL,
  GOAML_REGISTRATION_CODE,
} from '../config/site'

const FIU_LOGO = '/compliance/uaefiu-logo.png?v=2'

export function GoAmlBadge() {
  return (
    <div className="goaml-badge">
      <a
        href={GOAML_FIU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="goaml-badge-logo-link"
        aria-label="UAE Financial Intelligence Unit"
      >
        <img
          src={FIU_LOGO}
          alt="UAE Financial Intelligence Unit"
          className="goaml-badge-logo"
          loading="lazy"
          draggable={false}
        />
      </a>
      <div className="goaml-badge-copy">
        <p className="goaml-badge-label">Registered on UAE FIU goAML</p>
        <p className="goaml-badge-status">Fully AML compliant</p>
        <p className="goaml-badge-code">
          <span className="goaml-badge-code-label">Registration code</span>
          <code>{GOAML_REGISTRATION_CODE}</code>
        </p>
        <a
          href={GOAML_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="goaml-badge-portal-link"
        >
          goAML portal ↗
        </a>
      </div>
    </div>
  )
}
