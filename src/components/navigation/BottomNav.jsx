import { NavLink } from 'react-router-dom'
import { primaryNav } from './navItems'

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_14px_rgba(24,23,22,0.05)] dark:border-stone-800 dark:bg-stone-900 lg:hidden">
      <div className="grid h-16 grid-cols-5 select-none">
        {primaryNav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-extrabold uppercase tracking-wide transition-colors"
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={18} 
                    strokeWidth={2.4} 
                    className={isActive ? 'text-moss dark:text-cream' : 'text-stone-500 dark:text-stone-400'} 
                  />
                  <span className={isActive ? 'text-moss dark:text-cream' : 'text-stone-500 dark:text-stone-400'}>
                    {item.label}
                  </span>
                  <span className={`mt-0.5 h-0.5 w-5 rounded-full ${isActive ? 'bg-moss dark:bg-cream' : 'bg-transparent'}`} />
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
