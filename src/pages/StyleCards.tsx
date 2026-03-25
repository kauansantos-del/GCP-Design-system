import { motion } from 'framer-motion'
import { StyleCard } from '@/components/ui/StyleCard'
import { CodeBlock } from '@/components/ui/CodeBlock'

const types = ['Pratico', 'Confortavel', 'Glamuroso'] as const
const statuses = ['Default', 'hover', 'click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
}

export function StyleCards() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        StyleCard
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Card de selecao de estilo com imagem, titulo e descricao.
      </p>

      {/* Preview — all types in a row */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {types.map((t) => (
            <div key={t} className="flex flex-col gap-2">
              <span className="text-[var(--gray-11)] text-[12px] font-semibold" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {t}
              </span>
              <StyleCard type={t} />
            </div>
          ))}
        </div>
      </div>

      {/* All variants */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>type / status</th>
                {statuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {types.map((t) => (
                <tr key={t} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                  {statuses.map((s) => (
                    <td key={s} className="p-4 text-center">
                      <div className="inline-flex pointer-events-none w-[200px]">
                        <StyleCard type={t} status={s} static />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="mb-10">
        <SectionTitle>Atributos (Props)</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                {['Prop', 'Tipo', 'Default'].map((h) => (
                  <th key={h} className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propsData.map((row) => (
                <tr key={row.name} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
                  <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
                  <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-10">
        <SectionTitle>Codigo</SectionTitle>
        <CodeBlock code={componentCode} />
      </div>
    </motion.section>
  )
}

const componentCode = `import { useState } from 'react'
import { cn } from '@/lib/cn'

type StyleCardProps = {
  status?: 'Default' | 'hover' | 'click'
  type?: 'Pratico' | 'Confortavel' | 'Glamuroso'
  image?: string
  title?: string
  description?: string
  className?: string
  static?: boolean
  onClick?: () => void
}

const defaultContent = {
  Pratico: {
    title: 'Pratico',
    description: 'Ambientes funcionais e organizados, sem excessos.',
  },
  Confortavel: {
    title: 'Confortavel',
    description: 'Espacos aconchegantes pensados para o dia a dia.',
  },
  Glamuroso: {
    title: 'Glamuroso',
    description: 'Design sofisticado com detalhes que impressionam.',
  },
}

export function StyleCard({
  status = 'Default',
  type = 'Pratico',
  image = '',
  title,
  description,
  static: isStatic = false,
  className,
  onClick,
}: StyleCardProps) {
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)

  const resolvedStatus = isStatic
    ? status
    : selected
      ? 'click'
      : hovered
        ? 'hover'
        : 'Default'

  const hoverHandlers = isStatic
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }

  const handleClick = () => {
    if (!isStatic) {
      setSelected(!selected)
    }
    onClick?.()
  }

  const content = defaultContent[type]
  const displayTitle = title || content.title
  const displayDescription = description || content.description

  const placeholderImage = 'https://placehold.co/400x128/e8e9ec/999999?text=' + type

  return (
    <button
      className={cn(
        'flex flex-col rounded-[12px] pt-[12px] px-[12px] pb-[16px] gap-[20px] cursor-pointer transition-all duration-200 text-left',
        resolvedStatus === 'click'
          ? 'bg-[var(--principal-4)] border border-[var(--principal-8)]'
          : resolvedStatus === 'hover'
            ? 'bg-[var(--gray-4)] border border-[var(--gray-7)]'
            : 'bg-[var(--gray-2)] border border-[var(--gray-6)]',
        className
      )}
      {...hoverHandlers}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="w-full h-[128px] rounded-[9.481px] overflow-hidden">
        <img
          src={image || placeholderImage}
          alt={displayTitle}
          className={cn(
            'w-full h-full object-cover transition-transform duration-200',
            resolvedStatus === 'hover' && 'rotate-[2deg] scale-105'
          )}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[4px]">
        <span
          className={cn(
            'leading-[1.1] transition-colors duration-200',
            resolvedStatus === 'click'
              ? 'text-[var(--principal-12)]'
              : 'text-[var(--gray-12)]'
          )}
          style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: '16px' }}
        >
          {displayTitle}
        </span>
        <span
          className={cn(
            'leading-[1.3] transition-colors duration-200',
            resolvedStatus === 'click'
              ? 'text-[var(--principal-12)]'
              : resolvedStatus === 'hover'
                ? 'text-[var(--gray-12)]'
                : 'text-[var(--gray-11)]'
          )}
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400, fontSize: '16px' }}
        >
          {displayDescription}
        </span>
      </div>
    </button>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'status', type: '"Default" | "hover" | "click"', default: '"Default"' },
  { name: 'type', type: '"Pratico" | "Confortavel" | "Glamuroso"', default: '"Pratico"' },
  { name: 'image', type: 'string', default: '""' },
  { name: 'title', type: 'string', default: '(based on type)' },
  { name: 'description', type: 'string', default: '(based on type)' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
