const STATUS_MAP = {
  pending:   { label: 'Chờ xử lý',   className: 'bg-accent/15 text-accent-dark', dot: 'bg-accent-dark' },
  confirmed: { label: 'Đã xác nhận', className: 'bg-primary/12 text-primary-dark', dot: 'bg-primary' },
  shipped:   { label: 'Đang giao',   className: 'bg-sky-500/12 text-sky-600', dot: 'bg-sky-500' },
  done:      { label: 'Hoàn tất',    className: 'bg-emerald-500/12 text-emerald-600', dot: 'bg-emerald-500' },
  cancelled: { label: 'Đã hủy',      className: 'bg-red-500/10 text-red-500', dot: 'bg-red-500' },
}

export default function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || { label: status, className: 'bg-soft text-secondary', dot: 'bg-faint' }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${info.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${info.dot}`} />
      {info.label}
    </span>
  )
}

export { STATUS_MAP }
