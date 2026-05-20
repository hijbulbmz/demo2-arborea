import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function EmptyState({ title, description, actionLabel = 'Shop Arborea', to = '/shop' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="mx-auto max-w-md rounded-[2rem] border border-stone-100 bg-white p-8 text-center dark:border-stone-800 dark:bg-stone-900/60"
    >
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-cream dark:bg-stone-800 text-clay dark:text-cream shadow-inner overflow-hidden">
        {/* Pulsating backglow */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-moss/10 dark:bg-moss/20 rounded-full blur-md"
        />
        
        {/* swaying custom botanical branch SVG */}
        <motion.svg 
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative h-12 w-12 text-clay dark:text-cream"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="opacity-10" />
          <path d="M12 18s1-3 1-5c0-2-1-3-1-3" />
          <path d="M12 13c1.5-1.5 3-2 3-2s-1.5 3.5-3 4" />
          <path d="M12 10C10.5 8.5 9 8 9 8s1.5 3.5 3 4" />
        </motion.svg>
      </div>

      <h2 className="mt-6 font-display text-3xl font-extrabold text-ink dark:text-white tracking-tight">
        {title}
      </h2>
      
      <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400 font-bold">
        {description}
      </p>

      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-7 inline-block"
      >
        <Link
          to={to}
          className="inline-flex h-12 items-center justify-center rounded-full bg-moss dark:bg-clay px-8 text-xs font-black uppercase tracking-wider text-white shadow-soft hover:bg-[#29472d] dark:hover:bg-moss transition duration-200"
        >
          {actionLabel}
        </Link>
      </motion.div>
    </motion.section>
  )
}
