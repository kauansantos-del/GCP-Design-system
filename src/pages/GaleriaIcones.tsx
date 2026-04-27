import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { AssetTile, type AssetTileItem } from '@/components/ui/AssetTile'
import { AssetModal } from '@/components/ui/AssetModal'

type StyleId = 'outline' | 'solid' | 'duotone'
type FilterId = 'todos' | StyleId
type HugeIcon = { name: string; styles: { key: StyleId; file: string }[] }

const hugeIconsBase = encodeURI('/galeria/huge icons pack.iconjar/icons')

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

const ICON_FILTER = '[filter:invert(15%)_sepia(7%)_saturate(280%)_hue-rotate(190deg)]'

const STYLE_PREFERENCE: StyleId[] = ['outline', 'solid', 'duotone']

function pickStyle(icon: HugeIcon, filter: FilterId): { key: StyleId; file: string } | null {
  if (filter !== 'todos') {
    return icon.styles.find((s) => s.key === filter) ?? null
  }
  for (const pref of STYLE_PREFERENCE) {
    const found = icon.styles.find((s) => s.key === pref)
    if (found) return found
  }
  return icon.styles[0] ?? null
}

export function GaleriaIcones() {
  const [icons, setIcons] = useState<HugeIcon[] | null>(null)
  const [filter, setFilter] = useState<FilterId>('todos')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(120)
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/hugeicons-index.json')
      .then((r) => r.json())
      .then(setIcons)
      .catch(() => setIcons([]))
  }, [])

  useEffect(() => {
    setLimit(120)
  }, [query, filter])

  const total = icons?.length ?? 1548

  const counts = useMemo(() => {
    if (!icons) return { todos: total, outline: 0, solid: 0, duotone: 0 }
    return {
      todos: icons.length,
      outline: icons.filter((i) => i.styles.some((s) => s.key === 'outline')).length,
      solid: icons.filter((i) => i.styles.some((s) => s.key === 'solid')).length,
      duotone: icons.filter((i) => i.styles.some((s) => s.key === 'duotone')).length,
    }
  }, [icons, total])

  const filtered: AssetTileItem[] = useMemo(() => {
    if (!icons) return []
    const q = query.trim().toLowerCase()
    const items: AssetTileItem[] = []
    for (const icon of icons) {
      if (q && !icon.name.includes(q)) continue
      const styleEntry = pickStyle(icon, filter)
      if (!styleEntry) continue
      items.push({
        id: icon.name + '-' + styleEntry.key,
        title: icon.name.replace(/-/g, ' '),
        src: `${hugeIconsBase}/${encodeURIComponent(styleEntry.file)}`,
        ext: 'SVG',
        caption: `Hugeicons · ${styleEntry.key}`,
      })
    }
    return items
  }, [icons, query, filter])

  const visible = filtered.slice(0, limit)

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
      <Header total={total} />

      {/* Filters */}
      <motion.div variants={itemVar} className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[var(--gray-2)] border border-[var(--gray-5)] w-fit">
          <StyleChip active={filter === 'todos'} onClick={() => setFilter('todos')}>
            Todos · {counts.todos}
          </StyleChip>
          <StyleChip active={filter === 'outline'} onClick={() => setFilter('outline')}>
            Outline · {counts.outline}
          </StyleChip>
          <StyleChip active={filter === 'solid'} onClick={() => setFilter('solid')}>
            Solid · {counts.solid}
          </StyleChip>
          <StyleChip active={filter === 'duotone'} onClick={() => setFilter('duotone')}>
            Duotone · {counts.duotone}
          </StyleChip>
        </div>

        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gray-9)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar entre ${total} ícones...`}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] text-[var(--gray-12)] placeholder:text-[var(--gray-9)] outline-none focus:border-[var(--principal-8)] focus:ring-2 focus:ring-[var(--principal-5)] transition"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 500 }}
          />
        </div>

        <span className="text-[var(--gray-9)] shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
          {visible.length} de {filtered.length}
        </span>
      </motion.div>

      {/* Grid */}
      {icons === null ? (
        <p className="py-20 text-center text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif" }}>
          Carregando 1.548 ícones...
        </p>
      ) : filtered.length === 0 ? (
        <Empty query={query} />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter + query}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5"
            >
              {visible.map((a, i) => (
                <AssetTile
                  key={a.id}
                  asset={a}
                  variant="icon"
                  iconFilterClass={ICON_FILTER}
                  onClick={() => setModalIndex(i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {limit < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit(limit + 180)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gray-12)] text-[var(--gray-1)] hover:opacity-90 cursor-pointer border-none transition-opacity"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '13px', fontWeight: 600 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Carregar mais ({filtered.length - limit})
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {modalIndex !== null && (
          <AssetModal
            list={filtered}
            index={modalIndex}
            iconFilterClass={ICON_FILTER}
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
            04 — Assets / Ícones
          </span>
          <h1
            className="text-[var(--gray-12)] mb-3"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Hugeicons
          </h1>
          <p
            className="text-[var(--gray-11)] max-w-2xl"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
          >
            Biblioteca completa de ícones SVG em três estilos: <em className="not-italic text-[var(--gray-12)] font-semibold">outline</em>, <em className="not-italic text-[var(--gray-12)] font-semibold">solid</em> e <em className="not-italic text-[var(--gray-12)] font-semibold">duotone</em>.
          </p>
        </div>
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--principal-3)] border border-[var(--principal-6)] text-[var(--principal-11)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--principal-9)]" />
          {total} ícones
        </span>
      </div>
    </motion.header>
  )
}

function StyleChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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
          layoutId="g-icones-style"
          className="absolute inset-0 rounded-lg bg-[var(--gray-1)] border border-[var(--gray-5)] shadow-sm"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          aria-hidden
        />
      )}
      <span className="relative z-10 capitalize whitespace-nowrap">{children}</span>
    </button>
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
