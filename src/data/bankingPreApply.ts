export type BankingPreApplyValues = {
  fullName: string
  email: string
  company: string
  phone: string
  jurisdiction: string
  expectedVolume: string
  message: string
}

export const BANKING_PRE_APPLY_EMPTY: BankingPreApplyValues = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  jurisdiction: '',
  expectedVolume: '',
  message: '',
}
