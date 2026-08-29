export type InvestorQuarter = {
  id: string
  period: string
  value: string
  status: string
  pending?: boolean
}

export const INVESTORS = {
  title: 'Investors',
  lead: 'AULM is an IFZA-licensed precious metals desk in Dubai. If you want to invest in the company, write to the desk — we will take it from there.',
  intro: [
    'Turnover in 2026 is quoted quarter by quarter. Q1 and Q2 are closed. Q3 is still awaiting official quotation.',
    'This is equity in AULM itself, not a metals lot. KYC/KYB follows if we take the conversation forward. Bank-to-bank. No public offering.',
  ],
  resultsLabel: '2026 turnover',
  currencyNote: 'USD',
  quarters: [
    {
      id: 'q1',
      period: 'Q1 2026',
      value: '$18.24m',
      status: 'Closed',
    },
    {
      id: 'q2',
      period: 'Q2 2026',
      value: '$21.7m',
      status: 'Closed',
    },
    {
      id: 'q3',
      period: 'Q3 2026',
      value: '—',
      status: 'Awaiting quotation',
      pending: true,
    },
  ] satisfies InvestorQuarter[],
  steps: [
    { n: '01', title: 'Write', body: 'Tell the desk who you are and the ticket you have in mind.' },
    { n: '02', title: 'KYC', body: 'Same onboarding as any counterpart — KYC, KYB, e-meeting.' },
    { n: '03', title: 'Mandate', body: 'If accepted, we close bank-to-bank. No public subscription.' },
  ],
  disclaimer:
    'Figures are management-quoted turnover in USD. Not a prospectus. Participation is limited to qualified counterparties after KYC/KYB and desk acceptance.',
} as const
