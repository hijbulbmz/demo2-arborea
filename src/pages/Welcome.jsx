import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function Welcome() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-brand bg-white p-6 shadow-soft sm:p-10"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-clay">
          <Sparkles size={14} />
          Indian care essentials
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold leading-none text-ink sm:text-7xl">
          Personal care that feels close to home.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
          Browse daily face wash, body wash, and combo routines with clear offers, trusted ingredients, and smooth mobile checkout.
        </p>
        <div className="mt-8 grid gap-3 sm:max-w-sm">
          <Link
            to="/onboarding"
            className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-moss px-5 text-base font-extrabold text-white shadow-soft transition hover:bg-[#29472d]"
          >
            Start onboarding
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="inline-flex h-[3.25rem] items-center justify-center rounded-full bg-white px-5 text-base font-extrabold text-ink shadow-soft ring-1 ring-stone-200 transition hover:bg-cream"
          >
            Login
          </Link>
        </div>
      </motion.section>
      <div className="overflow-hidden rounded-brand bg-[#efe4d6] p-4 shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
          alt="Personal care products"
          className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
        />
      </div>
    </div>
  )
}
