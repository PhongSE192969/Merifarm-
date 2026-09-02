import { Plus, Trash2 } from 'lucide-react'

// Danh sách các dòng nhiều trường (VD: bảng liều lượng crop/dosage, lợi ích icon/title/text).
// fields: [{ key, placeholder, span }]
export default function ObjectArrayEditor({ label, values, onChange, fields, emptyItem }) {
  const list = values || []

  function update(i, key, val) {
    const next = list.map((item, idx) => (idx === i ? { ...item, [key]: val } : item))
    onChange(next)
  }

  function remove(i) {
    onChange(list.filter((_, idx) => idx !== i))
  }

  function add() {
    onChange([...list, { ...emptyItem }])
  }

  return (
    <div>
      <div className={`mb-2 flex items-center ${label ? 'justify-between' : 'justify-end'}`}>
        {label && <label className="text-sm font-medium text-ink">{label}</label>}
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          <Plus size={13} /> Thêm dòng
        </button>
      </div>
      <div className="space-y-2">
        {list.length === 0 && <p className="text-xs text-faint">Chưa có mục nào.</p>}
        {list.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grid flex-1 gap-2" style={{ gridTemplateColumns: fields.map((f) => f.span || '1fr').join(' ') }}>
              {fields.map((f) => (
                <input
                  key={f.key}
                  value={item[f.key] || ''}
                  onChange={(e) => update(i, f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="rounded-lg border border-soft px-2.5 py-1.5 text-sm outline-none focus:border-primary"
                />
              ))}
            </div>
            <button type="button" onClick={() => remove(i)} className="mt-1.5 shrink-0 text-faint hover:text-red-500">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
