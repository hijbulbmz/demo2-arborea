import { useLocation, NavLink } from 'react-router-dom'
import {
  User,
  Package,
  Heart,
  Bell,
  Settings,
  CircleHelp,
  Award,
} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { AnimatedOutlet } from '../components/navigation/AnimatedOutlet'
import { DesktopHeader } from '../components/navigation/DesktopHeader'
import { SlideDrawer } from '../components/navigation/SlideDrawer'
import { useDisclosure } from '../hooks/useDisclosure'

export function DesktopLayout() {
  const drawer = useDisclosure()
  const { pathname } = useLocation()
  const { user } = useAuthStore()

  const accountRoutes = [
    '/profile',
    '/settings',
    '/notifications',
    '/help',
    '/orders',
    '/wishlist',
  ]

  const isAccountRoute = accountRoutes.includes(pathname)

  const sidebarLinks = [
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'My Orders', path: '/orders', icon: Package },
    { label: 'My Wishlist', path: '/wishlist', icon: Heart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Account Preferences', path: '/settings', icon: Settings },
    { label: 'Support & Help', path: '/help', icon: CircleHelp },
  ]

  return (
    <div className="hidden min-h-screen bg-cream dark:bg-stone-950 transition-colors duration-300 lg:block">
      <DesktopHeader onMenu={drawer.open} />
      <main className="page-shell mx-auto max-w-7xl px-4 py-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
        {isAccountRoute ? (
          <div className="grid grid-cols-[280px_1fr] gap-8 items-start">
            <aside className="sticky top-[8.75rem] w-[280px] rounded-brand border border-stone-100 bg-white p-5 shadow-soft dark:border-stone-800 dark:bg-stone-900/80">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4 dark:border-stone-800">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-12 w-12 rounded-full border border-stone-200 object-cover dark:border-stone-700"
                />
                <div className="min-w-0">
                  <p className="font-display font-bold text-ink dark:text-white truncate">
                    {user?.name}
                  </p>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-black text-moss dark:bg-moss/20 uppercase tracking-wider">
                    <Award size={10} />
                    Reward Balance: ₹{user?.points}
                  </span>
                </div>
              </div>

              <nav className="mt-5 space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                          isActive
                            ? 'bg-moss text-white dark:bg-clay'
                            : 'text-stone-600 hover:bg-cream dark:text-stone-300 dark:hover:bg-stone-850'
                        }`
                      }
                    >
                      <Icon size={16} />
                      {link.label}
                    </NavLink>
                  )
                })}
              </nav>
            </aside>

            {/* Sub-page viewport */}
            <div className="min-h-[500px]">
              <AnimatedOutlet />
            </div>
          </div>
        ) : (
          <AnimatedOutlet />
        )}
      </main>
      <SlideDrawer open={drawer.isOpen} onClose={drawer.close} />
    </div>
  )
}
