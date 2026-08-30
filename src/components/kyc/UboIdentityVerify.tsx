import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { createKycIdShot, revokeKycIdShot } from '../../lib/kycIdCapture'
import {
  kycIdShotReady,
  uboIdentityCaptured,
  type KycIdShot,
  type KycIdShotKey,
  type UboIdentity,
} from '../../types/kyc'
import { useT } from '../../i18n'

type Props = {
  uboName: string
  value: UboIdentity
  onChange: (next: UboIdentity) => void
}

const SHOTS: {
  key: KycIdShotKey
  facing: 'environment' | 'user'
  frame: 'passport' | 'face'
}[] = [
  { key: 'passportFront', facing: 'environment', frame: 'passport' },
  { key: 'passportBack', facing: 'environment', frame: 'passport' },
  { key: 'face', facing: 'user', frame: 'face' },
]

function HoloFrame({ kind }: { kind: 'passport' | 'face' }) {
  if (kind === 'face') {
    return (
      <svg className="kyc-id-holo kyc-id-holo--face" viewBox="0 0 320 400" aria-hidden>
        <defs>
          <linearGradient id="kyc-holo-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#8ec8ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c9a44a" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="188" rx="92" ry="118" fill="none" stroke="url(#kyc-holo-face)" strokeWidth="2.4" />
        <path d="M68 70h28M68 70v28M252 70h-28M252 70v28M68 330h28M68 330v-28M252 330h-28M252 330v-28" stroke="url(#kyc-holo-face)" strokeWidth="3" fill="none" />
      </svg>
    )
  }

  return (
    <svg className="kyc-id-holo kyc-id-holo--passport" viewBox="0 0 420 268" aria-hidden>
      <defs>
        <linearGradient id="kyc-holo-pass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#7ec8ff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#d4b45a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="384" height="232" rx="14" fill="none" stroke="url(#kyc-holo-pass)" strokeWidth="2.4" />
      <path d="M18 46h36M18 46v36M402 46h-36M402 46v36M18 222h36M18 222v-36M402 222h-36M402 222v-36" stroke="url(#kyc-holo-pass)" strokeWidth="3.2" fill="none" />
      <rect x="48" y="196" width="324" height="28" rx="4" fill="none" stroke="url(#kyc-holo-pass)" strokeWidth="1.2" opacity="0.7" />
      <path d="M58 206h304M58 214h260" stroke="url(#kyc-holo-pass)" strokeWidth="1" opacity="0.45" />
    </svg>
  )
}

function ShotTile({
  label,
  hint,
  shot,
  captured,
  onOpen,
}: {
  label: string
  hint: string
  shot: KycIdShot | null
  captured: string
  onOpen: () => void
}) {
  return (
    <button type="button" className={`kyc-id-slot${shot ? ' is-ready' : ''}`} onClick={onOpen}>
      {shot?.previewUrl ? (
        <img className="kyc-id-slot-preview" src={shot.previewUrl} alt="" />
      ) : null}
      <strong>{shot ? captured : label}</strong>
      <span>{shot ? `${Math.max(1, Math.round(shot.size / 1024))} KB` : hint}</span>
    </button>
  )
}

export function UboIdentityVerify({ uboName, value, onChange }: Props) {
  const { t, interpolate } = useT()
  const id = t.kyc.identity
  const videoRef = useRef<HTMLVideoElement>(null)
  const sequentialRef = useRef(false)
  const [studio, setStudio] = useState<KycIdShotKey | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [camError, setCamError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const shotMeta = SHOTS.find((s) => s.key === studio) ?? SHOTS[0]
  const shotIndex = SHOTS.findIndex((s) => s.key === studio)
  const ready = uboIdentityCaptured(value)

  const patchShot = (key: KycIdShotKey, next: KycIdShot | null) => {
    revokeKycIdShot(value[key])
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    onChange({ ...value, [key]: next })
  }

  const stopCamera = () => {
    const el = videoRef.current
    const stream = el?.srcObject
    if (stream instanceof MediaStream) stream.getTracks().forEach((track) => track.stop())
    if (el) el.srcObject = null
  }

  const closeStudio = () => {
    stopCamera()
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setCamError(null)
    setStudio(null)
  }

  const startCamera = async (key: KycIdShotKey) => {
    const meta = SHOTS.find((s) => s.key === key)
    if (!meta) return
    setCamError(null)
    stopCamera()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: meta.facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      const el = videoRef.current
      if (!el) return
      el.srcObject = stream
      await el.play()
    } catch {
      setCamError(id.cameraBlocked)
    }
  }

  useEffect(() => {
    if (!studio) return
    void startCamera(studio)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStudio()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      stopCamera()
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
    // Studio key is the open/close gate; camera is restarted per shot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studio])

  const openFirstMissing = () => {
    sequentialRef.current = true
    const missing = SHOTS.find((s) => !kycIdShotReady(value[s.key]))
    setStudio(missing?.key ?? 'passportFront')
  }

  const openShot = (key: KycIdShotKey) => {
    sequentialRef.current = false
    setStudio(key)
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
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(blob))
    }, 'image/jpeg', 0.9)
  }

  const usePreview = async () => {
    if (!studio || !preview) return
    setBusy(true)
    try {
      const res = await fetch(preview)
      const blob = await res.blob()
      const shot = await createKycIdShot(blob, `${studio}-${Date.now()}`)
      patchShot(studio, shot)
      const nextIndex = shotIndex + 1
      if (sequentialRef.current && nextIndex < SHOTS.length) {
        setStudio(SHOTS[nextIndex].key)
      } else {
        closeStudio()
      }
    } catch {
      setCamError(id.cameraBlocked)
    } finally {
      setBusy(false)
    }
  }

  const onUpload = async (key: KycIdShotKey, file: File) => {
    setBusy(true)
    try {
      const shot = await createKycIdShot(file, `${key}-${Date.now()}`)
      patchShot(key, shot)
      if (studio === key) {
        const nextIndex = SHOTS.findIndex((s) => s.key === key) + 1
        if (sequentialRef.current && nextIndex < SHOTS.length) setStudio(SHOTS[nextIndex].key)
        else closeStudio()
      }
    } catch {
      setCamError(id.cameraBlocked)
    } finally {
      setBusy(false)
    }
  }

  const studioTitle =
    shotMeta.key === 'passportFront'
      ? id.passportFront
      : shotMeta.key === 'passportBack'
        ? id.passportBack
        : id.face

  return (
    <article className={`kyc-id-card${ready ? ' is-ready' : ''}`}>
      <header className="kyc-id-card-head">
        <h3>{uboName || id.ownerFallback}</h3>
        <p>{ready ? id.ready : id.pending}</p>
      </header>
      <div className="kyc-id-grid">
        {SHOTS.map((shot) => (
          <ShotTile
            key={shot.key}
            label={
              shot.key === 'passportFront'
                ? id.passportFront
                : shot.key === 'passportBack'
                  ? id.passportBack
                  : id.face
            }
            hint={shot.frame === 'face' ? id.faceHint : id.slotHint}
            shot={value[shot.key]}
            captured={id.captured}
            onOpen={() => openShot(shot.key)}
          />
        ))}
      </div>
      <button type="button" className="metal-page-btn metal-page-btn--primary kyc-id-open" onClick={openFirstMissing}>
        {id.openStudio}
      </button>

      {studio && typeof document !== 'undefined'
        ? createPortal(
            <div className="kyc-id-studio" role="dialog" aria-modal="true" aria-label={id.studioTitle}>
              <header className="kyc-id-studio-bar">
                <img src="/aulm-logo-white.png" alt="AULM" className="kyc-id-studio-logo" />
                <div className="kyc-id-studio-copy">
                  <p className="kyc-id-studio-eyebrow">{id.studioEyebrow}</p>
                  <h2>{id.studioTitle}</h2>
                </div>
                <button type="button" className="kyc-id-studio-close" onClick={closeStudio}>
                  {id.closeStudio}
                </button>
              </header>

              <p className="kyc-id-studio-step">
                {interpolate(id.stepOf, { n: String(shotIndex + 1), total: String(SHOTS.length) })}
                {' · '}
                {studioTitle}
              </p>
              <p className="kyc-id-studio-lead">{id.studioLead}</p>
              <p className="kyc-id-studio-align">
                {shotMeta.frame === 'face' ? id.alignSelfie : id.alignPassport}
              </p>

              <div className={`kyc-id-stage${shotMeta.frame === 'face' ? ' is-face' : ' is-passport'}`}>
                <video
                  ref={videoRef}
                  className={`kyc-id-stage-media${shotMeta.facing === 'user' ? ' is-mirror' : ''}${preview ? ' is-off' : ''}`}
                  playsInline
                  muted
                  autoPlay
                />
                {preview ? (
                  <img
                    className={`kyc-id-stage-media kyc-id-stage-still${shotMeta.facing === 'user' ? ' is-mirror' : ''}`}
                    src={preview}
                    alt=""
                  />
                ) : null}
                <div className="kyc-id-stage-shade" aria-hidden />
                <HoloFrame kind={shotMeta.frame} />
              </div>

              {camError ? <p className="kyc-id-studio-warn">{camError}</p> : null}

              <div className="kyc-id-studio-actions">
                {preview ? (
                  <>
                    <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={() => {
                      if (preview) URL.revokeObjectURL(preview)
                      setPreview(null)
                    }}>
                      {id.retake}
                    </button>
                    <button
                      type="button"
                      className="metal-page-btn metal-page-btn--primary"
                      onClick={() => void usePreview()}
                      disabled={busy}
                    >
                      {busy ? id.capturing : shotIndex < SHOTS.length - 1 ? id.nextShot : id.usePhoto}
                    </button>
                  </>
                ) : (
                  <button type="button" className="metal-page-btn metal-page-btn--primary" onClick={snap}>
                    {id.captureShot}
                  </button>
                )}
                <label className="kyc-id-upload-fallback">
                  <input
                    type="file"
                    accept="image/*"
                    capture={shotMeta.facing === 'user' ? 'user' : 'environment'}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) void onUpload(shotMeta.key, file)
                      e.target.value = ''
                    }}
                  />
                  {id.uploadInstead}
                </label>
                <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={closeStudio}>
                  {id.cancel}
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  )
}
