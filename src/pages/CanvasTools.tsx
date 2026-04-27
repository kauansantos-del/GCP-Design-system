import { motion } from 'framer-motion'
import { useState } from 'react'
import { CanvasToolButton, type CanvasTool, type CanvasToolStatus } from '@/components/ui/CanvasToolButton'
import { CodeBlock } from '@/components/ui/CodeBlock'
import canvasToolButtonSource from '@/components/ui/CanvasToolButton.tsx?raw'

const tools: CanvasTool[] = [
  'undo', 'select', 'wall', 'ellipse', 'square', 'pencil', 'line', 'eraser',
  'search', 'home', 'settings', 'palette', 'furniture', 'cube',
]

const statuses: CanvasToolStatus[] = ['idle', 'hover', 'active']

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function CanvasTools() {
  const [active, setActive] = useState<CanvasTool>('select')

  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <span
        className="block text-[var(--gray-9)] mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        Canvas · Toolbar
      </span>
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        CanvasToolButton
      </h1>
      <p className="text-[var(--gray-11)] mb-10 max-w-xl" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Botão de ferramenta para o canvas da plataforma de arquitetura. 36×36, três estados (idle, hover, active) e 14 ferramentas.
      </p>

      <SectionTitle>Toolbar interativa</SectionTitle>
      <div className="mb-10 p-6 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[var(--gray-2)] border border-[var(--gray-5)]">
          {tools.map((t) => (
            <CanvasToolButton key={t} tool={t} active={active === t} onClick={() => setActive(t)} />
          ))}
        </div>
        <p className="mt-3 text-[var(--gray-9)]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
          tool ativo: <span className="text-[var(--gray-12)]">{active}</span>
        </p>
      </div>

      <SectionTitle>Todas as variantes</SectionTitle>
      <div className="overflow-x-auto rounded-xl border border-[var(--gray-5)] mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--gray-2)]">
              <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--gray-5)]" style={thStyle}>tool / status</th>
              {statuses.map((s) => (
                <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--gray-5)]" style={thStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr key={t} className="border-b border-[var(--gray-5)] last:border-b-0">
                <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                {statuses.map((s) => (
                  <td key={s} className="p-4 text-center">
                    <div className="inline-flex pointer-events-none">
                      <CanvasToolButton tool={t} status={s} static />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>Código</SectionTitle>
      <div className="mb-10">
        <CodeBlock code={canvasToolButtonSource} />
      </div>

      <SectionTitle>Atributos (Props)</SectionTitle>
      <div className="overflow-x-auto rounded-xl border border-[var(--gray-5)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--gray-2)]">
              {['Prop', 'Tipo', 'Default'].map((h) => (
                <th key={h} className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--gray-5)]" style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propsData.map((row) => (
              <tr key={row.name} className="border-b border-[var(--gray-5)] last:border-b-0">
                <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
                <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
                <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'tool', type: '"undo" | "select" | "wall" | "ellipse" | "square" | "pencil" | "line" | "eraser" | "search" | "home" | "settings" | "palette" | "furniture" | "cube"', default: '—' },
  { name: 'status', type: '"idle" | "hover" | "active"', default: '"idle"' },
  { name: 'active', type: 'boolean', default: 'false' },
  { name: 'static', type: 'boolean', default: 'false' },
  { name: 'onClick', type: '() => void', default: '—' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
