import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type FadeBlurProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeBlur({ children, className, delay = 0 }: FadeBlurProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  )
}
