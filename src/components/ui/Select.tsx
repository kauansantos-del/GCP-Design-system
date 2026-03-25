import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/cn'

type SelectProps = {
  showIcon?: boolean
  status?: 'Default' | 'hover' | 'click'
  text?: string
  label?: string
  options?: string[]
  className?: string
  static?: boolean
}

export function Select({
  showIcon = true,
  status = 'Default',
  text = 'Titulo',
  label = 'Nome Completo',
  options = ['ha 4 horas de mim'],
  static: isStatic = false,
  className,
}: SelectProps) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const resolvedStatus = isStatic
    ? status
    : open
      ? 'click'
      : hovered
        ? 'hover'
        : 'Default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  useEffect(() => {
    if (isStatic) return
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isStatic])

  return (
    <div className={cn('flex flex-col gap-[4px] w-full', className)} ref={ref}>
      {/* Label */}
      <span
        className="text-[var(--gray-12)] text-[16px] leading-[1.3]"
        style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
      >
        {text}
      </span>

      {/* Select Box */}
      <div className="relative">
        <button
          className={cn(
            'flex items-center justify-between w-full h-[48px] rounded-[8px] px-[16px] bg-[var(--gray-2)] transition-all duration-200 cursor-pointer',
            resolvedStatus === 'click'
              ? 'border-2 border-[var(--gray-8)]'
              : resolvedStatus === 'hover'
                ? 'border-2 border-[var(--gray-7)]'
                : 'border border-[var(--gray-6)]'
          )}
          {...hoverHandlers}
          onClick={() => !isStatic && setOpen(!open)}
        >
          <span
            className={cn(
              'text-[16px] leading-[1.3]',
              resolvedStatus === 'Default' ? 'text-[var(--gray-11)]' : 'text-[var(--gray-12)]'
            )}
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
          >
            {selectedValue || label}
          </span>
          <div className="flex items-center gap-[8px]">
            {showIcon && (
              <svg
                className="shrink-0 size-[20px] text-[var(--gray-9)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            )}
            <svg
              className={cn(
                'shrink-0 size-[20px] text-[var(--gray-9)] transition-transform duration-200',
                open && 'rotate-180'
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {/* Dropdown */}
        {(open || (isStatic && status === 'click')) && (
          <div className="absolute top-full left-0 w-full mt-[4px] bg-[var(--gray-1)] border border-[var(--gray-6)] rounded-[8px] z-50 overflow-hidden">
            {options.map((option, i) => (
              <button
                key={i}
                className={cn(
                  'flex items-center w-full h-[44px] px-[12px] text-[var(--gray-12)] transition-all duration-200 cursor-pointer',
                  'hover:bg-[var(--gray-4)]',
                  i < options.length - 1 && 'border-b border-[var(--gray-6)]'
                )}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '16px' }}
                onClick={() => {
                  setSelectedValue(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
