import { motion } from 'framer-motion'
import { cx } from '../../utils/formatters'

const variants = {
  primary: 'bg-moss text-white shadow-soft hover:bg-[#29472d]',
  secondary: 'bg-white text-ink shadow-soft ring-1 ring-stone-200 hover:bg-cream',
  ghost: 'bg-transparent text-ink hover:bg-white/70',
}

export function Button({ children, className, variant = 'primary', icon: Icon, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cx(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition',
        variants[variant],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon size={18} strokeWidth={2.2} /> : null}
      {children}
    </motion.button>
  )
}
