import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

export function CategoryCard({ category }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={`/shop?category=${category.id}`}
        className="group block overflow-hidden rounded-brand bg-white shadow-soft"
      >
        <div className="relative aspect-[5/4] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-lg font-bold">{category.name}</h3>
            <p className="text-sm text-white/80">{category.count} essentials</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
