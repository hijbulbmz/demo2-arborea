import { AnimatePresence, motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data'
import { useAppStore } from '../../store/useAppStore'
import { useToastStore } from '../../store/useToastStore'
import { cx, formatCurrency } from '../../utils/formatters'

export function QuickViewModal() {
  const productId = useAppStore((state) => state.quickViewProductId)
  const closeQuickView = useAppStore((state) => state.closeQuickView)
  const addToCart = useAppStore((state) => state.addToCart)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const wishlist = useAppStore((state) => state.wishlist)
  const showToast = useToastStore((state) => state.showToast)
  const product = products.find((item) => item.id === productId)

  const handleAdd = () => {
    addToCart(product.id)
    closeQuickView()
    showToast(`${product.name} added to cart`)
  }

  const handleWishlist = () => {
    toggleWishlist(product.id)
    showToast(wishlist.includes(product.id) ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  const isWishlisted = product ? wishlist.includes(product.id) : false

  return (
    <AnimatePresence>
      {product ? (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
          />
          <motion.section
            initial={{ opacity: 0, scale: 0.93, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 60 }}
            transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[92dvh] overflow-y-auto rounded-t-[1.5rem] border border-white/40 bg-[#fbf7f1] p-5 shadow-xl dark:border-stone-800 dark:bg-stone-900 sm:left-4 sm:right-4 sm:mx-auto sm:max-w-sm lg:left-1/2 lg:top-1/2 lg:bottom-auto lg:max-h-[720px] lg:w-[760px] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[2rem] lg:p-6"
            style={{
              x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "-50%" : "0%",
              y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "-50%" : "0%"
            }}
          >
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Quick view</p>
              <button
                type="button"
                onClick={closeQuickView}
                className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-stone-800 text-stone-500 hover:text-ink dark:hover:text-white shadow-sm transition active:scale-90"
                aria-label="Close quick view"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1fr]">
              <div className="overflow-hidden rounded-[1.5rem] bg-mist dark:bg-stone-950">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={product.image} 
                  alt={product.name} 
                  className="aspect-[4/5] w-full object-cover shadow-soft" 
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-moss dark:text-cream">{product.category}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-ink dark:text-white lg:text-4xl">{product.name}</h2>
                  <div className="mt-3 flex items-center gap-1 text-sm font-bold text-stone-500">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    {product.rating} ({product.reviews})
                  </div>
                  <p className="mt-3 text-xs font-bold leading-6 text-stone-500 dark:text-stone-400">{product.description}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-ink dark:text-white">{formatCurrency(product.price)}</span>
                    <span className="text-sm text-stone-400 line-through">{formatCurrency(product.compareAt)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-[1fr_auto] gap-3">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-moss dark:bg-clay px-5 text-sm font-extrabold text-white shadow-soft hover:bg-[#29472d] dark:hover:bg-clay/90 active:scale-98 transition"
                    >
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={handleWishlist}
                      className={cx(
                        'grid h-12 w-12 place-items-center rounded-full shadow-soft transition active:scale-95',
                        isWishlisted
                          ? 'bg-rose/20 text-clay dark:bg-rose/30 dark:text-rose-300'
                          : 'bg-white dark:bg-stone-850 text-stone-500',
                      )}
                      aria-label="Toggle wishlist"
                    >
                      <motion.div
                        animate={isWishlisted ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 350, damping: 15 }}
                      >
                        <Heart size={19} fill={isWishlisted ? 'currentColor' : 'none'} />
                      </motion.div>
                    </button>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={closeQuickView}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white dark:bg-stone-800 text-sm font-extrabold text-ink dark:text-white border border-stone-200 dark:border-stone-700 shadow-soft hover:bg-cream dark:hover:bg-stone-750 transition"
                  >
                    View full details
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  )
}
