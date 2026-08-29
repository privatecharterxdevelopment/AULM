export type UboType = 'private' | 'corporate'

export type UboEntry = {
  type: UboType
  name: string
  dob: string
  nationality: string
  address: string
  ownership: string
  occupation: string
  employment: string
  sourceOfWealth: string
}

export type SignatureMode = 'draw' | 'upload'

export type AccountUseCase =
  | 'custody'
  | 'sell_direct'
  | 'buy_commodities'
  | 'trading'
  | 'payments'
  | 'logistics'
  | 'other'

export type CounterpartyRole = 'seller' | 'buyer' | 'both' | 'agent'

export const ACCOUNT_USE_OPTIONS: { id: AccountUseCase; label: string }[] = [
  { id: 'custody', label: 'Custody & storage' },
  { id: 'sell_direct', label: 'Sell direct to AULM at best market rates' },
  { id: 'buy_commodities', label: 'Buy commodities from AULM' },
  { id: 'trading', label: 'Trading & hedging' },
  { id: 'payments', label: 'Payments & settlements' },
  { id: 'logistics', label: 'Logistics via AULM' },
  { id: 'other', label: 'Other (specify below)' },
]

export const COUNTERPARTY_ROLE_OPTIONS: { value: CounterpartyRole; label: string }[] = [
  {
    value: 'seller',
    label: 'Seller — we sell commodities to AULM or its clients',
  },
  {
    value: 'agent',
    label:
      'Agent — export licence and minerals dealers licence held in representation of the owner. The agent is the seller of record.',
  },
  {
    value: 'buyer',
    label: 'Buyer — we purchase commodities from AULM',
  },
  {
    value: 'both',
    label: 'Both — we buy and sell through AULM (including as agent where licensed)',
  },
]

export type KycDocMeta = {
  name: string
  size: number
}

export type KycDocKey =
  | 'incorporation'
  | 'exportPermit'
  | 'mineralDealers'
  | 'taxCertificate'
  | 'onboardingPack'

export const KYC_DOC_SLOTS: { key: KycDocKey; title: string; hint: string }[] = [
  {
    key: 'incorporation',
    title: 'Incorporation certificate',
    hint: 'Certificate of incorporation or trade licence — PDF',
  },
  {
    key: 'exportPermit',
    title: 'Export permit',
    hint: 'Valid export permit for the metal — PDF',
  },
  {
    key: 'mineralDealers',
    title: 'Mineral dealers licence',
    hint: 'Minerals dealers / trading licence — PDF',
  },
  {
    key: 'taxCertificate',
    title: 'Tax certificate',
    hint: 'Tax clearance or registration certificate — PDF',
  },
]

export type UboIdentity = {
  passportFront: KycDocMeta | null
  passportBack: KycDocMeta | null
  face: KycDocMeta | null
}

export const EMPTY_UBO_IDENTITY: UboIdentity = {
  passportFront: null,
  passportBack: null,
  face: null,
}

export const EMPTY_KYC_DOCUMENTS: Record<KycDocKey, KycDocMeta | null> = {
  incorporation: null,
  exportPermit: null,
  mineralDealers: null,
  taxCertificate: null,
  onboardingPack: null,
}

export type KycFormState = {
  policyAccepted: boolean
  policyScrolled: boolean
  signatureMode: SignatureMode
  signatureDataUrl: string | null
  signatureFileName: string | null
  policyPdfName: string | null
  packDownloaded: boolean

  companyLegalName: string
  tradeName: string
  registrationNumber: string
  incorporationCountry: string
  registeredAddress: string
  contactName: string
  contactEmail: string
  contactDial: string
  contactPhoneNational: string
  contactPhone: string
  password: string
  passwordConfirm: string

  accountUseCases: AccountUseCase[]
  accountUseOther: string
  expectedTurnover: string
  counterpartyRole: CounterpartyRole | ''
  bankAccountHolder: string
  bankName: string
  bankIban: string
  bankSwift: string
  bankCountry: string
  aucbOpenAccount: boolean | null

  ubos: UboEntry[]
  uboIdentities: UboIdentity[]

  businessDescription: string
  geoMarkets: string
  companySourceOfFunds: string
  annualRevenue: string
  annualTaxPaid: string
  auditorName: string
  auditorFirm: string

  amlProcedures: string
  complianceOfficerName: string
  complianceOfficerEmail: string

  authorisedName: string
  authorisedTitle: string
  authorisedDate: string

  kycDocuments: Record<KycDocKey, KycDocMeta | null>
}

export const EMPTY_UBO: UboEntry = {
  type: 'private',
  name: '',
  dob: '',
  nationality: '',
  address: '',
  ownership: '',
  occupation: '',
  employment: '',
  sourceOfWealth: '',
}

export const EMPTY_KYC_FORM: KycFormState = {
  policyAccepted: false,
  policyScrolled: false,
  signatureMode: 'draw',
  signatureDataUrl: null,
  signatureFileName: null,
  policyPdfName: null,
  packDownloaded: false,

  companyLegalName: '',
  tradeName: '',
  registrationNumber: '',
  incorporationCountry: '',
  registeredAddress: '',
  contactName: '',
  contactEmail: '',
  contactDial: '+971',
  contactPhoneNational: '',
  contactPhone: '',
  password: '',
  passwordConfirm: '',

  accountUseCases: [],
  accountUseOther: '',
  expectedTurnover: '',
  counterpartyRole: '',
  bankAccountHolder: '',
  bankName: '',
  bankIban: '',
  bankSwift: '',
  bankCountry: '',
  aucbOpenAccount: false,

  ubos: [{ ...EMPTY_UBO }],
  uboIdentities: [{ ...EMPTY_UBO_IDENTITY }],

  businessDescription: '',
  geoMarkets: '',
  companySourceOfFunds: '',
  annualRevenue: '',
  annualTaxPaid: '',
  auditorName: '',
  auditorFirm: '',

  amlProcedures: '',
  complianceOfficerName: '',
  complianceOfficerEmail: '',

  authorisedName: '',
  authorisedTitle: '',
  authorisedDate: '',

  kycDocuments: { ...EMPTY_KYC_DOCUMENTS },
}
