export default function PolicySection({ id, number, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-card border border-soft bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-accent-dark ring-1 ring-accent/40">
          {number}
        </span>
        <h2 className="text-lg font-bold leading-snug text-primary-dark">{title}</h2>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-secondary">{children}</div>
    </section>
  )
}
