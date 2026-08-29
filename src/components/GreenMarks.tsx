function EuMark() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180
    const x = 50 + 30 * Math.cos(a)
    const y = 50 + 30 * Math.sin(a)
    return (
      <polygon
        key={i}
        fill="#FFCC00"
        points="0,-5.2 1.5,-1.6 5.2,-1.6 2.2,0.7 3.4,4.4 0,2.4 -3.4,4.4 -2.2,0.7 -5.2,-1.6 -1.5,-1.6"
        transform={`translate(${x} ${y})`}
      />
    )
  })

  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="48" fill="#003399" />
      {stars}
    </svg>
  )
}

function AfricaMark() {
  return (
    <svg viewBox="0 0 160 200" aria-hidden>
      <path
        fill="currentColor"
        d="M86 6c12 3 20 18 24 32 16 4 32 16 30 36 18 12 22 40 8 56 10 14 2 36-14 44 4 18-8 38-28 44-10 18-40 16-50-2-18 4-36-10-38-28-16-8-24-28-14-44-18-14-12-42 6-54C8 72 20 40 42 28 50 12 70 2 86 6Zm52 118c6 2 14 12 10 20-6 6-16 4-20-2 2-8 4-16 10-18Z"
      />
    </svg>
  )
}

function OecdMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="DM Sans, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        OECD
      </text>
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="DM Sans, sans-serif"
        fontSize="7.5"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        GUIDANCE
      </text>
    </svg>
  )
}

function ParisMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        d="M22 58c8-16 18-28 28-28s20 12 28 28"
      />
      <circle cx="50" cy="30" r="4" fill="currentColor" />
      <text
        x="50"
        y="76"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="DM Sans, sans-serif"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.16em"
      >
        PARIS
      </text>
    </svg>
  )
}

function SolarMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="16" fill="currentColor" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180
        const x1 = 50 + Math.cos(a) * 24
        const y1 = 50 + Math.sin(a) * 24
        const x2 = 50 + Math.cos(a) * 42
        const y2 = 50 + Math.sin(a) * 42
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

const MARKS = [
  { id: 'eu', label: 'EU climate', Mark: EuMark },
  { id: 'africa', label: 'Africa', Mark: AfricaMark },
  { id: 'oecd', label: 'OECD', Mark: OecdMark },
  { id: 'paris', label: 'Paris', Mark: ParisMark },
  { id: 'solar', label: 'Solar PV', Mark: SolarMark },
] as const

export function GreenMarks() {
  return (
    <ul className="green-home-marks">
      {MARKS.map(({ id, label, Mark }) => (
        <li key={id}>
          <span className="green-home-mark">
            <Mark />
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  )
}
