export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/** Reference-style: 452 985.08 */
export function formatHolding(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/,/g, ' ')
}

export function formatCompact(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M`
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)}K`
  return amount.toFixed(2)
}

export function escrowStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Draft',
    awaiting_participants: 'Awaiting participants',
    awaiting_documents: 'Awaiting documents',
    awaiting_funding: 'Awaiting funding',
    funded: 'Funded',
    in_progress: 'Transaction in progress',
    under_review: 'Under review',
    approved: 'Approved',
    released: 'Released',
    completed: 'Completed',
    refunded: 'Refunded',
    disputed: 'Disputed',
  }
  return labels[status] ?? status.replace(/_/g, ' ')
}

export function formatEscrowDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatActivityDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return date.toLocaleDateString(undefined, { weekday: 'short' })
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function formatDeskDate(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}
