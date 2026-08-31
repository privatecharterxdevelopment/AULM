import { parse as parseMrz } from 'mrz'
import { createWorker, PSM } from 'tesseract.js'
import type { PassportSecurity, PassportSecurityRisk } from '../types/kyc'

const FRAME_W = 160
const FRAME_H = 100
export const PASSPORT_HOLOGRAM_MIN = 40
export const PASSPORT_TILT_FRAMES = 12
export const PASSPORT_TILT_MS = 160

type Worker = Awaited<ReturnType<typeof createWorker>>

let workerPromise: Promise<Worker> | null = null

function luma(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function downsampled(src: HTMLCanvasElement, w = FRAME_W, h = FRAME_H): ImageData {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return new ImageData(w, h)
  ctx.drawImage(src, 0, 0, w, h)
  return ctx.getImageData(0, 0, w, h)
}

function percentile(values: number[], p: number) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const i = Math.min(sorted.length - 1, Math.max(0, Math.round((p / 100) * (sorted.length - 1))))
  return sorted[i]
}

function regionPixels(data: ImageData, x0: number, y0: number, x1: number, y1: number) {
  const lumas: number[] = []
  let rSum = 0
  let gSum = 0
  let bSum = 0
  let fringe = 0
  let hot = 0
  let n = 0
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const i = (y * data.width + x) * 4
      const r = data.data[i]
      const g = data.data[i + 1]
      const b = data.data[i + 2]
      const L = luma(r, g, b)
      lumas.push(L)
      rSum += r
      gSum += g
      bSum += b
      fringe += Math.abs(r - g) + Math.abs(g - b)
      if (L > 235) hot += 1
      n += 1
    }
  }
  return {
    p50: percentile(lumas, 50),
    p95: percentile(lumas, 95),
    max: lumas.length ? Math.max(...lumas) : 0,
    meanR: n ? rSum / n : 0,
    meanG: n ? gSum / n : 0,
    meanB: n ? bSum / n : 0,
    fringe: n ? fringe / n : 0,
    hotRatio: n ? hot / n : 0,
  }
}

function sharpness(src: HTMLCanvasElement) {
  const data = downsampled(src, 80, 50)
  let e = 0
  for (let y = 1; y < data.height - 1; y += 1) {
    for (let x = 1; x < data.width - 1; x += 1) {
      const i = (y * data.width + x) * 4
      const c = luma(data.data[i], data.data[i + 1], data.data[i + 2])
      const r = luma(data.data[i + 4], data.data[i + 5], data.data[i + 6])
      const d = luma(
        data.data[i + data.width * 4],
        data.data[i + data.width * 4 + 1],
        data.data[i + data.width * 4 + 2],
      )
      e += Math.abs(c - r) + Math.abs(c - d)
    }
  }
  return e
}

function meanAbsDiff(a: ImageData, b: ImageData) {
  const n = Math.min(a.data.length, b.data.length)
  let s = 0
  let count = 0
  for (let i = 0; i < n; i += 4) {
    s += Math.abs(luma(a.data[i], a.data[i + 1], a.data[i + 2]) - luma(b.data[i], b.data[i + 1], b.data[i + 2]))
    count += 1
  }
  return count ? s / count : 0
}

function scale(value: number, lo: number, hi: number) {
  if (hi <= lo) return 0
  return Math.max(0, Math.min(1, (value - lo) / (hi - lo)))
}

function chromaDelta(
  a: { meanR: number; meanG: number; meanB: number },
  b: { meanR: number; meanG: number; meanB: number },
) {
  return Math.abs(a.meanR - b.meanR) + Math.abs(a.meanG - b.meanG) + Math.abs(a.meanB - b.meanB)
}

export function grabVideoFrame(video: HTMLVideoElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d')?.drawImage(video, 0, 0)
  return canvas
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

async function ocrWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = createWorker('eng', 1, { logger: () => undefined })
      .then(async (worker) => {
        await worker.setParameters({
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
          tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
          user_defined_dpi: '300',
        })
        return worker
      })
      .catch((err) => {
        workerPromise = null
        throw err
      })
  }
  return workerPromise
}

export function preloadPassportScanner() {
  void ocrWorker()
}

function mrzStrip(src: HTMLCanvasElement, y0Ratio: number, y1Ratio: number): HTMLCanvasElement {
  const sx = Math.round(src.width * 0.08)
  const sw = Math.max(8, Math.round(src.width * 0.84))
  const sy = Math.round(src.height * y0Ratio)
  const sh = Math.max(8, Math.round(src.height * (y1Ratio - y0Ratio)))
  const canvas = document.createElement('canvas')
  canvas.width = sw * 2
  canvas.height = sh * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas
  ctx.drawImage(src, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let min = 255
  let max = 0
  for (let i = 0; i < img.data.length; i += 4) {
    const L = luma(img.data[i], img.data[i + 1], img.data[i + 2])
    if (L < min) min = L
    if (L > max) max = L
  }
  const span = Math.max(1, max - min)
  for (let i = 0; i < img.data.length; i += 4) {
    const L = luma(img.data[i], img.data[i + 1], img.data[i + 2])
    const v = Math.round(((L - min) / span) * 255)
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
  }
  ctx.putImageData(img, 0, 0)
  return canvas
}

function mrzLinesFromText(text: string): string[] | null {
  const lines = text
    .toUpperCase()
    .split(/\r?\n/)
    .map((line) => line.replace(/[^A-Z0-9<]/g, ''))
    .filter((line) => line.length >= 20)
  const sized = lines.filter((line) => line.length === 44 || line.length === 36 || line.length === 30)
  if (sized.length >= 3 && sized[0].length === 30) return sized.slice(0, 3)
  if (sized.length >= 2) return sized.slice(0, 2)
  const blob = lines.join('')
  if (blob.length >= 88) return [blob.slice(0, 44), blob.slice(44, 88)]
  if (blob.length >= 90) return [blob.slice(0, 30), blob.slice(30, 60), blob.slice(60, 90)]
  if (blob.length >= 72) return [blob.slice(0, 36), blob.slice(36, 72)]
  return null
}

async function readMrz(src: HTMLCanvasElement) {
  const worker = await ocrWorker()
  const crops = [mrzStrip(src, 0.74, 0.96), mrzStrip(src, 0.68, 0.98)]
  for (const crop of crops) {
    const { data } = await worker.recognize(crop)
    const lines = mrzLinesFromText(data.text ?? '')
    if (!lines) continue
    try {
      const parsed = parseMrz(lines, { autocorrect: true })
      if (parsed.valid) {
        return {
          valid: true as const,
          issuingCountry: parsed.fields.issuingState ?? parsed.fields.nationality ?? null,
        }
      }
    } catch {
      /* try next crop */
    }
  }
  return { valid: false as const, issuingCountry: null }
}

function canvasToJpeg(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('encode'))), 'image/jpeg', 0.9)
  })
}

export type PassportScanResult =
  | { kind: 'ok'; blob: Blob; security: PassportSecurity }
  | { kind: 'error'; code: PassportSecurityRisk; security: PassportSecurity }

export async function analyzePassportFrames(frames: HTMLCanvasElement[]): Promise<PassportScanResult> {
  const empty = (risk: PassportSecurityRisk, hologramPercent = 0, mrzValid = false): PassportScanResult => ({
    kind: 'error',
    code: risk,
    security: { mrzValid, issuingCountry: null, hologramPercent, risk },
  })

  if (frames.length < 6) return empty('failed')

  try {
    const thumbs = frames.map((frame) => downsampled(frame))
    let motion = 0
    for (let i = 1; i < thumbs.length; i += 1) motion += meanAbsDiff(thumbs[i - 1], thumbs[i])
    motion /= thumbs.length - 1
    if (motion < 2.4) return empty('noTilt')

    const ovd = thumbs.map((thumb) => {
      const mid = regionPixels(thumb, 8, 8, FRAME_W - 8, Math.round(FRAME_H * 0.7))
      const q1 = regionPixels(thumb, 8, 8, Math.round(FRAME_W / 2), Math.round(FRAME_H * 0.4))
      const q2 = regionPixels(thumb, Math.round(FRAME_W / 2), 8, FRAME_W - 8, Math.round(FRAME_H * 0.4))
      const q3 = regionPixels(thumb, 8, Math.round(FRAME_H * 0.4), Math.round(FRAME_W / 2), Math.round(FRAME_H * 0.7))
      const q4 = regionPixels(thumb, Math.round(FRAME_W / 2), Math.round(FRAME_H * 0.4), FRAME_W - 8, Math.round(FRAME_H * 0.7))
      const quads = [q1.p95, q2.p95, q3.p95, q4.p95]
      const qMean = quads.reduce((s, v) => s + v, 0) / 4
      const qVar = quads.reduce((s, v) => s + (v - qMean) ** 2, 0) / 4
      return { mid, qVar }
    })

    const p95s = ovd.map((row) => row.mid.p95)
    const highlightSwing = Math.max(...p95s) - Math.min(...p95s)
    const chromaSwing = ovd.reduce((max, row, i) => {
      if (i === 0) return max
      return Math.max(max, chromaDelta(ovd[0].mid, row.mid))
    }, 0)
    const patchiness = Math.max(...ovd.map((row) => row.qVar))
    const screenHit = ovd.some((row) => row.mid.hotRatio > 0.22 && row.mid.fringe > 42)

    if (screenHit) return empty('screen', Math.round(100 * scale(highlightSwing, 8, 45)))

    const hologramPercent = Math.round(
      100 *
        (0.45 * scale(highlightSwing, 7, 42) +
          0.3 * scale(chromaSwing, 5, 28) +
          0.25 * scale(Math.sqrt(patchiness), 3, 18)),
    )

    const sharpest = frames.reduce((best, frame) => (sharpness(frame) > sharpness(best) ? frame : best))
    const mrz = await readMrz(sharpest)
    if (!mrz.valid) {
      return {
        kind: 'error',
        code: 'noMrz',
        security: { mrzValid: false, issuingCountry: null, hologramPercent, risk: 'noMrz' },
      }
    }

    if (hologramPercent < PASSPORT_HOLOGRAM_MIN) {
      return {
        kind: 'error',
        code: 'paper',
        security: { mrzValid: true, issuingCountry: mrz.issuingCountry, hologramPercent, risk: 'paper' },
      }
    }

    const blob = await canvasToJpeg(sharpest)
    return {
      kind: 'ok',
      blob,
      security: {
        mrzValid: true,
        issuingCountry: mrz.issuingCountry,
        hologramPercent,
        risk: 'ok',
      },
    }
  } catch {
    return empty('failed')
  }
}
