import { AlertCircle } from 'lucide-react'

export default function FormField({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

export function inputCls(error) {
  return `w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-150
    ${error ? 'border-red-400 focus:border-red-500' : 'border-soft focus:border-primary'}
    placeholder:text-faint disabled:bg-[#F3F3F3] disabled:cursor-not-allowed`
}
