import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type SparkleType = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

type SparklesProps = {
  children?: React.ReactNode
  className?: string
  color?: string
  count?: number
}

export function Sparkles({ children, className, color = 'var(--principal-9)', count = 30 }: SparklesProps) {
  const [sparkles, setSparkles] = useState<SparkleType[]>([])

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      delay: Math.random() * 4,
      duration: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }))
    setSparkles(generated)
  }, [count])

  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full animate-sparkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              backgroundColor: color,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              '--sparkle-opacity': s.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
