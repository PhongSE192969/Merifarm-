const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  accent: 'bg-accent text-white hover:bg-accent-dark',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  'outline-white': 'border border-white text-white hover:bg-white hover:text-primary-dark',
  ghost: 'text-primary hover:bg-primary/10',
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
