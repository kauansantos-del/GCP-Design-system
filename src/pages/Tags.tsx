import { motion } from 'framer-motion'
import { useState } from 'react'
import { Tag } from '@/components/ui/Tag'
import { CodeBlock } from '@/components/ui/CodeBlock'

const statuses = ['default', 'Hover', 'Focus'] as const

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Tags() {
  const [text, setText] = useState('Proprietario')

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Tag
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de tag/chip selecionavel para filtros e categorias.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="text">
          <input
            className="px-3 py-1.5 rounded-lg text-sm border border-[var(--border)] bg-[var(--gray-1)] text-[var(--gray-12)] outline-none"
            style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </ControlGroup>
      </div>

      {/* Preview — interactive */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-wrap items-center gap-6 p-12 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <Tag text={text} />
        </div>
      </div>

      {/* Todas as variantes — static */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="flex flex-wrap items-center gap-6 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {statuses.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {s}
              </span>
              <div className="pointer-events-none">
                <Tag status={s} text={text} static />
              </div>
            </div>
          ))}
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

type TagProps = {
  status?: 'default' | 'Hover' | 'Focus'
  text?: string
  className?: string
  static?: boolean
  onClick?: () => void
}

export function Tag({
  status = 'default',
  text = 'Proprietario',
  static: isStatic = false,
  className,
  onClick,
}: TagProps) {
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)

  const resolvedStatus = isStatic
    ? status
    : selected
      ? 'Focus'
      : hovered
        ? 'Hover'
        : status === 'Focus'
          ? 'Focus'
          : 'default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  const handleClick = () => {
    if (!isStatic) {
      setSelected(!selected)
    }
    onClick?.()
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center h-[44px] rounded-[8px] px-[16px] cursor-pointer transition-all duration-200',
        resolvedStatus === 'Focus'
          ? 'bg-[var(--principal-5)] border border-[var(--principal-8)] text-[var(--principal-12)]'
          : resolvedStatus === 'Hover'
            ? 'bg-[var(--gray-4)] border border-[var(--gray-7)] text-[var(--gray-12)]'
            : 'bg-[var(--gray-1)] border border-[var(--gray-6)] text-[var(--gray-12)]',
        className
      )}
      style={{
        fontFamily: "'Raleway', sans-serif",
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: 1.3,
      }}
      {...hoverHandlers}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'status', type: '"default" | "Hover" | "Focus"', default: '"default"' },
  { name: 'text', type: 'string', default: '"Proprietario"' },
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
