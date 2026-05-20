import { motion } from 'framer-motion'
import { EmptyState } from '../components/commerce/EmptyState'
import { ProductCard } from '../components/commerce/ProductCard'
import { SectionHeader } from '../components/commerce/SectionHeader'
import { products } from '../data'
import { useAppStore } from '../store/useAppStore'
import { staggerContainer } from '../utils/animations'

export function Wishlist() {
  const wishlist = useAppStore((state) => state.wishlist)
  const items = products.filter((product) => wishlist.includes(product.id))

  if (!items.length) {
    return (
      <EmptyState
        title="Wishlist is empty"
        description="Tap the heart on products you love and build your botanical shelf."
        actionLabel="Explore products"
      />
    )
  }

  return (
    <div className="space-y-5">
      <SectionHeader eyebrow="Saved rituals" title="Wishlist" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  )
}
