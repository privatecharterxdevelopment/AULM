import { useRef } from 'react'

type Props = {
  label: string
  required?: boolean
  fileName?: string
  status?: 'missing' | 'uploaded' | 'verified' | 'rejected'
  hint?: string
  onUpload: (fileName: string) => void
  onRemove?: () => void
  disabled?: boolean
}

const STATUS_LABEL: Record<string, string> = {
  missing: 'Required',
  uploaded: 'Uploaded',
  verified: 'Verified',
  rejected: 'Rejected',
}

export function CbosEscrowDocUpload({
  label,
  required = true,
  fileName,
  status = fileName ? 'uploaded' : 'missing',
  hint,
  onUpload,
  onRemove,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const pick = () => {
    if (!disabled) inputRef.current?.click()
  }

  return (
    <div className={`cbos-escrow-doc${fileName ? ' is-uploaded' : ''}${status === 'verified' ? ' is-verified' : ''}`}>
      <div className="cbos-escrow-doc__head">
        <div>
          <p className="cbos-escrow-doc__label">{label}</p>
          {hint ? <p className="cbos-escrow-doc__hint">{hint}</p> : null}
        </div>
        <span className={`cbos-escrow-doc__status is-${status}`}>{STATUS_LABEL[status] ?? status}</span>
      </div>

      {fileName ? (
        <div className="cbos-escrow-doc__file">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
          <span className="cbos-escrow-doc__name">{fileName}</span>
          {!disabled && onRemove ? (
            <button type="button" className="cbos-escrow-doc__remove" onClick={onRemove}>
              Remove
            </button>
          ) : null}
        </div>
      ) : (
        <button type="button" className="cbos-escrow-doc__drop" onClick={pick} disabled={disabled}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <path d="M12 16V8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          <span>Upload document</span>
          {!required ? <span className="cbos-escrow-doc__optional">Optional</span> : null}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onUpload(f.name)
          e.target.value = ''
        }}
      />
    </div>
  )
}
