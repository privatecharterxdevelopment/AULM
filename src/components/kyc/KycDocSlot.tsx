import type { KycDocMeta } from '../../types/kyc'
import { useT } from '../../i18n'

type Props = {
  id: string
  title: string
  hint: string
  accept?: string
  file: KycDocMeta | null
  onFile: (file: KycDocMeta | null) => void
}

export function KycDocSlot({ id, title, hint, accept = 'application/pdf', file, onFile }: Props) {
  const { t, interpolate } = useT()

  return (
    <label className={`kyc-docs-upload${file ? ' is-ready' : ''}`} htmlFor={id}>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={(e) => {
          const next = e.target.files?.[0]
          onFile(next ? { name: next.name, size: next.size } : null)
          e.target.value = ''
        }}
      />
      <span className="kyc-docs-upload-inner">
        <strong>{file ? interpolate(t.kyc.docs.uploaded, { name: file.name }) : title}</strong>
        <span>{file ? `${Math.max(1, Math.round(file.size / 1024))} KB` : hint}</span>
      </span>
    </label>
  )
}
