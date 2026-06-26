import { POLICY_SECTIONS, RESPONSIBLE_SOURCING_INTRO } from './responsibleSourcing'
import { COMPLIANCE_EMAIL, GOAML_REGISTRATION_CODE, GOAML_PORTAL_URL } from '../config/site'

export type DocumentCategory = 'shipping-instructions' | 'compliance'

export type DocumentSection = {
  title?: string
  paragraphs?: string[]
  bullets?: string[]
}

export type SiteDocument = {
  slug: string
  category: DocumentCategory
  title: string
  summary: string
  sections: DocumentSection[]
  relatedSlugs?: string[]
}

export const DOCUMENT_CATEGORIES: Record<
  DocumentCategory,
  { label: string; description: string }
> = {
  'shipping-instructions': {
    label: 'Shipping instructions',
    description:
      'Dubai intake, hand-carry, commercial cargo, doré purchase, sample shipments and regional consultancy procedures.',
  },
  compliance: {
    label: 'Compliance',
    description:
      'Conflict-free gold, supply-chain due diligence, AML and institutional counterparty standards.',
  },
}

const INVOICE_BULLETS = [
  'Description of contents (doré, bullion, dust, nuggets, diamonds, etc.)',
  'Net weight of contents',
  'Gross weight of shipment',
  'Value of contents',
  'Description of container(s)',
  'Consignor and consignee (full legal names and addresses)',
]

export const SITE_DOCUMENTS: SiteDocument[] = [
  {
    slug: 'shipping-instructions',
    category: 'shipping-instructions',
    title: 'Shipping instructions',
    summary: 'Overview of all shipment, hand-carry and intake procedures for Dubai.',
    sections: [
      {
        paragraphs: [
          'All material forwarded to AULM in Dubai — whether commercial cargo, hand-carry or sample lots — must follow the procedures in this library. Non-compliance may result in customs rejection, delayed clearance or refusal of intake.',
          'First-time clients must complete onboarding and account opening before shipping. Notify compliance at least 48 hours before any arrival with commercial invoice, certificate of origin and airway bill or courier details.',
        ],
      },
      {
        title: 'Key requirements',
        bullets: [
          'Declare all precious-metal cargo as VALUE CARGO to airline and freight agent',
          'Email required documents to compliance before departure',
          'Use TransGuard, Brinks or G4S for airport-to-refinery transfer when nominated by AULM',
          'Carry UN conflict-free self-declaration for gold hand-carry',
          'Contact compliance for corridor-specific Africa or South America consultancy',
        ],
      },
    ],
    relatedSlugs: ['dubai', 'shipping-procedures-and-instructions', 'gold-hand-carry-procedures'],
  },
  {
    slug: 'dubai',
    category: 'shipping-instructions',
    title: 'Dubai',
    summary: 'Dubai IFZA intake hub — customs, secure logistics and refinery handover.',
    sections: [
      {
        paragraphs: [
          'AULM operates from Dubai IFZA (License No. 85927). All inbound precious metals and diamonds are cleared through Dubai or Abu Dhabi customs and transferred under insured mandate to our nominated refinery or custody partner.',
        ],
      },
      {
        title: 'Upon arrival at airport free zone',
        bullets: [
          'Dubai Customs notifies AULM and nominated secure carrier of shipment arrival',
          'Paperwork processed for transfer to TransGuard, Brinks or G4S',
          'Delays at this stage usually result from incorrect airway bill consignee or missing documents',
        ],
      },
      {
        title: 'Upon arrival at refinery',
        bullets: [
          'Material opened and weighed in presence of AULM representative — video recorded',
          'Melted, sampled and poured into impure doré bars for settlement',
          'Client may retain one sample; AULM retains assay and umpire samples',
          'Fire assay per LBMA/ASTM standards within one working day',
          'Settlement within 48 hours of accepted final assay',
        ],
      },
    ],
    relatedSlugs: ['shipping-procedures-and-instructions', 'dore-buying-procedures'],
  },
  {
    slug: 'diamonds-hand-carry-procedures',
    category: 'shipping-instructions',
    title: 'Diamonds hand carry procedures',
    summary: 'Airport declaration and documentation for rough diamonds carried into Dubai.',
    sections: [
      {
        paragraphs: [
          'Rough diamonds entering the UAE must be declared to customs on arrival. Failure to declare is an offence. AULM does not assist passengers inside the airport secure area — all declarations must be completed with customs officials directly.',
        ],
      },
      {
        title: 'Before travel',
        bullets: [
          'Contact AULM compliance at least 24 hours before departure with passport copy, visa and flight details',
          'Prepare commercial invoice and certificate of origin in English',
          'Confirm Kimberley Process certificate where applicable',
          'Non-English documents may require a refundable AED 1,000 customs deposit',
        ],
      },
      {
        title: 'At Dubai airport',
        bullets: [
          'Proceed to “Something to declare” and identify the shipment to officials',
          'Present certificate of origin, commercial invoice and KP documentation',
          'Retain boarding pass until customs clearance is complete',
          'Commercial invoice may be issued to the passenger — not to AULM — for hand-carry',
        ],
      },
    ],
    relatedSlugs: ['diamond-hand-carry-procedures', 'sample-shipping-documents'],
  },
  {
    slug: 'diamond-hand-carry-procedures',
    category: 'shipping-instructions',
    title: 'Diamond hand carry procedures',
    summary: 'Same corridor as diamonds hand carry — declaration, KP and customs steps for Dubai entry.',
    sections: [
      {
        paragraphs: [
          'This procedure mirrors our diamonds hand-carry instructions for single-passenger import of rough diamonds into Dubai for onward sale or custody with AULM.',
          'All lots are subject to supply-chain due diligence and Kimberley Process compliance before purchase or storage.',
        ],
      },
      {
        title: 'Required documents',
        bullets: [
          'Commercial invoice (English) with carat weight, description and value',
          'Certificate of origin',
          'Kimberley Process certificate for applicable rough diamond shipments',
          'Passenger passport and visa copies sent to AULM in advance',
        ],
      },
      {
        title: 'Customs',
        bullets: [
          'Declare at “Something to declare” — do not exit without clearance',
          'AULM staff meet passengers at terminal exit only after customs release',
          'VAT implications may apply if goods are not consigned to a UAE VAT-registered entity',
        ],
      },
    ],
    relatedSlugs: ['diamonds-hand-carry-procedures'],
  },
  {
    slug: 'gold-hand-carry-procedures',
    category: 'shipping-instructions',
    title: 'Gold hand carry procedures',
    summary: 'Declaration, VAT and documentation for impure gold carried into Dubai (DXB).',
    sections: [
      {
        paragraphs: [
          'When entering Dubai with impure gold for refining it must be declared to customs. There is no import duty on refining intake, but VAT may apply if goods are not consigned to a UAE VAT-registered company. Entering without declaration is an offence.',
        ],
      },
      {
        title: 'Recommended: meet & greet',
        paragraphs: [
          'If you contact AULM with passport, visa and ticket at least 24 hours before departure, we can arrange meet-and-greet through Marhaba Services to escort you to immigration. AULM staff wait at terminal exit after customs clearance.',
        ],
      },
      {
        title: 'Standard entry steps',
        bullets: [
          'Disembark with goods in hand and proceed through passport control',
          'Use “Something to declare” and identify shipment to officials',
          'Produce certificate of origin and commercial invoice with consignee VAT TRN where applicable',
          'Doré or bar form: inspection then exit after clearance',
          'Dust or nuggets: directed to Terminal Value Customs — sample assay may be required (AED 50 processing fee)',
          'Retain boarding pass for detained-gold collection if applicable',
        ],
      },
      {
        title: 'Commercial invoice (hand carry)',
        bullets: INVOICE_BULLETS,
      },
      {
        title: 'Note',
        paragraphs: [
          'AULM cannot assist inside the airport secure area. When advised in advance, we arrange VAT offset and TransGuard collection after customs release.',
        ],
      },
    ],
    relatedSlugs: ['gold-un-conflict-free-self-declaration-draft', 'dubai'],
  },
  {
    slug: 'dore-buying-procedures',
    category: 'shipping-instructions',
    title: 'Doré buying procedures',
    summary: 'Account opening, pre-shipment requirements and settlement for doré purchases.',
    sections: [
      {
        paragraphs: [
          'AULM purchases doré and impure gold with settlement after final assay at our refinery laboratory. Transactions are typically concluded within 48 hours of accepted assay.',
        ],
      },
      {
        title: 'Pre-shipment',
        bullets: [
          'Complete account opening and KYC onboarding before first shipment',
          'Notify AULM of impending shipment by email with document pack',
          'Declare cargo as VALUE CARGO to shipping agent and airline',
          'Import security fee applies where AULM acts as nominated importer',
        ],
      },
      {
        title: 'Settlement flow',
        bullets: [
          'Weigh and open material on video-recorded intake',
          'Melt, sample and pour impure doré bars',
          'Fire assay per LBMA/ASTM — results within one working day',
          'Client accepts or triggers umpire assay from retained sample',
          'Payment to client within 48 hours of final accepted assay',
        ],
      },
    ],
    relatedSlugs: ['dubai', 'shipping-procedures-and-instructions'],
  },
  {
    slug: 'shipping-procedures-and-instructions',
    category: 'shipping-instructions',
    title: 'Shipping procedures and instructions',
    summary: 'Commercial cargo air freight — documents, airway bill and pre-arrival steps.',
    sections: [
      {
        paragraphs: [
          'PLEASE NOTE: ALL GOODS MUST BE DECLARED “VALUE CARGO” TO THE SHIPPING AGENT AND AIRLINE OR AULM WILL REJECT THE SHIPMENT.',
          'Before the shipment arrives in Dubai the seller must notify AULM and supply required documents by email.',
        ],
      },
      {
        title: 'Air waybill — AULM as nominated importer',
        paragraphs: [
          'Goods cleared through TransGuard must state the exact consignee address provided by AULM compliance. If the address is not included exactly, customs clearance will be delayed or rejected.',
        ],
      },
      {
        title: 'Commercial invoice',
        bullets: [
          ...INVOICE_BULLETS,
          'Five copies must accompany the shipment',
        ],
      },
      {
        title: 'Certificate of origin',
        paragraphs: [
          'Must travel with the shipment and be emailed to AULM in advance of arrival.',
        ],
      },
    ],
    relatedSlugs: ['international-shipping-procedures', 'sample-shipping-documents'],
  },
  {
    slug: 'sample-shipping-documents',
    category: 'shipping-instructions',
    title: 'Sample shipping documents',
    summary: 'Document checklist for sample lots and trial shipments into Dubai.',
    sections: [
      {
        paragraphs: [
          'Sample shipments follow the same VALUE CARGO declaration rules as commercial lots. Reduced weights do not reduce documentation or due-diligence requirements.',
        ],
      },
      {
        title: 'Minimum document pack',
        bullets: [
          'Commercial invoice (3–5 copies)',
          'Certificate of origin',
          'Packing list',
          'Air waybill or courier waybill with correct consignee',
          'Assay report or mine-site certificate where available',
          'UN conflict-free self-declaration for gold samples',
          'OECD / KYC supplier declaration for CAHRA origin',
        ],
      },
      {
        title: 'Before dispatch',
        bullets: [
          'Email PDF copies to compliance before departure',
          'Confirm nominated secure carrier and refinery appointment',
          'Declare exact contents — no undeclared metals or stones',
        ],
      },
    ],
    relatedSlugs: ['gold-un-conflict-free-self-declaration-draft', 'shipping-procedures-and-instructions'],
  },
  {
    slug: 'gold-un-conflict-free-self-declaration-draft',
    category: 'shipping-instructions',
    title: 'Gold — UN conflict-free self-declaration (draft)',
    summary: 'Template wording for seller self-certification on company letterhead.',
    sections: [
      {
        paragraphs: [
          'The seller should provide the following self-certified UN declaration when entering Dubai with gold or shipping doré to AULM. Use company letterhead and authorised signatory.',
        ],
      },
      {
        title: 'Draft declaration',
        paragraphs: [
          '“The GOLD herein invoiced has been purchased from legitimate sources not involved in funding conflict and in compliance with United Nations resolutions. The seller hereby guarantees that this GOLD is conflict free, based on personal knowledge and/or written guarantees provided by the supplier.”',
          '“We hereby declare that the GOLD sold by us to you does not contain any conflict GOLD on which any embargo has been put, as per UN Security Council resolutions including Nos. 1173, 1176 and 1306.”',
        ],
      },
      {
        title: 'Supporting evidence',
        bullets: [
          'Supplier KYC and mine or refinery of origin',
          'Chain-of-custody documentation',
          'OECD Annex II risk assessment where CAHRA applies',
        ],
      },
    ],
    relatedSlugs: ['conflict-free-gold-standard', 'gold-hand-carry-procedures'],
  },
  {
    slug: 'international-shipping-procedures',
    category: 'shipping-instructions',
    title: 'International shipping procedures',
    summary: 'Global commercial cargo — pre-shipment, airway bill and airport free-zone clearance.',
    sections: [
      {
        paragraphs: [
          'International commercial cargo shipments of precious metals to Dubai IFZA follow insured logistics mandates with TransGuard, Brinks or G4S from airport free zone to refinery.',
        ],
      },
      {
        title: 'Pre-shipment requirements',
        bullets: [
          'Account opening completed for first-time clients',
          'Import security fee where AULM is nominated importer',
          'VALUE CARGO declaration mandatory',
          'Email document pack before departure',
        ],
      },
      {
        title: 'If AULM is not nominated importer',
        paragraphs: [
          'Air waybill consignee must read exactly: your nominated company name and address as instructed by AULM compliance. Commercial invoice and certificate of origin rules still apply.',
        ],
      },
      {
        title: 'On arrival',
        bullets: [
          'Customs notifies AULM and secure carrier',
          'Armoured transfer to refinery under video audit',
          'Intake, assay and settlement per doré buying procedures',
        ],
      },
    ],
    relatedSlugs: ['shipping-procedures-and-instructions', 'dubai'],
  },
  {
    slug: 'east-west-africa-consultancy-monetization',
    category: 'shipping-instructions',
    title: 'East & West Africa consultancy monetization',
    summary: 'In-country consultancy to structure tax, export payments and onward Dubai shipment.',
    sections: [
      {
        paragraphs: [
          'AULM offers consultancy to simplify and secure tax and shipping payments in African producing countries. The service supports legitimate export of doré and concentrates with full documentation for onward delivery to Dubai IFZA.',
        ],
      },
      {
        title: 'Service scope',
        bullets: [
          'Regional directors and field mandates with mining, trading and secure-export experience',
          'Local tax and royalty settlement guidance',
          'Export documentation and corridor compliance',
          'Coordination with nominated security and airline VALUE CARGO booking',
          'Tailored support for West, Central, East and North African origins',
        ],
      },
      {
        title: 'Engagement',
        paragraphs: [
          'Consultancy is B2B only. Contact compliance to review jurisdiction, product type and monetization structure before any in-country activity. Engagement terms and refundable deposits are agreed per corridor.',
        ],
      },
    ],
    relatedSlugs: ['south-america-consultancy', 'dore-buying-procedures'],
  },
  {
    slug: 'south-america-consultancy',
    category: 'shipping-instructions',
    title: 'South America consultancy',
    summary: 'Local monetization consultancy for small lots — Brazil, Colombia, Peru, Ecuador, Guyana.',
    sections: [
      {
        paragraphs: [
          'AULM offers consultancy to assist in monetizing small quantities of gold (up to 10 kg per tranche) locally in South America, facilitating payment of local taxes and export costs for larger consignments shipped to Dubai.',
        ],
      },
      {
        title: 'Product & limits',
        bullets: [
          'Gold in doré bar form unless otherwise agreed',
          'Up to 10 kg monetized per transaction on the ground',
          'Consultant inspects product and paperwork before any payment',
        ],
      },
      {
        title: 'Process overview',
        bullets: [
          'Engagement fee agreed and confirmed by bankers — refundable against subsequent Dubai deliveries when product is genuine and procedures followed',
          'AULM representative travels to nominated country',
          'Testing in secure premises with XRF analyser',
          'Purity agreed between seller and AULM team',
          'Payment in cash or wire at agreed rate',
          'Client may be accompanied by nominated security',
        ],
      },
    ],
    relatedSlugs: ['east-west-africa-consultancy-monetization'],
  },
  {
    slug: 'compliance',
    category: 'compliance',
    title: 'Compliance',
    summary: 'Institutional compliance framework — policies, screening and counterparty standards.',
    sections: [
      {
        paragraphs: [
          RESPONSIBLE_SOURCING_INTRO,
          `Questions: ${COMPLIANCE_EMAIL}. All new clients complete e-meeting, identity verification and policy acknowledgment before onboarding.`,
        ],
      },
      {
        title: 'UAE FIU goAML registration',
        paragraphs: [
          `AULM is registered on the UAE Financial Intelligence Unit goAML platform. Registration code: ${GOAML_REGISTRATION_CODE}. The entity maintains full AML/CFT compliance including suspicious activity reporting through ${GOAML_PORTAL_URL}.`,
        ],
      },
      {
        title: 'Policy library',
        bullets: [
          'Conflict-free gold standard',
          'Supply chain due diligence policy',
          'AML / CFT policy',
        ],
      },
    ],
    relatedSlugs: ['conflict-free-gold-standard', 'supply-chain-due-diligence-policy', 'aml-policy'],
  },
  {
    slug: 'conflict-free-gold-standard',
    category: 'compliance',
    title: 'Conflict-free gold standard',
    summary: 'UN-aligned conflict-free sourcing commitments for all gold intake.',
    sections: [
      {
        paragraphs: [RESPONSIBLE_SOURCING_INTRO],
      },
      {
        title: 'Commitments',
        paragraphs: POLICY_SECTIONS.find((s) => s.id === 'supply-chain')?.paragraphs ?? [],
        bullets: POLICY_SECTIONS.find((s) => s.id === 'supply-chain')?.bullets,
      },
      {
        title: 'Armed groups & human rights',
        paragraphs: POLICY_SECTIONS.find((s) => s.id === 'armed-groups')?.paragraphs ?? [],
      },
    ],
    relatedSlugs: ['gold-un-conflict-free-self-declaration-draft', 'supply-chain-due-diligence-policy'],
  },
  {
    slug: 'supply-chain-due-diligence-policy',
    category: 'compliance',
    title: 'Supply chain due diligence policy',
    summary: 'OECD-aligned due diligence for minerals from CAHRAs.',
    sections: POLICY_SECTIONS.filter((s) =>
      ['supply-chain', 'armed-groups', 'bribery-aml', 'grievance'].includes(s.id),
    ).map((s) => ({
      title: s.title,
      paragraphs: s.paragraphs,
      bullets: s.bullets,
    })),
    relatedSlugs: ['conflict-free-gold-standard', 'aml-policy'],
  },
  {
    slug: 'aml-policy',
    category: 'compliance',
    title: 'AML policy',
    summary: 'Anti-money laundering, CFT, sanctions screening and reporting.',
    sections: [
      {
        title: 'goAML registration',
        paragraphs: [
          `AULM Precious Metal Trader is registered on UAE FIU goAML (registration code ${GOAML_REGISTRATION_CODE}). All suspicious transactions and activities are reported through the official portal in line with UAE Federal AML legislation.`,
        ],
      },
      ...POLICY_SECTIONS.filter((s) =>
        ['tfs', 'aml-cft', 'bribery-aml', 'abc'].includes(s.id),
      ).map((s) => ({
        title: s.title,
        paragraphs: s.paragraphs,
        bullets: s.bullets,
      })),
    ],
    relatedSlugs: ['supply-chain-due-diligence-policy', 'compliance'],
  },
]

export function getDocument(slug: string): SiteDocument | undefined {
  return SITE_DOCUMENTS.find((d) => d.slug === slug)
}

export function getDocumentsByCategory(category: DocumentCategory): SiteDocument[] {
  return SITE_DOCUMENTS.filter((d) => d.category === category)
}
