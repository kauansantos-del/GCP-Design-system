import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { allGalleryGroups } from '@/lib/galeriaManifest'
import { toThumb } from '@/lib/imageThumb'

const itemVar = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Galeria() {
  const [hugeCount, setHugeCount] = useState(1548)

  useEffect(() => {
    fetch('/hugeicons-index.json')
      .then((r) => r.json())
      .then((arr: unknown[]) => setHugeCount(arr.length))
      .catch(() => undefined)
  }, [])

  const rendersCount =
    allGalleryGroups[0].categories.reduce((a, c) => a + c.subcategories.reduce((s, sub) => s + sub.assets.length, 0), 0) +
    allGalleryGroups[1].categories.reduce((a, c) => a + c.subcategories.reduce((s, sub) => s + sub.assets.length, 0), 0)
  const icons3dCount = 6

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      <motion.header variants={itemVar} className="mb-12 pb-8 border-b border-[var(--gray-5)]">
        <span
          className="block text-[var(--gray-9)] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          04 — Assets
        </span>
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          Galeria
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.55 }}
        >
          Toda a biblioteca visual do GCP em um só lugar. Renders 3D, ícones 3D representativos e a biblioteca completa de ícones SVG.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div variants={itemVar}>
          <CategoryCard
            to="/galeria/renders"
            eyebrow="Objetos / Construir"
            title="Renders"
            description="Renders 3D de objetos e elementos construtivos."
            count={rendersCount}
            badge={{ label: 'PNG', tone: 'green' }}
            preview={
              <div className="flex items-end justify-center gap-1 h-full pb-3">
                {[
                  '/galeria/Categorias - Construir/categoria-arcos.png',
                  '/galeria/Categorias - Construir/categorias-cercas.png',
                ].map((src, i) => (
                  <img
                    key={src}
                    src={toThumb(encodeURI(src))}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-24 h-24 object-contain drop-shadow-[0_8px_16px_rgba(17,50,100,0.18)]"
                    style={{ transform: `translateY(${i === 0 ? -4 : 0}px) rotate(${(i - 0.5) * 5}deg)` }}
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                  />
                ))}
              </div>
            }
          />
        </motion.div>

        <motion.div variants={itemVar}>
          <CategoryCard
            to="/galeria/icones-3d"
            eyebrow="Decorativos"
            title="Ícones 3Ds"
            description="Ícones representativos renderizados em 3D."
            count={icons3dCount}
            badge={{ label: 'PNG', tone: 'violet' }}
            preview={
              <div className="flex items-end justify-center gap-1 h-full pb-3">
                {[
                  '/galeria/icons 3D/icon-3d-search.png',
                  '/galeria/icons 3D/icon-3d-quarto.png',
                  '/galeria/icons 3D/icon-3d-produto.png',
                ].map((src, i) => (
                  <img
                    key={src}
                    src={toThumb(encodeURI(src))}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 object-contain drop-shadow-[0_8px_16px_rgba(110,86,207,0.20)]"
                    style={{ transform: `translateY(${i === 1 ? -10 : 0}px) rotate(${(i - 1) * 6}deg)` }}
                  />
                ))}
              </div>
            }
          />
        </motion.div>

        <motion.div variants={itemVar}>
          <CategoryCard
            to="/galeria/icones"
            eyebrow="Outline / Solid / Duotone"
            title="Ícones"
            description="Biblioteca completa Hugeicons em três estilos."
            count={hugeCount}
            badge={{ label: 'SVG', tone: 'blue' }}
            preview={
              <div className="grid grid-cols-4 gap-1.5 px-5">
                {[
                  'home-01.1.svg',
                  'search-01.svg',
                  'user.6.svg',
                  'mail-arrow-down.svg',
                  'calendar-01.1.svg',
                  'heart.2.svg',
                  'star.svg',
                  'bell-school.svg',
                ].map((f) => (
                  <span
                    key={f}
                    className="aspect-square flex items-center justify-center rounded-lg bg-[var(--gray-1)] border border-[var(--gray-5)]"
                  >
                    <img
                      src={encodeURI(`/galeria/huge icons pack.iconjar/icons/${f}`)}
                      alt=""
                      className="w-4 h-4 [filter:invert(15%)_sepia(7%)_saturate(280%)_hue-rotate(190deg)]"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
                    />
                  </span>
                ))}
              </div>
            }
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function CategoryCard({
  to,
  eyebrow,
  title,
  description,
  count,
  badge,
  preview,
}: {
  to: string
  eyebrow: string
  title: string
  description: string
  count: number
  badge: { label: string; tone: 'green' | 'blue' | 'violet' }
  preview: React.ReactNode
}) {
  const tones = {
    green: { bg: 'var(--green-3)', border: 'var(--green-6)', text: 'var(--green-11)', dot: 'var(--green-9)' },
    blue: { bg: 'var(--principal-3)', border: 'var(--principal-6)', text: 'var(--principal-11)', dot: 'var(--principal-9)' },
    violet: { bg: 'var(--violet-3)', border: 'var(--violet-6)', text: 'var(--violet-11)', dot: 'var(--violet-9)' },
  }
  const t = tones[badge.tone]

  return (
    <Link
      to={to}
      className="group relative flex flex-col rounded-3xl border border-[var(--gray-5)] bg-gradient-to-br from-[var(--gray-2)] to-[var(--gray-1)] overflow-hidden no-underline transition-all hover:border-[var(--gray-7)] hover:shadow-[0_20px_40px_-20px_rgba(17,50,100,0.2)] hover:-translate-y-1"
    >
      <div className="relative h-44 bg-gradient-to-b from-[var(--gray-1)] to-[var(--gray-2)] overflow-hidden flex items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--gray-5) 1px, transparent 0)',
            backgroundSize: '20px 20px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        <div className="relative w-full">{preview}</div>

        <span
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
          style={{
            background: t.bg,
            borderColor: t.border,
            color: t.text,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.dot }} />
          {badge.label}
        </span>
      </div>

      <div className="px-5 pt-5 pb-5 border-t border-[var(--gray-4)] bg-[var(--gray-1)]">
        <span
          className="block text-[var(--gray-9)] mb-2 truncate"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {eyebrow}
        </span>
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h2
            className="text-[var(--gray-12)]"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            {title}
          </h2>
          <span
            className="text-[var(--gray-10)]"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 600 }}
          >
            {count}
          </span>
        </div>
        <p
          className="text-[var(--gray-11)] mb-4 min-h-[3em]"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', fontWeight: 400, lineHeight: 1.5 }}
        >
          {description}
        </p>
        <span
          className="inline-flex items-center gap-1.5 text-[var(--gray-12)] group-hover:gap-2.5 transition-all duration-200"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '12.5px', fontWeight: 600 }}
        >
          Explorar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14m0 0-6-6m6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
