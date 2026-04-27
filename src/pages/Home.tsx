import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { componentCategories } from '@/lib/nav'

const totalComponents = componentCategories.reduce((acc, c) => acc + c.items.length, 0)

const hubs = [
  {
    n: '01',
    label: 'Componentes',
    path: '/componentes',
    description: 'Biblioteca completa, organizada por intenção: forms, actions, feedback, navegação e display.',
    meta: `${totalComponents} componentes · ${componentCategories.length} categorias`,
    accent: 'var(--principal-9)',
    accentSoft: 'var(--principal-3)',
  },
  {
    n: '02',
    label: 'Documentação',
    path: '/docs',
    description: 'Cores, tipografia, espaçamento e hand-off. Tokens prontos pra copiar e baixar.',
    meta: 'Tokens · CSS · JSON',
    accent: 'var(--teal-9)',
    accentSoft: 'var(--teal-3)',
  },
  {
    n: '03',
    label: 'Galeria',
    path: '/galeria',
    description: 'Ícones e ilustrações em grid pesquisável, agrupados por categoria e subcategoria.',
    meta: 'Em curadoria',
    accent: 'var(--green-9)',
    accentSoft: 'var(--green-3)',
  },
  {
    n: '04',
    label: 'Hand-off',
    path: '/docs/handoff',
    description: 'Pacote completo pro dev: variáveis CSS, paleta JSON, escala tipográfica e ícones zipados.',
    meta: 'Download · 1-click',
    accent: 'var(--yellow-9)',
    accentSoft: 'var(--yellow-3)',
  },
]

const stats = [
  { label: 'Componentes', value: totalComponents.toString().padStart(2, '0') },
  { label: 'Categorias', value: componentCategories.length.toString().padStart(2, '0') },
  { label: 'Tokens de cor', value: '108' },
  { label: 'Versão', value: '0.1.0' },
]

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const itemVar = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Home() {
  return (
    <motion.div className="relative" initial="hidden" animate="visible" variants={containerVar}>
      {/* Hero */}
      <section className="pt-6 pb-20">
        <motion.span
          variants={itemVar}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-11)] mb-8"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.06em' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--principal-9)]" />
          GCP · Design System · v0.1.0
        </motion.span>

        <motion.h1
          variants={itemVar}
          className="text-[var(--gray-12)] mb-6"
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
          }}
        >
          A linguagem visual{' '}
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, var(--principal-9) 0%, var(--teal-9) 50%, var(--green-9) 100%)',
              }}
            >
              da GCP
            </span>
            <motion.span
              aria-hidden
              className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--principal-9), var(--teal-9), var(--green-9))' }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          ,
          <br />
          construída pra dev.
        </motion.h1>

        <motion.p
          variants={itemVar}
          className="text-[var(--gray-11)] max-w-2xl mb-10"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.6 }}
        >
          Tokens, componentes e diretrizes em um só lugar. Copie variáveis, baixe pacotes,
          inspecione cada estado — sem fricção entre design e código.
        </motion.p>

        <motion.div variants={itemVar} className="flex flex-wrap items-center gap-3">
          <Link
            to="/componentes"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gray-12)] text-[var(--gray-1)] no-underline hover:opacity-90 transition"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
          >
            Explorar componentes
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            to="/docs/handoff"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--gray-6)] text-[var(--gray-12)] no-underline hover:bg-[var(--gray-3)] transition"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
          >
            Baixar hand-off
          </Link>
        </motion.div>
      </section>

      {/* Stats strip */}
      <motion.section
        variants={itemVar}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--gray-5)] border border-[var(--gray-5)] rounded-2xl overflow-hidden mb-20"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--gray-1)] px-5 py-6">
            <div
              className="text-[var(--gray-12)] mb-1"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
            >
              {s.value}
            </div>
            <div
              className="text-[var(--gray-9)]"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </motion.section>

      {/* Hubs */}
      <motion.section variants={itemVar} className="mb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-[var(--gray-12)]"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' }}
          >
            Por onde começar
          </h2>
          <span
            className="text-[var(--gray-9)]"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            04 áreas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hubs.map((h) => (
            <motion.div key={h.path} variants={itemVar}>
              <Link to={h.path} className="no-underline group block">
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full p-7 rounded-2xl border border-[var(--gray-5)] bg-[var(--gray-1)] overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: h.accentSoft }}
                  />
                  <div className="relative flex items-start justify-between mb-8">
                    <span
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', color: h.accent }}
                    >
                      {h.n}
                    </span>
                    <span
                      className="w-9 h-9 rounded-full border border-[var(--gray-5)] flex items-center justify-center text-[var(--gray-11)] group-hover:bg-[var(--gray-12)] group-hover:text-[var(--gray-1)] group-hover:border-[var(--gray-12)] transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <h3
                    className="text-[var(--gray-12)] mb-2"
                    style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.05 }}
                  >
                    {h.label}
                  </h3>
                  <p
                    className="text-[var(--gray-11)] mb-5 max-w-md"
                    style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.55 }}
                  >
                    {h.description}
                  </p>
                  <div className="pt-4 border-t border-dashed border-[var(--gray-5)]">
                    <span
                      className="text-[var(--gray-9)]"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 500 }}
                    >
                      {h.meta}
                    </span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.footer
        variants={itemVar}
        className="border-t border-[var(--gray-5)] pt-6 pb-2 flex items-center justify-between"
      >
        <span
          className="text-[var(--gray-9)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          GCP · Design System
        </span>
        <span
          className="text-[var(--gray-9)]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em' }}
        >
          built with care · 2026
        </span>
      </motion.footer>
    </motion.div>
  )
}
