import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { ImagePlaceholder } from './ProductCard'

export type CategoryNavRowStatus = 'idle' | 'hover' | 'active'

type Props = {
  title: string
  caption?: string
  count?: number
  status?: CategoryNavRowStatus
  static?: boolean
  active?: boolean
  thumbnail?: ReactNode
  className?: string
  onClick?: () => void
}

const surfaceFor = (s: CategoryNavRowStatus) =>
  s === 'idle'
    ? 'bg-transparent border-[var(--gray-6)]'
    : s === 'hover'
      ? 'bg-[var(--gray-3)] border-[var(--gray-7)]'
      : 'bg-[var(--gray-4)] border-[var(--gray-8)]'

export function CategoryNavRow({
  title,
  caption,
  count,
  status: statusProp,
  static: isStatic = false,
  active = false,
  thumbnail,
  className,
  onClick,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const status: CategoryNavRowStatus = isStatic
    ? statusProp ?? 'idle'
    : active
      ? 'active'
      : hovered
        ? 'hover'
        : 'idle'

  const handlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  const subtitle = caption ?? (count !== undefined ? `${count} ${count === 1 ? 'subcategoria' : 'subcategorias'}` : undefined)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...handlers}
      whileTap={isStatic ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={cn(
        'flex items-center gap-2 w-full px-2 py-3 border-b border-solid text-left transition-colors outline-none',
        !isStatic && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--principal-7)] focus-visible:ring-inset',
        surfaceFor(status),
        className
      )}
    >
      <div className="size-10 rounded shrink-0 bg-[var(--gray-3)] flex items-center justify-center text-[var(--gray-9)] overflow-hidden">
        {thumbnail ?? <ImagePlaceholder small />}
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p
          className="text-[var(--gray-12)] truncate"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}
        >
          {title}
        </p>
        {subtitle && (
          <p
            className="text-[var(--gray-11)] truncate"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', fontWeight: 400, lineHeight: 1.3 }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <ChevronRight />
    </motion.button>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gray-11)] shrink-0" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
