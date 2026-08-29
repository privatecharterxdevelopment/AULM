import {
  GOLD_SLOTS_2026,
  INSTITUTIONAL_BROCHURE_FILENAME,
  INSTITUTIONAL_BROCHURE_PDF,
  SELL_REQUIREMENTS_FILENAME,
  SELL_REQUIREMENTS_PDF,
  SILVER_REQUIREMENTS_FILENAME,
  SILVER_REQUIREMENTS_PDF,
} from '../config/site'
import type { ContactTopic } from './contact'

export type DeskFormKind = 'sell-gold' | 'sell-silver' | 'investors' | 'reserve-gold'

export type DeskFileRow = {
  id: string
  kicker: string
  title: string
  note?: string
  pdf?: { href: string; filename: string }
  action?: { kind: DeskFormKind; label: string }
}

export const DESK_FILE_ROWS: DeskFileRow[] = [
  {
    id: 'sell-gold',
    kicker: 'Sell',
    title: 'Sell gold to us (institutional)',
    pdf: { href: SELL_REQUIREMENTS_PDF, filename: SELL_REQUIREMENTS_FILENAME },
    action: { kind: 'sell-gold', label: 'Inquiry' },
  },
  {
    id: 'sell-silver',
    kicker: 'Sell',
    title: 'Sell silver to us',
    pdf: { href: SILVER_REQUIREMENTS_PDF, filename: SILVER_REQUIREMENTS_FILENAME },
    action: { kind: 'sell-silver', label: 'Inquiry' },
  },
  {
    id: 'brochure',
    kicker: 'Company',
    title: 'Download our brochure',
    note: '2026 institutional overview — eight pages.',
    pdf: { href: INSTITUTIONAL_BROCHURE_PDF, filename: INSTITUTIONAL_BROCHURE_FILENAME },
  },
  {
    id: 'investors',
    kicker: 'Investors',
    title: 'Investor relations',
    note: 'Get in touch with us.',
    action: { kind: 'investors', label: 'Get in touch' },
  },
  {
    id: 'buy-gold',
    kicker: 'Buy',
    title: 'Buy gold',
    note: `${GOLD_SLOTS_2026} slots remaining in 2026. Reserve with the desk.`,
    action: { kind: 'reserve-gold', label: 'Reserve' },
  },
]

export const DESK_FORM_COPY: Record<
  DeskFormKind,
  {
    title: string
    lead: string
    topic: ContactTopic
    headline: string
    placeholder: string
    askAccount?: boolean
    notice?: string[]
  }
> = {
  'sell-gold': {
    title: 'Sell gold',
    lead: 'Institutional offtake. Read the procedures PDF, then write to the desk.',
    topic: 'trading',
    headline: 'Sell gold — institutional inquiry',
    placeholder: 'Origin, form (doré / dust / nuggets / bars), approximate weight, current documents.',
    askAccount: true,
  },
  'sell-silver': {
    title: 'Sell silver',
    lead: 'Same desk as gold. Procedures PDF first, then the mandate.',
    topic: 'trading',
    headline: 'Sell silver — institutional inquiry',
    placeholder: 'Form, quantity, origin, delivery city.',
    askAccount: true,
  },
  investors: {
    title: 'Investor relations',
    lead: 'Equity in AULM itself — not a metals lot. Tell us who you are.',
    topic: 'investment',
    headline: 'Investor relations',
    placeholder: 'Who you are, indicative ticket, and timeline.',
  },
  'reserve-gold': {
    title: 'Gold reservation',
    lead: `${GOLD_SLOTS_2026} purchase slots remain in 2026. This is a reservation with the desk — not a quote.`,
    topic: 'reservation',
    headline: 'Gold reservation 2026',
    placeholder: 'Quantity in mind, preferred window in 2026, delivery or custody city.',
    notice: [
      'We do not accept bank guarantees, SBLCs, letters of credit, proof-of-funds theatre, or third-party financiers.',
      'Settlement is SWIFT MT103 after assay — bank-to-bank between approved accounts only.',
    ],
  },
}
