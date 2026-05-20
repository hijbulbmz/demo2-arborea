import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastViewport } from '../ui/ToastViewport'

export function AuthShell() {
  const location = useLocation()

  return (
    <div className="min-h-screen overflow-hidden bg-hero-wash px-4 py-5 sm:px-6 lg:grid lg:place-items-center">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28 }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <ToastViewport />
    </div>
  )
}
