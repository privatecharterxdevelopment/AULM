export type FooterLink = {
  label: string
  href: string
  external?: boolean
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/company' },
      { label: 'Contact', href: '/contact' },
      { label: 'Procedure', href: '/company/procedure' },
    ],
  },
  {
    title: 'Trade',
    links: [
      { label: 'Gold', href: '/gold' },
      { label: 'Silver', href: '/silver' },
      { label: 'Copper', href: '/copper' },
      { label: 'Vault+', href: '/vault' },
      { label: 'Escrow', href: '/escrow' },
      { label: 'Banking', href: '/banking' },
      { label: 'Refinery', href: '/refinery' },
    ],
  },
  {
    title: 'Logistics',
    links: [
      { label: 'Import routing', href: '/logistics/import' },
      { label: 'Export routing', href: '/logistics/export' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Open account', href: '/onboarding' },
      { label: 'Login', href: '/login' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
]
