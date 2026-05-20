import { LoaderCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cx } from '../../utils/formatters'

export function AuthButton({ children, loading = false, variant = 'primary', className, ...props }) {
  const styles =
    variant === 'secondary'
      ? 'bg-white text-ink ring-1 ring-stone-200 hover:bg-cream'
      : 'bg-moss text-white shadow-soft hover:bg-[#29472d]'

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      disabled={loading}
      className={cx(
        'inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full px-5 text-base font-extrabold transition disabled:cursor-not-allowed disabled:opacity-75',
        styles,
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle size={19} className="animate-spin" /> : null}
      {children}
    </motion.button>
  )
}
