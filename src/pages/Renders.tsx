import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { allGalleryGroups } from '@/lib/galeriaManifest'
import { AssetTile, type AssetTileItem } from '@/components/ui/AssetTile'
import { AssetModal } from '@/components/ui/AssetModal'

type FilterId = 'todos' | 'objetos' | 'construir'

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Renders() {
  const [filter, setFilter] = useState<FilterId>('todos')
  const [query, setQuery] = useState('')
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const objetos: AssetTileItem[] = useMemo(() => {
    const group = allGalleryGroups.find((g) => g.id === 'objetos')!
    return group.categories.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.assets.map((a) => ({ id: a.id, title: a.title, src: a.src, ext: 'PNG', caption: cat.title }))
      )
    )
  }, [])

  const construir: AssetTileItem[] = useMemo(() => {
    const group = allGalleryGroups.find((g) => g.id === 'construir')!
    return group.categories.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.assets.map((a) => ({ id: a.id, title: a.title, src: a.src, ext: 'PNG', caption: cat.title }))
      )
    )
  }, [])

  const counts = {
    todos: objetos.length + construir.length,
    objetos: objetos.length,
    construir: construir.length,
  } as const

  const flat: AssetTileItem[] = useMemo(() => {
    const source =
      filter === 'objetos' ? objetos
      : filter === 'construir' ? construir
      : [...objetos, ...construir]
    const q = query.trim().toLowerCase()
    if (!q) return source
    return source.filter((a) => a.title.toLowerCase().includes(q) || a.id.includes(q))
  }, [filter, query, objetos, construir])

  const grouped = useMemo(() => {
    if (query.trim()) return null
    const map = new Map<string, AssetTileItem[]>()
    for (const item of flat) {
      const key = item.caption ?? '—'
      const arr = map.get(key) ?? []
      arr.push(item)
      map.set(key, arr)
    }
    return Array.from(map, ([title, items]) => ({ title, items }))
  }, [flat, query])

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
      <Header total={counts.todos} />

      <motion.div variants={itemVar} className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[var(--gray-2)] border border-[var(--gray-5)] w-fit">
          <FilterChip active={filter === 'todos'} onClick={() => setFilter('todos')}>Tudo · {counts.todos}</FilterChip>
          <FilterChip active={filter === 'objetos'} onClick={() => setFilter('objetos')}>Objetos · {counts.objetos}</FilterChip>
          <FilterChip active={filter === 'construir'} onClick={() => setFilter('construir')}>Construir · {counts.construir}</FilterChip>
        </div>

        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gray-9)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nos renders..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] text-[var(--gray-12)] placeholder:text-[var(--gray-9)] outline-none focus:border-[var(--principal-8)] focus:ring-2 focus:ring-[var(--principal-5)] transition"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 500 }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter + (query ? 'q' : '')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {flat.length === 0 ? (
            <Empty query={query} />
          ) : grouped ? (
            <section className="flex flex-col gap-12">
              {grouped.map((sec) => (
                <div key={sec.title}>
                  <SectionHeader title={sec.title} count={sec.items.length} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3.5">
                    {sec.items.map((a) => {
                      const idxInFlat = flat.indexOf(a)
                      return (
                        <AssetTile key={a.id + a.caption} asset={a} onClick={() => setModalIndex(idxInFlat)} />
                      )
                    })}
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3.5">
              {flat.map((a, i) => (
                <AssetTile key={a.id + i} asset={a} onClick={() => setModalIndex(i)} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {modalIndex !== null && (
          <AssetModal
            list={flat}
            index={modalIndex}
            onIndexChange={setModalIndex}
            onClose={() => setModalIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Header({ total }: { total: number }) {
  return (
    <motion.header variants={itemVar} className="mb-10 pb-8 border-b border-[var(--gray-5)]">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <span
            className="block text-[var(--gray-9)] mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            04 — Assets / Renders
          </span>
          <h1
            className="text-[var(--gray-12)] mb-3"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Renders
          </h1>
          <p
            className="text-[var(--gray-11)] max-w-2xl"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
          >
            Objetos e elementos construtivos renderizados em três dimensões. Use o filtro para navegar por tipo, ou clique num asset para abrir o visualizador.
          </p>
        </div>
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--green-3)] border border-[var(--green-6)] text-[var(--green-11)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-9)]" />
          {total} renders
        </span>
      </div>
    </motion.header>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative px-3.5 py-1.5 rounded-lg cursor-pointer bg-transparent border-none transition-colors"
      style={{
        fontFamily: "'Archivo', sans-serif",
        fontSize: '0.8125rem',
        fontWeight: 600,
        color: active ? 'var(--gray-12)' : 'var(--gray-10)',
      }}
    >
      {active && (
        <motion.span
          layoutId="renders-filter"
          className="absolute inset-0 rounded-lg bg-[var(--gray-1)] border border-[var(--gray-5)] shadow-sm"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          aria-hidden
        />
      )}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </button>
  )
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-baseline justify-between mb-5 pb-2 border-b border-dashed border-[var(--gray-5)]">
      <h2
        className="text-[var(--gray-12)]"
        style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.005em' }}
      >
        {title}
      </h2>
      <span
        className="text-[var(--gray-9)]"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
      >
        {count.toString().padStart(2, '0')} {count === 1 ? 'item' : 'itens'}
      </span>
    </div>
  )
}

function Empty({ query }: { query: string }) {
  return (
    <div className="py-20 text-center border border-dashed border-[var(--gray-5)] rounded-2xl">
      <p className="text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif" }}>
        Nada encontrado{query && <> para "<span className="text-[var(--gray-12)]">{query}</span>"</>}.
      </p>
    </div>
  )
}
