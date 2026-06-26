import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function IconHome(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  )
}

export function IconWallet(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M16 12h2M2 10h20" />
    </svg>
  )
}

export function IconEscrow(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconTransfer(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 7h11M7 7l3-3M7 7l3 3M17 17H6M17 17l-3-3M17 17l-3 3" />
    </svg>
  )
}

export function IconCard(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  )
}

export function IconCrypto(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  )
}

export function IconSavings(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v18M7 8c0-2 2-3 5-3s5 1 5 3-2 3-5 3-5-1-5-3Z" />
      <path d="M7 16c0 2 2 3 5 3s5-1 5-3" />
    </svg>
  )
}

export function IconDoc(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  )
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

export function IconSettings(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

export function IconChevron(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconBell(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export function IconKyc(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  )
}

export function IconBack(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

export function IconSend(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

export function IconReceive(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )
}

export function IconExchange(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 16V4M7 4 3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" />
    </svg>
  )
}

export function IconSupport(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.2 1.8c0 1.5-2.2 1.7-2.2 3.2M12 17h.01" />
    </svg>
  )
}

export function IconHeadset(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14a2 2 0 0 0 2 2h1v-5H5a1 1 0 0 0-1 1v2zM20 14a2 2 0 0 1-2 2h-1v-5h2a1 1 0 0 1 1 1v2z" />
    </svg>
  )
}

export function IconUsers(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 19v-1a3 3 0 0 0-2-2.87M16 4.13a3 3 0 0 1 0 5.74" />
    </svg>
  )
}

export function IconBuy(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function IconSell(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 3v6h6M21 21v-6h-6" />
      <path d="M21 9A9 9 0 0 0 8.5 4.5L3 10M21 15l-5.5 5.5A9 9 0 0 1 3 15" />
    </svg>
  )
}
