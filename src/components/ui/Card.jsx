import { motion } from 'framer-motion'
import { cx } from '../../utils/formatters'

export function Card({ children, className, hover = true }) {
  return (
    <motion.article
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.16 }}
      className={cx('rounded-brand border border-white/80 bg-white shadow-soft', className)}
    >
      {children}
    </motion.article>
  )
}
