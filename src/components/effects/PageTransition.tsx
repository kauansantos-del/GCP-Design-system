import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] as const }}
    >
      {children}
    </motion.div>
  )
}
