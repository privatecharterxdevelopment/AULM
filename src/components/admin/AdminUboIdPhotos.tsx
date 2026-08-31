import { useEffect, useState } from 'react'
import { getSupabase, storageBuckets } from '../../lib/supabase'
import type { StoredUboIdentity } from '../../lib/kycIdvStorage'
import type { KycIdShotKey } from '../../types/kyc'

type Props = {
  identities: StoredUboIdentity[]
  uboNames: string[]
}

function SignedShot({ path, label }: { path: string; label: string }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let gone = false
    const supabase = getSupabase()
    if (!supabase) return
    void supabase.storage
      .from(storageBuckets.kycIdv)
      .createSignedUrl(path, 60 * 30)
      .then(({ data }) => {
        if (!gone && data?.signedUrl) setUrl(data.signedUrl)
      })
    return () => {
      gone = true
    }
  }, [path])

  return (
    <figure>
      {url ? <img src={url} alt={label} /> : <img alt="" />}
      <figcaption>{label}</figcaption>
    </figure>
  )
}

const LABELS: { key: KycIdShotKey; label: string }[] = [
  { key: 'passportFront', label: 'Passport' },
  { key: 'passportBack', label: 'Passport (second page)' },
  { key: 'face', label: 'Selfie' },
]

export function AdminUboIdPhotos({ identities, uboNames }: Props) {
  if (!identities.length) return <span>—</span>

  return (
    <div>
      {identities.map((entry, i) => {
        const match = typeof entry.faceMatchPercent === 'number' ? entry.faceMatchPercent : null
        return (
          <div key={i} className="admin-id-ubo">
            <h4>{uboNames[i] || `UBO ${i + 1}`}</h4>
            {match !== null ? (
              <p className={`admin-id-match${match < 50 ? ' is-low' : ''}`}>
                Passport vs selfie: {match}%
              </p>
            ) : (
              <p className="admin-id-match is-pending">Passport vs selfie: not scored</p>
            )}
            {entry.passportSecurity ? (
              <p className={`admin-id-match${entry.passportSecurity.risk === 'ok' ? '' : ' is-low'}`}>
                Security: MRZ {entry.passportSecurity.mrzValid ? 'valid' : 'invalid'}
                {entry.passportSecurity.issuingCountry ? ` · ${entry.passportSecurity.issuingCountry}` : ''}
                {' · '}hologram {entry.passportSecurity.hologramPercent}%
                {' · '}
                {entry.passportSecurity.risk}
              </p>
            ) : (
              <p className="admin-id-match is-pending">Passport security: not scanned</p>
            )}
            <div className="admin-id-gallery">
              {LABELS.map(({ key, label }) => {
                const shot = entry[key]
                if (!shot && key === 'passportBack') return null
                if (!shot?.storagePath) {
                  return (
                    <figure key={key}>
                      <figcaption>
                        {label}: {shot?.name ?? 'missing'}
                      </figcaption>
                    </figure>
                  )
                }
                return <SignedShot key={key} path={shot.storagePath} label={label} />
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
