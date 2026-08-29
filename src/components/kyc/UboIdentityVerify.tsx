import { useRef, useState } from 'react'
import type { KycDocMeta, UboIdentity } from '../../types/kyc'
import { useT } from '../../i18n'

type Props = {
  uboName: string
  value: UboIdentity
  onChange: (next: UboIdentity) => void
}

function Slot({
  label,
  file,
  accept,
  capture,
  onFile,
  verified,
  hint,
}: {
  label: string
  file: KycDocMeta | null
  accept: string
  capture?: boolean
  onFile: (file: KycDocMeta) => void
  verified: string
  hint: string
}) {
  return (
    <label className={`kyc-id-slot${file ? ' is-ready' : ''}`}>
      <input
        type="file"
        accept={accept}
        capture={capture ? 'user' : undefined}
        onChange={(e) => {
          const next = e.target.files?.[0]
          if (next) onFile({ name: next.name, size: next.size })
          e.target.value = ''
        }}
      />
      <strong>{file ? verified : label}</strong>
      <span>{file ? file.name : hint}</span>
    </label>
  )
}

export function UboIdentityVerify({ uboName, value, onChange }: Props) {
  const { t } = useT()
  const id = t.kyc.identity
  const videoRef = useRef<HTMLVideoElement>(null)
  const [camera, setCamera] = useState(false)
  const [camError, setCamError] = useState<string | null>(null)

  const startCamera = async () => {
    setCamError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 } },
        audio: false,
      })
      const el = videoRef.current
      if (!el) return
      el.srcObject = stream
      await el.play()
      setCamera(true)
    } catch {
      setCamError(id.cameraBlocked)
    }
  }

  const stopCamera = () => {
    const el = videoRef.current
    const stream = el?.srcObject
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    if (el) el.srcObject = null
    setCamera(false)
  }

  const snap = () => {
    const el = videoRef.current
    if (!el || !el.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = el.videoWidth
    canvas.height = el.videoHeight
    canvas.getContext('2d')?.drawImage(el, 0, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      onChange({
        ...value,
        face: { name: `face-${Date.now()}.jpg`, size: blob.size },
      })
      stopCamera()
    }, 'image/jpeg', 0.82)
  }

  const patch = (partial: Partial<UboIdentity>) => onChange({ ...value, ...partial })
  const ready = Boolean(value.passportFront && value.passportBack && value.face)

  return (
    <article className={`kyc-id-card${ready ? ' is-ready' : ''}`}>
      <header className="kyc-id-card-head">
        <h3>{uboName || id.ownerFallback}</h3>
        <p>{ready ? id.ready : id.pending}</p>
      </header>
      <div className="kyc-id-grid">
        <Slot
          label={id.passportFront}
          file={value.passportFront}
          accept="image/*,application/pdf"
          onFile={(passportFront) => patch({ passportFront })}
          verified={id.verified}
          hint={id.slotHint}
        />
        <Slot
          label={id.passportBack}
          file={value.passportBack}
          accept="image/*,application/pdf"
          onFile={(passportBack) => patch({ passportBack })}
          verified={id.verified}
          hint={id.slotHint}
        />
        <label className={`kyc-id-slot${value.face ? ' is-ready' : ''}`}>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={(e) => {
              const next = e.target.files?.[0]
              if (next) patch({ face: { name: next.name, size: next.size } })
              e.target.value = ''
            }}
          />
          <strong>{value.face ? id.faceVerified : id.face}</strong>
          <span>{value.face ? value.face.name : id.faceHint}</span>
        </label>
      </div>
      <div className="kyc-id-cam">
        <video
          ref={videoRef}
          className={`kyc-id-video${camera ? '' : ' is-off'}`}
          playsInline
          muted
        />
        {camera ? (
          <div className="kyc-id-cam-actions">
            <button type="button" className="metal-page-btn metal-page-btn--primary" onClick={snap}>
              {id.capture}
            </button>
            <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={stopCamera}>
              {id.cancel}
            </button>
          </div>
        ) : (
          <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={() => void startCamera()}>
            {id.openCamera}
          </button>
        )}
        {camError ? <p className="kyc-phone-hint is-warn">{camError}</p> : null}
      </div>
    </article>
  )
}
