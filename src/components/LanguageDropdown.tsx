import { useEffect, useRef, useState } from 'react'
import { LOCALES, LOCALE_META, useT } from '../i18n'

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9" />
    </svg>
  )
}

export function LanguageDropdown() {
  const { locale, setLocale, t } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <div className={`header-lang${open ? ' is-open' : ''}`} ref={ref}>
      <button
        type="button"
        className="header-chip header-lang-btn"
        aria-label={t.meta.language}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon />
      </button>
      {open && (
        <ul className="header-lang-menu" role="listbox">
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                className={`header-lang-option${locale === code ? ' is-active' : ''}`}
                lang={LOCALE_META[code].htmlLang}
                onClick={() => {
                  setLocale(code)
                  setOpen(false)
                }}
              >
                {LOCALE_META[code].nativeName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
