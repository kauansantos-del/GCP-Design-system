import { motion } from 'framer-motion'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/Checkbox'
import { CodeBlock } from '@/components/ui/CodeBlock'

const directions = ['esquerda', 'direita'] as const
const statuses = ['enabled', 'hover', 'focus'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const } },
}

export function Checkboxes() {
  const [direction, setDirection] = useState<(typeof directions)[number]>('esquerda')
  const [iconShow, setIconShow] = useState(false)
  const [demoStatus, setDemoStatus] = useState<'enabled' | 'focus'>('enabled')

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Checkbox
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de checkbox com suporte a direcao do label, icone e estados visuais.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="direction">
          {directions.map((d) => (
            <Chip key={d} active={direction === d} onClick={() => setDirection(d)}>{d}</Chip>
          ))}
        </ControlGroup>
        <ControlGroup label="iconShow"><Toggle active={iconShow} onToggle={() => setIconShow(!iconShow)} /></ControlGroup>
      </div>

      {/* Preview */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex items-center justify-center p-12 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <Checkbox
            direction={direction}
            iconShow={iconShow}
            status={demoStatus}
            onChange={(checked) => setDemoStatus(checked ? 'focus' : 'enabled')}
          />
        </div>
      </div>

      {/* All variants */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>direction / status</th>
                {statuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {directions.map((dir) => (
                <tr key={dir} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{dir}</td>
                  {statuses.map((status) => (
                    <td key={status} className="p-4 text-center">
                      <div className="inline-flex pointer-events-none">
                        <Checkbox direction={dir} status={status} />
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

const componentCode = `import { cn } from '@/lib/cn'

type CheckboxProps = {
  changeIcon?: React.ReactNode | null
  direction?: 'esquerda' | 'direita'
  iconShow?: boolean
  status?: 'enabled' | 'hover' | 'focus'
  text?: string
  className?: string
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  changeIcon = null,
  direction = 'esquerda',
  iconShow = false,
  status = 'enabled',
  text = 'Lembrar conta',
  className,
  onChange,
}: CheckboxProps) {
  const isChecked = status === 'focus'

  const checkboxBox = (
    <span
      className={cn(
        'inline-flex items-center justify-center shrink-0 size-[20px] rounded-[4px] transition-all duration-200',
        isChecked
          ? 'bg-[var(--principal-10)] group-hover:bg-[var(--principal-9)]'
          : status === 'hover'
            ? 'border-[1.25px] border-[var(--gray-7)] bg-[var(--gray-4)]'
            : 'border-[1.25px] border-[var(--gray-6)] bg-transparent group-hover:border-[var(--gray-7)] group-hover:bg-[var(--gray-4)]'
      )}
    >
      {isChecked && (
        <svg className="size-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  )

  const label = (
    <span className="flex items-center gap-[4px]">
      {iconShow && (changeIcon || <DefaultCheckboxIcon />)}
      <span
        className="text-[var(--gray-12)] text-[16px] leading-[1.3]"
        style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
      >
        {text}
      </span>
    </span>
  )

  return (
    <button
      className={cn('inline-flex items-center gap-[8px] cursor-pointer group', className)}
      onClick={() => onChange?.(!isChecked)}
    >
      {direction === 'esquerda' ? (
        <>{checkboxBox}{label}</>
      ) : (
        <>{label}{checkboxBox}</>
      )}
    </button>
  )
}

function DefaultCheckboxIcon() {
  return (
    <svg className="shrink-0 size-[24px] text-[var(--gray-11)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'changeIcon', type: 'ReactNode | null', default: 'null' },
  { name: 'direction', type: '"esquerda" | "direita"', default: '"esquerda"' },
  { name: 'iconShow', type: 'boolean', default: 'false' },
  { name: 'status', type: '"enabled" | "hover" | "focus"', default: '"enabled"' },
  { name: 'text', type: 'string', default: '"Lembrar conta"' },
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

function Chip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors border ${active ? 'bg-[var(--principal-3)] text-[var(--principal-11)] border-[var(--principal-7)]' : 'bg-[var(--gray-1)] text-[var(--gray-11)] border-[var(--border)] hover:bg-[var(--gray-3)]'}`} style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 500 }}>
      {children}
    </button>
  )
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors p-[3px] ${active ? 'bg-[var(--principal-10)] justify-end' : 'bg-[var(--gray-6)] justify-start'}`}>
      <span className="block w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all" />
    </button>
  )
}
