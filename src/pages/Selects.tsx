import { motion } from 'framer-motion'
import { useState } from 'react'
import { Select } from '@/components/ui/Select'
import { DropdownItem } from '@/components/ui/DropdownItem'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { FadeBlur } from '@/components/effects/FadeBlur'

const statuses = ['Default', 'hover', 'click'] as const
const dropdownStatuses = ['Default', 'hover', 'Click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
}

export function Selects() {
  const [showIcon, setShowIcon] = useState(false)

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Select
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de selecao com dropdown de opcoes. O <code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1 py-0.5 rounded text-sm" style={{ fontFamily: "'Archivo', sans-serif" }}>DropdownItem</code> e o subcomponente que representa cada opcao dentro do dropdown.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="showIcon"><Toggle active={showIcon} onToggle={() => setShowIcon(!showIcon)} /></ControlGroup>
      </div>

      {/* Preview — interactive */}
      <FadeBlur>
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex items-start justify-center p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <div className="w-full max-w-[400px]">
            <Select showIcon={showIcon} />
          </div>
        </div>
      </div>
      </FadeBlur>

      {/* Todas as variantes — static */}
      <FadeBlur delay={0.1}>
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="grid grid-cols-3 gap-6 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {statuses.map((s) => (
            <div key={s}>
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {s}
              </span>
              <div className="pointer-events-none">
                <Select status={s} showIcon={showIcon} static />
              </div>
            </div>
          ))}
        </div>
      </div>
      </FadeBlur>

      {/* Subcomponente: DropdownItem */}
      <FadeBlur delay={0.2}>
      <div id="dropdown-item" className="mb-10">
        <SectionTitle>Subcomponente: DropdownItem</SectionTitle>
        <p className="text-[var(--gray-11)] mb-4" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>
          Cada item dentro do dropdown do Select. Possui estados visuais independentes.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>status</th>
                {dropdownStatuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)] last:border-b-0">
                <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>DropdownItem</td>
                {dropdownStatuses.map((s) => (
                  <td key={s} className="p-4">
                    <div className="pointer-events-none w-[200px]">
                      <DropdownItem status={s} showIcon={showIcon} static />
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </FadeBlur>

      {/* Props — Select */}
      <FadeBlur delay={0.3}>
      <div className="mb-10">
        <SectionTitle>Props: Select</SectionTitle>
        <PropsTable data={selectProps} />
      </div>

      {/* Props — DropdownItem */}
      <div className="mb-10">
        <SectionTitle>Props: DropdownItem (Subcomponente)</SectionTitle>
        <PropsTable data={dropdownProps} />
      </div>
      <div className="mb-10">
        <SectionTitle>Codigo: Select</SectionTitle>
        <CodeBlock code={selectCode} />
      </div>
      <div className="mb-10">
        <SectionTitle>Codigo: DropdownItem (Subcomponente)</SectionTitle>
        <CodeBlock code={dropdownItemCode} />
      </div>
      </FadeBlur>
    </motion.section>
  )
}

const selectCode = `import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/cn'

type SelectProps = {
  showIcon?: boolean
  status?: 'Default' | 'hover' | 'click'
  text?: string
  label?: string
  options?: string[]
  className?: string
  static?: boolean
}

export function Select({
  showIcon = true,
  status = 'Default',
  text = 'Titulo',
  label = 'Nome Completo',
  options = ['ha 4 horas de mim'],
  static: isStatic = false,
  className,
}: SelectProps) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const resolvedStatus = isStatic
    ? status
    : open
      ? 'click'
      : hovered
        ? 'hover'
        : 'Default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  useEffect(() => {
    if (isStatic) return
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isStatic])

  return (
    <div className={cn('flex flex-col gap-[4px] w-full', className)} ref={ref}>
      {/* Label */}
      <span
        className="text-[var(--gray-12)] text-[16px] leading-[1.3]"
        style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
      >
        {text}
      </span>

      {/* Select Box */}
      <div className="relative">
        <button
          className={cn(
            'flex items-center justify-between w-full h-[48px] rounded-[8px] px-[16px] bg-[var(--gray-2)] transition-all duration-200 cursor-pointer',
            resolvedStatus === 'click'
              ? 'border-2 border-[var(--gray-8)]'
              : resolvedStatus === 'hover'
                ? 'border-2 border-[var(--gray-7)]'
                : 'border border-[var(--gray-6)]'
          )}
          {...hoverHandlers}
          onClick={() => !isStatic && setOpen(!open)}
        >
          <span
            className={cn(
              'text-[16px] leading-[1.3]',
              resolvedStatus === 'Default' ? 'text-[var(--gray-11)]' : 'text-[var(--gray-12)]'
            )}
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
          >
            {selectedValue || label}
          </span>
          <div className="flex items-center gap-[8px]">
            {showIcon && (
              <svg
                className="shrink-0 size-[20px] text-[var(--gray-9)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            )}
            <svg
              className={cn(
                'shrink-0 size-[20px] text-[var(--gray-9)] transition-transform duration-200',
                open && 'rotate-180'
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {/* Dropdown */}
        {(open || (isStatic && status === 'click')) && (
          <div className="absolute top-full left-0 w-full mt-[4px] bg-[var(--gray-1)] border border-[var(--gray-6)] rounded-[8px] z-50 overflow-hidden">
            {options.map((option, i) => (
              <button
                key={i}
                className={cn(
                  'flex items-center w-full h-[44px] px-[12px] text-[var(--gray-12)] transition-all duration-200 cursor-pointer',
                  'hover:bg-[var(--gray-4)]',
                  i < options.length - 1 && 'border-b border-[var(--gray-6)]'
                )}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '16px' }}
                onClick={() => {
                  setSelectedValue(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}`

const dropdownItemCode = `import { useState } from 'react'
import { cn } from '@/lib/cn'

type DropdownItemProps = {
  showIcon?: boolean
  status?: 'Default' | 'Click' | 'hover'
  text?: string
  className?: string
  static?: boolean
  onClick?: () => void
}

export function DropdownItem({
  showIcon = false,
  status = 'Default',
  text = 'ha 4 horas de mim',
  static: isStatic = false,
  className,
  onClick,
}: DropdownItemProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const resolvedStatus = isStatic
    ? status
    : clicked
      ? 'Click'
      : hovered
        ? 'hover'
        : 'Default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => { setHovered(false); setClicked(false) },
        onMouseDown: () => setClicked(true),
        onMouseUp: () => setClicked(false),
      }

  return (
    <button
      className={cn(
        'flex items-center gap-[8px] w-full h-[44px] px-[12px] py-[16px] border-b transition-all duration-200 cursor-pointer',
        resolvedStatus === 'Click'
          ? 'bg-[var(--principal-5)] border-b-[var(--principal-8)] text-[var(--principal-12)]'
          : resolvedStatus === 'hover'
            ? 'bg-[var(--gray-4)] border-b-[var(--gray-7)] text-[var(--gray-12)]'
            : 'border-b-[var(--gray-6)] text-[var(--gray-12)]',
        className
      )}
      style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: 1.3 }}
      {...hoverHandlers}
      onClick={onClick}
    >
      {showIcon && (
        <svg
          className="shrink-0 size-[20px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {text}
    </button>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const selectProps = [
  { name: 'showIcon', type: 'boolean', default: 'false' },
  { name: 'status', type: '"Default" | "hover" | "click"', default: '"Default"' },
  { name: 'text', type: 'string', default: '"Titulo"' },
  { name: 'label', type: 'string', default: '"Nome Completo"' },
  { name: 'options', type: 'string[]', default: '["há 4 horas de mim"]' },
]

const dropdownProps = [
  { name: 'showIcon', type: 'boolean', default: 'false' },
  { name: 'status', type: '"Default" | "Click" | "hover"', default: '"Default"' },
  { name: 'text', type: 'string', default: '"há 4 horas de mim"' },
]

function PropsTable({ data }: { data: { name: string; type: string; default: string }[] }) {
  return (
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
          {data.map((row) => (
            <tr key={row.name} className="border-b border-[var(--border)] last:border-b-0">
              <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
              <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
              <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

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
