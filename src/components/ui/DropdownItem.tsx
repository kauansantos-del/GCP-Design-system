import { useState } from 'react'
import { cn } from '@/lib/cn'

type DropdownItemProps = {
  showIcon?: boolean
  status?: 'Default' | 'Click' | 'hover'
  text?: string
  className?: string
  static?: boolean
  onClick?: () => void
}

export function DropdownItem({
  showIcon = false,
  status = 'Default',
  text = 'ha 4 horas de mim',
  static: isStatic = false,
  className,
  onClick,
}: DropdownItemProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const resolvedStatus = isStatic
    ? status
    : clicked
      ? 'Click'
      : hovered
        ? 'hover'
        : 'Default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => { setHovered(false); setClicked(false) },
        onMouseDown: () => setClicked(true),
        onMouseUp: () => setClicked(false),
      }

  return (
    <button
      className={cn(
        'flex items-center gap-[8px] w-full h-[44px] px-[12px] py-[16px] border-b transition-all duration-200 cursor-pointer',
        resolvedStatus === 'Click'
          ? 'bg-[var(--principal-5)] border-b-[var(--principal-8)] text-[var(--principal-12)]'
          : resolvedStatus === 'hover'
            ? 'bg-[var(--gray-4)] border-b-[var(--gray-7)] text-[var(--gray-12)]'
            : 'border-b-[var(--gray-6)] text-[var(--gray-12)]',
        className
      )}
      style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: 1.3 }}
      {...hoverHandlers}
      onClick={onClick}
    >
      {showIcon && (
        <svg
          className="shrink-0 size-[20px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {text}
    </button>
  )
}
