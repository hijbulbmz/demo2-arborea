import { cx } from '../../utils/formatters'

export function Input({ className, label, ...props }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-semibold text-stone-700">{label}</span> : null}
      <input
        className={cx(
          'h-12 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-clay focus:ring-4 focus:ring-clay/10',
          className,
        )}
        {...props}
      />
    </label>
  )
}
