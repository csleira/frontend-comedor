export function AppCard({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section
      className={`relative rounded-3xl border border-orange-700 bg-orange-900/60 p-8 shadow-[0_20px_45px_-15px_rgba(255,140,0,0.55)] backdrop-blur-md ${className}`}
    >
      {/* Fondo degradado y difuminado */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-orange-500/50 via-amber-400/25 to-orange-600/25 blur-3xl" />

      <header>
        {title && <h2 className="text-3xl font-semibold text-white">{title}</h2>}
        {subtitle && <p className="mt-2 text-sm text-orange-100">{subtitle}</p>}
      </header>

      {children}
    </section>
  )
}