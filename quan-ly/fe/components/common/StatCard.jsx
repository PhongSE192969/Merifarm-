const TONES = {
  primary: 'from-primary/15 to-primary/5 text-primary',
  accent: 'from-accent/20 to-accent/5 text-accent-dark',
  blue: 'from-sky-400/20 to-sky-400/5 text-sky-600',
  rose: 'from-rose-400/20 to-rose-400/5 text-rose-500',
}

export default function StatCard({ icon: Icon, label, value, hint, tone = 'primary' }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-[0_10px_28px_-10px_rgba(15,107,52,0.15),0_4px_14px_-4px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${TONES[tone] || TONES.primary}`}>
            <Icon size={18} />
          </div>
        )}
        <p className="text-sm font-medium text-secondary">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-faint">{hint}</p>}
    </div>
  )
}
