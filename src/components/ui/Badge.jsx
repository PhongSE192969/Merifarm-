const TAG_LABELS = {
  'ban-chay': { label: 'Bán chạy', className: 'bg-accent text-white' },
  moi: { label: 'Mới', className: 'bg-primary text-white' },
  'khuyen-mai': { label: 'Khuyến mãi', className: 'bg-earth text-white' },
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
