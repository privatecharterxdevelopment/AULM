import type { CSSProperties } from 'react'

/** Scroll-driven frame: small rounded viewport → edge-to-edge fullscreen */
export function getFrameStyle(expand: number): CSSProperties {
  const full = expand >= 0.985
  const w = 72 + expand * 28
  const h = 68 + expand * 32
  const radius = 24 * (1 - expand)
  const shadow = 1 - expand

  return {
    width: full ? '100%' : `${w}vw`,
    height: full ? '100%' : `${h}dvh`,
    borderRadius: `${radius}px`,
    boxShadow:
      shadow > 0.04
        ? `0 24px 80px rgba(0, 0, 0, ${0.18 * shadow}), 0 0 0 1px rgba(255, 255, 255, ${0.12 * shadow}) inset`
        : 'none',
  }
}

export function getPinPadding(expand: number): CSSProperties {
  const t = 1 - expand
  return {
    paddingTop: `calc(var(--header-safe) * ${t})`,
    paddingRight: `${1.25 * t}rem`,
    paddingBottom: `${6 * t}rem`,
    paddingLeft: `${1.25 * t}rem`,
  }
}

/** Extra breathing room below the floating header on the company hero. */
export function getCompanyPinPadding(expand: number): CSSProperties {
  const t = 1 - expand
  return {
    paddingTop: t > 0.01 ? `calc((var(--header-safe) + var(--company-video-gap)) * ${t})` : '0',
    paddingRight: `${1.25 * t}rem`,
    paddingBottom: `${6 * t}rem`,
    paddingLeft: `${1.25 * t}rem`,
  }
}
