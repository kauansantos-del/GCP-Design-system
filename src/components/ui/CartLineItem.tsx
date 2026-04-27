import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ImagePlaceholder } from './ProductCard'

export type CartLineItemStatus = 'idle' | 'hover' | 'active'

type Props = {
  title: string
  brand: string
  price: string
  quantity: number
  status?: CartLineItemStatus
  static?: boolean
  active?: boolean
  thumbnail?: ReactNode
  className?: string
  onClick?: () => void
}

const surfaceFor = (s: CartLineItemStatus) =>
  s === 'idle'
    ? 'bg-transparent border-[var(--gray-6)]'
    : s === 'hover'
      ? 'bg-[var(--gray-3)] border-[var(--gray-7)]'
      : 'bg-[var(--gray-4)] border-[var(--gray-8)]'

export function CartLineItem({
  title,
  brand,
  price,
  quantity,
  status: statusProp,
  static: isStatic = false,
  active = false,
  thumbnail,
  className,
  onClick,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const status: CartLineItemStatus = isStatic
    ? statusProp ?? 'idle'
    : active
      ? 'active'
      : hovered
        ? 'hover'
        : 'idle'

  const handlers = isStatic
    ? {}
    : { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }

  return (
    <button
      type="button"
      onClick={onClick}
      {...handlers}
      className={cn(
        'flex items-center gap-2 w-[387px] px-5 py-3 border-b border-solid text-left transition-colors outline-none',
        !isStatic && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--principal-7)] focus-visible:ring-inset',
        surfaceFor(status),
        className
      )}
    >
      <div className="size-12 rounded shrink-0 bg-[var(--gray-3)] flex items-center justify-center text-[var(--gray-9)] overflow-hidden">
        {thumbnail ?? <ImagePlaceholder />}
      </div>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <p
            className="text-[var(--gray-12)] truncate"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '14px', fontWeight: 600, lineHeight: 1.1 }}
          >
            {title}
          </p>
          <p
            className="text-[var(--gray-11)] truncate"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: 1.3 }}
          >
            {brand}
          </p>
        </div>
        <div className="flex flex-col gap-3 items-end justify-center shrink-0">
          <p
            className="text-[var(--gray-12)]"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '14px', fontWeight: 600, lineHeight: 1.1 }}
          >
            {price}
          </p>
          <p
            className="text-[var(--gray-11)]"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: 1.3 }}
          >
            Qtd:{' '}
            <span className="text-[var(--gray-12)]" style={{ fontWeight: 600 }}>
              {quantity}
            </span>
          </p>
        </div>
      </div>
    </button>
  )
}
