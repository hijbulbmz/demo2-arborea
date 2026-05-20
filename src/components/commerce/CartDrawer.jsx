import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data'
import { useAppStore } from '../../store/useAppStore'
import { formatCurrency } from '../../utils/formatters'
import { EmptyState } from './EmptyState'
import { QuantityStepper } from './QuantityStepper'

export function CartDrawer() {
  const isOpen = useAppStore((state) => state.isCartDrawerOpen)
  const close = useAppStore((state) => state.closeCartDrawer)
  const cart = useAppStore((state) => state.cart)
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity)
  const removeFromCart = useAppStore((state) => state.removeFromCart)
  const items = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const savings = items.reduce((sum, item) => sum + (item.product.compareAt - item.product.price) * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.24, ease: 'easeOut' }}
            className="fixed right-0 top-0 z-[80] flex h-screen max-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-[#fbf7f1] shadow-xl dark:bg-stone-900"
          >
            <div className="shrink-0 border-b border-stone-200 px-4 pb-3 pt-4 dark:border-stone-800 sm:px-5">
              <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-2xl font-extrabold text-ink dark:text-white">Your Cart</p>
                <p className="mt-0.5 text-xs font-bold text-moss dark:text-cream">{items.length} items | COD available</p>
              </div>
              <button
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-stone-500 shadow-sm transition hover:text-ink dark:bg-stone-800 dark:hover:text-white"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
              </div>
            </div>
            {items.length ? (
              <>
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
                  {items.map((item) => (
                    <article
                      key={item.productId}
                      className="flex gap-3 rounded-brand border border-stone-100 bg-white p-3 dark:border-stone-800 dark:bg-stone-850"
                    >
                      <div className="aspect-[4/5] h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f6efe5]">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-ink dark:text-white">{item.product.name}</p>
                        <p className="mt-0.5 text-xs font-semibold text-stone-500">{item.product.size} | {formatCurrency(item.product.price)}</p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <QuantityStepper quantity={item.quantity} onChange={(value) => updateCartQuantity(item.productId, value)} />
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="grid h-9 w-9 place-items-center rounded-full bg-cream text-clay transition hover:bg-rose/15"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="shrink-0 border-t border-stone-200 bg-[#fbf7f1] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_14px_rgba(24,23,22,0.05)] dark:border-stone-800 dark:bg-stone-900 sm:px-5">
                  <div className="mb-3 flex items-center justify-between text-sm font-bold text-stone-600 dark:text-stone-300">
                    <span>You save {formatCurrency(savings)}</span>
                    <span className="text-xl font-black text-ink dark:text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={close}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-extrabold text-white shadow-soft transition hover:bg-[#29472d]"
                  >
                    <ShoppingBag size={18} />
                    Checkout
                  </Link>
                </div>
              </>
            ) : (
              <div className="grid flex-1 place-items-center">
                <EmptyState title="Cart is empty" description="Add your daily essentials and checkout when ready." />
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
