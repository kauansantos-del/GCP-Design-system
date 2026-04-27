import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { componentCategories } from '@/lib/nav'

const total = componentCategories.reduce((acc, c) => acc + c.items.length, 0)

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Componentes() {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return componentCategories
      .filter((cat) => activeCat === 'all' || cat.id === activeCat)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((it) => !q || it.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [query, activeCat])

  const matchCount = filtered.reduce((acc, c) => acc + c.items.length, 0)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      <PageHeader title="Componentes" eyebrow="02 — Library" subtitle={`${total} componentes em ${componentCategories.length} categorias. Pesquisáveis, agrupados por intenção.`} />

      <motion.div variants={itemVar} className="flex flex-col md:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-9)]" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar componente..."
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] text-[var(--gray-12)] placeholder:text-[var(--gray-9)] outline-none focus:border-[var(--principal-8)] focus:ring-2 focus:ring-[var(--principal-5)] transition"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem', fontWeight: 500 }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[var(--gray-2)] border border-[var(--gray-5)]">
          <CategoryChip active={activeCat === 'all'} onClick={() => setActiveCat('all')}>
            Todos · {total}
          </CategoryChip>
          {componentCategories.map((c) => (
            <CategoryChip key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
              {c.label} · {c.items.length}
            </CategoryChip>
          ))}
        </div>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div variants={itemVar} className="py-20 text-center border border-dashed border-[var(--gray-5)] rounded-2xl">
          <p className="text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem' }}>
            Nada por aqui. Tente outro termo.
          </p>
        </motion.div>
      )}

      <div className="flex flex-col gap-12">
        {filtered.map((cat) => (
          <motion.section key={cat.id} variants={itemVar}>
            <div className="flex items-baseline justify-between mb-5">
              <h2
                className="text-[var(--gray-12)]"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em' }}
              >
                {cat.label}
              </h2>
              <span
                className="text-[var(--gray-9)]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                {cat.items.length.toString().padStart(2, '0')} componentes
              </span>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
            >
              {cat.items.map((item) => (
                <motion.div
                  key={item.path}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link to={item.path} className="no-underline block">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="group relative h-[110px] p-4 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] hover:border-[var(--gray-7)] hover:bg-[var(--gray-2)] transition-colors overflow-hidden flex flex-col justify-between"
                    >
                      <ComponentBadge label={item.label} />
                      <div>
                        <span
                          className="text-[var(--gray-12)]"
                          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.005em' }}
                        >
                          {item.label}
                        </span>
                        <div
                          className="text-[var(--gray-9)] mt-0.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500 }}
                        >
                          {item.path}
                        </div>
                      </div>
                      <span
                        aria-hidden
                        className="absolute bottom-3 right-3 text-[var(--gray-8)] group-hover:text-[var(--gray-12)] transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))}
      </div>

      {query && (
        <p
          className="mt-10 text-center text-[var(--gray-9)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}
        >
          {matchCount} resultado(s) para "{query}"
        </p>
      )}
    </motion.div>
  )
}

function CategoryChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-3 py-1.5 rounded-lg cursor-pointer bg-transparent border-none transition-colors"
      style={{
        fontFamily: "'Archivo', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 600,
        color: active ? 'var(--gray-12)' : 'var(--gray-10)',
      }}
    >
      {active && (
        <motion.span
          layoutId="cat-chip-active"
          className="absolute inset-0 rounded-lg bg-[var(--gray-1)] border border-[var(--gray-5)] shadow-sm"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          aria-hidden
        />
      )}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </button>
  )
}

function ComponentBadge({ label }: { label: string }) {
  const initial = label.slice(0, 1)
  return (
    <div
      aria-hidden
      className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--gray-3)] to-[var(--gray-5)] flex items-center justify-center text-[var(--gray-11)]"
      style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 700 }}
    >
      {initial}
    </div>
  )
}

function PageHeader({ title, eyebrow, subtitle }: { title: string; eyebrow: string; subtitle: string }) {
  return (
    <motion.header
      variants={itemVar}
      className="mb-10 pb-8 border-b border-[var(--gray-5)]"
    >
      <span
        className="block text-[var(--gray-9)] mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        {eyebrow}
      </span>
      <h1
        className="text-[var(--gray-12)] mb-3"
        style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
      >
        {title}
      </h1>
      <p
        className="text-[var(--gray-11)] max-w-2xl"
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
      >
        {subtitle}
      </p>
    </motion.header>
  )
}
