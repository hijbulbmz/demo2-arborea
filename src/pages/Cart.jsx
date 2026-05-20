import { Link } from 'react-router-dom'
import { CreditCard, MapPin, Tag, Trash2, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import { EmptyState } from '../components/commerce/EmptyState'
import { QuantityStepper } from '../components/commerce/QuantityStepper'
import { products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { formatCurrency } from '../utils/formatters'

export function Cart() {
  const cart = useAppStore((state) => state.cart)
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity)
  const removeFromCart = useAppStore((state) => state.removeFromCart)
  const items = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const savings = items.reduce((sum, item) => sum + (item.product.compareAt - item.product.price) * item.quantity, 0)
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 49
  const total = subtotal + shipping

  if (!items.length) {
    return <EmptyState title="Your cart is empty" description="Add your daily essentials and checkout when you are ready." />
  }

  return (
    <div className="grid gap-5 pb-[calc(9.5rem+env(safe-area-inset-bottom))] lg:grid-cols-[1fr_380px] lg:items-start lg:pb-0">
      <section className="space-y-5">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Secure checkout</p>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Your Cart</h1>
        </div>
        {items.map((item) => (
          <motion.article
            key={item.productId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="flex gap-3 rounded-brand bg-white p-3 ring-1 ring-stone-100"
          >
            <Link to={`/product/${item.productId}`}>
              <img src={item.product.image} alt={item.product.name} className="h-24 w-20 rounded-xl object-cover sm:h-28 sm:w-24" />
            </Link>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-moss">{item.product.category}</p>
              <Link to={`/product/${item.productId}`} className="mt-1 block truncate font-extrabold text-ink">
                {item.product.name}
              </Link>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-black">{formatCurrency(item.product.price)}</span>
                <span className="text-xs text-stone-400 line-through">{formatCurrency(item.product.compareAt)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <QuantityStepper quantity={item.quantity} onChange={(value) => updateCartQuantity(item.productId, value)} />
                <button onClick={() => removeFromCart(item.productId)} className="grid h-10 w-10 place-items-center rounded-full bg-cream text-clay" aria-label="Remove item">
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <aside className="sticky top-24 rounded-[2rem] bg-white p-5 shadow-soft">
        <p className="font-display text-3xl font-bold">Order Summary</p>
        <label className="mt-5 flex h-12 items-center gap-2 rounded-2xl bg-cream px-4">
          <Tag size={18} className="text-clay" />
          <input placeholder="Apply coupon code" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" />
        </label>
        <div className="mt-5 space-y-3 text-sm font-bold text-stone-600">
          <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
          <SummaryRow label="You save" value={formatCurrency(savings)} highlight />
          <SummaryRow label="Shipping" value={shipping ? formatCurrency(shipping) : 'Free'} />
        </div>
        <div className="mt-5 border-t border-stone-100 pt-4">
          <SummaryRow label="Total" value={formatCurrency(total)} large />
        </div>
        <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-mist p-4 text-sm font-bold text-stone-600">
          <span className="inline-flex items-center gap-2"><Truck size={17} className="text-moss" /> Delivery by 2 to 5 days</span>
          <span className="inline-flex items-center gap-2"><MapPin size={17} className="text-moss" /> Free delivery above INR 499</span>
        </div>
        <Link to="/checkout" className="mt-5 hidden h-12 w-full items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft lg:inline-flex">
          <CreditCard size={18} />
          Checkout
        </Link>
      </aside>
      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-stone-200 bg-[#fbf7f1] px-4 py-3 shadow-[0_-4px_14px_rgba(24,23,22,0.05)] lg:hidden">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-stone-600">
          <span>Total</span>
          <span className="text-xl font-black text-ink">{formatCurrency(total)}</span>
        </div>
        <Link to="/checkout" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft">
          <CreditCard size={18} />
          Checkout
        </Link>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, highlight = false, large = false }) {
  return (
    <div className={`flex items-center justify-between ${large ? 'text-lg font-black text-ink' : ''}`}>
      <span>{label}</span>
      <span className={highlight ? 'text-moss' : 'text-ink'}>{value}</span>
    </div>
  )
}
