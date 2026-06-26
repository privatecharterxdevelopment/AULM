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

export type CounterpartyRole = 'seller' | 'buyer' | 'both'

export const ACCOUNT_USE_OPTIONS: { id: AccountUseCase; label: string }[] = [
  { id: 'custody', label: 'Custody & storage' },
  { id: 'sell_direct', label: 'Sell direct to AULM at best market rates' },
  { id: 'buy_commodities', label: 'Buy commodities from AULM' },
  { id: 'trading', label: 'Trading & hedging' },
  { id: 'payments', label: 'Payments & settlements' },
  { id: 'logistics', label: 'Logistics via AULM' },
  { id: 'other', label: 'Other (specify below)' },
]

export type KycFormState = {
  policyAccepted: boolean
  policyScrolled: boolean
  signatureMode: SignatureMode
  signatureDataUrl: string | null
  signatureFileName: string | null
  policyPdfName: string | null

  companyLegalName: string
  tradeName: string
  registrationNumber: string
  incorporationCountry: string
  registeredAddress: string
  contactName: string
  contactEmail: string
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

  businessDescription: string
  geoMarkets: string
  companySourceOfFunds: string
  annualRevenue: string
  annualTaxPaid: string
  auditorName: string
  auditorFirm: string

  aulmHandlesImport: boolean
  aulmHandlesExport: boolean

  amlProcedures: string
  complianceOfficerName: string
  complianceOfficerEmail: string

  authorisedName: string
  authorisedTitle: string
  authorisedDate: string

  uploadedDocuments: { name: string; size: number }[]
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

  companyLegalName: '',
  tradeName: '',
  registrationNumber: '',
  incorporationCountry: '',
  registeredAddress: '',
  contactName: '',
  contactEmail: '',
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
  aucbOpenAccount: null,

  ubos: [{ ...EMPTY_UBO }],

  businessDescription: '',
  geoMarkets: '',
  companySourceOfFunds: '',
  annualRevenue: '',
  annualTaxPaid: '',
  auditorName: '',
  auditorFirm: '',

  aulmHandlesImport: false,
  aulmHandlesExport: false,

  amlProcedures: '',
  complianceOfficerName: '',
  complianceOfficerEmail: '',

  authorisedName: '',
  authorisedTitle: '',
  authorisedDate: '',

  uploadedDocuments: [],
}
