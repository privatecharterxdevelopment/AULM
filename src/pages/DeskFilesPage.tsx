import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeskFormDrawer } from '../components/DeskFormDrawer'
import { GOLD_SLOTS_2026 } from '../config/site'
import { DESK_FILE_ROWS, type DeskFormKind } from '../data/deskFiles'
import { useHashScroll } from '../hooks/useHashScroll'
import { usePageTitle, useT } from '../i18n'

function PdfIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 3.5V9h5.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 13.5h7M8.5 17h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function kindFromHash(hash: string): DeskFormKind | null {
  const id = hash.replace('#', '')
  const row = DESK_FILE_ROWS.find((item) => item.id === id)
  return row?.action?.kind ?? null
}

export function DeskFilesPage() {
  const { t, interpolate } = useT()
  const [form, setForm] = useState<DeskFormKind | null>(() =>
    typeof window === 'undefined' ? null : kindFromHash(window.location.hash),
  )
  useHashScroll()
  usePageTitle(t.desk.heading)

  function openForm(kind: DeskFormKind, id: string) {
    setForm(kind)
    window.history.replaceState(null, '', `#${id}`)
  }

  function closeForm() {
    setForm(null)
    window.history.replaceState(null, '', '/pdf')
  }

  return (
    <div className="desk-files-page">
      <div className="news-doc news-doc--index desk-files">
        <p className="news-doc-kicker">{t.desk.kicker}</p>
        <h1 className="desk-files-heading">{t.desk.heading}</h1>
        {DESK_FILE_ROWS.map((row) => {
          const copy = t.desk.rows[row.id as keyof typeof t.desk.rows]
          const note = 'note' in copy && copy.note
            ? interpolate(copy.note, { slots: GOLD_SLOTS_2026 })
            : undefined
          const linkLabel = 'link' in copy ? copy.link : undefined
          const actionLabel = 'action' in copy ? copy.action : undefined

          return (
            <article key={row.id} id={row.id} className="desk-file-row">
              <div className="desk-file-copy">
                <p className="news-press-kicker">{copy.kicker}</p>
                <h2 className="desk-file-title">{copy.title}</h2>
                {note ? <p className="desk-file-note">{note}</p> : null}
              </div>
              <div className="desk-file-actions">
                {row.pdf ? (
                  <a
                    href={row.pdf.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={row.pdf.filename}
                    className="header-chip header-pdf"
                    aria-label={interpolate(t.desk.downloadAria, { title: copy.title })}
                  >
                    <PdfIcon />
                    <span>{t.desk.pdf}</span>
                  </a>
                ) : null}
                {row.link && linkLabel ? (
                  <Link to={row.link.href} className="desk-file-inquiry">
                    {linkLabel}
                  </Link>
                ) : null}
                {row.action && actionLabel ? (
                  <button
                    type="button"
                    className="desk-file-inquiry"
                    onClick={() => openForm(row.action!.kind, row.id)}
                  >
                    {actionLabel}
                  </button>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>

      {form ? <DeskFormDrawer kind={form} onClose={closeForm} /> : null}
    </div>
  )
}
