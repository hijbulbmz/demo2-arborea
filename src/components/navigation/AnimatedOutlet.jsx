import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'

export function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <AnimatePresence mode="wait">
      {outlet && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 22, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ 
            opacity: 0, 
            y: -14, 
            scale: 0.995,
            transition: { duration: 0.25, ease: 'easeIn' }
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 28,
            mass: 0.9
          }}
          className="w-full"
        >
          {outlet}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
