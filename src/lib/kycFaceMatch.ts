import type * as FaceApi from '@vladmandic/face-api'

const MODEL_URI = '/kyc-face-models'
const DETECT_OPTS = { inputSize: 416, scoreThreshold: 0.15 }

type FaceApiNs = typeof FaceApi

let loadPromise: Promise<FaceApiNs> | null = null

function asFaceApi(mod: FaceApiNs | { default: FaceApiNs }): FaceApiNs {
  if ('nets' in mod && mod.nets) return mod
  return (mod as { default: FaceApiNs }).default
}

async function loadFaceApi(): Promise<FaceApiNs> {
  if (!loadPromise) {
    loadPromise = (async () => {
      const mod = asFaceApi(await import('@vladmandic/face-api'))
      await Promise.all([
        mod.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
        mod.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URI),
        mod.nets.faceRecognitionNet.loadFromUri(MODEL_URI),
      ])
      return mod
    })().catch((err) => {
      loadPromise = null
      throw err
    })
  }
  return loadPromise
}

export function preloadKycFaceModels() {
  void loadFaceApi()
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read the photo.'))
    }
    img.src = url
  })
}

function cropRegion(
  img: HTMLImageElement,
  xRatio: number,
  yRatio: number,
  wRatio: number,
  hRatio: number,
): HTMLCanvasElement {
  const sx = Math.round(img.naturalWidth * xRatio)
  const sy = Math.round(img.naturalHeight * yRatio)
  const sw = Math.max(1, Math.round(img.naturalWidth * wRatio))
  const sh = Math.max(1, Math.round(img.naturalHeight * hRatio))
  const scale = Math.max(1, 480 / sw)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(sw * scale)
  canvas.height = Math.round(sh * scale)
  canvas.getContext('2d')?.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  return canvas
}

function boxArea(det: { detection: { box: { width: number; height: number } } }) {
  return det.detection.box.width * det.detection.box.height
}

async function descriptorFromInput(faceapi: FaceApiNs, input: HTMLImageElement | HTMLCanvasElement) {
  const opts = new faceapi.TinyFaceDetectorOptions(DETECT_OPTS)
  const detections = await faceapi
    .detectAllFaces(input, opts)
    .withFaceLandmarks(true)
    .withFaceDescriptors()
  if (!detections.length) return null
  detections.sort((a, b) => boxArea(b) - boxArea(a))
  return detections[0].descriptor
}

async function passportDescriptor(faceapi: FaceApiNs, img: HTMLImageElement) {
  const regions: HTMLCanvasElement[] = [
    cropRegion(img, 0.04, 0.14, 0.44, 0.7),
    cropRegion(img, 0.52, 0.14, 0.44, 0.7),
  ]
  for (const region of regions) {
    const desc = await descriptorFromInput(faceapi, region)
    if (desc) return desc
  }
  return descriptorFromInput(faceapi, img)
}

/** Map FaceAPI Euclidean distance to an integer percent (same person often ~0.3–0.5 → 50–70%+). */
export function distanceToMatchPercent(distance: number) {
  return Math.round(Math.max(0, Math.min(99, (1 - distance) * 100)))
}

export type FaceMatchResult =
  | { kind: 'ok'; percent: number }
  | { kind: 'error'; code: 'noPassportFace' | 'noSelfieFace' | 'failed' }

export async function comparePassportToSelfie(passport: Blob, selfie: Blob): Promise<FaceMatchResult> {
  try {
    const faceapi = await loadFaceApi()
    const [passImg, selfieImg] = await Promise.all([blobToImage(passport), blobToImage(selfie)])
    const passDesc = await passportDescriptor(faceapi, passImg)
    if (!passDesc) return { kind: 'error', code: 'noPassportFace' }
    const selfieDesc = await descriptorFromInput(faceapi, selfieImg)
    if (!selfieDesc) return { kind: 'error', code: 'noSelfieFace' }
    const distance = faceapi.euclideanDistance(passDesc, selfieDesc)
    return { kind: 'ok', percent: distanceToMatchPercent(distance) }
  } catch {
    return { kind: 'error', code: 'failed' }
  }
}
