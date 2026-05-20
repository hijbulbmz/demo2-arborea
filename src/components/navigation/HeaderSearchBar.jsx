import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export function HeaderSearchBar({ className = '' }) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const addRecentSearch = useAppStore((state) => state.addRecentSearch)
  const [value, setValue] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(search)
    const q = params.get('q') ?? ''
    if (pathname === '/shop' || pathname.startsWith('/shop')) {
      setValue(q)
    }
  }, [pathname, search])

  const handleSubmit = (event) => {
    event.preventDefault()
    const term = value.trim()
    if (term) addRecentSearch(term)
    const params = new URLSearchParams()
    if (term) params.set('q', term)
    navigate(`/shop${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="flex h-11 items-center gap-2 rounded-2xl bg-white px-3 ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
        <Search size={18} className="shrink-0 text-stone-400" aria-hidden />
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search neem, aloe, rose..."
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-stone-400 dark:text-white"
          aria-label="Search products"
        />
      </label>
    </form>
  )
}
