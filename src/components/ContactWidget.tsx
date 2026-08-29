import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from './BtnArrow'
import { CONTACT_EMAIL } from '../config/site'

const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Contact')}`
const STORAGE_KEY = 'aulm-contact-widget'

function readOpen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== 'closed'
  } catch {
    return true
  }
}

export function ContactWidget() {
  const [open, setOpen] = useState(readOpen)

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, 'closed')
    } catch {
      /* ignore */
    }
  }

  const reopen = () => {
    setOpen(true)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className="contact-widget-reopen"
        aria-label="Open Get in touch"
        onClick={reopen}
      >
        Get in touch
      </button>
    )
  }

  return (
    <aside className="contact-widget" aria-label="Get in touch">
      <div className="contact-widget-head">
        <p className="contact-widget-eyebrow">Get in touch</p>
        <button type="button" className="contact-widget-close" aria-label="Close" onClick={close}>
          ×
        </button>
      </div>
      <h2 className="contact-widget-title">Talk to the desk</h2>
      <p className="contact-widget-copy">
        Gold, silver and copper. We reply from {CONTACT_EMAIL}.
      </p>
      <div className="contact-widget-actions">
        <Link to="/request" className="metal-page-btn metal-page-btn--primary">
          Get in touch
          <BtnArrow />
        </Link>
        <a href={MAILTO} className="metal-page-btn metal-page-btn--secondary">
          Contact us
          <BtnArrow />
        </a>
      </div>
    </aside>
  )
}
