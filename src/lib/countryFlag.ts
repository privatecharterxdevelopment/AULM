/** ISO 3166-1 alpha-2 → flag emoji */
export function countryFlagEmoji(code: string): string {
  const c = code.toUpperCase()
  if (c.length !== 2) return ''
  return [...c].map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join('')
}
