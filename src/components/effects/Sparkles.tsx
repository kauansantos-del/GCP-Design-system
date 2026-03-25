import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type SparkleType = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

type SparklesProps = {
  children?: React.ReactNode
  className?: string
  color?: string
  count?: number
}

export function Sparkles({ children, className, color = 'var(--principal-9)', count = 20 }: SparklesProps) {
  const [sparkles, setSparkles] = useState<SparkleType[]>([])

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
    }))
    setSparkles(generated)
  }, [count])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full pointer-events-none animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: color,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
