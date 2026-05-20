import { Link } from 'react-router-dom'

export default function ProcessStepsGrid({ steps, lead }) {
  return (
    <>
      {lead && <p className="process-steps-lead">{lead}</p>}
      <div className="process-steps-grid process-steps-grid--landing">
        {steps.map((step, index) => (
          <article key={step.id} className="process-step-card">
            {step.image && (
              <div
                className="process-step-card__visual"
                style={{ backgroundImage: `url("${step.image}")` }}
                role="img"
                aria-hidden="true"
              />
            )}
            <span className="process-step-card__num">{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {step.to && (
              <Link to={step.to} className="process-step-card__link">
                Learn more →
              </Link>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
