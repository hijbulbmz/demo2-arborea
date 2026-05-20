import { Link } from 'react-router-dom'
import { Download, PackageCheck, Repeat2, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import { EmptyState } from '../components/commerce/EmptyState'
import { products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { formatCurrency } from '../utils/formatters'

const statusStyles = {
  Processing: 'bg-cream text-clay',
  Packed: 'bg-mist text-moss',
  Shipped: 'bg-moss text-white',
  'Out for Delivery': 'bg-rose/30 text-clay',
  Delivered: 'bg-moss text-white',
}

export function Orders() {
  const orders = useAppStore((state) => state.orders)
  const addToCart = useAppStore((state) => state.addToCart)
  const openCartDrawer = useAppStore((state) => state.openCartDrawer)

  if (!orders.length) {
    return (
      <EmptyState
        title="No orders yet"
        description="Your Arborea purchases and delivery updates will appear here after checkout."
        actionLabel="Start shopping"
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Order history</p>
        <h1 className="font-display text-4xl font-bold text-ink">Orders</h1>
      </div>
      <div className="grid gap-4">
        {orders.map((order) => {
          const items = order.items
            .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
            .filter((item) => item.product)
          return (
            <motion.article
              key={order.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] bg-white p-4 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-bold">{order.id}</p>
                  <p className="mt-1 text-sm font-bold text-stone-500">Placed on {order.placedAt}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${statusStyles[order.status] ?? statusStyles.Processing}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {items.map((item) => (
                  <img key={item.productId} src={item.product.image} alt={item.product.name} className="h-20 w-16 rounded-2xl object-cover" />
                ))}
              </div>
              <div className="mt-4 grid gap-2 text-sm font-bold text-stone-600 sm:grid-cols-3">
                <span className="inline-flex items-center gap-2"><Truck size={16} className="text-moss" /> {order.deliveryEta}</span>
                <span className="inline-flex items-center gap-2"><PackageCheck size={16} className="text-moss" /> {items.length} items</span>
                <span className="font-black text-ink">{formatCurrency(order.total)}</span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Link to={`/track-order/${order.id}`} className="inline-flex h-11 items-center justify-center rounded-full bg-moss px-4 text-sm font-extrabold text-white shadow-soft">
                  Track order
                </Link>
                <button
                  onClick={() => {
                    items.forEach((item) => addToCart(item.productId))
                    openCartDrawer()
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cream px-4 text-sm font-extrabold text-ink"
                >
                  <Repeat2 size={16} />
                  Repeat order
                </button>
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-ink shadow-soft">
                  <Download size={16} />
                  Invoice
                </button>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
