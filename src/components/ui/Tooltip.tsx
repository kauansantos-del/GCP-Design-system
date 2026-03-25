import { useState } from 'react'
import { cn } from '@/lib/cn'

type TooltipProps = {
  sentido?: 'direita' | 'esquerda'
  showTooltipLarge?: boolean
  showTooltipSmall?: boolean
  status?: 'hover' | 'enabled'
  texto?: string
  type?: 'cima' | 'baixo'
  className?: string
  static?: boolean
}

export function Tooltip({
  sentido = 'direita',
  showTooltipLarge = true,
  showTooltipSmall = false,
  status = 'enabled',
  texto = 'Esta simulação ocorre em tempo real com a cotação de mercado, sendo mutável conforme a oscilação da cotação do Token Ribus na plataforma do Mercado Bitcoin.',
  type = 'baixo',
  static: isStatic = false,
  className,
}: TooltipProps) {
  const [hovered, setHovered] = useState(false)

  const isVisible = isStatic ? status === 'hover' : hovered || status === 'hover'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  const showLarge = showTooltipLarge
  const showSmall = showTooltipSmall

  return (
    <div className={cn('relative inline-flex items-center', className)} {...hoverHandlers}>
      {/* Info Icon */}
      <svg
        className="shrink-0 size-[16px] text-[var(--gray-9)] cursor-pointer"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>

      {/* Tooltip */}
      {(showLarge || showSmall) && (
        <div
          className={cn(
            'absolute z-50 transition-all duration-200 pointer-events-none',
            isVisible ? 'opacity-100' : 'opacity-0',
            type === 'cima' ? 'bottom-full mb-[8px]' : 'top-full mt-[8px]',
            sentido === 'esquerda' ? 'right-0' : 'left-0',
            showSmall && !showLarge ? 'w-[320px]' : 'w-[452px]'
          )}
        >
          {/* Arrow/Caret */}
          <div
            className={cn(
              'absolute w-[10px] h-[10px] bg-[var(--gray-4)] rotate-45',
              type === 'cima' ? 'bottom-[-5px]' : 'top-[-5px]',
              sentido === 'esquerda' ? 'right-[4px]' : 'left-[4px]'
            )}
          />
          {/* Content */}
          <div
            className="relative bg-[var(--gray-4)] rounded-[4px] p-[20px]"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
              fontSize: showSmall && !showLarge ? '14px' : '16px',
              lineHeight: 1.3,
              color: 'var(--gray-12)',
            }}
          >
            {texto}
          </div>
        </div>
      )}
    </div>
  )
}
