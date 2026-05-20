import FeatureGrid from './FeatureGrid'

/** Alias — same visual grid as FeatureGrid with images. */
export default function ProcessStepsGrid({ steps, lead }) {
  return <FeatureGrid items={steps} lead={lead} columns={2} />
}
