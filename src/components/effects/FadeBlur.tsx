import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type FadeBlurProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const directionOffset = {
  up: { y: 16, x: 0 },
  down: { y: -16, x: 0 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 },
}

export function FadeBlur({ children, className, delay = 0, direction = 'up' }: FadeBlurProps) {
  const offset = directionOffset[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(4px)', ...offset }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.35,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  )
}
