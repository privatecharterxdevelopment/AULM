import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { createKycIdShot, revokeKycIdShot } from '../../lib/kycIdCapture'
import { comparePassportToSelfie, preloadKycFaceModels } from '../../lib/kycFaceMatch'
import {
  analyzePassportFrames,
  grabVideoFrame,
  PASSPORT_TILT_FRAMES,
  PASSPORT_TILT_MS,
  preloadPassportScanner,
  sleep,
} from '../../lib/kycPassportSecurity'
import {
  kycIdShotReady,
  passportSecurityPassed,
  uboIdentityCaptured,
  type KycIdShot,
  type KycIdShotKey,
  type PassportSecurity,
  type PassportSecurityRisk,
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
  const streamRef = useRef<MediaStream | null>(null)
  const camGenRef = useRef(0)
  const sequentialRef = useRef(false)
  const [studio, setStudio] = useState<KycIdShotKey | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [camError, setCamError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [matching, setMatching] = useState(false)
  const [scanPhase, setScanPhase] = useState<'idle' | 'tilting' | 'checking'>('idle')
  const [scanProgress, setScanProgress] = useState(0)

  const shotMeta = SHOTS.find((s) => s.key === studio) ?? SHOTS[0]
  const shotIndex = SHOTS.findIndex((s) => s.key === studio)
  const ready = uboIdentityCaptured(value)
  const matchPercent = typeof value.faceMatchPercent === 'number' ? value.faceMatchPercent : null
  const matchLow = matchPercent !== null && matchPercent < 50
  const securityOk = passportSecurityPassed(value)
  const scanning = scanPhase !== 'idle'

  useEffect(() => {
    preloadKycFaceModels()
    preloadPassportScanner()
  }, [])

  const matchErrorCopy = (code: 'noPassportFace' | 'noSelfieFace' | 'failed') => {
    if (code === 'noPassportFace') return id.matchNoPassportFace
    if (code === 'noSelfieFace') return id.matchNoSelfieFace
    return id.matchFailed
  }

  const securityErrorCopy = (code: PassportSecurityRisk) => {
    if (code === 'paper') return id.securityPaper
    if (code === 'screen') return id.securityScreen
    if (code === 'noMrz') return id.securityNoMrz
    if (code === 'noTilt') return id.securityNoTilt
    return id.securityFailed
  }

  const commitShot = async (
    key: KycIdShotKey,
    shot: KycIdShot,
    security?: PassportSecurity | null,
  ): Promise<boolean> => {
    revokeKycIdShot(value[key])
    const next: UboIdentity = {
      ...value,
      [key]: shot,
      faceMatchPercent: null,
      passportSecurity: key === 'passportFront' ? (security ?? null) : value.passportSecurity,
    }
    onChange(next)

    const passport = key === 'passportFront' ? shot : next.passportFront
    const face = key === 'face' ? shot : next.face
    if (!kycIdShotReady(passport) || !kycIdShotReady(face) || !passport || !face) return true

    setMatching(true)
    const result = await comparePassportToSelfie(passport.blob, face.blob)
    setMatching(false)
    if (result.kind === 'error') {
      setCamError(matchErrorCopy(result.code))
      onChange({ ...next, faceMatchPercent: null })
      return false
    }
    onChange({ ...next, faceMatchPercent: result.percent })
    setCamError(null)
    return true
  }

  const stopCamera = () => {
    camGenRef.current += 1
    const stream = streamRef.current
    streamRef.current = null
    stream?.getTracks().forEach((track) => {
      track.stop()
      stream.removeTrack(track)
    })
    const el = videoRef.current
    if (el) {
      el.pause()
      el.srcObject = null
    }
  }

  const closeStudio = () => {
    stopCamera()
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setCamError(null)
    setScanPhase('idle')
    setScanProgress(0)
    setStudio(null)
  }

  const startCamera = async (key: KycIdShotKey) => {
    const meta = SHOTS.find((s) => s.key === key)
    if (!meta) return
    setCamError(null)
    stopCamera()
    const gen = camGenRef.current
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: meta.facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      if (gen !== camGenRef.current) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }
      streamRef.current = stream
      const el = videoRef.current
      if (!el) {
        stopCamera()
        return
      }
      el.srcObject = stream
      await el.play()
    } catch {
      if (gen === camGenRef.current) setCamError(id.cameraBlocked)
    }
  }

  useEffect(() => {
    if (!studio) {
      stopCamera()
      return
    }
    void startCamera(studio)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStudio()
    }
    const halt = () => stopCamera()
    window.addEventListener('keydown', onKey)
    window.addEventListener('pagehide', halt)
    return () => {
      stopCamera()
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pagehide', halt)
    }
    // Studio key is the open/close gate; camera is restarted per shot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studio])

  const openFirstMissing = () => {
    sequentialRef.current = true
    const missing = SHOTS.find((s) => !kycIdShotReady(value[s.key]))
    if (missing) {
      setStudio(missing.key)
      return
    }
    if (!passportSecurityPassed(value)) {
      setStudio('passportFront')
      return
    }
    setStudio(typeof value.faceMatchPercent === 'number' ? 'passportFront' : 'face')
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

  const afterCommit = (ok: boolean, key: KycIdShotKey) => {
    if (!ok) return
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    const nextIndex = SHOTS.findIndex((s) => s.key === key) + 1
    const nextKey = SHOTS[nextIndex]?.key
    if (sequentialRef.current && nextKey && !kycIdShotReady(value[nextKey])) {
      setStudio(nextKey)
    } else {
      closeStudio()
    }
  }

  const scanPassport = async () => {
    const el = videoRef.current
    if (!el?.videoWidth) {
      setCamError(id.cameraBlocked)
      return
    }
    setBusy(true)
    setCamError(null)
    setScanPhase('tilting')
    try {
      const frames: HTMLCanvasElement[] = []
      for (let i = 0; i < PASSPORT_TILT_FRAMES; i += 1) {
        frames.push(grabVideoFrame(el))
        setScanProgress(Math.round(((i + 1) / PASSPORT_TILT_FRAMES) * 100))
        if (i < PASSPORT_TILT_FRAMES - 1) await sleep(PASSPORT_TILT_MS)
      }
      setScanPhase('checking')
      const result = await analyzePassportFrames(frames)
      if (result.kind === 'error') {
        revokeKycIdShot(value.passportFront)
        onChange({
          ...value,
          passportFront: null,
          passportSecurity: result.security,
          faceMatchPercent: null,
        })
        setCamError(securityErrorCopy(result.code))
        return
      }
      const shot = await createKycIdShot(result.blob, `passportFront-${Date.now()}`)
      const ok = await commitShot('passportFront', shot, result.security)
      afterCommit(ok, 'passportFront')
    } catch {
      setCamError(id.securityFailed)
    } finally {
      setScanPhase('idle')
      setScanProgress(0)
      setBusy(false)
    }
  }

  const usePreview = async () => {
    if (!studio || !preview) return
    setBusy(true)
    try {
      const res = await fetch(preview)
      const blob = await res.blob()
      const shot = await createKycIdShot(blob, `${studio}-${Date.now()}`)
      const ok = await commitShot(studio, shot)
      afterCommit(ok, studio)
    } catch {
      setCamError(id.cameraBlocked)
    } finally {
      setBusy(false)
    }
  }

  const studioTitle = shotMeta.key === 'face' ? id.face : id.passportFront

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
            label={shot.key === 'face' ? id.face : id.passportFront}
            hint={shot.frame === 'face' ? id.faceHint : id.slotHint}
            shot={value[shot.key]}
            captured={id.captured}
            onOpen={() => openShot(shot.key)}
          />
        ))}
      </div>
      {securityOk ? (
        <div className="kyc-id-match">
          <strong>{interpolate(id.securityScore, { percent: value.passportSecurity?.hologramPercent ?? 0 })}</strong>
          <span>{id.securityOk}</span>
          <div className="kyc-id-match-bar" aria-hidden>
            <i style={{ width: `${value.passportSecurity?.hologramPercent ?? 0}%` }} />
          </div>
        </div>
      ) : null}
      {matching ? <p className="kyc-id-match is-pending">{id.matchChecking}</p> : null}
      {!matching && matchPercent !== null ? (
        <div className={`kyc-id-match${matchLow ? ' is-low' : ''}`}>
          <strong>{interpolate(id.matchScore, { percent: matchPercent })}</strong>
          <span>{id.matchLabel}</span>
          <div className="kyc-id-match-bar" aria-hidden>
            <i style={{ width: `${matchPercent}%` }} />
          </div>
          {matchLow ? <span>{id.matchLow}</span> : null}
        </div>
      ) : null}
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
                {shotMeta.frame === 'face'
                  ? id.alignSelfie
                  : scanPhase === 'tilting'
                    ? id.scanningSecurity
                    : scanPhase === 'checking'
                      ? id.checkingSecurity
                      : id.alignPassport}
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
                {scanning ? (
                  <div className="kyc-id-scan-progress" aria-hidden>
                    <i style={{ width: `${scanProgress}%` }} />
                  </div>
                ) : null}
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
                      disabled={busy || matching}
                    >
                      {matching ? id.matchChecking : busy ? id.capturing : shotIndex < SHOTS.length - 1 ? id.nextShot : id.usePhoto}
                    </button>
                  </>
                ) : shotMeta.frame === 'passport' ? (
                  <button
                    type="button"
                    className="metal-page-btn metal-page-btn--primary"
                    onClick={() => void scanPassport()}
                    disabled={busy || scanning}
                  >
                    {scanPhase === 'tilting'
                      ? id.scanningSecurity
                      : scanPhase === 'checking'
                        ? id.checkingSecurity
                        : id.scanSecurity}
                  </button>
                ) : (
                  <button type="button" className="metal-page-btn metal-page-btn--primary" onClick={snap}>
                    {id.captureShot}
                  </button>
                )}
                <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={closeStudio} disabled={scanning}>
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
