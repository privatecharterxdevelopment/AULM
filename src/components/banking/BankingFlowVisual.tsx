import type { BankingFlowVisual } from '../../data/bankingFlow'
import { BANKING_TRANSACT_BG } from '../../config/media'

type Props = {
  visual: BankingFlowVisual
}

export function BankingFlowVisual({ visual }: Props) {
  return (
    <div className={`banking-flow-visual banking-flow-visual--${visual}`} aria-hidden>
      {visual === 'transaction' ? (
        <div className="banking-flow-mock banking-flow-mock--transaction">
          <p className="banking-flow-mock-label">New mandate</p>
          <p className="banking-flow-mock-title">Au · 500 kg · CIF Dubai</p>
          <div className="banking-flow-mock-row">
            <span>Counterparty</span>
            <strong>Verified seller</strong>
          </div>
          <div className="banking-flow-mock-row">
            <span>Settlement</span>
            <strong>SWIFT · 48h</strong>
          </div>
          <div className="banking-flow-mock-btn">Create transaction</div>
        </div>
      ) : null}

      {visual === 'invite' ? (
        <div className="banking-flow-mock banking-flow-mock--invite">
          <p className="banking-flow-mock-label">Invite sent</p>
          <div className="banking-flow-mock-avatar">MK</div>
          <p className="banking-flow-mock-title">M. Kowalski · Buyer desk</p>
          <p className="banking-flow-mock-meta">Secure link · expires 72h</p>
          <div className="banking-flow-mock-pills">
            <span>KYB</span>
            <span>Terms</span>
            <span>Join</span>
          </div>
        </div>
      ) : null}

      {visual === 'escrow' ? (
        <div className="banking-flow-mock banking-flow-mock--escrow">
          <p className="banking-flow-mock-label">Escrow wallet</p>
          <p className="banking-flow-mock-balance">$2,450,000.00</p>
          <div className="banking-flow-mock-row">
            <span>Status</span>
            <strong className="banking-flow-mock-status">Funded</strong>
          </div>
          <div className="banking-flow-mock-row">
            <span>Release</span>
            <strong>Dual control</strong>
          </div>
          <div className="banking-flow-mock-lock" />
        </div>
      ) : null}

      {visual === 'transact' ? (
        <div className="banking-flow-mock banking-flow-mock--transact">
          <img src={BANKING_TRANSACT_BG} alt="" className="banking-flow-mock-bg" draggable={false} />
          <div className="banking-flow-mock-content">
            <p className="banking-flow-mock-label">Escrow agents</p>
            <p className="banking-flow-mock-agents">200+</p>
            <p className="banking-flow-mock-meta">Verified independent agents</p>
            <ul className="banking-flow-mock-agent-list">
              <li>Geneva · Commodity</li>
              <li>Dubai · Bullion</li>
              <li>Zürich · FX</li>
            </ul>
            <div className="banking-flow-mock-btn">Assign agent</div>
          </div>
        </div>
      ) : null}

      {visual === 'repeat' ? (
        <div className="banking-flow-mock banking-flow-mock--repeat">
          <div className="banking-flow-mock-cycle" />
          <p className="banking-flow-mock-label">Clone mandate</p>
          <p className="banking-flow-mock-title">Same corridor · new lot</p>
          <div className="banking-flow-mock-pills">
            <span>Reuse KYB</span>
            <span>Same agent</span>
            <span>Go</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
