type Props = { children: string; className?: string }

/** Jeton split-text: each character in its own inline box */
export function JetonText({ children, className = '' }: Props) {
  return (
    <span className={`jeton-split ${className}`.trim()} aria-hidden="false">
      {children.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="jeton-char jeton-char--space">
            &nbsp;
          </span>
        ) : (
          <span key={i} className="jeton-char">
            <span className="jeton-char-inner">{char}</span>
          </span>
        ),
      )}
    </span>
  )
}

export function JetonLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="jeton-line">
          <JetonText>{line}</JetonText>
        </span>
      ))}
    </>
  )
}
