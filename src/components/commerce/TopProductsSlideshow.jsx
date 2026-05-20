import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { products } from '../../data'
import { formatCurrency } from '../../utils/formatters'

const topProducts = [...products]
  .filter((item) => item.isBestseller)
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 6)

export function TopProductsSlideshow() {
  const slides = useMemo(() => topProducts, [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [slides.length])

  if (!slides.length) return null

  const product = slides[index]
  const discount = Math.round(((product.compareAt - product.price) / product.compareAt) * 100)

  const go = (direction) => {
    setIndex((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-brand" aria-label="Top products">
      <div className="relative bg-[#f6efe5]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative aspect-[5/3] max-h-[220px] w-full overflow-hidden sm:aspect-[2/1] sm:max-h-[280px] lg:max-h-[320px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="rounded-full bg-turmeric px-2 py-0.5 text-[10px] font-black">{discount}% off</span>
                  <p className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl">
                    {product.name}
                    {product.size ? <span className="text-base font-bold opacity-90"> · {product.size}</span> : null}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm font-bold">
                    <span>{formatCurrency(product.price)}</span>
                    <span className="text-white/70 line-through">{formatCurrency(product.compareAt)}</span>
                    <span className="inline-flex items-center gap-0.5 text-white/90">
                      <Star size={13} className="fill-[#ffd782] text-[#ffd782]" />
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-sm"
              aria-label="Previous product"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-sm"
              aria-label="Next product"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-4 z-10 flex gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
