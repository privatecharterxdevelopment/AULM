import { Link } from 'react-router-dom'

type Props = {
  href: string
  date: string
  kicker: string
  title: string
  external?: boolean
}

export function NewsPressItem({ href, date, kicker, title, external }: Props) {
  const body = (
    <>
      <time>{date}</time>
      <span className="news-press-copy">
        <span className="news-press-kicker">{kicker}</span>
        <span className="news-press-title">{title}</span>
      </span>
    </>
  )

  if (external) {
    return (
      <a
        className="news-press-item"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {body}
      </a>
    )
  }

  return (
    <Link className="news-press-item" to={href}>
      {body}
    </Link>
  )
}
