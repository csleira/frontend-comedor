export function AppButton({
  children,
  className = '',
  variant = 'primary',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-[0_10px_25px_-10px_rgba(255,140,0,0.7)] hover:brightness-110 focus-visible:outline-orange-400',
    secondary: 'bg-orange-700 text-orange-50 hover:bg-orange-600 focus-visible:outline-orange-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-400'
  }

  const composed = `${baseStyles} ${variants[variant] ?? variants.primary} ${className}`;

  return (
    <button className={composed} {...props}>
      {children}
    </button>
  )
}