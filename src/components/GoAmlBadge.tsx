import {
  GOAML_FIU_URL,
  GOAML_PORTAL_URL,
  GOAML_REGISTRATION_CODE,
} from '../config/site'
import { useT } from '../i18n'

const FIU_LOGO = '/compliance/uaefiu-logo.png?v=2'

export function GoAmlBadge() {
  const { t } = useT()

  return (
    <div className="goaml-badge">
      <a
        href={GOAML_FIU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="goaml-badge-logo-link"
        aria-label={t.goaml.fiuAria}
      >
        <img
          src={FIU_LOGO}
          alt={t.goaml.fiuAlt}
          className="goaml-badge-logo"
          loading="lazy"
          draggable={false}
        />
      </a>
      <div className="goaml-badge-copy">
        <p className="goaml-badge-label">{t.goaml.label}</p>
        <p className="goaml-badge-status">{t.goaml.status}</p>
        <p className="goaml-badge-code">
          <span className="goaml-badge-code-label">{t.goaml.codeLabel}</span>
          <code>{GOAML_REGISTRATION_CODE}</code>
        </p>
        <a
          href={GOAML_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="goaml-badge-portal-link"
        >
          {t.goaml.portal}
        </a>
      </div>
    </div>
  )
}
