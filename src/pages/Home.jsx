import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/commerce/ProductCard'
import { TopProductsSlideshow } from '../components/commerce/TopProductsSlideshow'
import { SectionHeader } from '../components/commerce/SectionHeader'
import { SEO } from '../components/ui/SEO'
import { products } from '../data'
import { staggerContainer } from '../utils/animations'

const trustBadges = [
  { label: 'Derma tested', icon: ShieldCheck },
  { label: 'Indian skin', icon: BadgeCheck },
  { label: 'COD', icon: CreditCard },
  { label: 'Fast delivery', icon: Truck },
]

const concerns = [
  ['Acne', 'bg-[#eaf1e8] text-moss'],
  ['Tan', 'bg-[#fff2cf] text-[#8a5a12]'],
  ['Oily', 'bg-stone-100 text-stone-700'],
  ['Dry', 'bg-[#edf7ef] text-moss'],
  ['Fresh', 'bg-[#f8e9e2] text-clay'],
  ['Daily', 'bg-[#f6efe5] text-clay'],
]

const offers = [
  ['Buy 2 Get 1', 'ARBOREA3'],
  ['Free ship ₹499+', ''],
]

const sections = [
  { title: 'Face Wash', products: products.filter((item) => item.category === 'Face Wash') },
  { title: 'Body Wash', products: products.filter((item) => item.category === 'Body Wash') },
]

function AnnouncementBar() {
  return (
    <p className="-mx-4 bg-moss px-4 py-2 text-center text-[11px] font-bold text-white sm:rounded-full lg:mx-0">
      Buy 2 Get 1 · Free shipping above ₹499
    </p>
  )
}

function TrustGrid() {
  return (
    <section className="grid grid-cols-4 gap-2">
      {trustBadges.map((badge) => {
        const Icon = badge.icon
        return (
          <article key={badge.label} className="flex flex-col items-center gap-1.5 rounded-brand bg-white py-3 ring-1 ring-stone-100">
            <Icon size={18} className="text-moss" />
            <p className="text-[10px] font-bold leading-tight text-stone-600">{badge.label}</p>
          </article>
        )
      })}
    </section>
  )
}

function ShopByConcern() {
  return (
    <section>
      <SectionHeader title="Shop by concern" />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {concerns.map(([title, tone]) => (
          <Link
            key={title}
            to="/shop"
            className={`rounded-brand py-3 text-center text-sm font-extrabold transition active:scale-[0.98] ${tone}`}
          >
            {title}
          </Link>
        ))}
      </div>
    </section>
  )
}

function OfferStrip() {
  return (
    <section className="grid grid-cols-2 gap-2.5">
      {offers.map(([title, code]) => (
        <Link key={title} to="/shop" className="rounded-brand bg-white px-4 py-3.5 ring-1 ring-stone-100">
          <p className="text-sm font-extrabold text-ink">{title}</p>
          {code ? <p className="mt-0.5 text-[11px] font-bold text-turmeric">{code}</p> : null}
        </Link>
      ))}
    </section>
  )
}

function ProductRail({ title, items }) {
  if (!items.length) return null

  return (
    <section>
      <SectionHeader
        title={title}
        action={
          <Link to="/shop" className="text-sm font-extrabold text-moss">
            All <ArrowRight size={14} className="inline" />
          </Link>
        }
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible"
      >
        {items.map((product) => (
          <div key={product.id} className="min-w-[68%] snap-center sm:min-w-[220px] lg:min-w-0">
            <ProductCard product={product} compact />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function RatingBand() {
  return (
    <section className="flex items-center justify-between rounded-brand bg-moss px-4 py-4 text-white">
      <span className="text-sm font-extrabold">4.8 ★ · 10k+ orders</span>
      <div className="flex gap-0.5 text-[#ffd782]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div className="space-y-6 lg:space-y-7">
      <SEO
        title="Indian Personal Care Essentials"
        description="Shop Arborea face wash and body wash made for Indian skin, daily routines, and trusted family care."
      />
      <TopProductsSlideshow />
      <AnnouncementBar />
      <TrustGrid />
      <ShopByConcern />
      <OfferStrip />
      {sections.map((section) => (
        <ProductRail key={section.title} title={section.title} items={section.products} />
      ))}
      <RatingBand />
    </div>
  )
}
