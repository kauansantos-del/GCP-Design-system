import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { FadeBlur } from '@/components/effects/FadeBlur'

const types = ['Primary', 'Secondary', 'Disabled', 'Red'] as const
const statuses = ['Enabled', 'Hover', 'click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Buttons() {
  const [iconLeft, setIconLeft] = useState(false)
  const [iconRight, setIconRight] = useState(false)

  return (
    <motion.section
      className="max-w-4xl mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <h1
        className="text-[var(--gray-12)] mb-2"
        style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}
      >
        Button
      </h1>
      <p
        className="text-[var(--gray-11)] mb-10"
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}
      >
        Componente de botao com variantes de tipo e status. Todos os atributos seguem a nomenclatura do Figma.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="iconLeft">
          <Toggle active={iconLeft} onToggle={() => setIconLeft(!iconLeft)} />
        </ControlGroup>
        <ControlGroup label="iconRight">
          <Toggle active={iconRight} onToggle={() => setIconRight(!iconRight)} />
        </ControlGroup>
      </div>

      {/* Preview — all types */}
      <FadeBlur>
        <div className="mb-10">
          <SectionTitle>Preview</SectionTitle>
          <div className="flex flex-wrap items-center gap-6 p-12 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
            {types.map((t) => (
              <div key={t} className="flex flex-col items-center gap-2">
                <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                  {t}
                </span>
                <Button type={t} iconLeft={iconLeft} iconRight={iconRight} text="Label" />
              </div>
            ))}
          </div>
        </div>
      </FadeBlur>

      {/* All variants matrix */}
      <FadeBlur delay={0.1}>
        <div className="mb-10">
          <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>type / status</th>
                {statuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={cellLabelStyle}>{type}</td>
                  {statuses.map((status) => (
                    <td key={status} className="p-4 text-center">
                      <div className="inline-flex">
                        <Button type={type} status={status} size="Desktop" text="Label" static />
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

      {/* Props table */}
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
                  <td className="p-4">
                    <code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code>
                  </td>
                  <td className="p-4 text-[var(--gray-11)]" style={cellStyle}>{row.type}</td>
                  <td className="p-4">
                    <code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code>
                  </td>
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

const componentCode = `import { type ButtonHTMLAttributes } from 'react'
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
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const cellStyle = { fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' } as const
const cellLabelStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'type', type: '"Primary" | "Secondary" | "Tertiary" | "Disabled" | "Red"', default: '"Primary"' },
  { name: 'status', type: '"Enabled" | "Hover" | "click"', default: '"Enabled"' },
  { name: 'text', type: 'string', default: '"Label"' },
  { name: 'iconLeft', type: 'boolean', default: 'false' },
  { name: 'iconRight', type: 'boolean', default: 'false' },
  { name: 'changeIconLeft', type: 'ReactNode | null', default: 'null' },
  { name: 'changeIconRight', type: 'ReactNode | null', default: 'null' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>
      {children}
    </h2>
  )
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
    <button
      onClick={onToggle}
      className={`flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors p-[3px] ${
        active ? 'bg-[var(--principal-10)] justify-end' : 'bg-[var(--gray-6)] justify-start'
      }`}
    >
      <span className="block w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all" />
    </button>
  )
}
