import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SplashScreen({ onComplete }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShow(false)
      if (onComplete) {
        window.setTimeout(onComplete, 600) // Wait for exit animation to complete
      }
    }, 2400)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  // Framer Motion Variants for Logo Typography Letters
  const logoText = "ARBOREA"
  const letterVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(3px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.610, 0.355, 1.000] // Elegant cubic bezier
      }
    })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fbf7f1] dark:bg-[#0c0b0a] overflow-hidden"
        >
          {/* Elegant Ambient Background Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-cream/20 via-transparent to-transparent pointer-events-none" />

          {/* Luxury Animated Botanical Branch SVG */}
          <div className="relative mb-8 h-32 w-32 flex items-center justify-center">
            {/* Soft glowing organic backplate */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.05, 1], opacity: 0.4 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-moss/10 dark:bg-moss/20 blur-xl"
            />
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="h-24 w-24 text-moss dark:text-cream fill-none stroke-current"
            >
              {/* Branch Stem */}
              <motion.path 
                d="M 50,90 Q 50,45 35,20" 
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path 
                d="M 50,75 Q 60,50 65,30" 
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Delicate Botanical Leaves */}
              {/* Left side leaves */}
              <motion.path 
                d="M 44,52 C 34,48 30,38 42,42 Z" 
                fill="currentColor"
                fillOpacity="0.08"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <motion.path 
                d="M 38,32 C 26,30 25,20 36,24 Z" 
                fill="currentColor"
                fillOpacity="0.08"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />

              {/* Right side leaves */}
              <motion.path 
                d="M 54,60 C 64,58 68,48 57,50 Z" 
                fill="currentColor"
                fillOpacity="0.08"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <motion.path 
                d="M 60,40 C 72,40 73,30 61,34 Z" 
                fill="currentColor"
                fillOpacity="0.08"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </svg>
          </div>

          {/* Staggered Serif Brand Logo */}
          <div className="flex gap-1 sm:gap-2">
            {logoText.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="font-display text-2xl sm:text-3xl font-bold tracking-[0.24em] text-ink dark:text-white"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-clay"
          >
            Organic Botanical Care
          </motion.p>

          {/* Minimal Cinematic Progress Bar */}
          <div className="absolute bottom-16 left-12 right-12 max-w-xs mx-auto h-[1px] bg-stone-200/50 dark:bg-stone-800/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.1, ease: [0.42, 0, 0.58, 1] }}
              className="h-full bg-clay dark:bg-cream"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
