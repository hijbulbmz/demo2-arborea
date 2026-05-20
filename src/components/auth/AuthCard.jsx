import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

export function AuthCard({ eyebrow, title, subtitle, children, footer }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-cream text-clay shadow-sm">
          <Leaf size={24} />
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-ink">Arborea</p>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">{eyebrow}</p>
        </div>
      </div>
      <h1 className="mt-7 font-display text-4xl font-bold leading-tight text-ink">{title}</h1>
      {subtitle ? <p className="mt-3 text-sm leading-6 text-stone-600">{subtitle}</p> : null}
      <div className="mt-7">{children}</div>
      {footer ? <div className="mt-6 border-t border-stone-100 pt-5">{footer}</div> : null}
    </motion.section>
  )
}
