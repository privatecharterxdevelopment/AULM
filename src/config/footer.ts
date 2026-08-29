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
      { label: 'Contact us', href: '/contact' },
      { label: 'Procedure', href: '/company/procedure' },
      { label: 'News', href: '/news' },
      { label: 'Documents', href: '/pdf' },
      { label: 'Investors', href: '/investors' },
      { label: 'Responsible sourcing', href: '/responsible-sourcing' },
      { label: 'Supply chain', href: '/gold-supply-chain-dubai' },
    ],
  },
  {
    title: 'Geography',
    links: [
      { label: 'Africa', href: '/africa#africa' },
      { label: 'Europe', href: '/africa#europe' },
      { label: 'South America', href: '/africa#south-america' },
    ],
  },
  {
    title: 'Trade',
    links: [
      { label: 'Gold', href: '/gold' },
      { label: 'Silver', href: '/silver' },
      { label: 'Copper', href: '/copper' },
      { label: 'Refinery', href: '/refinery' },
    ],
  },
]
