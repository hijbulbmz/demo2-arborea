import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, LoaderCircle, Sparkles } from 'lucide-react'

export function PaymentProcessing({ state }) {
  return (
    <AnimatePresence>
      {state !== 'idle' ? (
        <motion.div
          className="fixed inset-0 z-[95] grid place-items-center bg-moss/90 p-5 text-white backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            className="relative w-full max-w-sm rounded-[2rem] bg-white p-6 text-center text-ink shadow-2xl"
          >
            {state === 'success' ? <Confetti /> : null}
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cream text-clay">
              {state === 'success' ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <CheckCircle2 size={44} />
                </motion.div>
              ) : (
                <LoaderCircle size={38} className="animate-spin" />
              )}
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold">
              {state === 'success' ? 'Payment successful' : 'Processing payment'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {state === 'success'
                ? 'Your Arborea order is confirmed.'
                : 'Securing your botanical ritual. This is a frontend-only simulation.'}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 text-clay"
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: 0,
            x: Math.cos(index) * 160,
            y: Math.sin(index) * 140,
            rotate: 180,
          }}
          transition={{ duration: 1.1, delay: index * 0.03 }}
        >
          <Sparkles size={14} />
        </motion.span>
      ))}
    </div>
  )
}
