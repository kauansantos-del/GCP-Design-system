import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  CategoryPanel,
  type CategoryGroup,
  objetosPages,
  construirPages,
} from '@/components/ui/CategoryPanel'
import { CodeBlock } from '@/components/ui/CodeBlock'
import categoryPanelSource from '@/components/ui/CategoryPanel.tsx?raw'

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function CategoryPanels() {
  const [group, setGroup] = useState<CategoryGroup>('objetos')
  const [pageId, setPageId] = useState('geral')

  const pages = group === 'objetos' ? objetosPages : construirPages

  const handleGroup = (g: CategoryGroup) => {
    setGroup(g)
    setPageId('geral')
  }

  return (
    <motion.section className="max-w-6xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <span
        className="block text-[var(--gray-9)] mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        Canvas · Surface
      </span>
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        CategoryPanel
      </h1>
      <p className="text-[var(--gray-11)] mb-12 max-w-2xl" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Painel de categorias e subcategorias do Canvas (312×574). Dois grupos: <strong className="text-[var(--gray-12)]">Objetos</strong> (mobília, eletro, decoração) e <strong className="text-[var(--gray-12)]">Construir</strong> (portas, janelas, etc). Imagens em curadoria.
      </p>

      <SectionTitle>Demo interativa</SectionTitle>
      <div className="mb-10 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="flex flex-wrap items-start gap-8">
          {/* Controls */}
          <div className="flex flex-col gap-4 w-[260px] shrink-0">
            <div>
              <label
                className="block text-[var(--gray-9)] mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Grupo
              </label>
              <div className="flex gap-1.5 p-1 rounded-lg bg-[var(--gray-2)] border border-[var(--gray-5)] w-fit">
                {(['objetos', 'construir'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => handleGroup(g)}
                    className="relative px-3 py-1.5 rounded-md cursor-pointer bg-transparent border-none transition-colors"
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: group === g ? 'var(--gray-12)' : 'var(--gray-10)',
                    }}
                  >
                    {group === g && (
                      <motion.span
                        layoutId="cat-panel-group"
                        className="absolute inset-0 rounded-md bg-[var(--gray-1)] border border-[var(--gray-5)] shadow-sm"
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 capitalize">{g}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-[var(--gray-9)] mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Página ({pages.length})
              </label>
              <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto scroll-elegant pr-2">
                {pages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPageId(p.id)}
                    className="text-left px-3 py-2 rounded-md cursor-pointer bg-transparent border-none transition-colors"
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '13px',
                      fontWeight: pageId === p.id ? 600 : 500,
                      color: pageId === p.id ? 'var(--gray-12)' : 'var(--gray-11)',
                      backgroundColor: pageId === p.id ? 'var(--gray-3)' : undefined,
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel preview */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <CategoryPanel key={`${group}-${pageId}`} group={group} pageId={pageId} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <SectionTitle>Todas as variantes pré-prontas</SectionTitle>
      <p className="text-[var(--gray-11)] mb-6" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px' }}>
        <strong className="text-[var(--gray-12)]">{objetosPages.length}</strong> páginas de Objetos +{' '}
        <strong className="text-[var(--gray-12)]">{construirPages.length}</strong> páginas de Construir = <strong className="text-[var(--gray-12)]">{objetosPages.length + construirPages.length} variantes</strong>.
      </p>

      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <VariantList title="Objetos" pages={objetosPages.map((p) => p.title)} accent="var(--principal-9)" />
        <VariantList title="Construir" pages={construirPages.map((p) => p.title)} accent="var(--teal-9)" />
      </div>

      <SectionTitle>Código</SectionTitle>
      <div className="mb-10">
        <CodeBlock code={categoryPanelSource} />
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

function VariantList({ title, pages, accent }: { title: string; pages: string[]; accent: string }) {
  return (
    <div className="rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h3
          className="text-[var(--gray-12)]"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '-0.005em' }}
        >
          {title}
        </h3>
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, color: accent, letterSpacing: '0.06em' }}
        >
          {pages.length.toString().padStart(2, '0')} pages
        </span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {pages.map((p) => (
          <li
            key={p}
            className="px-2.5 py-1 rounded-md bg-[var(--gray-2)] border border-[var(--gray-5)] text-[var(--gray-11)]"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', fontWeight: 500 }}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

const propsData = [
  { name: 'group', type: '"objetos" | "construir"', default: '"objetos"' },
  { name: 'pageId', type: 'string', default: '"geral"' },
  { name: 'query', type: 'string', default: '—' },
  { name: 'onQueryChange', type: '(q: string) => void', default: '—' },
  { name: 'onItemClick', type: '(item) => void', default: '—' },
  { name: 'onClose', type: '() => void', default: '—' },
]

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
