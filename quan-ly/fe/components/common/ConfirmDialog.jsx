import Modal from './Modal'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Xác nhận', danger, onConfirm, onCancel, loading }) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-secondary">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-soft px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#F8F5F0]"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${
            danger ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
          }`}
        >
          {loading ? 'Đang xử lý...' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
