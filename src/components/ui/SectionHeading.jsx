export default function SectionHeading({ eyebrow, title, description, center = false, dark = false }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wide ${dark ? 'text-accent-light' : 'text-accent-dark'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold md:text-4xl ${dark ? 'text-white' : 'text-primary-dark'}`}>{title}</h2>
      {description && (
        <p className={`mt-3 max-w-2xl mx-auto ${dark ? 'text-white/75' : 'text-secondary'}`}>{description}</p>
      )}
    </div>
  )
}
