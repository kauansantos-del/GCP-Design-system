import { motion } from 'framer-motion'
import { useState } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import { CodeBlock } from '@/components/ui/CodeBlock'

const sentidos = ['direita', 'esquerda'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const } },
}

export function Tooltips() {
  const [sentido, setSentido] = useState<(typeof sentidos)[number]>('direita')
  const [showLarge, setShowLarge] = useState(true)
  const [showSmall, setShowSmall] = useState(false)

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Tooltip
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de tooltip informativo que aparece ao passar o mouse sobre um icone. Suporta posicionamento acima ou abaixo, alinhado a esquerda ou direita.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-6 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="sentido">
          {sentidos.map((s) => (
            <Chip key={s} active={sentido === s} onClick={() => setSentido(s)}>{s}</Chip>
          ))}
        </ControlGroup>
        <ControlGroup label="showTooltipLarge">
          <Toggle active={showLarge} onToggle={() => setShowLarge(!showLarge)} />
        </ControlGroup>
        <ControlGroup label="showTooltipSmall">
          <Toggle active={showSmall} onToggle={() => setShowSmall(!showSmall)} />
        </ControlGroup>
      </div>

      {/* Preview — all 4 variants in a grid */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="rounded-xl bg-[var(--gray-1)] border border-[var(--border)] p-8">
          <div className="grid grid-cols-2 gap-x-16 gap-y-24">
            {/* Cima + Esquerda */}
            <PreviewCell label="type=cima, sentido=esquerda">
              <div className="flex justify-end pt-48">
                <Tooltip type="cima" sentido="esquerda" status="hover" static />
              </div>
            </PreviewCell>

            {/* Cima + Direita */}
            <PreviewCell label="type=cima, sentido=direita">
              <div className="flex justify-start pt-48">
                <Tooltip type="cima" sentido="direita" status="hover" static />
              </div>
            </PreviewCell>

            {/* Baixo + Esquerda */}
            <PreviewCell label="type=baixo, sentido=esquerda">
              <div className="flex justify-end pb-48">
                <Tooltip type="baixo" sentido="esquerda" status="hover" static />
              </div>
            </PreviewCell>

            {/* Baixo + Direita */}
            <PreviewCell label="type=baixo, sentido=direita">
              <div className="flex justify-start pb-48">
                <Tooltip type="baixo" sentido="direita" status="hover" static />
              </div>
            </PreviewCell>
          </div>
        </div>
      </div>

      {/* Interactive demo */}
      <div className="mb-10">
        <SectionTitle>Interativo</SectionTitle>
        <p className="text-[var(--gray-11)] mb-4" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>
          Passe o mouse sobre o icone para ver o tooltip aparecer.
        </p>
        <div className="flex items-center justify-center py-32 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <Tooltip sentido={sentido} showTooltipLarge={showLarge} showTooltipSmall={showSmall} />
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
  texto = 'Esta simulacao ocorre em tempo real com a cotacao de mercado, sendo mutavel conforme a oscilacao da cotacao do Token Ribus na plataforma do Mercado Bitcoin.',
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
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'sentido', type: '"direita" | "esquerda"', default: '"direita"' },
  { name: 'showTooltipLarge', type: 'boolean', default: 'true' },
  { name: 'showTooltipSmall', type: 'boolean', default: 'false' },
  { name: 'status', type: '"hover" | "enabled"', default: '"enabled"' },
  { name: 'texto', type: 'string', default: '"Texto de ajuda..."' },
  { name: 'type', type: '"cima" | "baixo"', default: '"baixo"' },
]

function PreviewCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[var(--gray-11)] text-[12px] font-semibold" style={{ fontFamily: "'Archivo', sans-serif" }}>
        {label}
      </span>
      <div className="relative rounded-lg bg-[var(--gray-2)] border border-[var(--border)] p-4 overflow-visible min-h-[80px]">
        {children}
      </div>
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
