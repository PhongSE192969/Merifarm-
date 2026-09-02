import { Plus, Trash2 } from 'lucide-react'
import IconPicker from './IconPicker'

// Danh sách icon + tiêu đề + nội dung — dùng cho "Lợi ích nổi bật" và "Phù hợp khi
// cây có dấu hiệu". Nội dung dùng textarea vì thường là 1 câu, textbox 1 dòng dễ bị
// cắt khó đọc lại.
export default function IconTextListEditor({ values, onChange, textKey, textLabel, emptyItem }) {
  const list = values || []

  function update(i, patch) {
    onChange(list.map((item, idx) => (idx === i ? { ...item, ...patch } : item)))
  }

  function remove(i) {
    onChange(list.filter((_, idx) => idx !== i))
  }

  function add() {
    onChange([...list, { ...emptyItem }])
  }

  return (
    <div className="space-y-3">
      {list.length === 0 && <p className="text-xs text-faint">Chưa có mục nào.</p>}
      {list.map((item, i) => (
        <div key={i} className="flex gap-2 rounded-xl border border-soft p-3">
          <IconPicker value={item.icon} onChange={(icon) => update(i, { icon })} />
          <div className="flex-1 space-y-2">
            <input
              value={item.title || ''}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Tiêu đề ngắn gọn"
              className="w-full rounded-xl border border-soft px-3 py-2 text-sm font-semibold outline-none focus:border-primary"
            />
            <textarea
              rows={2}
              value={item[textKey] || ''}
              onChange={(e) => update(i, { [textKey]: e.target.value })}
              placeholder={textLabel}
              className="w-full resize-none rounded-xl border border-soft px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button type="button" onClick={() => remove(i)} className="h-fit shrink-0 text-faint hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
        <Plus size={13} /> Thêm mục
      </button>
    </div>
  )
}
