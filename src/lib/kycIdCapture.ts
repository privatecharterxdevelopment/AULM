import type { KycIdShot, UboIdentity } from '../types/kyc'

const MAX_EDGE = 1600
const JPEG_QUALITY = 0.78

export function revokeKycIdShot(shot: KycIdShot | null | undefined) {
  if (shot?.previewUrl.startsWith('blob:')) URL.revokeObjectURL(shot.previewUrl)
}

export function revokeUboIdentity(entry: UboIdentity) {
  revokeKycIdShot(entry.passportFront)
  revokeKycIdShot(entry.passportBack)
  revokeKycIdShot(entry.face)
}

export async function createKycIdShot(source: Blob, basename: string): Promise<KycIdShot> {
  const bitmap = await createImageBitmap(source)
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Could not prepare the photo.')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (next) => (next ? resolve(next) : reject(new Error('Could not encode the photo.'))),
      'image/jpeg',
      JPEG_QUALITY,
    )
  })

  const name = basename.toLowerCase().endsWith('.jpg') ? basename : `${basename}.jpg`
  return {
    name,
    size: blob.size,
    mime: 'image/jpeg',
    blob,
    previewUrl: URL.createObjectURL(blob),
  }
}
