import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DEMO_ESCROWS } from '../../../cbos/mocks/demoData'
import {
  escrowStatusLabel,
  formatActivityDate,
  formatEscrowDate,
  formatMoney,
} from '../../../cbos/lib/format'
import type { CbosEscrow, CbosEscrowDocument, CbosEscrowParticipant } from '../../../cbos/types'
import { CbosEscrowBanner } from '../CbosEscrowBanner'
import { CbosEscrowDocUpload } from '../escrow/CbosEscrowDocUpload'
import { CbosEscrowFlowTimeline } from '../escrow/CbosEscrowFlowTimeline'

function roleLabel(role: string): string {
  if (role === 'clearing_agent') return 'Clearing agent'
  return role.charAt(0).toUpperCase() + role.slice(1).replace(/_/g, ' ')
}

function daysUntil(iso: string): number {
  const target = new Date(iso)
  const now = new Date()
  target.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function CbosEscrowDetail() {
  const { id } = useParams<{ id: string }>()
  const base = DEMO_ESCROWS.find((e) => e.id === id) ?? DEMO_ESCROWS[0]

  const [participants, setParticipants] = useState<CbosEscrowParticipant[]>(base.participants ?? [])
  const [documents, setDocuments] = useState<CbosEscrowDocument[]>(base.documents ?? [])

  const escrow: CbosEscrow = { ...base, participants, documents }
  const fundedPct = Math.min(100, (escrow.fundedAmount / escrow.transactionValue) * 100)
  const seller = participants.find((p) => p.role === 'seller')
  const buyer = participants.find((p) => p.role === 'buyer')
  const clearingAgent = participants.find((p) => p.role === 'clearing_agent')
  const sellerDocs = documents.filter((d) => d.phase === 'seller_pre_ship')
  const clearingCerts = documents.filter((d) => d.phase === 'clearing_certificate')
  const buyerArrivalCerts = documents.filter((d) => d.phase === 'buyer_arrival')
  const releaseDocs = documents.filter((d) => d.phase === 'release')
  const pendingAcceptance = participants.filter((p) => !p.termsAccepted)
  const deliveryDays = escrow.deliveryDate ? daysUntil(escrow.deliveryDate) : null

  const uploadDoc = (docId: string, fileName: string) => {
    setDocuments((docs) =>
      docs.map((d) => {
        if (d.id !== docId) return d
        let uploadedBy = seller?.name ?? 'Seller'
        if (d.phase === 'clearing_certificate') uploadedBy = clearingAgent?.name ?? escrow.clearingAgent ?? 'Clearing agent'
        if (d.phase === 'buyer_arrival') uploadedBy = buyer?.name ?? 'Buyer'
        return {
          ...d,
          status: 'uploaded',
          fileName,
          uploadedAt: new Date().toISOString(),
          uploadedBy,
        }
      }),
    )
  }

  const removeDoc = (docId: string) => {
    setDocuments((docs) =>
      docs.map((d) =>
        d.id === docId
          ? { ...d, status: 'missing', fileName: undefined, uploadedAt: undefined, uploadedBy: undefined }
          : d,
      ),
    )
  }

  const acceptTerms = (participantId: string) => {
    setParticipants((ps) =>
      ps.map((p) =>
        p.id === participantId
          ? { ...p, termsAccepted: true, termsAcceptedAt: new Date().toISOString() }
          : p,
      ),
    )
  }

  const showInProgress = escrow.status === 'in_progress'

  const deliveryHint = useMemo(() => {
    if (deliveryDays === null) return null
    if (deliveryDays < 0) return `${Math.abs(deliveryDays)} days overdue`
    if (deliveryDays === 0) return 'Due today'
    return `${deliveryDays} days remaining`
  }, [deliveryDays])

  return (
    <div className="cbos-transfers-page cbos-escrow-page">
      <article className="cbos-transfers-card">
        <CbosEscrowBanner title={escrow.title} subtitle={escrow.reference} />

        <div className="cbos-transfers-card__body">
          <div className="cbos-escrow-create__top">
            <Link to="/bank/escrows" className="cbos-escrow-create__back">
              ← All escrows
            </Link>
            <span
              className={`cbos-escrow-detail__status is-${escrow.status === 'in_progress' ? 'progress' : escrow.status}`}
            >
              {escrowStatusLabel(escrow.status)}
            </span>
          </div>

          <CbosEscrowFlowTimeline status={escrow.status} />

          {showInProgress ? (
            <section className="cbos-escrow-ship" aria-label="Clearing in progress">
              <div className="cbos-escrow-ship__main">
                <p className="cbos-escrow-ship__eyebrow">Clearing agent · Goods in custody</p>
                <h2 className="cbos-escrow-ship__title">
                  {escrow.commodityAmount} {escrow.commodityUnit} {escrow.commodityCode} with{' '}
                  {escrow.clearingAgent ?? clearingAgent?.name ?? 'clearing agent'}
                </h2>
                <p className="cbos-escrow-ship__route">
                  {escrow.incoterm} · {escrow.origin} → {escrow.destination}
                </p>
              </div>
              <div className="cbos-escrow-ship__date">
                <span className="cbos-escrow-ship__date-label">Committed delivery</span>
                <strong className="cbos-escrow-ship__date-value">
                  {escrow.deliveryDate ? formatEscrowDate(escrow.deliveryDate) : '—'}
                </strong>
                {deliveryHint ? <span className="cbos-escrow-ship__date-hint">{deliveryHint}</span> : null}
                {seller ? <span className="cbos-escrow-ship__seller">{seller.name}</span> : null}
              </div>
            </section>
          ) : null}

          <div className="cbos-transfers-stats">
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Funded</span>
              <span className="cbos-transfers-stat__value cbos-tabular">{Math.round(fundedPct)}%</span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Value</span>
              <span className="cbos-transfers-stat__value cbos-tabular">
                {formatMoney(escrow.transactionValue, escrow.currency).replace(/\.00$/, '')}
              </span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Delivery</span>
              <span className="cbos-transfers-stat__value cbos-tabular">
                {escrow.deliveryDate ? formatActivityDate(escrow.deliveryDate) : '—'}
              </span>
            </article>
          </div>

          <section className="cbos-escrow-panel">
            <header className="cbos-escrow-panel__head">
              <div>
                <p className="cbos-transfers-list__eyebrow">Mandate</p>
                <h2 className="cbos-transfers-list__title">Framework conditions</h2>
              </div>
              {pendingAcceptance.length > 0 ? (
                <span className="cbos-escrow-panel__badge">{pendingAcceptance.length} pending</span>
              ) : (
                <span className="cbos-escrow-panel__badge is-ok">All accepted</span>
              )}
            </header>
            <div className="cbos-escrow-terms">
              <pre className="cbos-escrow-terms__body">{escrow.adminTerms ?? 'No terms set.'}</pre>
            </div>
            <ul className="cbos-escrow-accept">
              {participants.map((p) => (
                <li key={p.id} className={p.termsAccepted ? 'is-done' : 'is-pending'}>
                  <div className="cbos-escrow-accept__who">
                    <strong>{p.name}</strong>
                    <span>
                      {roleLabel(p.role)} · {p.email}
                    </span>
                  </div>
                  {p.termsAccepted ? (
                    <span className="cbos-escrow-accept__state is-done">
                      Accepted{p.termsAcceptedAt ? ` · ${formatActivityDate(p.termsAcceptedAt)}` : ''}
                    </span>
                  ) : (
                    <button type="button" className="cbos-escrow-accept__btn" onClick={() => acceptTerms(p.id)}>
                      Accept conditions
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {sellerDocs.length > 0 ? (
            <section className="cbos-escrow-panel">
              <header className="cbos-escrow-panel__head">
                <div>
                  <p className="cbos-transfers-list__eyebrow">Seller</p>
                  <h2 className="cbos-transfers-list__title">Pre-shipment documents</h2>
                </div>
              </header>
              <div className="cbos-escrow-docs">
                {sellerDocs.map((doc) => (
                  <CbosEscrowDocUpload
                    key={doc.id}
                    label={doc.label}
                    fileName={doc.fileName}
                    status={doc.status}
                    hint={doc.uploadedBy ? `Uploaded by ${doc.uploadedBy}` : 'Required before shipment'}
                    disabled={doc.status === 'verified'}
                    onUpload={(name) => uploadDoc(doc.id, name)}
                    onRemove={doc.status === 'uploaded' ? () => removeDoc(doc.id) : undefined}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {clearingCerts.length > 0 || buyerArrivalCerts.length > 0 ? (
            <section className="cbos-escrow-panel">
              <header className="cbos-escrow-panel__head">
                <div>
                  <p className="cbos-transfers-list__eyebrow">Clearing</p>
                  <h2 className="cbos-transfers-list__title">Arrival certificate flow</h2>
                </div>
              </header>
              <ol className="cbos-escrow-clearing-chain cbos-escrow-clearing-chain--detail">
                <li className={clearingCerts.some((d) => d.status !== 'missing') ? 'is-done' : ''}>
                  Clearing agent handles goods &amp; issues certificate to buyer
                </li>
                <li className={buyerArrivalCerts.some((d) => d.status !== 'missing') ? 'is-done' : ''}>
                  Buyer uploads certificate — seller sees arrival confirmed
                </li>
              </ol>
              <div className="cbos-escrow-docs">
                {clearingCerts.map((doc) => (
                  <CbosEscrowDocUpload
                    key={doc.id}
                    label={doc.label}
                    fileName={doc.fileName}
                    status={doc.status}
                    hint={
                      doc.uploadedBy
                        ? `Issued by ${doc.uploadedBy} → buyer`
                        : 'Clearing agent delivers to buyer'
                    }
                    disabled={doc.status === 'verified'}
                    onUpload={(name) => uploadDoc(doc.id, name)}
                    onRemove={doc.status === 'uploaded' ? () => removeDoc(doc.id) : undefined}
                  />
                ))}
                {buyerArrivalCerts.map((doc) => (
                  <CbosEscrowDocUpload
                    key={doc.id}
                    label={doc.label}
                    fileName={doc.fileName}
                    status={doc.status}
                    hint={
                      doc.uploadedBy
                        ? `Uploaded by ${doc.uploadedBy} — visible to seller`
                        : 'Buyer upload required for seller confirmation'
                    }
                    disabled={false}
                    onUpload={(name) => uploadDoc(doc.id, name)}
                    onRemove={doc.status === 'uploaded' ? () => removeDoc(doc.id) : undefined}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {releaseDocs.length > 0 ? (
            <section className="cbos-escrow-panel">
              <header className="cbos-escrow-panel__head">
                <div>
                  <p className="cbos-transfers-list__eyebrow">Release</p>
                  <h2 className="cbos-transfers-list__title">Post-delivery documents</h2>
                </div>
              </header>
              <div className="cbos-escrow-docs">
                {releaseDocs.map((doc) => (
                  <CbosEscrowDocUpload
                    key={doc.id}
                    label={doc.label}
                    fileName={doc.fileName}
                    status={doc.status}
                    hint="Unlocked after delivery"
                    disabled={escrow.status !== 'in_progress' && escrow.status !== 'under_review'}
                    onUpload={(name) => uploadDoc(doc.id, name)}
                    onRemove={doc.status === 'uploaded' ? () => removeDoc(doc.id) : undefined}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </div>
  )
}
