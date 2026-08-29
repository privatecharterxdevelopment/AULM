import { BtnArrow } from './BtnArrow'
import { SELL_REQUIREMENTS_FILENAME, SELL_REQUIREMENTS_PDF } from '../config/site'

export function ProcedurePdfDownload() {
  return (
    <a
      href={SELL_REQUIREMENTS_PDF}
      target="_blank"
      rel="noopener noreferrer"
      download={SELL_REQUIREMENTS_FILENAME}
      className="procedure-pdf-download"
    >
      <span className="procedure-pdf-download-label">
        <span className="procedure-pdf-download-title">AULM Gold Buying Procedures</span>
        <span className="procedure-pdf-download-meta">PDF · English · 2026</span>
      </span>
      <span className="procedure-pdf-download-action">
        Download
        <BtnArrow />
      </span>
    </a>
  )
}
