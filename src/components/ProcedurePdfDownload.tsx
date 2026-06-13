import { BtnArrow } from './BtnArrow'

const PDF_HREF = '/procedure/aulm-gold-buying-procedures-en-2026.pdf'
const PDF_FILENAME = 'AULM_Gold_Buying_Procedures_EN_2026.pdf'

export function ProcedurePdfDownload() {
  return (
    <a
      href={PDF_HREF}
      download={PDF_FILENAME}
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
