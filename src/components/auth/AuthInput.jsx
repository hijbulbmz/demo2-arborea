import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cx } from '../../utils/formatters'

export function AuthInput({ label, type = 'text', className, ...props }) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-stone-700">{label}</span>
      <span className="relative block">
        <input
          type={inputType}
          className={cx(
            'h-[3.25rem] w-full rounded-2xl border border-stone-200 bg-pearl px-4 text-base text-ink outline-none transition placeholder:text-stone-400 focus:border-clay focus:bg-white focus:ring-4 focus:ring-clay/10',
            isPassword && 'pr-12',
            className,
          )}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-stone-500 hover:bg-cream hover:text-ink"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : null}
      </span>
    </label>
  )
}
