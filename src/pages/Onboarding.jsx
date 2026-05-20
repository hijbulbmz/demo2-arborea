import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, PackageCheck, Sparkles } from 'lucide-react'

const slides = [
  {
    title: 'Curated care rituals',
    body: 'Discover skincare, haircare, and fragrance edits built for fast mobile browsing.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Save your glow list',
    body: 'Wishlist products and return when your routine is ready for a restock.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Track every order',
    body: 'Protected order and profile routes are ready for a future backend.',
    icon: PackageCheck,
    image: 'https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?auto=format&fit=crop&w=900&q=80',
  },
]

export function Onboarding() {
  const [active, setActive] = useState(0)

  return (
    <div className="mx-auto max-w-md">
      <div
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
        onScroll={(event) => {
          const index = Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth)
          setActive(Math.min(index, slides.length - 1))
        }}
      >
        {slides.map((slide) => {
          const Icon = slide.icon
          return (
            <motion.article
              key={slide.title}
              className="min-w-full snap-center overflow-hidden rounded-[2.25rem] bg-white shadow-soft"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={slide.image} alt="" className="aspect-[4/5] w-full object-cover" />
              <div className="p-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-clay">
                  <Icon size={22} />
                </span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight">{slide.title}</h1>
                <p className="mt-3 text-sm leading-6 text-stone-600">{slide.body}</p>
              </div>
            </motion.article>
          )
        })}
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <span
            key={slide.title}
            className={`h-2 rounded-full transition-all ${active === index ? 'w-8 bg-moss' : 'w-2 bg-stone-300'}`}
          />
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 rounded-[1.75rem] bg-white/90 p-2 shadow-soft backdrop-blur-xl">
        <Link
          to="/login"
          className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-moss px-5 text-base font-extrabold text-white shadow-soft transition hover:bg-[#29472d]"
        >
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
