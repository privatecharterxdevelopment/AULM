import { useEffect, useState } from 'react'

const WORDS = ['today', 'tomorrow', 'whenever']

export function TradeTitleWord() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length)
        setVisible(true)
      }, 320)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`trade-title-word${visible ? ' is-visible' : ''}`} aria-live="polite">
      {WORDS[index]}
    </span>
  )
}
