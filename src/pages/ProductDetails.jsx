import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BadgeCheck,
  ChevronDown,
  Heart,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
} from 'lucide-react'
import { ProductCard } from '../components/commerce/ProductCard'
import { SectionHeader } from '../components/commerce/SectionHeader'
import { products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { useToastStore } from '../store/useToastStore'
import { cx, formatCurrency } from '../utils/formatters'

const trustBadges = [
  ['Dermatologically Tested', ShieldCheck],
  ['Cruelty Free', Heart],
  ['Organic Ingredients', Leaf],
  ['COD Available', BadgeCheck],
  ['Fast Delivery', Truck],
]

const reviews = [
  ['Aarohi M.', 'Gentle cleanse, no tight feeling after wash. Good for daily use in humid weather.'],
  ['Riya S.', 'Nice mild fragrance and easy pump-friendly size for the bathroom shelf.'],
  ['Naina K.', 'Light foam, rinses off quickly, and skin feels fresh not dry.'],
]

export function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === productId) ?? products[0]
  const [activeImage, setActiveImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState('Ingredients')
  const [quantity, setQuantity] = useState(1)
  const addToCart = useAppStore((state) => state.addToCart)
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity)
  const openCartDrawer = useAppStore((state) => state.openCartDrawer)
  const toggleWishlist = useAppStore((state) => state.toggleWishlist)
  const wishlist = useAppStore((state) => state.wishlist)
  const showToast = useToastStore((state) => state.showToast)
  const discount = Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
  const related = useMemo(() => {
    const seen = new Set([product.id])
    return products
      .filter((item) => item.category === product.category)
      .concat(products)
      .filter((item) => {
        if (seen.has(item.id)) return false
        seen.add(item.id)
        return true
      })
      .slice(0, 5)
  }, [product])

  const add = () => {
    addToCart(product.id)
    if (quantity > 1) {
      updateCartQuantity(product.id, quantity)
    }
    showToast('Added to cart')
  }

  const buyNow = () => {
    addToCart(product.id)
    if (quantity > 1) {
      updateCartQuantity(product.id, quantity)
    }
    showToast('Ready for checkout')
    openCartDrawer()
  }

  const wish = () => {
    toggleWishlist(product.id)
    showToast(wishlist.includes(product.id) ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  const accordions = {
    Ingredients: product.ingredients.join(', '),
    'How to Use': product.usage,
    Benefits: product.benefits.join('. '),
    FAQs: 'Patch test before first use. Suitable for daily routines unless your skin needs a slower start.',
    'Shipping Info': 'Ships within 24 hours. Delivery usually takes 2 to 5 business days with COD on eligible pin codes.',
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-start">
        <section className="space-y-4">
          <div className="hide-scrollbar flex snap-x gap-3 overflow-x-auto lg:hidden">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => {
                  setActiveImage(index)
                  setPreviewOpen(true)
                }}
                className="min-w-full snap-center overflow-hidden rounded-[2rem] bg-mist shadow-soft"
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="aspect-[4/5] w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="hidden gap-3 lg:grid lg:grid-cols-[88px_1fr]">
            <div className="grid content-start gap-3">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setActiveImage(index)}
                  className={cx(
                    'overflow-hidden rounded-2xl border-2 bg-mist',
                    activeImage === index ? 'border-ink' : 'border-transparent',
                  )}
                >
                  <img src={image} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="overflow-hidden rounded-[2rem] bg-mist shadow-soft"
            >
              <img src={product.images[activeImage]} alt={product.name} className="aspect-[4/5] w-full object-cover" />
            </button>
          </div>

          <TrustBadges />
          <AccordionList items={accordions} open={openAccordion} setOpen={setOpenAccordion} />
          <ReviewsSection />
        </section>

        <aside className="rounded-[2rem] bg-white p-5 shadow-soft lg:sticky lg:top-24 lg:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-ink lg:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-extrabold text-amber-700">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
            <span className="text-sm font-bold text-stone-500">{product.reviews} reviews</span>
            <span className="rounded-full bg-mist px-3 py-1 text-xs font-extrabold uppercase text-moss">{product.tag}</span>
          </div>

          {/* Simple fragrance label if the item belongs to the Body Wash category */}
          {product.category === 'Body Wash' && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">Fragrance:</span>
              <span className="text-xs font-bold text-moss bg-[#eaf1e8] dark:bg-moss/20 px-2.5 py-1 rounded-full">{product.tag}</span>
            </div>
          )}

          <p className="mt-5 text-sm leading-6 text-stone-600">{product.description}</p>
          
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-black">{formatCurrency(product.price)}</span>
            <span className="text-stone-400 line-through">{formatCurrency(product.compareAt)}</span>
            <span className="rounded-full bg-rose/30 px-3 py-1 text-xs font-extrabold text-clay">{discount}% off</span>
          </div>

          {/* SIZE VARIANT SELECTOR */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Select Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = product.size === sz
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        if (product.sizeIds && product.sizeIds[sz]) {
                          navigate(`/product/${product.sizeIds[sz]}`)
                        }
                      }}
                      className={cx(
                        'h-10 rounded-xl px-4 text-xs font-extrabold transition border',
                        isSelected
                          ? 'bg-moss text-white border-moss shadow-sm'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-cream/40 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-850'
                      )}
                    >
                      {sz}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* QUANTITY SELECTOR */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Quantity</span>
            <div className="flex items-center rounded-xl border border-stone-200 bg-white dark:bg-stone-900 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center font-extrabold text-stone-500 hover:text-ink dark:hover:text-white"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-black text-ink dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center font-extrabold text-stone-500 hover:text-ink dark:hover:text-white"
              >
                +
              </button>
            </div>
          </div>

          <InfoBlock title="Ingredient highlights" items={product.ingredients} />
          <InfoBlock title="Best for" items={product.skinTypes} />
          <InfoBlock title="Usage" items={[product.usage]} />

          <div className="mt-6 hidden grid-cols-[1fr_1fr_auto] gap-3 lg:grid">
            <button onClick={add} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft">
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button onClick={buyNow} className="h-12 rounded-full bg-clay px-5 text-sm font-extrabold text-white shadow-soft">
              Buy Now
            </button>
            <button onClick={wish} className="grid h-12 w-12 place-items-center rounded-full bg-cream text-clay" aria-label="Wishlist">
              <Heart size={19} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <SectionHeader eyebrow="You may also like" title="Related products" />
        <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {related.map((item) => (
            <div key={item.id} className="min-w-[78%] snap-center sm:min-w-[300px] lg:min-w-0">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 grid grid-cols-2 gap-3 border-t border-stone-200 bg-white px-4 py-3 shadow-[0_-4px_14px_rgba(24,23,22,0.05)] lg:hidden">
        <button onClick={add} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft">
          <ShoppingBag size={18} />
          Add to Cart
        </button>
        <button onClick={buyNow} className="h-12 rounded-full bg-clay px-5 text-sm font-extrabold text-white shadow-soft">
          Buy Now
        </button>
      </div>

      <ImagePreview
        open={previewOpen}
        image={product.images[activeImage]}
        name={product.name}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  )
}

function InfoBlock({ title, items }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-cream px-3 py-2 text-xs font-bold text-stone-700">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {trustBadges.map(([label, Icon]) => (
        <article key={label} className="rounded-[1.25rem] bg-white p-3 text-center shadow-soft">
          <Icon size={21} className="mx-auto text-moss" />
          <p className="mt-2 text-xs font-extrabold leading-tight text-ink">{label}</p>
        </article>
      ))}
    </div>
  )
}

function AccordionList({ items, open, setOpen }) {
  return (
    <section className="rounded-[2rem] bg-white p-4 shadow-soft">
      {Object.entries(items).map(([title, body]) => (
        <div key={title} className="border-b border-stone-100 last:border-0">
          <button
            type="button"
            onClick={() => setOpen(open === title ? '' : title)}
            className="flex w-full items-center justify-between py-4 text-left font-extrabold"
          >
            {title}
            <ChevronDown className={`transition ${open === title ? 'rotate-180' : ''}`} size={18} />
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === title ? 'auto' : 0, opacity: open === title ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-6 text-stone-600">{body}</p>
          </motion.div>
        </div>
      ))}
    </section>
  )
}

function ReviewsSection() {
  return (
    <section className="rounded-[2rem] bg-white p-4 shadow-soft">
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="rounded-[1.5rem] bg-cream p-4">
          <p className="text-5xl font-black">4.8</p>
          <div className="mt-2 flex text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="mt-2 text-sm font-bold text-stone-600">Based on verified purchases</p>
          {[5, 4, 3].map((stars, index) => (
            <div key={stars} className="mt-3 flex items-center gap-2 text-xs font-bold text-stone-500">
              {stars}
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-moss" style={{ width: `${88 - index * 22}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          {reviews.map(([name, text], index) => (
            <article key={name} className="rounded-[1.5rem] border border-stone-100 p-4">
              <div className="flex items-center justify-between">
                <p className="font-extrabold">{name}</p>
                <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-extrabold text-moss">Verified</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
              {index === 1 ? (
                <div className="mt-3 grid h-24 place-items-center rounded-2xl bg-moss text-sm font-extrabold text-white">
                  Video review placeholder
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImagePreview({ open, image, name, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button onClick={onClose} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ink" aria-label="Close preview">
            <X size={19} />
          </button>
          <motion.img
            src={image}
            alt={name}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            className="max-h-[82vh] w-full max-w-3xl rounded-[2rem] object-contain"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
