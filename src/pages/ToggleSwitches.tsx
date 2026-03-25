import { motion } from 'framer-motion'
import { useState } from 'react'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { CodeBlock } from '@/components/ui/CodeBlock'

const types = ['Esquerda', 'Direita'] as const

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ToggleSwitches() {
  const [selectedType, setSelectedType] = useState<(typeof types)[number]>('Esquerda')
  const [showText, setShowText] = useState(true)

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        ToggleSwitch
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de toggle on/off com texto opcional e posicionamento configuravel.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="type">
          {types.map((t) => (
            <Chip key={t} active={selectedType === t} onClick={() => setSelectedType(t)}>{t}</Chip>
          ))}
        </ControlGroup>
        <ControlGroup label="showText"><Toggle active={showText} onToggle={() => setShowText(!showText)} /></ControlGroup>
      </div>

      {/* Preview */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex items-center justify-center p-12 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <ToggleSwitch type={selectedType} showText={showText} />
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
                <th className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>Off</th>
                <th className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>On</th>
              </tr>
            </thead>
            <tbody>
              {types.map((t) => (
                <tr key={t} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                  <td className="p-4">
                    <div className={`flex pointer-events-none ${t === 'Esquerda' ? 'justify-start' : 'justify-end'}`}>
                      <ToggleSwitch type={t} status={false} showText={true} static />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`flex pointer-events-none ${t === 'Esquerda' ? 'justify-start' : 'justify-end'}`}>
                      <ToggleSwitch type={t} status={true} showText={true} static />
                    </div>
                  </td>
                </tr>
              ))}
              {/* Without text */}
              <tr className="border-b border-[var(--border)] last:border-b-0">
                <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>sem texto</td>
                <td className="p-4 text-center">
                  <div className="inline-flex pointer-events-none">
                    <ToggleSwitch status={false} showText={false} static />
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="inline-flex pointer-events-none">
                    <ToggleSwitch status={true} showText={false} static />
                  </div>
                </td>
              </tr>
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

type ToggleSwitchProps = {
  showText?: boolean
  status?: boolean
  type?: 'Direita' | 'Esquerda'
  className?: string
  static?: boolean
  onChange?: (value: boolean) => void
  label?: string
  subtitle?: string
}

export function ToggleSwitch({
  showText = true,
  status = false,
  type = 'Esquerda',
  static: isStatic = false,
  className,
  onChange,
  label = 'Ativar',
  subtitle = 'Descricao do toggle',
}: ToggleSwitchProps) {
  const [internalStatus, setInternalStatus] = useState(status)

  const isOn = isStatic ? status : internalStatus

  const handleClick = () => {
    if (isStatic) return
    const newValue = !internalStatus
    setInternalStatus(newValue)
    onChange?.(newValue)
  }

  const toggle = (
    <button
      className={cn(
        'relative flex items-center w-[50px] h-[24px] rounded-full cursor-pointer transition-colors duration-200 p-[2px] shrink-0',
        isOn ? 'bg-[var(--green-9)]' : 'bg-[var(--gray-6)]'
      )}
      onClick={handleClick}
    >
      <span
        className={cn(
          'block w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-all duration-200',
          isOn ? 'translate-x-[26px]' : 'translate-x-0'
        )}
      />
    </button>
  )

  const textContent = showText ? (
    <div className="flex flex-col">
      <span
        className={cn(
          'text-[16px] leading-[1.3] transition-colors duration-200',
          isOn ? 'text-[var(--gray-12)]' : 'text-[var(--gray-11)]'
        )}
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
      >
        {label}
      </span>
      {type === 'Direita' && (
        <span
          className="text-[14px] leading-[1.3] text-[var(--gray-11)]"
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
        >
          {subtitle}
        </span>
      )}
    </div>
  ) : null

  return (
    <div className={cn('inline-flex items-center gap-[12px]', className)}>
      {type === 'Esquerda' ? (
        <>
          {toggle}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {toggle}
        </>
      )}
    </div>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'showText', type: 'boolean', default: 'true' },
  { name: 'status', type: 'boolean', default: 'false' },
  { name: 'type', type: '"Direita" | "Esquerda"', default: '"Esquerda"' },
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
