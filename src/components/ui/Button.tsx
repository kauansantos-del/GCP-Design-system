import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = {
  changeIconLeft?: React.ReactNode | null
  changeIconRight?: React.ReactNode | null
  iconLeft?: boolean
  iconRight?: boolean
  status?: 'Enabled' | 'Hover' | 'click'
  text?: string
  type?: 'Primary' | 'Secondary' | 'Tertiary' | 'Disabled' | 'Red'
  static?: boolean
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

const baseStyles =
  'inline-flex items-center justify-center gap-[4px] rounded-[8px] font-semibold text-[16px] leading-[1.1] transition-colors duration-150 cursor-pointer'

const typeStyles = {
  Primary: {
    Enabled:
      'bg-[var(--principal-10)] text-[var(--principal-1)]',
    Hover:
      'bg-[var(--principal-11)] text-[var(--principal-1)]',
    click:
      'bg-[var(--principal-12)] text-[var(--principal-1)]',
  },
  Secondary: {
    Enabled:
      'bg-transparent border-[1.5px] border-[var(--gray-6)] text-[var(--gray-12)]',
    Hover:
      'bg-[var(--gray-3)] border-[1.5px] border-[var(--gray-7)] text-[var(--gray-12)]',
    click:
      'bg-[var(--gray-5)] border-[1.5px] border-[var(--gray-8)] text-[var(--gray-12)]',
  },
  Tertiary: {
    Enabled:
      'bg-transparent text-[var(--gray-11)]',
    Hover:
      'bg-transparent text-[var(--gray-12)]',
    click:
      'bg-transparent text-[var(--gray-12)]',
  },
  Disabled: {
    Enabled:
      'bg-[var(--gray-4)] text-[var(--gray-11)] cursor-not-allowed',
    Hover:
      'bg-[var(--gray-4)] text-[var(--gray-11)] cursor-not-allowed',
    click:
      'bg-[var(--gray-4)] text-[var(--gray-11)] cursor-not-allowed',
  },
  Red: {
    Enabled:
      'bg-[var(--red-10)] text-[var(--red-1)]',
    Hover:
      'bg-[var(--red-11)] text-[var(--red-1)]',
    click:
      'bg-[var(--red-12)] text-[var(--red-1)]',
  },
} as const

const hoverStyles = {
  Primary: 'hover:bg-[var(--principal-11)] active:bg-[var(--principal-12)]',
  Secondary:
    'hover:bg-[var(--gray-3)] hover:border-[var(--gray-7)] active:bg-[var(--gray-5)] active:border-[var(--gray-8)]',
  Tertiary: 'hover:text-[var(--gray-12)] active:text-[var(--gray-12)]',
  Disabled: '',
  Red: 'hover:bg-[var(--red-11)] active:bg-[var(--red-12)]',
} as const

export function Button({
  changeIconLeft = null,
  changeIconRight = null,
  iconLeft = false,
  iconRight = false,
  status = 'Enabled',
  text = 'Label',
  type = 'Primary',
  static: isStatic = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = type === 'Disabled' || disabled

  return (
    <button
      className={cn(
        baseStyles,
        "font-['Archivo',sans-serif]",
        'px-[32px] py-[20px]',
        typeStyles[type][status],
        !isStatic && status === 'Enabled' && hoverStyles[type],
        isStatic && 'pointer-events-none',
        className
      )}
      disabled={isDisabled}
      {...rest}
    >
      {iconLeft && (changeIconLeft || <IconSlot />)}
      <span>{text}</span>
      {iconRight && (changeIconRight || <IconSlot />)}
    </button>
  )
}

function IconSlot() {
  return (
    <svg
      className="shrink-0 size-[24px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  )
}
