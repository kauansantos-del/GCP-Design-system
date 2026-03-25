import { motion } from 'framer-motion'
import { IconButton } from '@/components/ui/IconButton'
import { CodeBlock } from '@/components/ui/CodeBlock'

const iconTypes = ['Arrow', 'exit', 'Lista', 'expansive', 'filter-arrow', 'eye-icon-open', 'eye-icon-close', 'Arrow-big', 'Arrow-small'] as const
const statuses = ['enabled', 'hover', 'click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

export function IconButtons() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        IconButton
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Botoes com apenas icone para acoes de navegacao e controle.
      </p>

      {/* Preview — all icon types in a grid */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {iconTypes.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {t}
              </span>
              <IconButton type={t} />
            </div>
          ))}
        </div>
      </div>

      {/* All variants */}
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
              {iconTypes.map((t) => (
                <tr key={t} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                  {statuses.map((s) => (
                    <td key={s} className="p-4 text-center">
                      <div className="inline-flex pointer-events-none">
                        <IconButton type={t} status={s} static />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
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

      <div className="mb-10">
        <SectionTitle>Codigo</SectionTitle>
        <CodeBlock code={componentCode} />
      </div>
    </motion.section>
  )
}

const componentCode = `import { useState } from 'react'
import { cn } from '@/lib/cn'

type IconButtonType =
  | 'Arrow'
  | 'exit'
  | 'Lista'
  | 'expansive'
  | 'filter-arrow'
  | 'eye-icon-open'
  | 'eye-icon-close'
  | 'Arrow-big'
  | 'Arrow-small'

type IconButtonProps = {
  status?: 'click' | 'enabled' | 'hover'
  type?: IconButtonType
  className?: string
  static?: boolean
  onClick?: () => void
}

export function IconButton({
  status = 'enabled',
  type = 'Arrow',
  static: isStatic = false,
  className,
  onClick,
}: IconButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [eyeOpen, setEyeOpen] = useState(type === 'eye-icon-open')

  const resolvedStatus = isStatic
    ? status
    : clicked
      ? 'click'
      : hovered
        ? 'hover'
        : 'enabled'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => { setHovered(false); setClicked(false) },
        onMouseDown: () => setClicked(true),
        onMouseUp: () => setClicked(false),
      }

  const handleClick = () => {
    if (type === 'eye-icon-open' || type === 'eye-icon-close') {
      setEyeOpen(!eyeOpen)
    }
    onClick?.()
  }

  const renderIcon = () => {
    const currentType = (type === 'eye-icon-open' || type === 'eye-icon-close')
      ? (isStatic ? type : (eyeOpen ? 'eye-icon-open' : 'eye-icon-close'))
      : type

    switch (currentType) {
      case 'Arrow-big':
        return (
          <svg className="size-[32px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )
      case 'Arrow-small':
        return (
          <svg className="size-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )
      case 'Arrow':
        return (
          <svg className="size-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )
      case 'exit':
        return (
          <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )
      case 'Lista':
        return (
          <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )
      case 'expansive':
        return (
          <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        )
      case 'eye-icon-open':
        return (
          <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      case 'eye-icon-close':
        return (
          <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        )
      case 'filter-arrow':
        return (
          <svg className="size-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5l0-3" />
            <path d="M12 5l-4-4" />
            <path d="M12 5l4-4" />
            <path d="M12 19l0 3" />
            <path d="M12 19l-4 4" />
            <path d="M12 19l4 4" />
          </svg>
        )
      default:
        return null
    }
  }

  const getContainerClasses = () => {
    switch (type) {
      case 'Arrow-big':
        return cn(
          'size-[48px] rounded-[12px] inline-flex items-center justify-center cursor-pointer transition-all duration-200 border-[1.5px]',
          resolvedStatus === 'click'
            ? 'bg-[var(--principal-3)] border-[var(--principal-8)] text-[var(--principal-11)]'
            : resolvedStatus === 'hover'
              ? 'bg-[var(--principal-2)] border-[var(--principal-7)] text-[var(--principal-11)]'
              : 'bg-[var(--gray-2)] border-[var(--gray-6)] text-[var(--gray-12)]'
        )
      case 'Arrow-small':
        return cn(
          'size-[36px] rounded-full inline-flex items-center justify-center cursor-pointer transition-all duration-200 border',
          resolvedStatus === 'click'
            ? 'bg-[var(--gray-5)] border-[var(--gray-8)] text-[var(--gray-12)]'
            : resolvedStatus === 'hover'
              ? 'bg-[var(--gray-3)] border-[var(--gray-7)] text-[var(--gray-12)]'
              : 'border-[var(--gray-6)] text-[var(--gray-12)]'
        )
      case 'Arrow':
        return cn(
          'size-[32px] rounded-[8px] inline-flex items-center justify-center cursor-pointer transition-all duration-200',
          resolvedStatus === 'click'
            ? 'text-[var(--gray-9)]'
            : resolvedStatus === 'hover'
              ? 'text-[var(--gray-11)]'
              : 'text-[var(--gray-9)]'
        )
      case 'exit':
        return cn(
          'size-[32px] inline-flex items-center justify-center cursor-pointer transition-all duration-200',
          resolvedStatus === 'hover' ? 'text-[var(--gray-12)]' : 'text-[var(--gray-9)]'
        )
      case 'Lista':
        return cn(
          'size-[32px] inline-flex items-center justify-center cursor-pointer transition-all duration-200',
          resolvedStatus === 'hover' ? 'text-[var(--gray-11)]' : 'text-[var(--gray-12)]'
        )
      case 'expansive':
        return cn(
          'size-[32px] inline-flex items-center justify-center cursor-pointer transition-all duration-200',
          resolvedStatus === 'hover' ? 'text-[var(--gray-11)]' : 'text-[var(--gray-12)]'
        )
      case 'eye-icon-open':
      case 'eye-icon-close':
        return cn(
          'size-[24px] inline-flex items-center justify-center cursor-pointer transition-all duration-200',
          resolvedStatus === 'hover' ? 'text-[var(--gray-11)]' : 'text-[var(--gray-9)]'
        )
      case 'filter-arrow':
        return cn(
          'size-[32px] inline-flex items-center justify-center cursor-pointer transition-all duration-200',
          resolvedStatus === 'click'
            ? 'text-[var(--gray-12)]'
            : resolvedStatus === 'hover'
              ? 'text-[var(--gray-11)]'
              : 'text-[var(--gray-9)]'
        )
      default:
        return 'size-[32px] inline-flex items-center justify-center cursor-pointer'
    }
  }

  return (
    <button
      className={cn(getContainerClasses(), className)}
      {...hoverHandlers}
      onClick={handleClick}
    >
      {renderIcon()}
    </button>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'status', type: '"click" | "enabled" | "hover"', default: '"enabled"' },
  { name: 'type', type: '"Arrow" | "exit" | "Lista" | "expansive" | "filter-arrow" | "eye-icon-open" | "eye-icon-close" | "Arrow-big" | "Arrow-small"', default: '"Arrow"' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
