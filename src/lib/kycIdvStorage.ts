import type { KycIdShot, KycIdShotKey, UboIdentity } from '../types/kyc'
import { getSupabase, storageBuckets } from './supabase'

export type StoredKycIdShot = {
  name: string
  size: number
  mime: string
  storagePath: string | null
}

export type StoredUboIdentity = {
  passportFront: StoredKycIdShot | null
  passportBack: StoredKycIdShot | null
  face: StoredKycIdShot | null
}

export const KYC_ID_SHOT_KEYS: KycIdShotKey[] = ['passportFront', 'passportBack', 'face']

export function serializeKycIdShot(shot: KycIdShot | null): StoredKycIdShot | null {
  if (!shot) return null
  return {
    name: shot.name,
    size: shot.size,
    mime: shot.mime,
    storagePath: shot.storagePath ?? null,
  }
}

export function serializeUboIdentity(entry: UboIdentity): StoredUboIdentity {
  return {
    passportFront: serializeKycIdShot(entry.passportFront),
    passportBack: serializeKycIdShot(entry.passportBack),
    face: serializeKycIdShot(entry.face),
  }
}

export async function uploadUboIdentities(
  applicationId: string,
  identities: UboIdentity[],
): Promise<{ identities: UboIdentity[]; error?: string }> {
  const supabase = getSupabase()
  if (!supabase) return { identities, error: 'Could not connect to storage.' }

  const next = identities.map((entry) => ({ ...entry }))

  for (let i = 0; i < next.length; i += 1) {
    const entry = next[i]
    for (const key of KYC_ID_SHOT_KEYS) {
      const shot = entry[key]
      if (!shot?.blob) continue
      const path = `${applicationId}/ubo-${i}/${key}.jpg`
      const { error } = await supabase.storage.from(storageBuckets.kycIdv).upload(path, shot.blob, {
        contentType: 'image/jpeg',
        upsert: false,
      })
      if (error) {
        return {
          identities: next,
          error: `ID photos could not be stored (${error.message}). Run supabase/aulm-modern-kyc-idv.sql in Supabase, then submit again.`,
        }
      }
      entry[key] = { ...shot, storagePath: path }
    }
  }

  return { identities: next }
}
