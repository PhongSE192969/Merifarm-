import { Plus, Trash2 } from 'lucide-react'

// Danh sách các dòng văn bản đơn giản (VD: công dụng, cách bảo quản) — thêm/sửa/xóa từng dòng.
export default function ArrayEditor({ label, values, onChange, placeholder, textarea }) {
  const list = values || []

  function update(i, val) {
    const next = [...list]
    next[i] = val
    onChange(next)
  }

  function remove(i) {
    onChange(list.filter((_, idx) => idx !== i))
  }

  function add() {
    onChange([...list, ''])
  }

  const Field = textarea ? 'textarea' : 'input'

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
        {list.map((val, i) => (
          <div key={i} className="flex items-start gap-2">
            <Field
              value={val}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              rows={textarea ? 2 : undefined}
              className="w-full rounded-xl border border-soft px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button type="button" onClick={() => remove(i)} className="mt-1.5 shrink-0 text-faint hover:text-red-500">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
