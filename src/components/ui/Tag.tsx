import { useState } from 'react'
import { cn } from '@/lib/cn'

type TagProps = {
  status?: 'default' | 'Hover' | 'Focus'
  text?: string
  className?: string
  static?: boolean
  onClick?: () => void
}

export function Tag({
  status = 'default',
  text = 'Proprietario',
  static: isStatic = false,
  className,
  onClick,
}: TagProps) {
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)

  const resolvedStatus = isStatic
    ? status
    : selected
      ? 'Focus'
      : hovered
        ? 'Hover'
        : status === 'Focus'
          ? 'Focus'
          : 'default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  const handleClick = () => {
    if (!isStatic) {
      setSelected(!selected)
    }
    onClick?.()
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center h-[44px] rounded-[8px] px-[16px] cursor-pointer transition-all duration-200',
        resolvedStatus === 'Focus'
          ? 'bg-[var(--principal-5)] border border-[var(--principal-8)] text-[var(--principal-12)]'
          : resolvedStatus === 'Hover'
            ? 'bg-[var(--gray-4)] border border-[var(--gray-7)] text-[var(--gray-12)]'
            : 'bg-[var(--gray-1)] border border-[var(--gray-6)] text-[var(--gray-12)]',
        className
      )}
      style={{
        fontFamily: "'Raleway', sans-serif",
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: 1.3,
      }}
      {...hoverHandlers}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}
