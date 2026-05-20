import { Link, NavLink } from 'react-router-dom'
import { Facebook, Instagram, Youtube } from 'lucide-react'

const shopLinks = [
  { label: 'Face Wash', to: '/shop?category=Face+Wash' },
  { label: 'Body Wash', to: '/shop?category=Body+Wash' },
  { label: 'All products', to: '/shop' },
]

const supportLinks = [
  { label: 'Help centre', to: '/help' },
  { label: 'FAQ', to: '/faq' },
  { label: 'My orders', to: '/orders' },
  { label: 'Account', to: '/profile' },
]

const socialLinks = [
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
]

export function AppFooter() {
  return (
    <footer className="-mx-4 mt-10 border-t border-stone-200 bg-[#efe4d6] text-ink dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 lg:mx-0">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-extrabold text-ink dark:text-white">
              Arborea
            </Link>
            <p className="mt-2 max-w-xs text-sm font-semibold leading-relaxed text-stone-600 dark:text-stone-400">
              Practical face wash and body wash for everyday Indian routines.
            </p>
            <div className="mt-4 flex gap-2">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-moss ring-1 ring-stone-200 transition hover:bg-cream dark:bg-stone-850 dark:text-cream dark:ring-stone-700"
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-clay">Shop</p>
            <nav className="mt-3 grid gap-2">
              {shopLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-semibold text-stone-600 transition hover:text-moss dark:text-stone-400 dark:hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-clay">Support</p>
            <nav className="mt-3 grid gap-2">
              {supportLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition ${
                      isActive
                        ? 'text-moss dark:text-cream'
                        : 'text-stone-600 hover:text-moss dark:text-stone-400 dark:hover:text-cream'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-clay">Offers</p>
            <p className="mt-3 text-sm font-semibold text-stone-600 dark:text-stone-400">
              Buy 2 Get 1 on selected face washes. Free delivery above ₹499.
            </p>
            <Link
              to="/shop"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-turmeric text-sm font-black text-white transition hover:opacity-90 sm:w-auto sm:px-8"
            >
              Shop deals
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-stone-200/80 pt-6 text-xs font-semibold text-stone-500 dark:border-stone-800 dark:text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arborea. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/settings" className="hover:text-moss dark:hover:text-cream">
              Preferences
            </Link>
            <Link to="/help" className="hover:text-moss dark:hover:text-cream">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
