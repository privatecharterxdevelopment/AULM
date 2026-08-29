import { DIAL_CODES, softPhoneStatus } from '../../data/dialCodes'
import { useT } from '../../i18n'

type Props = {
  id: string
  dial: string
  national: string
  onDial: (dial: string) => void
  onNational: (national: string) => void
}

export function PhoneField({ id, dial, national, onDial, onNational }: Props) {
  const { t } = useT()
  const status = softPhoneStatus(national)
  const hint =
    status === 'empty'
      ? t.kyc.phone.empty
      : status === 'short'
        ? t.kyc.phone.short
        : status === 'long'
          ? t.kyc.phone.long
          : t.kyc.phone.ok

  return (
    <div className="kyc-phone">
      <div className="kyc-phone-row">
        <select
          id={`${id}-dial`}
          className="kyc-phone-dial"
          aria-label={t.kyc.phone.countryCode}
          value={dial}
          onChange={(e) => onDial(e.target.value)}
        >
          {DIAL_CODES.map((item) => (
            <option key={`${item.iso}-${item.dial}`} value={item.dial}>
              {item.iso} {item.dial}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={national}
          onChange={(e) => onNational(e.target.value)}
          placeholder="50 123 4567"
          required
        />
      </div>
      <p className={`kyc-phone-hint${status === 'ok' ? ' is-ok' : status === 'empty' ? '' : ' is-warn'}`}>
        {hint}
      </p>
    </div>
  )
}
