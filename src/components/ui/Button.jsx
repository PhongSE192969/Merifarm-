const VARIANTS = {
  primary: 'bg-white border border-primary text-primary hover:bg-primary hover:text-white',
  accent: 'bg-white border border-accent-dark text-accent-dark hover:bg-accent hover:text-white',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  glass: 'border border-primary/40 bg-soft-green/45 text-primary-dark shadow-[0_6px_20px_rgba(15,107,52,0.08)] backdrop-blur-md hover:border-primary/70 hover:bg-soft-green/75 hover:shadow-[0_8px_26px_rgba(15,107,52,0.14)]',
  ghost: 'text-primary hover:bg-primary/10',
  solidAccent: 'bg-accent border border-accent text-white hover:bg-accent-dark hover:border-accent-dark',
  solidPrimary: 'bg-primary border border-primary text-white hover:bg-primary-dark hover:border-primary-dark',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
