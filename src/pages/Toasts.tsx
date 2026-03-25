import { motion } from 'framer-motion'
import { useState } from 'react'
import { Toast } from '@/components/ui/Toast'
import { CodeBlock } from '@/components/ui/CodeBlock'

const variants = ['Default', 'Variant2', 'Variant3'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Toasts() {
  const [showText, setShowText] = useState(true)

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Toast
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de notificacao com variantes de icone, texto opcional e barra de progresso.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl bg-[var(--gray-2)] border border-[var(--border)]">
        <ControlGroup label="showText">
          <Toggle active={showText} onToggle={() => setShowText(!showText)} />
        </ControlGroup>
      </div>

      {/* Preview — all variants vertically */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {variants.map((v) => (
            <div key={v}>
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {v}
              </span>
              <Toast property1={v} showText={showText} />
            </div>
          ))}
        </div>
      </div>

      {/* All variants table */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>property1</th>
                <th className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>showText: true</th>
                <th className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>showText: false</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={cellLabelStyle}>{v}</td>
                  <td className="p-4">
                    <div className="inline-flex pointer-events-none">
                      <Toast property1={v} showText={true} static />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="inline-flex pointer-events-none">
                      <Toast property1={v} showText={false} static />
                    </div>
                  </td>
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
                  <td className="p-4 text-[var(--gray-11)]" style={cellStyle}>{row.type}</td>
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

type ToastProps = {
  property1?: 'Default' | 'Variant2' | 'Variant3'
  showText?: boolean
  subtext?: string
  text?: string
  className?: string
  static?: boolean
}

export function Toast({
  property1 = 'Default',
  showText = true,
  subtext = 'Item excluido',
  text = 'Item excluido',
  className,
}: ToastProps) {
  const icon =
    property1 === 'Default' ? <CheckCircleIcon /> :
    property1 === 'Variant2' ? <WarningTriangleIcon /> :
    <InfoCircleIcon />

  return (
    <div
      className={cn(
        'rounded-[8px] overflow-clip bg-[var(--gray-1)] border border-[var(--gray-6)] shadow-[0px_4px_16px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <div className="flex gap-[32px] p-[16px] items-center">
        <div className="flex items-center gap-[12px] flex-1 min-w-0">
          <div className="shrink-0">{icon}</div>
          <div className="flex flex-col gap-[4px] min-w-0">
            <span
              className="text-[var(--gray-12)] truncate"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '16px', fontWeight: 600, lineHeight: 1.1 }}
            >
              {text}
            </span>
            <span
              className="text-[var(--gray-11)] truncate"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: 1.3 }}
            >
              {subtext}
            </span>
          </div>
        </div>

        {showText && (
          <button
            className="shrink-0 bg-transparent border-none cursor-pointer transition-all duration-200 hover:opacity-80"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--red-11)',
            }}
          >
            Desfazer
          </button>
        )}
      </div>

      <div className="w-full h-[6px] bg-[var(--gray-4)]">
        <div
          className="h-full rounded-r-full"
          style={{ width: '24%', backgroundColor: 'var(--green-9)' }}
        />
      </div>
    </div>
  )
}

const CheckCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" fill="var(--green-3)" stroke="var(--green-9)" strokeWidth="2" />
    <path d="M9 14.5L12.5 18L19 11" stroke="var(--green-11)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WarningTriangleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4L25 24H3L14 4Z" fill="var(--yellow-3)" stroke="var(--yellow-9)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 12V17" stroke="var(--yellow-11)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="21" r="1" fill="var(--yellow-11)" />
  </svg>
)

const InfoCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" fill="var(--principal-3)" stroke="var(--principal-9)" strokeWidth="2" />
    <path d="M14 13V20" stroke="var(--principal-11)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="9" r="1.5" fill="var(--principal-11)" />
  </svg>
)`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const cellStyle = { fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' } as const
const cellLabelStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'property1', type: '"Default" | "Variant2" | "Variant3"', default: '"Default"' },
  { name: 'showText', type: 'boolean', default: 'true' },
  { name: 'subtext', type: 'string', default: '"Item excluido"' },
  { name: 'text', type: 'string', default: '"Item excluido"' },
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
