import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type CanvasTool =
  | 'undo'
  | 'select'
  | 'wall'
  | 'ellipse'
  | 'square'
  | 'pencil'
  | 'line'
  | 'eraser'
  | 'search'
  | 'home'
  | 'settings'
  | 'palette'
  | 'furniture'
  | 'cube'

export type CanvasToolStatus = 'idle' | 'hover' | 'active'

type Props = {
  tool: CanvasTool
  status?: CanvasToolStatus
  static?: boolean
  active?: boolean
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

export function CanvasToolButton({
  tool,
  status: statusProp,
  static: isStatic = false,
  active = false,
  className,
  onClick,
  ariaLabel,
}: Props) {
  const [hovered, setHovered] = useState(false)

  const status: CanvasToolStatus = isStatic
    ? statusProp ?? 'idle'
    : active
      ? 'active'
      : hovered
        ? 'hover'
        : 'idle'

  const container = cn(
    'inline-flex items-center justify-center size-9 rounded-lg p-1 transition-all duration-150 outline-none',
    !isStatic && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--principal-7)]',
    status === 'idle' && 'bg-transparent text-[var(--gray-11)]',
    status === 'hover' && 'bg-[var(--gray-3)] text-[var(--gray-12)]',
    status === 'active' && 'bg-[var(--principal-10)] text-white shadow-sm',
    className
  )

  const handlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  return (
    <button
      type="button"
      className={container}
      aria-label={ariaLabel ?? toolLabel(tool)}
      aria-pressed={isStatic ? undefined : active}
      onClick={onClick}
      {...handlers}
    >
      <CanvasToolIcon tool={tool} />
    </button>
  )
}

function toolLabel(tool: CanvasTool): string {
  const labels: Record<CanvasTool, string> = {
    undo: 'Desfazer',
    select: 'Selecionar',
    wall: 'Parede',
    ellipse: 'Elipse',
    square: 'Quadrado',
    pencil: 'Rabisco',
    line: 'Linha',
    eraser: 'Borracha',
    search: 'Buscar',
    home: 'Cômodos',
    settings: 'Configurações',
    palette: 'Cores',
    furniture: 'Objetos',
    cube: 'Quartos',
  }
  return labels[tool]
}

export function CanvasToolIcon({ tool }: { tool: CanvasTool }): ReactNode {
  const stroke = 1.6
  switch (tool) {
    case 'undo':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 14l-5-5 5-5" />
          <path d="M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H8" />
        </svg>
      )
    case 'select':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3l6 16 2-7 7-2L5 3z" />
        </svg>
      )
    case 'wall':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="3" width="6" height="18" rx="3" />
        </svg>
      )
    case 'ellipse':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}>
          <ellipse cx="12" cy="12" rx="9" ry="7" />
        </svg>
      )
    case 'square':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
        </svg>
      )
    case 'pencil':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.5 4.5l7 7-10 10H2.5v-7l10-10z" />
          <path d="M14.5 2.5l7 7" />
        </svg>
      )
    case 'line':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke + 0.4} strokeLinecap="round">
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      )
    case 'eraser':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 3.5L21 10l-9.5 9.5H6L3 16.5l11.5-13z" />
          <path d="M9 9l6 6" />
        </svg>
      )
    case 'search':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
    case 'home':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      )
    case 'settings':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      )
    case 'palette':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="0.6" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r="0.6" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r="0.6" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r="0.6" fill="currentColor" />
          <path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.5 4-5 4h-1.5a1.5 1.5 0 0 0-1 2.6 1.5 1.5 0 0 1-1 2.6 6 6 0 0 1-1.5.8z" />
        </svg>
      )
    case 'furniture':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5h-2v2H6v-2H4v-5z" />
          <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5" />
          <path d="M9 13v-3h6v3" />
        </svg>
      )
    case 'cube':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M3 7l9 5 9-5" />
          <path d="M12 22V12" />
        </svg>
      )
  }
}
