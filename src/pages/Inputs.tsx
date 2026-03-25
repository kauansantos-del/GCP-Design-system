import { motion } from 'framer-motion'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { FadeBlur } from '@/components/effects/FadeBlur'

const types = ['Input', 'código', 'mensagem', 'search'] as const
const statuses = ['normal', 'error', 'Disabled'] as const
const animations = ['Enabled', 'Hover', 'Focus'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
}

export function Inputs() {
  const [showTitulo, setShowTitulo] = useState(true)
  const [showIconLeft, setShowIconLeft] = useState(false)
  const [showIconRight, setShowIconRight] = useState(false)
  const [tooltipOn, setTooltipOn] = useState(false)
  const [brlShow, setBrlShow] = useState(false)

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Input
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de entrada com 4 tipos: Input padrao, codigo (caixa quadrada com azul/teal), mensagem (textarea) e search.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="showTitulo"><Toggle active={showTitulo} onToggle={() => setShowTitulo(!showTitulo)} /></ControlGroup>
        <ControlGroup label="tooltip"><Toggle active={tooltipOn} onToggle={() => setTooltipOn(!tooltipOn)} /></ControlGroup>
        <ControlGroup label="showIconLeft"><Toggle active={showIconLeft} onToggle={() => setShowIconLeft(!showIconLeft)} /></ControlGroup>
        <ControlGroup label="showIconRight"><Toggle active={showIconRight} onToggle={() => setShowIconRight(!showIconRight)} /></ControlGroup>
        <ControlGroup label="brlShow"><Toggle active={brlShow} onToggle={() => setBrlShow(!brlShow)} /></ControlGroup>
      </div>

      {/* Preview — all types vertically */}
      <FadeBlur>
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-col gap-8 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {types.map((t) => (
            <div key={t}>
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {t}
              </span>
              <div className={t === 'código' ? 'inline-flex' : 'w-full max-w-[400px]'}>
                <Input
                  type={t}
                  showTitulo={t !== 'código' && t !== 'search' ? showTitulo : false}
                  showIconLeft={t === 'Input' ? showIconLeft : false}
                  showIconRight={t === 'Input' ? showIconRight : false}
                  tooltip={t !== 'código' && t !== 'search' ? tooltipOn : false}
                  brlShow={t === 'Input' ? brlShow : false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      </FadeBlur>

      {/* Matrix: status x animation (for Input type) */}
      <FadeBlur delay={0.1}>
      <div className="mb-10">
        <SectionTitle>Status x Animation</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>status / animation</th>
                {animations.map((a) => (
                  <th key={a} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {statuses.map((s) => (
                <tr key={s} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{s}</td>
                  {animations.map((a) => (
                    <td key={a} className="p-4">
                      <div className="w-[240px]">
                        <Input
                          type="Input"
                          status={s}
                          animation={a}
                          showTitulo={true}
                          title="Label"
                          input="Placeholder"
                          error="Campo obrigatorio"
                          static
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </FadeBlur>

      {/* Props */}
      <FadeBlur delay={0.2}>
      <div className="mb-10">
        <SectionTitle>Atributos (Props)</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                {['Prop', 'Tipo', 'Default'].map((h) => (
                  <th key={h} className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propsData.map((row) => (
                <tr key={row.name} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
                  <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
                  <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </FadeBlur>

      <FadeBlur delay={0.3}>
      <div className="mb-10">
        <SectionTitle>Codigo</SectionTitle>
        <CodeBlock code={componentCode} />
      </div>
      </FadeBlur>
    </motion.section>
  )
}

const componentCode = `import { type InputHTMLAttributes, useState } from 'react'
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
  type?: 'Input' | 'codigo' | 'mensagem' | 'search'
  className?: string
  static?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type'>

/* -- Border: Enabled=1px, Hover=2px, Focus=2px -- */

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

  /* -- Codigo type: square box -- */
  if (type === 'codigo') {
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

  /* -- Search type -- */
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

  /* -- Mensagem type: textarea -- */
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

  /* -- Default Input type -- */
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

/* -- Subcomponents -- */

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
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'animation', type: '"Enabled" | "Hover" | "Focus"', default: '"Enabled"' },
  { name: 'brlShow', type: 'boolean', default: 'false' },
  { name: 'error', type: 'string', default: '"Error"' },
  { name: 'iconLeft', type: 'ReactNode | null', default: 'null' },
  { name: 'iconRight', type: 'ReactNode | null', default: 'null' },
  { name: 'input', type: 'string', default: '"Input"' },
  { name: 'showIconLeft', type: 'boolean', default: 'false' },
  { name: 'showIconRight', type: 'boolean', default: 'false' },
  { name: 'showTitulo', type: 'boolean', default: 'true' },
  { name: 'status', type: '"normal" | "error" | "Disabled"', default: '"normal"' },
  { name: 'title', type: 'string', default: '"Title"' },
  { name: 'tooltip', type: 'boolean', default: 'false' },
  { name: 'type', type: '"Input" | "codigo" | "mensagem" | "search"', default: '"Input"' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[var(--gray-11)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 }}>{label}</span>
      <div className="flex gap-1.5">{children}</div>
    </div>
  )
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors p-[3px] ${active ? 'bg-[var(--principal-10)] justify-end' : 'bg-[var(--gray-6)] justify-start'}`}>
      <span className="block w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all" />
    </button>
  )
}
