import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PackageCheck, Truck } from 'lucide-react'
import { trackingSteps, products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { formatCurrency } from '../utils/formatters'

const stepIndexByStatus = {
  Processing: 1,
  Packed: 2,
  Shipped: 3,
  'Out for Delivery': 4,
  Delivered: 5,
}

export function OrderTracking() {
  const { orderId } = useParams()
  const orders = useAppStore((state) => state.orders)
  const order = orders.find((item) => item.id === orderId) ?? orders[0]
  const activeIndex = stepIndexByStatus[order?.status] ?? 1
  const items = (order?.items ?? [])
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product)

  if (!order) {
    return (
      <div className="rounded-[2rem] bg-white p-6 text-center shadow-soft">
        <h1 className="font-display text-4xl font-bold">Order not found</h1>
        <Link to="/orders" className="mt-5 inline-flex h-12 items-center rounded-full bg-moss px-6 text-sm font-extrabold text-white">View orders</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <section className="rounded-[2rem] bg-white p-5 shadow-soft">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Tracking</p>
        <h1 className="font-display text-4xl font-bold">{order.id}</h1>
        <div className="mt-6 space-y-0">
          {trackingSteps.map((step, index) => {
            const done = index <= activeIndex
            return (
              <div key={step} className="relative flex gap-4 pb-7 last:pb-0">
                {index < trackingSteps.length - 1 ? (
                  <span className="absolute left-[1.1rem] top-9 h-full w-0.5 bg-stone-200">
                    {done ? (
                      <motion.span
                        className="block w-full bg-moss"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                      />
                    ) : null}
                  </span>
                ) : null}
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: done ? 1 : 0.92 }}
                  className={`relative z-10 grid h-9 w-9 place-items-center rounded-full ${done ? 'bg-moss text-white' : 'bg-cream text-stone-400'}`}
                >
                  <PackageCheck size={17} />
                </motion.span>
                <div>
                  <p className="font-extrabold text-ink">{step}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    {done ? 'Completed in demo tracking flow' : 'Pending update'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-[2rem] bg-moss p-5 text-white shadow-soft">
          <Truck size={28} className="text-rose" />
          <p className="mt-4 font-display text-3xl font-bold">Delivery ETA</p>
          <p className="mt-2 text-sm text-white/70">{order.deliveryEta}</p>
          <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm font-bold">Partner: Arborea Express</p>
        </div>
        <div className="rounded-[2rem] bg-white p-5 shadow-soft">
          <p className="font-display text-3xl font-bold">Order Summary</p>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <img src={item.product.image} alt={item.product.name} className="h-16 w-14 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">{item.product.name}</p>
                  <p className="text-xs text-stone-500">Qty {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 font-black">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
