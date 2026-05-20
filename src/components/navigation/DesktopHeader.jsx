import { Heart, Menu, ShoppingBag, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/useAuthStore'
import { useAppStore } from '../../store/useAppStore'
import { useCartCount } from '../../hooks/useCartCount'
import { HeaderSearchBar } from './HeaderSearchBar'

export function DesktopHeader({ onMenu }) {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const openCartDrawer = useAppStore((state) => state.openCartDrawer)
  const wishlist = useAppStore((state) => state.wishlist)
  const cartCount = useCartCount()
  const cartBump = useAppStore((state) => state.cartBump)
  const wishlistCount = wishlist.length

  return (
    <header className="sticky top-0 z-30 hidden border-b border-stone-100 bg-[#fbf7f1] dark:border-stone-850/80 dark:bg-[#0c0b0a] lg:block">
      <div className="page-shell">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={onMenu}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-stone-100 bg-white text-stone-600 shadow-sm transition active:scale-95 dark:border-stone-800 dark:bg-stone-850 dark:text-white"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <NavLink to="/" className="truncate font-display text-3xl font-bold tracking-tight text-ink hover:opacity-90 dark:text-white">
              Arborea
            </NavLink>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <NavLink
              to="/wishlist"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-stone-100 bg-white text-stone-600 shadow-sm transition active:scale-95 dark:border-stone-800 dark:bg-stone-850 dark:text-white"
              aria-label="Wishlist"
            >
              {({ isActive }) => (
                <>
                  <Heart
                    size={19}
                    className={isActive ? 'fill-rose/30 text-clay' : ''}
                    strokeWidth={2.2}
                  />
                  {wishlistCount > 0 ? (
                    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-turmeric px-1 text-[9px] font-black text-white">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-stone-100 bg-white text-stone-600 shadow-sm transition active:scale-95 dark:border-stone-800 dark:bg-stone-850 dark:text-white"
              aria-label="Open cart"
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
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-stone-100 bg-white py-1 pl-1 pr-4 shadow-sm transition active:scale-98 dark:border-stone-800 dark:bg-stone-850"
              >
                <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover shadow-sm" />
                <span className="text-xs font-black uppercase tracking-wider text-ink dark:text-white">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-moss px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#29472d] active:scale-95 dark:bg-clay"
              >
                <User size={18} strokeWidth={2.2} />
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="border-t border-stone-100 pb-3.5 pt-2.5 dark:border-stone-800">
          <HeaderSearchBar className="max-w-2xl" />
        </div>
      </div>
    </header>
  )
}
