import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { ProductCard } from '../components/commerce/ProductCard'
import { products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { formatCurrency } from '../utils/formatters'

export function OrderSuccess() {
  const { orderId } = useParams()
  const orders = useAppStore((state) => state.orders)
  const order = orders.find((item) => item.id === orderId) ?? orders[0]
  const recommended = products.slice(0, 4)

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.25rem] bg-hero-wash p-6 text-center shadow-soft sm:p-10"
      >
        <Celebration />
        <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-moss shadow-soft">
          <CheckCircle2 size={54} />
        </div>
        <h1 className="relative mt-6 font-display text-5xl font-bold text-ink">Thank you</h1>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600">
          Your Arborea order has been confirmed. We are preparing your botanical ritual with care.
        </p>
        {order ? (
          <>
            <div className="relative mx-auto mt-6 grid max-w-2xl gap-3 rounded-[1.5rem] bg-white/90 dark:bg-stone-900/90 p-4 text-left shadow-soft sm:grid-cols-2 border border-white/50 dark:border-stone-800">
              <Info label="Order ID" value={order.id} />
              <Info label="Total" value={formatCurrency(order.total)} />
              <Info label="Payment" value={order.paymentMethod} />
              <Info label="Delivery" value={order.deliveryEta} />
            </div>
            <DeliveryTimeline />
          </>
        ) : null}
        <div className="relative mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-extrabold text-ink shadow-soft">
            Continue shopping
          </Link>
          <Link to={`/track-order/${order?.id}`} className="inline-flex h-12 items-center justify-center rounded-full bg-moss px-6 text-sm font-extrabold text-white shadow-soft">
            Track order
          </Link>
        </div>
      </motion.section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">Recommended</p>
          <h2 className="font-display text-3xl font-bold">Complete your ritual</h2>
        </div>
        <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4">
          {recommended.map((product) => (
            <div key={product.id} className="min-w-[78%] snap-center sm:min-w-[300px] lg:min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-cream/70 dark:bg-stone-800/70 p-3 ring-1 ring-white/40 dark:ring-stone-700/40">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-clay dark:text-cream">{label}</p>
      <p className="mt-1 font-bold text-ink dark:text-white text-sm">{value}</p>
    </div>
  )
}

function DeliveryTimeline() {
  const steps = [
    { title: "Ritual Prepared", desc: "Batch formulation locked", active: true },
    { title: "Botanical Infusion", desc: "Eco-packaging & sealing", active: true },
    { title: "Concierge Hand-off", desc: "Out for courier dispatch", active: false },
    { title: "Doorstep Welcome", desc: "Estimated delivery", active: false }
  ]

  return (
    <div className="mt-8 max-w-xl mx-auto text-left bg-white/70 dark:bg-stone-900/70 p-6 rounded-[2rem] shadow-soft backdrop-blur border border-white/50 dark:border-stone-800">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-clay dark:text-cream mb-4">Regimen formulation track</p>
      <div className="relative pl-6 space-y-6">
        <div className="absolute left-2.5 top-2.5 bottom-2.5 w-[1px] bg-stone-200 dark:bg-stone-800" />
        
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex gap-4">
            {/* Glowing timeline node indicator */}
            <motion.span
              animate={step.active ? { scale: [1, 1.25, 1], boxShadow: ["0 0 0 0px rgba(74,93,78,0.2)", "0 0 0 8px rgba(74,93,78,0)", "0 0 0 0px rgba(74,93,78,0)"] } : {}}
              transition={{ repeat: Infinity, duration: 2.2, delay: idx * 0.4 }}
              className={`absolute -left-5 top-1 h-3.5 w-3.5 rounded-full border-2 ${
                step.active 
                  ? "bg-moss border-moss dark:bg-cream dark:border-cream" 
                  : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700"
              }`}
            />
            <div>
              <p className={`text-sm font-extrabold ${step.active ? "text-ink dark:text-white" : "text-stone-400 dark:text-stone-600"}`}>
                {step.title}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-500 mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Celebration() {
  // Spore particle count
  const particlesCount = 20

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: particlesCount }).map((_, index) => {
        const angle = (index / particlesCount) * 2 * Math.PI
        const distance = 180 + Math.random() * 120
        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-clay dark:bg-cream"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0.3, 1, 0],
            }}
            transition={{ 
              duration: 2.2, 
              delay: 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          />
        )
      })}
    </div>
  )
}
