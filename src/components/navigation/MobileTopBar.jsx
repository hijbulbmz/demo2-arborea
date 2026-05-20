import { Heart, Menu, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { useAppStore } from '../../store/useAppStore'
import { HeaderSearchBar } from './HeaderSearchBar'

export function MobileTopBar({ onMenu }) {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const wishlist = useAppStore((state) => state.wishlist)
  const wishlistCount = wishlist.length

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-cream/95 lg:hidden">
      <div className="flex h-[3.75rem] items-center justify-between px-4">
        <button
          type="button"
          onClick={onMenu}
          className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-stone-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="font-display text-2xl font-extrabold text-ink">
          Arborea
        </Link>
        <div className="flex items-center gap-2">
          <NavLink
            to="/wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-stone-100"
            aria-label="Wishlist"
          >
            {({ isActive }) => (
              <>
                <Heart
                  size={18}
                  className={isActive ? 'fill-rose/30 text-clay' : 'text-stone-600'}
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
          {isAuthenticated ? (
            <Link to="/profile" className="block h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-stone-100" aria-label="Profile">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-10 items-center gap-1 rounded-full bg-white px-3 text-xs font-extrabold text-ink shadow-sm"
              aria-label="Login"
            >
              <User size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="border-t border-stone-100 px-4 pb-3 pt-2">
        <HeaderSearchBar />
      </div>
    </header>
  )
}
