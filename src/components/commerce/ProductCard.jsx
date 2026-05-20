import { Eye, Heart, Plus, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useToastStore } from '../../store/useToastStore'
import { fadeUp } from '../../utils/animations'
import { cx, formatCurrency } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function ProductCard({ product }) {
  const wishlist = useAppStore((state) => state.wishlist)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const addToCart = useAppStore((state) => state.addToCart)
  const openQuickView = useAppStore((state) => state.openQuickView)
  const showToast = useToastStore((state) => state.showToast)
  const isWishlisted = wishlist.includes(product.id)
  const discount = Math.round(((product.compareAt - product.price) / product.compareAt) * 100)

  const handleWishlist = () => {
    toggleWishlist(product.id)
    showToast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  const handleCart = () => {
    addToCart(product.id)
    showToast('Added to cart')
  }

  return (
    <motion.div
      variants={fadeUp}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.16 }}
      className="group relative"
    >
      <Card hover={false} className="overflow-hidden border-stone-100 bg-white shadow-none ring-1 ring-stone-100 transition-all duration-200 dark:border-stone-800 dark:bg-stone-900">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f6efe5] dark:bg-stone-950">
          <Link to={`/product/${product.id}`} className="block h-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </Link>
          <div className="absolute left-2.5 top-2.5 flex max-w-[calc(100%-1.25rem)] flex-wrap gap-1.5">
            <span className="rounded-full bg-white/95 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-clay dark:bg-stone-900/90">
              {product.tag}
            </span>
            <span className="rounded-full bg-turmeric px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white">
              {discount}% off
            </span>
          </div>
          <button
            type="button"
            onClick={() => openQuickView(product.id)}
            className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink ring-1 ring-stone-100 transition hover:bg-moss hover:text-white dark:bg-stone-800/90 dark:text-white"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={17} />
          </button>
        </div>
        <div className="space-y-3 p-3.5 sm:p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-moss dark:text-cream">{product.category}</p>
            <Link to={`/product/${product.id}`} className="mt-1 block min-h-[2.5rem] text-[15px] font-extrabold leading-5 text-ink transition-colors hover:text-clay dark:text-white dark:hover:text-cream sm:text-base">
              {product.name}
            </Link>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-lg font-black text-ink dark:text-white">{formatCurrency(product.price)}</span>
                <span className="text-xs text-stone-400 line-through">
                  {formatCurrency(product.compareAt)}
                </span>
              </div>
              <div className="mt-1 flex flex-col gap-1">
                <div className="flex items-center gap-1 text-xs font-semibold text-stone-500">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  {product.rating} ({product.reviews})
                </div>
                {product.stock && product.stock <= 5 && (
                  <span className="mt-0.5 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    Only {product.stock} left
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              aria-label="Toggle wishlist"
              onClick={handleWishlist}
              className={cx(
                'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition active:scale-95',
                isWishlisted
                  ? 'border-rose bg-rose/20 text-clay dark:border-rose dark:bg-rose/30 dark:text-rose-300'
                  : 'border-stone-200 bg-white text-stone-500 dark:border-stone-800 dark:bg-stone-900',
              )}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
          <Button
            className="relative h-11 w-full overflow-hidden text-xs font-bold uppercase tracking-wide transition-transform duration-150 active:scale-98"
            icon={Plus}
            onClick={handleCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
