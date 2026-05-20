import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, TrendingUp, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data'
import { useAppStore } from '../../store/useAppStore'
import { EmptyState } from './EmptyState'

const trending = ['Neem Face Wash', 'Vitamin C Face Wash', 'Sandal Body Wash', 'Summer Combo']

export function SearchOverlay() {
  const isOpen = useAppStore((state) => state.isSearchOpen)
  const close = useAppStore((state) => state.closeSearch)
  const recentSearches = useAppStore((state) => state.recentSearches)
  const addRecentSearch = useAppStore((state) => state.addRecentSearch)
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products.filter((product) =>
      [product.name, product.category, product.tag, ...product.ingredients].join(' ').toLowerCase().includes(term),
    )
  }, [query])

  const submitTerm = (term) => {
    setQuery(term)
    addRecentSearch(term)
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close search"
            className="fixed inset-0 z-[70] bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.section
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[90dvh] overflow-y-auto rounded-t-[1.5rem] bg-pearl p-5 shadow-xl lg:left-1/2 lg:top-12 lg:max-h-[760px] lg:w-[720px] lg:-translate-x-1/2 lg:rounded-[2rem]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 flex-1 items-center gap-2 rounded-full bg-white px-4 ring-1 ring-stone-100">
                <Search size={18} className="text-stone-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search neem, aloe, sandal..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                />
              </div>
              <button onClick={close} className="grid h-12 w-12 place-items-center rounded-full bg-white ring-1 ring-stone-100" aria-label="Close search">
                <X size={18} />
              </button>
            </div>

            {!query ? (
              <div className="mt-6 space-y-5">
                <SearchChips title="Recent searches" items={recentSearches} onSelect={submitTerm} />
                <SearchChips title="Trending searches" items={trending} onSelect={submitTerm} icon={TrendingUp} />
              </div>
            ) : results.length ? (
              <div className="mt-5 grid gap-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      addRecentSearch(query)
                      close()
                    }}
                    className="flex items-center gap-3 rounded-brand bg-white p-3 ring-1 ring-stone-100"
                  >
                    <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-extrabold text-ink">{product.name}</p>
                      <p className="text-sm text-stone-500">{product.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8">
                <EmptyState title="No match found" description="Try searching neem, aloe, vitamin C, sandal, or coffee." />
              </div>
            )}
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  )
}

function SearchChips({ title, items, onSelect, icon: Icon }) {
  return (
    <section>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-clay">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => onSelect(item)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink ring-1 ring-stone-100"
          >
            {Icon ? <Icon size={15} className="text-moss" /> : null}
            {item}
          </button>
        ))}
      </div>
    </section>
  )
}
