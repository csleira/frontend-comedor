export function AppInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  className = '',
  required = false,
  error,
  ...props
}) {
  const hasError = Boolean(error)

  return (
    <label className="group block text-left">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide text-orange-300">
          {label}
        </span>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`mt-2 w-full rounded-xl border bg-orange-950/40 px-4 py-3 ${
          hasError
            ? // ❌ Estilos de error (igual que estaban)
              'border-red-500/70 focus:border-red-400 focus:ring-red-400/70'
            : // 🔶 Estilos normales (ahora en naranja)
              'text-sm text-orange-100 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/60'
        } ${className}`}
        {...props}
      />

      {hasError ? (
        <span id={`${id}-error`} className="mt-2 block text-xs font-medium text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  )
}
