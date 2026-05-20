import { motion } from 'framer-motion'

export function SocialButton({ label, icon }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold text-ink shadow-sm transition hover:bg-cream"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-cream text-xs font-black text-clay">
        {icon}
      </span>
      {label}
    </motion.button>
  )
}
