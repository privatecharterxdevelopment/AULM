export default function FaqAccordion({ title = 'FAQ', items }) {
  if (!items?.length) return null

  return (
    <div className="landing-faq">
      {title && <h2 className="landing-faq__heading">{title}</h2>}
      <div className="landing-faq__list">
        {items.map((item) => (
          <details key={item.id || item.question} className="landing-faq__item">
            <summary>{item.question}</summary>
            <div className="landing-faq__answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </div>
  )
}
