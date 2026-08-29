const TAG_LABELS = {
  'ban-chay': { label: 'Bán chạy', className: 'bg-white border border-accent-dark text-accent-dark' },
  moi: { label: 'Mới', className: 'bg-white border border-primary text-primary' },
  'khuyen-mai': { label: 'Khuyến mãi', className: 'bg-white border border-earth text-earth' },
}

export default function Badge({ tag }) {
  const config = TAG_LABELS[tag]
  if (!config) return null
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  )
}
