import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useCartCount } from '../../hooks/useCartCount'
import { primaryNav } from './navItems'

export function BottomNav() {
  const cartCount = useCartCount()
  const cartBump = useAppStore((state) => state.cartBump)

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none sm:px-4"
      aria-label="Main navigation"
    >
      <div className="pointer-events-auto flex h-[3.75rem] w-full max-w-lg items-stretch justify-between gap-0.5 rounded-2xl border border-stone-200 bg-white px-1 shadow-[0_6px_24px_rgba(28,27,25,0.1)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-[0_6px_24px_rgba(0,0,0,0.35)] lg:max-w-xl">
        {primaryNav.map((item) => {
          const Icon = item.icon
          const isCart = item.path === '/cart'

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-colors"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span
                      className="absolute inset-1 rounded-xl bg-[#eaf1e8] dark:bg-moss/25"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative flex flex-col items-center gap-0.5">
                    <span className="relative">
                      {isCart ? (
                        <motion.span
                          key={cartBump}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.18, 1] }}
                          transition={{ duration: 0.3 }}
                          className="inline-flex"
                        >
                          <ShoppingCart
                            size={20}
                            strokeWidth={2.25}
                            className={isActive ? 'text-moss dark:text-cream' : 'text-stone-500 dark:text-stone-400'}
                          />
                        </motion.span>
                      ) : (
                        <Icon
                          size={20}
                          strokeWidth={2.25}
                          className={isActive ? 'text-moss dark:text-cream' : 'text-stone-500 dark:text-stone-400'}
                        />
                      )}
                      {isCart && cartCount > 0 ? (
                        <span className="absolute -right-2.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-turmeric px-1 text-[9px] font-black leading-none text-white">
                          {cartCount > 9 ? '9+' : cartCount}
                        </span>
                      ) : null}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wide ${
                        isActive ? 'text-moss dark:text-cream' : 'text-stone-500 dark:text-stone-400'
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
