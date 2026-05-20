import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useAuthStore } from '../../store/useAuthStore'
import { useToastStore } from '../../store/useToastStore'
import { drawerNav } from './navItems'

export function SlideDrawer({ open, onClose }) {
  const fallbackUser = useAppStore((state) => state.user)
  const authUser = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const showToast = useToastStore((state) => state.showToast)
  const navigate = useNavigate()
  const user = authUser ?? fallbackUser

  const handleLogout = () => {
    logout()
    showToast('Logout successful')
    onClose()
    navigate('/')
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
            className="fixed left-0 top-0 z-50 flex h-screen max-h-[100dvh] w-[270px] shrink-0 flex-col overflow-hidden bg-pearl shadow-xl"
          >
            <div className="shrink-0 border-b border-stone-100 px-5 pb-4 pt-5">
              <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-3xl font-bold">Arborea</p>
                <p className="text-sm text-stone-500">Indian care essentials</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full bg-cream"
                aria-label="Close menu"
              >
                <X size={19} />
              </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
            {isAuthenticated ? (
              <div className="mt-5 flex items-center gap-3 rounded-brand bg-cream p-3">
                <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-ink">{user.name}</p>
                  <p className="text-sm font-bold text-clay">Reward Balance: ₹{user.points}</p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="mt-5 block rounded-brand bg-moss p-4 text-center text-sm font-extrabold text-white shadow-soft"
              >
                Login for cart, COD and orders
              </Link>
            )}
            <nav className="mt-5 grid gap-1.5">
              {drawerNav.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                        isActive ? 'bg-moss text-white' : 'text-stone-600 hover:bg-cream hover:text-ink'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center gap-3 rounded-xl bg-cream px-4 py-3.5 text-sm font-bold text-ink"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : null}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
