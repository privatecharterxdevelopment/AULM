import { useEffect, useState } from 'react'
import { getSupabase, storageBuckets } from '../../lib/supabase'
import type { StoredUboIdentity } from '../../lib/kycIdvStorage'

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

const LABELS: { key: keyof StoredUboIdentity; label: string }[] = [
  { key: 'passportFront', label: 'Passport front' },
  { key: 'passportBack', label: 'Passport back' },
  { key: 'face', label: 'Selfie' },
]

export function AdminUboIdPhotos({ identities, uboNames }: Props) {
  if (!identities.length) return <span>—</span>

  return (
    <div>
      {identities.map((entry, i) => (
        <div key={i} className="admin-id-ubo">
          <h4>{uboNames[i] || `UBO ${i + 1}`}</h4>
          <div className="admin-id-gallery">
            {LABELS.map(({ key, label }) => {
              const shot = entry[key]
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
      ))}
    </div>
  )
}
