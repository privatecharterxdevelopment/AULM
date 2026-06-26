import { CbosGlass } from '../CbosGlass'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

const DOCS = [
  { type: 'Purchase Agreement', required: true, status: 'approved' },
  { type: 'Assay Report', required: true, status: 'under_review' },
  { type: 'Weight Certificate', required: true, status: 'uploaded' },
  { type: 'Bill of Lading', required: true, status: 'draft' },
  { type: 'Company Registration', required: false, status: 'approved' },
]

export function CbosDocuments() {
  return (
    <CbosPage>
      <CbosPageHeader
        label="Document engine"
        title="Documents"
        subtitle="Escrow-linked compliance files and versions"
        action={
          <button type="button" className="cbos-btn">
            Upload
          </button>
        }
      />

      <CbosGlass className="cbos-glass--table" stagger={160} pad={false}>
        <table className="cbos-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Required</th>
              <th>Status</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {DOCS.map((d) => (
              <tr key={d.type} className="cbos-table-row">
                <td>{d.type}</td>
                <td>{d.required ? 'Yes' : 'Optional'}</td>
                <td>
                  <span className={`cbos-pill cbos-pill--${d.status === 'approved' ? 'ok' : 'wait'}`}>
                    {d.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="cbos-table-muted">v1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CbosGlass>
    </CbosPage>
  )
}
