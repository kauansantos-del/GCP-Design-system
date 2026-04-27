import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { AssetTile, type AssetTileItem } from '@/components/ui/AssetTile'
import { AssetModal } from '@/components/ui/AssetModal'

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

const icons3D: AssetTileItem[] = [
  'icon-3d-delete-user.png',
  'icon-3d-email.png',
  'icon-3d-lock.png',
  'icon-3d-produto.png',
  'icon-3d-quarto.png',
  'icon-3d-search.png',
].map((f) => ({
  id: f.replace('.png', ''),
  title: f.replace(/^icon-3d-/, '').replace('.png', '').replace(/-/g, ' '),
  src: encodeURI(`/galeria/icons 3D/${f}`),
  ext: 'PNG',
  caption: 'Ícone 3D',
}))

export function Icons3DPage() {
  const [query, setQuery] = useState('')
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return icons3D
    return icons3D.filter((a) => a.title.toLowerCase().includes(q) || a.id.includes(q))
  }, [query])

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
      <Header total={icons3D.length} />

      <motion.div variants={itemVar} className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gray-9)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar entre ${icons3D.length} ícones 3D...`}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] text-[var(--gray-12)] placeholder:text-[var(--gray-9)] outline-none focus:border-[var(--principal-8)] focus:ring-2 focus:ring-[var(--principal-5)] transition"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 500 }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={query}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.length === 0 ? (
            <Empty query={query} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((a, i) => (
                <AssetTile key={a.id} asset={a} onClick={() => setModalIndex(i)} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {modalIndex !== null && (
          <AssetModal
            list={filtered}
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
            04 — Assets / Ícones 3Ds
          </span>
          <h1
            className="text-[var(--gray-12)] mb-3"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            Ícones 3Ds
          </h1>
          <p
            className="text-[var(--gray-11)] max-w-2xl"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
          >
            Conjunto de ícones representativos em 3D, ideais para destaque visual em telas e dashboards.
          </p>
        </div>
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--violet-3)] border border-[var(--violet-6)] text-[var(--violet-11)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet-9)]" />
          {total} ícones
        </span>
      </div>
    </motion.header>
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
