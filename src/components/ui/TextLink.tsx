import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextLinkProps = {
  changeIcon?: React.ReactNode | null
  color?: 'White'
  showIcon?: boolean
  status?: 'enabled' | 'hover' | 'click'
  text?: string
  type?: 'Primary' | 'Código' | 'Secondary' | 'Red'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>

const typeColors = {
  Primary: {
    enabled: 'text-[var(--principal-10)]',
    hover: 'text-[var(--principal-9)]',
    click: 'text-[var(--principal-12)]',
  },
  Secondary: {
    enabled: 'text-[var(--gray-11)]',
    hover: 'text-[var(--gray-12)]',
    click: 'text-[var(--gray-12)]',
  },
  Red: {
    enabled: 'text-[var(--red-11)]',
    hover: 'text-[var(--red-12)]',
    click: 'text-[var(--red-9)]',
  },
  'Código': {
    enabled: 'text-[var(--teal-11)]',
    hover: 'text-[var(--teal-9)]',
    click: 'text-[var(--gray-12)]',
  },
} as const

const hoverColors = {
  Primary: 'hover:text-[var(--principal-9)] active:text-[var(--principal-12)]',
  Secondary: 'hover:text-[var(--gray-12)] active:text-[var(--gray-12)]',
  Red: 'hover:text-[var(--red-12)] active:text-[var(--red-9)]',
  'Código': 'hover:text-[var(--teal-9)] active:text-[var(--gray-12)]',
} as const

export function TextLink({
  changeIcon = null,
  color = 'White',
  showIcon = false,
  status = 'enabled',
  text = 'Criar conta',
  type = 'Primary',
  className,
  ...rest
}: TextLinkProps) {
  const isCodigo = type === 'Código'
  const clickText = isCodigo && status === 'click' ? 'Aguarde (60 seg) para reenviar' : text

  return (
    <button
      className={cn(
        'inline-flex items-center gap-[4px] cursor-pointer font-semibold text-[16px] leading-[1.3] transition-colors',
        typeColors[type][status],
        status === 'enabled' && hoverColors[type],
        className
      )}
      style={{
        fontFamily: isCodigo ? "'DM Sans', sans-serif" : "'Raleway', sans-serif",
      }}
      {...rest}
    >
      <span>{clickText}</span>
      {showIcon && !isCodigo && (
        changeIcon || <DefaultLinkIcon />
      )}
    </button>
  )
}

function DefaultLinkIcon() {
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
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}
