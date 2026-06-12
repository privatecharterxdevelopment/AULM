import { useState } from 'react'

type Props = {
  id: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  minLength?: number
  required?: boolean
  className?: string
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.58 10.58a2 2 0 0 0 2.84 2.84M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.2 17.2 0 0 1-2.16 3.19M6.11 6.11A17.2 17.2 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.11-.79"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
  minLength,
  required,
  className,
}: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`password-input-wrap${className ? ` ${className}` : ''}`}>
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={minLength}
        required={required}
      />
      <button
        type="button"
        className="password-input-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  )
}
