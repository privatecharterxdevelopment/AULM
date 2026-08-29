import { BtnArrow } from './BtnArrow'
import { SELL_REQUIREMENTS_FILENAME, SELL_REQUIREMENTS_PDF } from '../config/site'
import { useT } from '../i18n'

export function ProcedurePdfDownload() {
  const { t } = useT()

  return (
    <a
      href={SELL_REQUIREMENTS_PDF}
      target="_blank"
      rel="noopener noreferrer"
      download={SELL_REQUIREMENTS_FILENAME}
      className="procedure-pdf-download"
    >
      <span className="procedure-pdf-download-label">
        <span className="procedure-pdf-download-title">{t.procedurePage.pdfTitle}</span>
        <span className="procedure-pdf-download-meta">{t.procedurePage.pdfMeta}</span>
      </span>
      <span className="procedure-pdf-download-action">
        {t.procedurePage.download}
        <BtnArrow />
      </span>
    </a>
  )
}
