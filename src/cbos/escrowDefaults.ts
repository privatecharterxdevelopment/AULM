export const DEFAULT_ADMIN_TERMS = `AULM CommodityBank escrow framework — institutional mandate

1. Funds are held by licensed escrow partners; AULM provides software, workflow and compliance routing only.
2. Buyer must fund the full transaction value before shipment is authorised.
3. Seller must upload all pre-shipment documents and confirm the committed delivery date.
4. The nominated clearing agent handles the commodity, issues an arrival certificate to the buyer, and the buyer uploads it so the seller can verify delivery.
5. Release occurs only after buyer-uploaded arrival certificate, customs clearance and final assay approval.
6. All participants accept KYC/KYB, sanctions screening and jurisdiction-specific commodity controls.
7. Disputes are escalated to appointed counsel; platform access may be suspended pending resolution.`

export const SELLER_DOC_LABELS = [
  'Export licence',
  'Pre-assay report',
  'Certificate of origin',
  'Commercial invoice',
  'Packing list',
  'Insurance certificate',
] as const

export const CLEARING_AGENTS = [
  'Brinks',
  'TransGuard',
  'Ferrari Group',
  'Loomis',
  'ALCA',
] as const

export const CLEARING_CERTIFICATE_LABEL = 'Clearing & arrival certificate (agent → buyer)'

export const BUYER_ARRIVAL_CERT_LABEL = 'Arrival certificate (buyer upload for seller)'

export const RELEASE_DOC_LABELS = [
  'Import / customs declaration',
  'Final assay report (agreed refinery)',
] as const

export const ESCROW_CREATE_PHASES = [
  {
    id: 'open',
    label: 'Open escrow',
    subs: ['Deal', 'Terms', 'Framework'],
  },
  {
    id: 'invite',
    label: 'Invite parties',
    subs: ['Participants'],
  },
  {
    id: 'documents',
    label: 'Documents',
    subs: ['Seller docs'],
  },
  {
    id: 'clearing',
    label: 'Clearing',
    subs: ['Clearing agent', 'Arrival certificate'],
  },
  {
    id: 'release',
    label: 'Release',
    subs: ['Conditions'],
  },
] as const

export const ESCROW_PARTICIPANT_ROLES = [
  'Buyer',
  'Seller',
  'Clearing agent',
  'Inspector',
  'Assayer',
  'Compliance',
] as const

export function escrowFlatStepCount(): number {
  return ESCROW_CREATE_PHASES.reduce((sum, p) => sum + p.subs.length, 0)
}

export function escrowStepMeta(flatStep: number): {
  phaseIdx: number
  subIdx: number
  phase: (typeof ESCROW_CREATE_PHASES)[number]
  subLabel: string
} {
  let acc = 0
  for (let i = 0; i < ESCROW_CREATE_PHASES.length; i++) {
    const phase = ESCROW_CREATE_PHASES[i]
    const len = phase.subs.length
    if (flatStep < acc + len) {
      const subIdx = flatStep - acc
      return { phaseIdx: i, subIdx, phase, subLabel: phase.subs[subIdx] }
    }
    acc += len
  }
  const last = ESCROW_CREATE_PHASES[ESCROW_CREATE_PHASES.length - 1]
  return {
    phaseIdx: ESCROW_CREATE_PHASES.length - 1,
    subIdx: last.subs.length - 1,
    phase: last,
    subLabel: last.subs[last.subs.length - 1],
  }
}
