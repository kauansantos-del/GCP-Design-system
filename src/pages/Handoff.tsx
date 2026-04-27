import { motion } from 'framer-motion'

const packages = [
  {
    id: 'css',
    label: 'CSS Variables',
    description: 'Todos os tokens prontos como custom properties. Cole no :root e usa.',
    ext: '.css',
    size: '~ 8 KB',
    accent: 'var(--principal-9)',
  },
  {
    id: 'tokens',
    label: 'Tokens JSON',
    description: 'Estrutura compatível com Style Dictionary, Tokens Studio e Figma.',
    ext: '.json',
    size: '~ 14 KB',
    accent: 'var(--teal-9)',
  },
  {
    id: 'tailwind',
    label: 'Tailwind Preset',
    description: 'Plugin pronto pra dropar no tailwind.config — cores, espaçamento, tipografia.',
    ext: '.ts',
    size: '~ 6 KB',
    accent: 'var(--green-9)',
  },
  {
    id: 'icons',
    label: 'Ícones SVG',
    description: 'Pacote completo da galeria, organizado por categoria.',
    ext: '.zip',
    size: '~ 240 KB',
    accent: 'var(--yellow-9)',
  },
] as const

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Handoff() {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
      <motion.header variants={itemVar} className="mb-10 pb-8 border-b border-[var(--gray-5)]">
        <span
          className="block text-[var(--gray-9)] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Hand-off · Recursos
        </span>
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          Pacote do dev
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
        >
          Baixe individualmente ou pegue tudo de uma vez. Todos os formatos são gerados a partir da mesma fonte de verdade.
        </p>
      </motion.header>

      <motion.div variants={itemVar} className="mb-10">
        <button
          disabled
          className="group relative w-full p-6 rounded-2xl border border-[var(--gray-5)] bg-gradient-to-r from-[var(--gray-1)] via-[var(--principal-2)] to-[var(--gray-1)] text-left overflow-hidden cursor-not-allowed"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span
                className="block mb-1 text-[var(--gray-9)]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Bundle completo
              </span>
              <h2
                className="text-[var(--gray-12)] mb-1"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.015em' }}
              >
                gcp-design-system.zip
              </h2>
              <p className="text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>
                Tudo num arquivo só — CSS + JSON + Tailwind + ícones. <span className="text-[var(--gray-9)]">(em breve)</span>
              </p>
            </div>
            <span
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--gray-12)] text-[var(--gray-1)] opacity-50"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
            >
              <DownloadIcon />
              Baixar tudo (.zip)
            </span>
          </div>
        </button>
      </motion.div>

      <motion.div variants={itemVar} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {packages.map((p) => (
          <motion.div key={p.id} variants={itemVar}>
            <button
              disabled
              className="group w-full text-left p-5 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] hover:border-[var(--gray-7)] transition-colors disabled:opacity-90 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ background: p.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 700 }}
                >
                  {p.ext.replace('.', '').toUpperCase()}
                </div>
                <DownloadIcon className="text-[var(--gray-9)] group-hover:text-[var(--gray-12)] transition-colors" />
              </div>
              <div
                className="text-[var(--gray-12)] mb-1"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                {p.label}
              </div>
              <p
                className="text-[var(--gray-11)] mb-3"
                style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5 }}
              >
                {p.description}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-dashed border-[var(--gray-5)]">
                <span
                  className="text-[var(--gray-10)]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500 }}
                >
                  {p.ext}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--gray-7)]" />
                <span
                  className="text-[var(--gray-10)]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500 }}
                >
                  {p.size}
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.section variants={itemVar} className="mb-8">
        <h3
          className="text-[var(--gray-12)] mb-4"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' }}
        >
          Snippet rápido
        </h3>
        <CodePreview />
      </motion.section>
    </motion.div>
  )
}

function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2V10M8 10L4.5 6.5M8 10L11.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 12V13.5C2.5 13.7761 2.72386 14 3 14H13C13.2761 14 13.5 13.7761 13.5 13.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CodePreview() {
  const code = `/* gcp-design-system.css */
:root {
  --principal-9: #0091FF;
  --teal-9: #00A2C7;
  --green-9: #46A758;
  --gray-12: #272A2E;
  /* + 100 tokens */
}`

  return (
    <div className="rounded-xl border border-[var(--gray-5)] bg-[var(--gray-12)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span
          className="text-white/50"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem' }}
        >
          tokens.css
        </span>
      </div>
      <pre
        className="p-5 text-white/85 overflow-x-auto m-0"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem', lineHeight: 1.7 }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
