import { type InputHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/cn'

type InputProps = {
  animation?: 'Enabled' | 'Hover' | 'Focus'
  brlShow?: boolean
  error?: string
  iconLeft?: React.ReactNode | null
  iconRight?: React.ReactNode | null
  input?: string
  showIconLeft?: boolean
  showIconRight?: boolean
  showTitulo?: boolean
  status?: 'normal' | 'error' | 'Disabled'
  title?: string
  tooltip?: boolean
  type?: 'Input' | 'código' | 'mensagem' | 'search'
  className?: string
  static?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type'>

/* ── Border: Enabled=1px, Hover=2px, Focus=2px ── */

const inputBorder = {
  normal: { Enabled: 'border border-[var(--gray-6)]', Hover: 'border-2 border-[var(--gray-7)]', Focus: 'border-2 border-[var(--gray-8)]' },
  error:  { Enabled: 'border border-[var(--red-6)]',  Hover: 'border-2 border-[var(--red-7)]',  Focus: 'border-2 border-[var(--red-8)]' },
  Disabled: { Enabled: 'border border-[var(--gray-4)]', Hover: 'border border-[var(--gray-4)]', Focus: 'border border-[var(--gray-4)]' },
} as const

const inputBg = {
  normal: { Enabled: '', Hover: 'bg-[var(--gray-2)]', Focus: 'bg-[var(--gray-2)]' },
  error:  { Enabled: 'bg-[var(--red-3)]', Hover: 'bg-[var(--red-3)]', Focus: 'bg-[var(--red-3)]' },
  Disabled: { Enabled: 'bg-[var(--gray-3)]', Hover: 'bg-[var(--gray-3)]', Focus: 'bg-[var(--gray-3)]' },
} as const

const mensagemBorder = { Enabled: 'border border-[var(--gray-6)]', Hover: 'border border-[var(--gray-7)]', Focus: 'border border-[var(--gray-8)]' } as const
const mensagemBg = { Enabled: '', Hover: 'bg-[var(--gray-2)]', Focus: 'bg-[var(--gray-4)]' } as const

const searchBorder = { Enabled: 'border border-[var(--gray-6)]', Hover: 'border-2 border-[var(--gray-6)]', Focus: 'border-2 border-[var(--gray-8)]' } as const
const searchBg = { Enabled: 'bg-[var(--gray-3)]', Hover: 'bg-[var(--gray-2)]', Focus: 'bg-[var(--gray-2)]' } as const

const codigoBorder = {
  normal: { Enabled: 'border-2 border-[var(--gray-6)]', Hover: 'border-2 border-[var(--teal-7)]', Focus: 'border-2 border-[var(--teal-8)]' },
  error:  { Enabled: 'border-2 border-[var(--red-6)]',  Hover: 'border-2 border-[var(--red-7)]',  Focus: 'border-2 border-[var(--red-7)]' },
  Disabled: { Enabled: 'border-2 border-[var(--gray-4)]', Hover: 'border-2 border-[var(--gray-4)]', Focus: 'border-2 border-[var(--gray-4)]' },
} as const

const codigoBg = {
  normal: { Enabled: 'bg-[var(--gray-2)]', Hover: 'bg-[var(--teal-3)]', Focus: 'bg-[var(--teal-3)]' },
  error:  { Enabled: 'bg-[var(--red-2)]',  Hover: 'bg-[var(--red-3)]',  Focus: 'bg-[var(--red-3)]' },
  Disabled: { Enabled: 'bg-[var(--gray-3)]', Hover: 'bg-[var(--gray-3)]', Focus: 'bg-[var(--gray-3)]' },
} as const

/** Resolve the visual animation state: Focus wins over Hover wins over Enabled */
function resolveAnim(
  isStatic: boolean,
  propAnim: 'Enabled' | 'Hover' | 'Focus',
  isFocused: boolean,
  isHovered: boolean
): 'Enabled' | 'Hover' | 'Focus' {
  if (isStatic) return propAnim
  if (isFocused) return 'Focus'
  if (isHovered) return 'Hover'
  return 'Enabled'
}

export function Input({
  animation = 'Enabled',
  brlShow = false,
  error = 'Error',
  iconLeft = null,
  iconRight = null,
  input = 'Input',
  showIconLeft = false,
  showIconRight = false,
  showTitulo = true,
  status = 'normal',
  title = 'Title',
  tooltip = false,
  type = 'Input',
  static: isStatic = false,
  className,
  ...rest
}: InputProps) {
  const isDisabled = status === 'Disabled'
  const isError = status === 'error'

  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const anim = resolveAnim(isStatic, animation, focused, hovered)

  const hoverHandlers = isStatic || isDisabled
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        onFocusCapture: () => setFocused(true),
        onBlurCapture: () => setFocused(false),
      }

  /* ── Código type: square box ── */
  if (type === 'código') {
    return (
      <div className={cn('flex flex-col gap-[4px]', className)}>
        <div
          className={cn(
            'flex items-center justify-center rounded-[8px] size-[72px] transition-all duration-200',
            codigoBorder[status][anim],
            codigoBg[status][anim],
            isStatic && 'pointer-events-none'
          )}
          {...hoverHandlers}
        >
          <input
            className={cn(
              "w-full h-full bg-transparent outline-none text-center text-[32px] leading-[1.1]",
              "font-['Manrope',sans-serif] font-extrabold",
              anim === 'Enabled' && !isError ? 'text-[var(--gray-11)]' : 'text-[var(--gray-12)]',
              'placeholder:text-[var(--gray-11)]'
            )}
            placeholder="0"
            maxLength={1}
            disabled={isDisabled}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        </div>
        {isError && <ErrorText>{error}</ErrorText>}
      </div>
    )
  }

  /* ── Search type ── */
  if (type === 'search') {
    return (
      <div
        className={cn(
          'flex items-center gap-[8px] rounded-[8px] h-[48px] px-[16px] transition-all duration-200',
          searchBorder[anim],
          searchBg[anim],
          isStatic && 'pointer-events-none',
          className
        )}
        {...hoverHandlers}
      >
        <SearchIcon />
        <input
          className={cn(
            "flex-1 bg-transparent outline-none text-[14px] leading-[1.3]",
            "font-['DM_Sans',sans-serif] font-normal",
            'text-[var(--gray-12)]',
            'placeholder:text-[var(--gray-12)]'
          )}
          style={{ fontVariationSettings: "'opsz' 14" }}
          type="search"
          placeholder={input}
          disabled={isDisabled}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
    )
  }

  /* ── Mensagem type: textarea ── */
  if (type === 'mensagem') {
    return (
      <div className={cn('flex flex-col gap-[4px]', className)}>
        {showTitulo && <TitleLabel title={title} tooltip={tooltip} />}
        <div
          className={cn(
            'flex gap-[8px] rounded-[8px] px-[16px] py-[12px] items-start transition-all duration-200',
            mensagemBorder[anim],
            mensagemBg[anim],
            isStatic && 'pointer-events-none'
          )}
          {...hoverHandlers}
        >
          {showIconLeft && (iconLeft || <DefaultIcon />)}
          <textarea
            className={cn(
              "flex-1 bg-transparent outline-none text-[16px] leading-[1.3] resize-none min-h-[200px]",
              "font-['Raleway',sans-serif] font-normal",
              'text-[var(--gray-12)]',
              'placeholder:text-[var(--gray-11)]'
            )}
            placeholder={input}
            disabled={isDisabled}
            {...(rest as InputHTMLAttributes<HTMLTextAreaElement>)}
          />
          {showIconRight && (iconRight || <DefaultIcon />)}
        </div>
      </div>
    )
  }

  /* ── Default Input type ── */
  return (
    <div className={cn('flex flex-col gap-[4px]', className)}>
      {showTitulo && <TitleLabel title={title} tooltip={tooltip} />}
      <div
        className={cn(
          'flex items-center gap-[8px] rounded-[8px] h-[48px] px-[16px] transition-all duration-200',
          inputBorder[status][anim],
          inputBg[status][anim],
          isStatic && 'pointer-events-none'
        )}
        {...hoverHandlers}
      >
        {showIconLeft && (iconLeft || <DefaultIcon />)}
        <input
          className={cn(
            "flex-1 bg-transparent outline-none text-[16px] leading-[1.3]",
            "font-['Raleway',sans-serif] font-normal",
            isDisabled ? 'text-[var(--gray-10)] cursor-not-allowed' : 'text-[var(--gray-12)]',
            'placeholder:text-[var(--gray-11)]'
          )}
          type="text"
          placeholder={input}
          disabled={isDisabled}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
        {showIconRight && (iconRight || <DefaultIcon />)}
        {brlShow && (
          <span
            className="text-[var(--gray-12)] text-[16px] shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, lineHeight: 1.3 }}
          >
            BRL
          </span>
        )}
      </div>
      {isError && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

/* ── Subcomponents ── */

function TitleLabel({ title, tooltip }: { title: string; tooltip: boolean }) {
  return (
    <div className="flex items-center gap-[4px]">
      <span
        className="text-[var(--gray-12)] text-[16px] leading-[1.3]"
        style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
      >
        {title}
      </span>
      {tooltip && <TooltipIcon />}
    </div>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[4px]">
      <ErrorIcon />
      <span
        className="text-[var(--red-11)] text-[16px] leading-[1.3]"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
      >
        {children}
      </span>
    </div>
  )
}

function DefaultIcon() {
  return (
    <svg className="shrink-0 size-[20px] text-[var(--gray-9)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="shrink-0 size-[20px] text-[var(--gray-11)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function TooltipIcon() {
  return (
    <svg className="shrink-0 size-[16px] text-[var(--gray-9)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg className="shrink-0 size-[15px] text-[var(--red-11)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
    </svg>
  )
}
