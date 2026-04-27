import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

  const isVisible = isStatic ? status === 'hover' : hovered
  const hasContent = showTooltipLarge || showTooltipSmall

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        onFocus: () => setHovered(true),
        onBlur: () => setHovered(false),
      }

  const enterY = type === 'cima' ? 4 : -4

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <button
        type="button"
        aria-label="Mais informações"
        className="inline-flex items-center justify-center bg-transparent border-none p-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--principal-7)] rounded-full"
        {...hoverHandlers}
      >
        <motion.svg
          className="shrink-0 size-[16px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            color: isVisible ? 'var(--gray-12)' : 'var(--gray-9)',
            scale: isVisible ? 1.08 : 1,
          }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {hasContent && isVisible && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: enterY, filter: 'blur(4px)', scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: enterY, filter: 'blur(4px)', scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute z-50 pointer-events-none',
              type === 'cima' ? 'bottom-full mb-[8px]' : 'top-full mt-[8px]',
              sentido === 'esquerda' ? 'right-0' : 'left-0',
              showTooltipSmall && !showTooltipLarge ? 'w-[320px]' : 'w-[452px]'
            )}
            style={{ transformOrigin: type === 'cima' ? 'bottom center' : 'top center' }}
          >
            <div
              className={cn(
                'absolute w-[10px] h-[10px] bg-[var(--gray-4)] rotate-45',
                type === 'cima' ? 'bottom-[-5px]' : 'top-[-5px]',
                sentido === 'esquerda' ? 'right-[4px]' : 'left-[4px]'
              )}
            />
            <div
              className="relative bg-[var(--gray-4)] rounded-[4px] p-[20px] shadow-[0_8px_24px_rgba(17,50,100,0.12)]"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 500,
                fontSize: showTooltipSmall && !showTooltipLarge ? '14px' : '16px',
                lineHeight: 1.3,
                color: 'var(--gray-12)',
              }}
            >
              {texto}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
