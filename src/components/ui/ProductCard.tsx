import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export type ProductCardStatus = 'idle' | 'hover' | 'active'

type CommonProps = {
  status?: ProductCardStatus
  static?: boolean
  active?: boolean
  className?: string
  onClick?: () => void
  thumbnail?: ReactNode
}

type VerticalProps = CommonProps & {
  variant: 'vertical'
  title: string
  brand: string
  price: string
  badge?: { label: string; tone?: 'amarelo' | 'verde' | 'azul' }
  size?: 'desktop' | 'mobile'
}

type HorizontalProps = CommonProps & {
  variant: 'horizontal'
  title: string
  brand: string
  price: string
}

export type ProductCardProps = VerticalProps | HorizontalProps

const surfaceFor = (s: ProductCardStatus) =>
  s === 'idle'
    ? 'bg-[var(--gray-2)] border-[var(--gray-6)]'
    : s === 'hover'
      ? 'bg-[var(--gray-3)] border-[var(--gray-7)] shadow-[0px_4px_12px_rgba(17,50,100,0.08)]'
      : 'bg-[var(--gray-4)] border-[var(--gray-8)]'

const compactSurfaceFor = (s: ProductCardStatus) =>
  s === 'idle'
    ? 'bg-transparent border-[var(--gray-6)]'
    : s === 'hover'
      ? 'bg-[var(--gray-3)] border-[var(--gray-7)]'
      : 'bg-[var(--gray-4)] border-[var(--gray-8)]'

export function ProductCard(props: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const status: ProductCardStatus = props.static
    ? props.status ?? 'idle'
    : props.active
      ? 'active'
      : hovered
        ? 'hover'
        : 'idle'
  const handlers = props.static
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  if (props.variant === 'vertical') {
    const size = props.size ?? 'desktop'
    const isMobile = size === 'mobile'
    return (
      <motion.button
        type="button"
        onClick={props.onClick}
        {...handlers}
        whileHover={props.static ? undefined : { y: -4, scale: 1.02 }}
        whileTap={props.static ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className={cn(
          'group flex flex-col items-stretch text-left rounded-lg overflow-hidden border border-solid transition-colors duration-200 outline-none',
          !props.static && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--principal-7)]',
          isMobile ? 'w-[167.5px]' : 'w-[137px] h-[193px]',
          surfaceFor(status),
          props.className
        )}
      >
        <div
          className={cn(
            'relative w-full bg-[var(--gray-3)] flex items-center justify-center text-[var(--gray-9)] shrink-0',
            isMobile ? 'h-[120px]' : 'h-[136px]'
          )}
        >
          {props.thumbnail ?? <ImagePlaceholder />}
          {props.badge && (
            <span
              className={cn(
                'absolute left-1 -translate-y-1/2 px-2 py-1 rounded-full whitespace-nowrap',
                badgeToneClass(props.badge.tone ?? 'amarelo')
              )}
              style={{
                top: 'calc(100% - 16px)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {props.badge.label}
            </span>
          )}
        </div>
        <div
          className={cn(
            'flex flex-col gap-2 w-full text-left',
            isMobile ? 'pt-3 pb-4 px-3' : 'p-2'
          )}
        >
          <p
            className="text-[var(--gray-12)] truncate"
            style={{
              fontFamily: isMobile ? "'Archivo', sans-serif" : "'Raleway', sans-serif",
              fontSize: isMobile ? '14px' : '11px',
              fontWeight: 600,
              lineHeight: isMobile ? 1.1 : 1.3,
            }}
          >
            {props.title}
          </p>
          <p
            className="text-[var(--gray-11)]"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: isMobile ? '13px' : '11px', fontWeight: 400, lineHeight: 1.3 }}
          >
            {props.brand}
          </p>
          <p
            className="text-[var(--gray-12)]"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', fontWeight: 600, lineHeight: 1.3 }}
          >
            {props.price}
          </p>
        </div>
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={props.onClick}
      {...handlers}
      whileHover={props.static ? undefined : { x: 2 }}
      whileTap={props.static ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={cn(
        'flex items-center gap-2 w-[247px] px-2 py-3 border-b border-solid text-left transition-colors outline-none',
        !props.static && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--principal-7)]',
        compactSurfaceFor(status),
        props.className
      )}
    >
      <div className="size-10 rounded shrink-0 bg-[var(--gray-3)] flex items-center justify-center text-[var(--gray-9)]">
        {props.thumbnail ?? <ImagePlaceholder small />}
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p
          className="text-[var(--gray-12)] truncate"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '11px', fontWeight: 600, lineHeight: 1.3 }}
        >
          {props.title}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-[var(--gray-11)] truncate"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', fontWeight: 400, lineHeight: 1.3 }}
          >
            {props.brand}
          </p>
          <p
            className="text-[var(--gray-12)] shrink-0"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', fontWeight: 600, lineHeight: 1.3 }}
          >
            {props.price}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

function badgeToneClass(tone: 'amarelo' | 'verde' | 'azul') {
  if (tone === 'verde') return 'bg-[var(--green-5)] text-[var(--green-12)]'
  if (tone === 'azul') return 'bg-[var(--principal-5)] text-[var(--principal-12)]'
  return 'bg-[var(--yellow-5)] text-[var(--yellow-12)]'
}

export function ImagePlaceholder({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 32
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}
