import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Search, X } from 'lucide-react'
import { ProductCard } from '../components/commerce/ProductCard'
import { SectionHeader } from '../components/commerce/SectionHeader'
import { EmptyState } from '../components/commerce/EmptyState'
import { categories, products } from '../data'
import { staggerContainer } from '../utils/animations'

const sortOptions = [
  ['popular', 'Most popular'],
  ['new', 'New arrivals'],
  ['low', 'Price low to high'],
  ['high', 'Price high to low'],
]

export function Shop() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [price, setPrice] = useState('all')
  const [rating, setRating] = useState(0)
  const [badge, setBadge] = useState('all')
  const [sort, setSort] = useState('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const result = products.filter((product) => {
      const matchesQuery = !term || [product.name, product.category, product.tag].join(' ').toLowerCase().includes(term)
      const matchesCategory = category === 'All' || product.category === category
      const matchesPrice =
        price === 'all' ||
        (price === 'under500' && product.price < 500) ||
        (price === '500to900' && product.price >= 500 && product.price <= 900) ||
        (price === 'above900' && product.price > 900)
      const matchesRating = product.rating >= rating
      const matchesBadge =
        badge === 'all' ||
        (badge === 'bestseller' && product.isBestseller) ||
        (badge === 'new' && product.isNew)

      return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesBadge
    })

    return [...result].sort((a, b) => {
      if (sort === 'low') return a.price - b.price
      if (sort === 'high') return b.price - a.price
      if (sort === 'new') return Number(b.isNew) - Number(a.isNew)
      return b.popularity - a.popularity
    })
  }, [badge, category, price, query, rating, sort])

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Face wash, body wash and combos" title="Shop Arborea" />

      <div className="sticky top-[4.25rem] z-20 rounded-brand border border-stone-100 bg-white p-3 lg:top-24">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="flex h-12 items-center gap-2 rounded-2xl bg-cream px-4">
            <Search size={18} className="text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search neem, aloe, lemon..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-moss px-4 text-sm font-extrabold text-white lg:hidden"
          >
            <Filter size={18} />
            Filters
          </button>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-12 rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold text-ink outline-none"
          >
            {sortOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            badge={badge}
            setBadge={setBadge}
          />
        </aside>

        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-stone-500">{filtered.length} products found</p>
            <span className="shrink-0 rounded-full bg-mist px-3 py-1 text-xs font-extrabold text-moss">
              Fast delivery available
            </span>
          </div>
          {filtered.length ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <EmptyState title="No products found" description="Try clearing filters or searching for another Arborea essential." />
          )}
        </section>
      </div>

      <AnimatePresence>
        {filtersOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
            />
            <motion.aside
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed inset-x-0 bottom-0 z-[70] max-h-[86dvh] overflow-y-auto rounded-t-[1.5rem] bg-pearl p-5 shadow-xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-3xl font-bold">Filters</p>
                <button onClick={() => setFiltersOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm" aria-label="Close filters">
                  <X size={18} />
                </button>
              </div>
              <FilterPanel
                category={category}
                setCategory={setCategory}
                price={price}
                setPrice={setPrice}
                rating={rating}
                setRating={setRating}
                badge={badge}
                setBadge={setBadge}
              />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function FilterPanel({ category, setCategory, price, setPrice, rating, setRating, badge, setBadge }) {
  const categoryNames = ['All', ...categories.map((item) => item.name)]

  return (
    <div className="space-y-5 rounded-brand bg-white p-4 ring-1 ring-stone-100">
      <FilterGroup title="Category">
        <ChipGrid items={categoryNames} value={category} onChange={setCategory} />
      </FilterGroup>
      <FilterGroup title="Price">
        <ChipGrid
          items={[
            ['all', 'All'],
            ['under500', 'Under INR 500'],
            ['500to900', 'INR 500 - 900'],
            ['above900', 'Above INR 900'],
          ]}
          value={price}
          onChange={setPrice}
        />
      </FilterGroup>
      <FilterGroup title="Rating">
        <ChipGrid
          items={[
            [0, 'All'],
            [4.5, '4.5+'],
            [4.7, '4.7+'],
            [4.8, '4.8+'],
          ]}
          value={rating}
          onChange={setRating}
        />
      </FilterGroup>
      <FilterGroup title="Badges">
        <ChipGrid
          items={[
            ['all', 'All'],
            ['bestseller', 'Bestseller'],
            ['new', 'New'],
          ]}
          value={badge}
          onChange={setBadge}
        />
      </FilterGroup>
    </div>
  )
}

function FilterGroup({ title, children }) {
  return (
    <section>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-clay">{title}</p>
      {children}
    </section>
  )
}

function ChipGrid({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const key = Array.isArray(item) ? item[0] : item
        const label = Array.isArray(item) ? item[1] : item
        return (
          <button
            type="button"
            key={key}
            onClick={() => onChange(key)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              value === key ? 'bg-moss text-white shadow-soft' : 'bg-cream text-stone-600 hover:bg-mist hover:text-ink'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
