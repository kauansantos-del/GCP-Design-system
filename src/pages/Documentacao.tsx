import { motion } from 'framer-motion'
import { Link } from 'react-router'

const sections = [
  {
    n: '01',
    label: 'Cores',
    path: '/cores',
    description: 'Paleta Radix de 12 passos com escala light e dark. Tokens semânticos prontos.',
    sample: ['var(--principal-9)', 'var(--teal-9)', 'var(--green-9)', 'var(--yellow-9)', 'var(--red-9)'],
  },
  {
    n: '02',
    label: 'Tipografia',
    path: '/tipografia',
    description: 'Archivo + Raleway, escala Material. Pesos 400–800, line-height 1.5.',
    sample: 'Aa',
  },
  {
    n: '03',
    label: 'Spacing',
    path: '/spacing',
    description: 'Escala 2px → 96px. Sistema 4/8pt para tudo: padding, gap, radius.',
    sample: 'spacing',
  },
  {
    n: '04',
    label: 'Guia de Uso',
    path: '/guia',
    description: 'Quando usar cada token. Receitas semânticas pra Surface, Border, Text, Action.',
    sample: 'guia',
  },
] as const

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Documentacao() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      <motion.header variants={itemVar} className="mb-10 pb-8 border-b border-[var(--gray-5)]">
        <span
          className="block text-[var(--gray-9)] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          03 — Foundations
        </span>
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          Documentação
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
        >
          Os fundamentos do sistema. Tokens, escalas e diretrizes — tudo pronto pra colar no código.
        </p>
      </motion.header>

      <motion.div variants={itemVar} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {sections.map((s) => (
          <motion.div key={s.path} variants={itemVar}>
            <Link to={s.path} className="no-underline group block">
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                className="relative h-[200px] p-6 rounded-2xl border border-[var(--gray-5)] bg-[var(--gray-1)] overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-[var(--gray-9)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em' }}
                  >
                    {s.n}
                  </span>
                  <SectionVisual sample={s.sample} />
                </div>
                <div>
                  <h3
                    className="text-[var(--gray-12)] mb-1.5"
                    style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.1 }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="text-[var(--gray-11)] max-w-md"
                    style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 }}
                  >
                    {s.description}
                  </p>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.section variants={itemVar} className="mb-8">
        <Link to="/docs/handoff" className="no-underline group block">
          <div className="relative p-8 rounded-2xl border border-[var(--gray-5)] bg-[var(--gray-12)] text-[var(--gray-1)] overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 80% 20%, var(--principal-9), transparent 50%), radial-gradient(circle at 10% 90%, var(--teal-9), transparent 50%)',
              }}
            />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span
                  className="block mb-2 opacity-70"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  Hand-off
                </span>
                <h2
                  className="mb-2"
                  style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.1 }}
                >
                  Tudo pronto pro dev — em 1 clique.
                </h2>
                <p
                  className="opacity-80"
                  style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem', lineHeight: 1.55 }}
                >
                  Tokens CSS, paleta JSON, escala tipográfica e ícones SVG empacotados. Copie variáveis individuais ou baixe o pacote completo.
                </p>
              </div>
              <span
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--gray-1)] text-[var(--gray-12)] group-hover:bg-[var(--principal-9)] group-hover:text-white transition"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
              >
                Abrir Hand-off
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </motion.section>
    </motion.div>
  )
}

function SectionVisual({ sample }: { sample: readonly string[] | string }) {
  if (Array.isArray(sample)) {
    return (
      <div className="flex gap-1">
        {sample.map((c, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border border-[var(--gray-5)]"
            style={{ background: c }}
          />
        ))}
      </div>
    )
  }
  if (sample === 'Aa') {
    return (
      <span
        className="text-[var(--gray-12)]"
        style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em' }}
      >
        Aa
      </span>
    )
  }
  if (sample === 'spacing') {
    return (
      <div className="flex items-end gap-1">
        {[6, 10, 14, 20, 28].map((h) => (
          <div key={h} className="w-1.5 rounded-sm bg-[var(--gray-7)]" style={{ height: h }} />
        ))}
      </div>
    )
  }
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[var(--gray-9)]">
      <rect x="4" y="6" width="24" height="3" rx="1.5" fill="currentColor" />
      <rect x="4" y="14" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="4" y="22" width="22" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
