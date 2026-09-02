import { Check, X } from 'lucide-react'

const STEPS = [
  { id: 'pending', label: 'Chờ xử lý' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'shipped', label: 'Đang giao' },
  { id: 'done', label: 'Hoàn tất' },
]

export default function OrderStatusStepper({ status }) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold text-red-500">
        <X size={16} /> Đơn hàng đã hủy
      </div>
    )
  }

  const currentIndex = STEPS.findIndex((s) => s.id === status)

  return (
    <div className="flex items-center">
      {STEPS.map((step, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                done ? 'border-primary bg-primary text-white' : active ? 'border-primary text-primary' : 'border-soft text-faint'
              }`}>
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${active || done ? 'text-ink' : 'text-faint'}`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${done ? 'bg-primary' : 'bg-soft'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export { STEPS }
