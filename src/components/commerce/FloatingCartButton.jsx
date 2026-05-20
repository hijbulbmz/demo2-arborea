import { useMemo } from 'react'
import { ShoppingBag } from 'lucide-react'
import { products } from '../../data'
import { useAppStore } from '../../store/useAppStore'
import { formatCurrency } from '../../utils/formatters'

export function FloatingCartButton() {
  const cart = useAppStore((state) => state.cart)
  const openCartDrawer = useAppStore((state) => state.openCartDrawer)
  const productsById = useMemo(() => new Map(products.map((product) => [product.id, product])), [])
  const total = cart.reduce((sum, item) => sum + (productsById.get(item.productId)?.price ?? 0) * item.quantity, 0)

  if (!cart.length) return null

  return (
    <button
      type="button"
      onClick={openCartDrawer}
      className="fixed bottom-6 right-4 z-30 hidden items-center gap-3 rounded-full bg-moss px-4 py-3 text-white shadow-soft lg:flex"
      aria-label="Open cart"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
        <ShoppingBag size={18} />
      </span>
      <span className="hidden text-sm font-extrabold sm:block">{formatCurrency(total)}</span>
    </button>
  )
}
