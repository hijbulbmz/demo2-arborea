import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/useAuthStore'
import { useAppStore } from '../../store/useAppStore'
import { useCartCount } from '../../hooks/useCartCount'
import { primaryNav } from './navItems'

export function DesktopHeader({ onMenu }) {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const openSearch = useAppStore((state) => state.openSearch)
  const openCartDrawer = useAppStore((state) => state.openCartDrawer)
  const cartCount = useCartCount()
  const cartBump = useAppStore((state) => state.cartBump)

  return (
    <header className="sticky top-0 z-30 hidden border-b border-stone-100 bg-[#fbf7f1] dark:border-stone-850/80 dark:bg-[#0c0b0a] lg:block">
      <div className="page-shell flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenu}
            className="grid h-11 w-11 place-items-center rounded-full bg-white dark:bg-stone-850 text-stone-600 dark:text-white shadow-sm border border-stone-100 dark:border-stone-800 active:scale-95 transition"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <NavLink to="/" className="font-display text-3xl font-bold tracking-tight text-ink dark:text-white hover:opacity-90">
            Arborea
          </NavLink>
        </div>
        
        <nav className="flex items-center gap-1 rounded-full bg-white dark:bg-stone-900 p-1 shadow-sm border border-stone-100 dark:border-stone-800/80">
          {primaryNav.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative rounded-full px-4.5 py-2.5 text-xs font-extrabold uppercase tracking-widest select-none"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeDesktopNav"
                      className="absolute inset-0 bg-moss dark:bg-clay rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-250 ${isActive ? 'text-white' : 'text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-white'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSearch}
            className="grid h-11 w-11 place-items-center rounded-full bg-white dark:bg-stone-850 text-stone-600 dark:text-white shadow-sm border border-stone-100 dark:border-stone-800 active:scale-95 transition"
            aria-label="Search"
          >
            <Search size={19} />
          </button>
          <button
            type="button"
            onClick={openCartDrawer}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white dark:bg-stone-850 text-stone-600 dark:text-white shadow-sm border border-stone-100 dark:border-stone-800 active:scale-95 transition"
            aria-label="Cart"
          >
            <motion.span
              key={cartBump}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.35 }}
              className="inline-flex"
            >
              <ShoppingBag size={19} />
            </motion.span>
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-turmeric px-1 text-[9px] font-black text-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            ) : null}
          </button>
          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center gap-2 rounded-full bg-white dark:bg-stone-850 border border-stone-100 dark:border-stone-800 py-1 pl-1 pr-4 shadow-sm active:scale-98 transition">
              <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover shadow-sm" />
              <span className="text-xs font-black uppercase tracking-wider text-ink dark:text-white">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-moss dark:bg-clay px-5 text-sm font-bold text-white shadow-soft transition hover:bg-[#29472d] active:scale-95"
            >
              <User size={18} strokeWidth={2.2} />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
