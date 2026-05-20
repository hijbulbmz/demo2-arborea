import { motion } from 'framer-motion'

export function FloatingAmbient() {
  // Delicate organic particles coordinates for background drifts
  const particles = [
    { size: 6, x: "12%", y: "24%", duration: 25, delay: 0 },
    { size: 9, x: "85%", y: "15%", duration: 32, delay: 2 },
    { size: 5, x: "45%", y: "68%", duration: 28, delay: 5 },
    { size: 8, x: "20%", y: "78%", duration: 36, delay: 1 },
    { size: 7, x: "72%", y: "82%", duration: 30, delay: 4 },
  ]

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Dynamic blurred velvet background glowing blobs */}
      <motion.div
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -35, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-moss/5 dark:bg-moss/10 blur-[80px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 35, 0],
          y: [0, 45, -30, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[8%] bottom-[12%] h-[45vw] w-[45vw] rounded-full bg-clay/5 dark:bg-clay/10 blur-[90px]"
      />

      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, 20, -25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[30%] top-[40%] h-[35vw] w-[35vw] rounded-full bg-rose/5 dark:bg-rose/8 blur-[100px]"
      />

      {/* Luxury floating dust particles / botanical aura spores */}
      {particles.map((p, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0vw", index % 2 === 0 ? "5vw" : "-5vw"],
            opacity: [0, 0.28, 0.28, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: p.x,
            top: "100%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: index % 2 === 0 ? "var(--color-clay, #8C6239)" : "var(--color-moss, #4A5D4E)",
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  )
}
