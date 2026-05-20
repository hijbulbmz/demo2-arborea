import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Instagram,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/commerce/ProductCard'
import { SectionHeader } from '../components/commerce/SectionHeader'
import { SEO } from '../components/ui/SEO'
import { products } from '../data'
import { fadeUp, staggerContainer } from '../utils/animations'

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
  { title: 'Bestsellers', products: products.filter((item) => item.isBestseller) },
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

function EcommerceHero() {
  return (
    <section className="overflow-hidden rounded-brand bg-[#f6efe5] lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="px-5 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-8"
      >
        <motion.h1 variants={fadeUp} className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
          Daily care for Indian skin.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-2 text-sm font-semibold text-stone-600">
          Face wash & body wash from ₹139.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-5 flex gap-2.5">
          <Link
            to="/shop"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-extrabold text-white sm:flex-none"
          >
            <ShoppingBag size={17} />
            Shop now
          </Link>
          <Link
            to="/shop?category=Face+Wash"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-extrabold text-ink ring-1 ring-stone-200"
          >
            Face wash
          </Link>
        </motion.div>
      </motion.div>
      <div className="relative bg-[#efe4d6] px-5 pb-5 lg:p-7">
        <img
          src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1100&q=80"
          alt="Arborea products"
          className="aspect-[5/4] max-h-[200px] w-full rounded-brand object-cover sm:max-h-none sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-none"
          loading="eager"
        />
        <span className="absolute bottom-7 left-7 rounded-full bg-turmeric px-3 py-1.5 text-xs font-black text-white">
          Up to 35% off
        </span>
      </div>
    </section>
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

function HomeFooter() {
  return (
    <footer className="flex flex-col gap-4 rounded-brand bg-[#efe4d6] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="font-display text-2xl font-extrabold text-ink">Arborea</p>
        <span className="text-xs font-semibold text-stone-600">Face & body care</span>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/shop" className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-turmeric px-5 text-sm font-black text-white sm:flex-none">
          Shop deals
        </Link>
        <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white text-moss" aria-label="Instagram">
          <Instagram size={17} />
        </a>
      </div>
    </footer>
  )
}

export function Home() {
  return (
    <div className="space-y-7 lg:space-y-8">
      <SEO
        title="Indian Personal Care Essentials"
        description="Shop Arborea face wash and body wash made for Indian skin, daily routines, and trusted family care."
      />
      <AnnouncementBar />
      <EcommerceHero />
      <TrustGrid />
      <ShopByConcern />
      <OfferStrip />
      {sections.map((section) => (
        <ProductRail key={section.title} title={section.title} items={section.products} />
      ))}
      <RatingBand />
      <HomeFooter />
    </div>
  )
}
