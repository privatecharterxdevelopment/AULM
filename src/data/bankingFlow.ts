export type BankingFlowVisual =
  | 'transaction'
  | 'invite'
  | 'escrow'
  | 'transact'
  | 'repeat'

export type BankingFlowSection = {
  id: string
  step: string
  title: string
  body: string
  visual: BankingFlowVisual
  panel?: 'none' | 'grey'
}

export const BANKING_FLOW_SECTIONS: BankingFlowSection[] = [
  {
    id: 'transaction',
    step: '01',
    title: 'Create business transaction',
    body: 'Open a mandate in-app — commodity, amount, corridor and settlement window. Your desk drafts once; compliance and counterparty fields follow your institutional template.',
    visual: 'transaction',
    panel: 'none',
  },
  {
    id: 'invite',
    step: '02',
    title: 'Invite counterparty',
    body: 'Send a secure invite link to seller or buyer. They verify KYB, accept terms and join the same transaction thread — no email chains or duplicate paperwork.',
    visual: 'invite',
    panel: 'grey',
  },
  {
    id: 'escrow',
    step: '03',
    title: 'Set up escrow account',
    body: 'Allocate funds or metal to a dedicated escrow wallet. Dual-control release rules, audit trail and partner-bank rails are configured before any money moves.',
    visual: 'escrow',
    panel: 'none',
  },
  {
    id: 'transact',
    step: '04',
    title: 'Transact with ease on completed terms',
    body: 'When milestones are met, release is authorised in seconds. Add an independent escrow agent from a network of 200+ verified agents for third-party oversight on high-value flows.',
    visual: 'transact',
    panel: 'grey',
  },
  {
    id: 'repeat',
    step: '05',
    title: 'Repeat whenever you want',
    body: 'Clone prior mandates, reuse counterparty profiles and run the same corridor again — scale repeat business without rebuilding settlement logic each time.',
    visual: 'repeat',
    panel: 'none',
  },
]

export const BANKING_PRE_APPLY_PATH = '/banking/pre-apply'
