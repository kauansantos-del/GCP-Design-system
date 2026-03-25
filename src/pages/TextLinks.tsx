import { motion } from 'framer-motion'
import { useState } from 'react'
import { TextLink } from '@/components/ui/TextLink'
import { CodeBlock } from '@/components/ui/CodeBlock'

const types = ['Primary', 'Secondary', 'Red', 'Código'] as const
const statuses = ['enabled', 'hover', 'click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

export function TextLinks() {
  const [showIcon, setShowIcon] = useState(false)

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        TextLink
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Botao de texto sem fundo, utilizado como link inline ou acao secundaria.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="showIcon"><Toggle active={showIcon} onToggle={() => setShowIcon(!showIcon)} /></ControlGroup>
      </div>

      {/* Preview — all types in a row */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-wrap items-center gap-8 p-12 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {types.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {t}
              </span>
              <TextLink type={t} showIcon={showIcon} />
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
              {types.map((type) => (
                <tr key={type} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{type}</td>
                  {statuses.map((status) => (
                    <td key={status} className="p-4 text-center">
                      <div className="inline-flex pointer-events-none">
                        <TextLink type={type} status={status} />
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

const componentCode = `import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextLinkProps = {
  changeIcon?: React.ReactNode | null
  color?: 'White'
  showIcon?: boolean
  status?: 'enabled' | 'hover' | 'click'
  text?: string
  type?: 'Primary' | 'Codigo' | 'Secondary' | 'Red'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>

const typeColors = {
  Primary: {
    enabled: 'text-[var(--principal-10)]',
    hover: 'text-[var(--principal-9)]',
    click: 'text-[var(--principal-12)]',
  },
  Secondary: {
    enabled: 'text-[var(--gray-11)]',
    hover: 'text-[var(--gray-12)]',
    click: 'text-[var(--gray-12)]',
  },
  Red: {
    enabled: 'text-[var(--red-11)]',
    hover: 'text-[var(--red-12)]',
    click: 'text-[var(--red-9)]',
  },
  'Codigo': {
    enabled: 'text-[var(--teal-11)]',
    hover: 'text-[var(--teal-9)]',
    click: 'text-[var(--gray-12)]',
  },
} as const

const hoverColors = {
  Primary: 'hover:text-[var(--principal-9)] active:text-[var(--principal-12)]',
  Secondary: 'hover:text-[var(--gray-12)] active:text-[var(--gray-12)]',
  Red: 'hover:text-[var(--red-12)] active:text-[var(--red-9)]',
  'Codigo': 'hover:text-[var(--teal-9)] active:text-[var(--gray-12)]',
} as const

export function TextLink({
  changeIcon = null,
  color = 'White',
  showIcon = false,
  status = 'enabled',
  text = 'Criar conta',
  type = 'Primary',
  className,
  ...rest
}: TextLinkProps) {
  const isCodigo = type === 'Codigo'
  const clickText = isCodigo && status === 'click' ? 'Aguarde (60 seg) para reenviar' : text

  return (
    <button
      className={cn(
        'inline-flex items-center gap-[4px] cursor-pointer font-semibold text-[16px] leading-[1.3] transition-colors',
        typeColors[type][status],
        status === 'enabled' && hoverColors[type],
        className
      )}
      style={{
        fontFamily: isCodigo ? "'DM Sans', sans-serif" : "'Raleway', sans-serif",
      }}
      {...rest}
    >
      <span>{clickText}</span>
      {showIcon && !isCodigo && (
        changeIcon || <DefaultLinkIcon />
      )}
    </button>
  )
}

function DefaultLinkIcon() {
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
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'changeIcon', type: 'ReactNode | null', default: 'null' },
  { name: 'color', type: '"White"', default: '"White"' },
  { name: 'showIcon', type: 'boolean', default: 'false' },
  { name: 'status', type: '"enabled" | "hover" | "click"', default: '"enabled"' },
  { name: 'text', type: 'string', default: '"Criar conta"' },
  { name: 'type', type: '"Primary" | "Codigo" | "Secondary" | "Red"', default: '"Primary"' },
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
