import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Youtube,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/commerce/ProductCard'
import { SectionHeader } from '../components/commerce/SectionHeader'
import { ArboreaShowcase, InteractionHighlights } from '../components/sections/MarketingSections'
import { SEO } from '../components/ui/SEO'
import { products } from '../data'
import { fadeUp, staggerContainer } from '../utils/animations'

const trustBadges = [
  { label: 'Dermatologically Tested', icon: ShieldCheck },
  { label: 'Made for Indian Skin', icon: BadgeCheck },
  { label: 'Safe Ingredients', icon: Leaf },
  { label: 'COD Available', icon: CreditCard },
  { label: 'Trusted by Thousands', icon: Heart },
  { label: 'Fast Delivery', icon: Truck },
]

const concerns = [
  ['Acne & Pimples', 'Neem + Tea Tree', 'bg-[#eaf1e8] text-moss'],
  ['Tan & Dullness', 'Vitamin C + Lemon', 'bg-[#fff2cf] text-[#8a5a12]'],
  ['Oily Skin', 'Charcoal care', 'bg-stone-100 text-stone-700'],
  ['Dry Skin', 'Aloe hydration', 'bg-[#edf7ef] text-moss'],
  ['Body Freshness', 'Rose + Coffee', 'bg-[#f8e9e2] text-clay'],
  ['Family Use', 'Gentle daily cleansers', 'bg-[#f6efe5] text-clay'],
]

const offerCards = [
  ['Buy 2 Get 1', 'On selected face washes', 'Use ARBOREA3'],
  ['Free shipping', 'Orders above INR 499', 'Pan-India'],
  ['Festival offers', 'Family packs under INR 699', 'Limited period'],
  ['Summer care', 'Cooling aloe and lemon picks', 'Beat the heat'],
]

const sections = [
  {
    eyebrow: 'Customer Favorites',
    title: 'Best Selling Products',
    products: products.filter((item) => item.isBestseller),
  },
  {
    eyebrow: 'Gentle Cleansers',
    title: 'Face Wash Collection',
    products: products.filter((item) => item.category === 'Face Wash'),
  },
  {
    eyebrow: 'Daily showers',
    title: 'Body Wash Collection',
    products: products.filter((item) => item.category === 'Body Wash'),
  },
]

function AnnouncementBar() {
  return (
    <div className="-mx-4 rounded-none bg-moss px-4 py-2 text-center text-xs font-extrabold text-white sm:rounded-full lg:-mx-0">
      Buy 2 Get 1 Free this week | Free shipping above INR 499 | COD available on eligible pincodes
    </div>
  )
}

function EcommerceHero() {
  return (
    <section className="overflow-hidden rounded-brand bg-[#f6efe5] lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-10"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-moss shadow-sm"
        >
          <Sparkles size={14} className="text-turmeric" />
          Modern Indian personal care
        </motion.span>
        <motion.h1 variants={fadeUp} className="mt-3 max-w-2xl font-display text-2xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
          Everyday skin and body care made for Indian routines.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-3 max-w-xl text-sm font-semibold leading-6 text-stone-600 sm:text-base sm:leading-7">
          Neem, aloe, vitamin C, sandal, rose, lemon, and coffee essentials that feel premium, practical, and easy to trust.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/shop"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-moss px-6 text-sm font-extrabold text-white transition hover:bg-[#29472d]"
          >
            <ShoppingBag size={18} />
            Shop Bestsellers
          </Link>
          <Link
            to="/shop?category=Body+Wash"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-ink ring-1 ring-stone-200 transition hover:bg-cream"
          >
            <ArrowRight size={18} />
            Shop Body Wash
          </Link>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-6 hidden gap-2 text-center sm:grid sm:grid-cols-3">
          {['No harsh feel', 'From INR 139', '2-5 day delivery'].map((item) => (
            <span key={item} className="rounded-2xl bg-white/80 px-3 py-3 text-xs font-extrabold leading-tight text-clay">
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
      <div className="relative bg-[#efe4d6] px-5 pb-6 lg:p-8">
        <img
          src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1100&q=80"
          alt="Arborea personal care products"
          className="aspect-[5/4] max-h-[220px] w-full rounded-brand object-cover sm:max-h-none sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-none"
          loading="eager"
        />
        <div className="absolute bottom-9 left-8 right-8 rounded-brand bg-white/95 p-3 ring-1 ring-stone-100">
          <p className="text-xs font-extrabold uppercase tracking-wide text-turmeric">Summer saver</p>
          <p className="mt-1 text-sm font-black text-ink">Aloe + Lemon care kit at 35% off</p>
        </div>
      </div>
    </section>
  )
}

function TrustGrid() {
  return (
    <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
      {trustBadges.map((badge) => {
        const Icon = badge.icon
        return (
          <article key={badge.label} className="rounded-brand bg-white p-4 text-center ring-1 ring-stone-100">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#eaf1e8] text-moss">
              <Icon size={19} />
            </span>
            <p className="mt-2 text-xs font-extrabold leading-tight text-ink">{badge.label}</p>
          </article>
        )
      })}
    </section>
  )
}

function ShopByConcern() {
  return (
    <section>
      <SectionHeader eyebrow="Shop by Concern" title="Find care that fits your day" />
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-6">
        {concerns.map(([title, subtitle, tone]) => (
          <Link key={title} to="/shop" className={`rounded-brand p-4 transition hover:-translate-y-0.5 ${tone}`}>
            <p className="text-base font-black leading-tight">{title}</p>
            <p className="mt-2 text-xs font-bold opacity-80">{subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function OfferStrip() {
  return (
    <section className="grid gap-3.5 lg:grid-cols-4">
      {offerCards.map(([title, body, label]) => (
        <Link key={title} to="/shop" className="rounded-brand bg-white p-5 ring-1 ring-stone-100 transition hover:-translate-y-0.5">
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-turmeric">{label}</p>
          <h3 className="mt-2 text-xl font-black text-ink">{title}</h3>
          <p className="mt-1 text-sm font-semibold text-stone-600">{body}</p>
        </Link>
      ))}
    </section>
  )
}

function ProductRail({ eyebrow, title, items }) {
  if (!items.length) return null

  return (
    <section>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        action={
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-extrabold text-moss">
            View all <ArrowRight size={16} />
          </Link>
        }
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="hide-scrollbar flex snap-x gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible"
      >
        {items.map((product) => (
          <div key={product.id} className="min-w-[72%] snap-center sm:min-w-[240px] lg:min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function RatingBand() {
  return (
    <section className="rounded-brand bg-moss p-5 text-white lg:flex lg:items-center lg:justify-between lg:p-7">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-[#ffd782]">Trusted by thousands</p>
        <h2 className="mt-2 text-2xl font-black">Clean formulas, familiar ingredients, honest prices.</h2>
      </div>
      <div className="mt-4 flex items-center gap-2 lg:mt-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={19} className="fill-[#ffd782] text-[#ffd782]" />
        ))}
        <span className="ml-2 text-sm font-extrabold">4.8 average rating</span>
      </div>
    </section>
  )
}

function HomeFooter() {
  return (
    <footer className="rounded-brand bg-[#efe4d6] px-5 py-7 text-ink lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-3xl font-extrabold">Arborea</p>
          <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-stone-600">
            Warm, modern personal care for Indian skin, daily showers, family shelves, and budget-friendly routines.
          </p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Facebook, Youtube].map((Icon, index) => (
              <button key={index} className="grid h-9 w-9 place-items-center rounded-full bg-white text-moss" aria-label="Social link">
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-extrabold">Shop</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-stone-600">
            <span>Face Wash</span>
            <span>Body Wash</span>
          </div>
        </div>
        <div>
          <p className="font-extrabold">Support</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-stone-600">
            <span>Shipping</span>
            <span>Returns</span>
            <span>Orders</span>
          </div>
        </div>
        <div>
          <p className="font-extrabold">Offers</p>
          <div className="mt-3 rounded-full bg-white p-1">
            <Link to="/shop" className="inline-flex h-10 w-full items-center justify-center rounded-full bg-turmeric text-sm font-black text-white">
              Shop current deals
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function Home() {
  return (
    <div className="space-y-8 lg:space-y-9">
      <SEO
        title="Indian Personal Care Essentials"
        description="Shop Arborea face wash and body wash made for Indian skin, daily routines, and trusted family care."
      />
      <AnnouncementBar />
      <EcommerceHero />
      <TrustGrid />
      <ShopByConcern />
      <OfferStrip />
      <ArboreaShowcase />
      <InteractionHighlights />
      {sections.map((section) => (
        <ProductRail key={section.title} eyebrow={section.eyebrow} title={section.title} items={section.products} />
      ))}
      <RatingBand />
      <HomeFooter />
    </div>
  )
}
