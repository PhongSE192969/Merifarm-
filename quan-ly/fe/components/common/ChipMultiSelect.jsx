// Chọn nhiều giá trị dạng chip bấm bật/tắt (VD: loại cây trồng, nhu cầu sử dụng).
export default function ChipMultiSelect({ label, options, values, onChange, getId = (o) => o.id, getLabel = (o) => o.name }) {
  const selected = values || []

  function toggle(id) {
    onChange(selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id])
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const id = getId(opt)
          const checked = selected.includes(id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                checked ? 'border-primary bg-soft-green text-primary-dark' : 'border-soft text-secondary hover:border-primary/50'
              }`}
            >
              {getLabel(opt)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
