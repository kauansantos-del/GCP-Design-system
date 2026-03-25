import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)', y: 8 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(4px)', y: -8 }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  )
}
