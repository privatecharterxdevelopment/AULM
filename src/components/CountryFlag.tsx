import { countryFlagEmoji } from '../lib/countryFlag'

type Props = {
  code: string
  size?: 'sm' | 'md' | 'lg'
}

export function CountryFlag({ code, size = 'md' }: Props) {
  return (
    <span className={`country-flag country-flag--${size}`} aria-hidden>
      {countryFlagEmoji(code)}
    </span>
  )
}
