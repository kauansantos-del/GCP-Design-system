import { motion } from 'framer-motion'
import { useState } from 'react'
import { downloadBundle, handoffPackages } from '@/lib/handoffPackages'

type PackageId = 'css' | 'tokens' | 'tailwind'

type Pkg = {
  id: PackageId
  label: string
  description: string
  ext: string
  accent: string
  download: () => void
}

const packages: Pkg[] = [
  {
    id: 'css',
    label: 'CSS Variables',
    description: 'Todos os tokens (cores light + dark, tipografia, semânticos) prontos como custom properties. Cole no :root e usa.',
    ext: '.css',
    accent: 'var(--principal-9)',
    download: () => handoffPackages.css(),
  },
  {
    id: 'tokens',
    label: 'Tokens JSON',
    description: 'Estrutura compatível com Style Dictionary, Tokens Studio e Figma.',
    ext: '.json',
    accent: 'var(--teal-9)',
    download: () => handoffPackages.json(),
  },
  {
    id: 'tailwind',
    label: 'Tailwind Preset',
    description: 'Preset TS pronto pra dropar no tailwind.config — cores e font-family.',
    ext: '.ts',
    accent: 'var(--green-9)',
    download: () => handoffPackages.tailwind(),
  },
]

const itemVar = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Handoff() {
  const [bundleState, setBundleState] = useState<'idle' | 'generating' | 'done'>('idle')

  const handleBundle = async () => {
    setBundleState('generating')
    try {
      await downloadBundle()
      setBundleState('done')
      setTimeout(() => setBundleState('idle'), 1800)
    } catch {
      setBundleState('idle')
    }
  }

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
          type="button"
          onClick={handleBundle}
          disabled={bundleState === 'generating'}
          className="group relative w-full p-6 rounded-2xl border border-[var(--gray-5)] bg-gradient-to-r from-[var(--gray-1)] via-[var(--principal-2)] to-[var(--gray-1)] text-left overflow-hidden cursor-pointer hover:border-[var(--gray-7)] transition-colors disabled:cursor-wait"
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
                Tudo num arquivo só — README, CSS, tokens JSON e preset Tailwind.
              </p>
            </div>
            <span
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--gray-12)] text-[var(--gray-1)] group-hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
            >
              {bundleState === 'generating' ? (
                <>
                  <Spinner />
                  Gerando…
                </>
              ) : bundleState === 'done' ? (
                <>
                  <CheckIcon />
                  Baixado
                </>
              ) : (
                <>
                  <DownloadIcon />
                  Baixar tudo (.zip)
                </>
              )}
            </span>
          </div>
        </button>
      </motion.div>

      <motion.div variants={itemVar} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
        {packages.map((p) => (
          <motion.div key={p.id} variants={itemVar}>
            <button
              type="button"
              onClick={p.download}
              className="group w-full text-left p-5 rounded-xl border border-[var(--gray-5)] bg-[var(--gray-1)] hover:border-[var(--gray-7)] hover:shadow-[0_8px_20px_-12px_rgba(17,50,100,0.18)] cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ background: p.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 700 }}
                >
                  {p.ext.replace('.', '').toUpperCase()}
                </div>
                <DownloadIcon className="text-[var(--gray-9)] group-hover:text-[var(--gray-12)] group-hover:translate-y-0.5 transition-all" />
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

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="40 60" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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
