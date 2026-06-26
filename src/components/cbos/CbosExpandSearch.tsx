import { useEffect, useRef, useState } from 'react'

type Variant = 'strip' | 'header'

type Props = {
  variant?: Variant
  placeholder?: string
  showKbd?: boolean
}

export function CbosExpandSearch({
  variant = 'strip',
  placeholder = 'Search transactions, payees, references…',
  showKbd = false,
}: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!showKbd) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showKbd])

  return (
    <div
      ref={rootRef}
      className={`cbos-expand-search cbos-expand-search--${variant}${open ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="cbos-expand-search__trigger"
        aria-label="Open search"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      <label className="cbos-expand-search__field">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
        />
        {showKbd ? <kbd className="cbos-expand-search__kbd">⌘K</kbd> : null}
      </label>
    </div>
  )
}
