import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useToastStore } from '../../store/useToastStore'

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[80] mx-auto flex w-full max-w-md flex-col gap-2 px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 text-sm font-bold text-ink shadow-soft backdrop-blur-xl"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-moss/10 text-moss">
              <CheckCircle2 size={18} />
            </span>
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              className="grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:bg-cream hover:text-ink"
              onClick={() => dismissToast(toast.id)}
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
