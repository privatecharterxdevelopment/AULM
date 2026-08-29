import { Link } from 'react-router-dom'
import { useT } from '../i18n'

export function ContactWidget() {
  const { t } = useT()
  return (
    <Link to="/contact" className="contact-widget-reopen">
      {t.widget.getInTouch}
    </Link>
  )
}
