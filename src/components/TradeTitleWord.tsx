import { useEffect, useState } from 'react'
import { useT } from '../i18n'

export function TradeTitleWord() {
  const { t } = useT()
  const words = t.home.trade.words
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, 320)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [words.length])

  return (
    <span className={`trade-title-word${visible ? ' is-visible' : ''}`} aria-live="polite">
      {words[index]}
    </span>
  )
}
