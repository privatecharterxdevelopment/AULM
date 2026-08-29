import { useEffect, useRef, useState } from 'react'
import type { SignatureMode } from '../../types/kyc'
import { useT } from '../../i18n'

type Props = {
  mode: SignatureMode
  dataUrl: string | null
  fileName: string | null
  onModeChange: (mode: SignatureMode) => void
  onChange: (dataUrl: string | null, fileName: string | null) => void
}

export function SignatureCapture({ mode, dataUrl, fileName, onModeChange, onChange }: Props) {
  const { t } = useT()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasStroke, setHasStroke] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || mode !== 'draw') return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.strokeStyle = '#111'
    ctx.lineWidth = 2.25
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    if (dataUrl) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height)
      img.src = dataUrl
    }
  }, [mode, dataUrl])

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return
    drawing.current = true
    canvasRef.current?.setPointerCapture(e.pointerId)
    const ctx = canvasRef.current?.getContext('2d')
    const p = pos(e)
    ctx?.beginPath()
    ctx?.moveTo(p.x, p.y)
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || mode !== 'draw') return
    const ctx = canvasRef.current?.getContext('2d')
    const p = pos(e)
    ctx?.lineTo(p.x, p.y)
    ctx?.stroke()
    setHasStroke(true)
  }

  const endDraw = () => {
    if (!drawing.current) return
    drawing.current = false
    const canvas = canvasRef.current
    if (canvas && hasStroke) {
      onChange(canvas.toDataURL('image/png'), 'drawn-signature.png')
    }
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasStroke(false)
    onChange(null, null)
  }

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string, file.name)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className="kyc-signature">
      <div className="kyc-signature-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'draw'}
          className={mode === 'draw' ? 'is-active' : ''}
          onClick={() => onModeChange('draw')}
        >
          {t.kyc.policy.draw}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'upload'}
          className={mode === 'upload' ? 'is-active' : ''}
          onClick={() => onModeChange('upload')}
        >
          {t.kyc.policy.upload}
        </button>
      </div>

      {mode === 'draw' ? (
        <div className="kyc-signature-pad-wrap">
          <canvas
            ref={canvasRef}
            className="kyc-signature-pad"
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
            aria-label={t.kyc.policy.drawAria}
          />
          <p className="kyc-signature-hint">{t.kyc.policy.drawHint}</p>
          <button type="button" className="kyc-signature-clear" onClick={clear}>
            {t.kyc.policy.clear}
          </button>
        </div>
      ) : (
        <label className="kyc-signature-upload">
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onImageUpload} />
          <span>{fileName ? fileName : t.kyc.policy.uploadHint}</span>
        </label>
      )}

      {dataUrl && mode === 'upload' ? (
        <img src={dataUrl} alt={t.kyc.policy.previewAlt} className="kyc-signature-preview" />
      ) : null}
    </div>
  )
}
