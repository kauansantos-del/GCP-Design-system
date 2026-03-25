import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { StatusTag } from '@/components/ui/StatusTag'
import { CodeBlock } from '@/components/ui/CodeBlock'

const statuses = ['Default', 'hover', 'click', 'Dropdown'] as const
const tagTypes = ['pratico', 'confortavel', 'glamuroso'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
}

export function ProjectCards() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        ProjectCard
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Card de projeto com imagem, titulo, tag colorida e timestamp. O StatusTag e o subcomponente usado como badge de estilo dentro do card.
      </p>

      {/* Preview — interactive ProjectCards */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-wrap gap-6 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {tagTypes.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {t}
              </span>
              <div className="inline-flex">
                <ProjectCard tagType={t} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Todas as variantes — static */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>tagType / status</th>
                {statuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tagTypes.map((t) => (
                <tr key={t} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                  {statuses.map((s) => (
                    <td key={s} className="p-4 text-center">
                      <div className="inline-flex pointer-events-none">
                        <ProjectCard status={s} tagType={t} static />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subcomponente: StatusTag */}
      <div id="status-tag" className="mb-10">
        <SectionTitle>Subcomponente: StatusTag</SectionTitle>
        <p className="text-[var(--gray-11)] mb-4" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>
          Badge/pill colorido que indica o tipo de estilo do projeto dentro do ProjectCard.
        </p>
        <div className="flex flex-wrap gap-4 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {tagTypes.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {t}
              </span>
              <StatusTag property1={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Props — ProjectCard */}
      <div className="mb-10">
        <SectionTitle>Props — ProjectCard</SectionTitle>
        <PropsTable data={projectCardPropsData} />
      </div>

      {/* Props — StatusTag */}
      <div className="mb-10">
        <SectionTitle>Props — StatusTag</SectionTitle>
        <PropsTable data={statusTagPropsData} />
      </div>
      <div className="mb-10">
        <SectionTitle>Codigo: ProjectCard</SectionTitle>
        <CodeBlock code={projectCardCode} />
      </div>
      <div className="mb-10">
        <SectionTitle>Codigo: StatusTag (Subcomponente)</SectionTitle>
        <CodeBlock code={statusTagCode} />
      </div>
    </motion.section>
  )
}

const projectCardCode = `import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { StatusTag } from '@/components/ui/StatusTag'

type ProjectCardProps = {
  status?: 'Default' | 'hover' | 'click' | 'Dropdown'
  title?: string
  tag?: string
  tagType?: 'pratico' | 'confortavel' | 'glamuroso'
  editedAt?: string
  image?: string
  className?: string
  static?: boolean
}

const ThreeDotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="4" r="1.5" fill="#ebebed" />
    <circle cx="10" cy="10" r="1.5" fill="#ebebed" />
    <circle cx="10" cy="16" r="1.5" fill="#ebebed" />
  </svg>
)

export function ProjectCard({
  status = 'Default',
  title = 'Residencial Flor Sao Caetano',
  tag = 'Pratico',
  tagType = 'pratico',
  editedAt = 'Editado  1 hora atras',
  image,
  className,
  static: isStatic = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showDropdown, setShowDropdown] = useState(status === 'Dropdown')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentStatus = isStatic
    ? status
    : showDropdown
      ? 'Dropdown'
      : isClicked
        ? 'click'
        : isHovered
          ? 'hover'
          : 'Default'

  useEffect(() => {
    if (!showDropdown) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  const statusStyles = {
    Default: 'bg-[var(--gray-2)] border-[var(--gray-6)]',
    hover: 'bg-[var(--gray-4)] border-[var(--gray-7)]',
    click: 'bg-[var(--gray-5)] border-[var(--gray-8)]',
    Dropdown: 'bg-[var(--gray-3)] border-[var(--gray-6)]',
  }

  return (
    <div
      className={cn(
        'w-[280px] h-[274px] rounded-[8px] overflow-clip border transition-all duration-200 relative flex flex-col',
        statusStyles[currentStatus],
        currentStatus === 'hover' && '-translate-y-[4px] shadow-[0px_8px_24px_rgba(17,50,100,0.15)]',
        className,
      )}
      onMouseEnter={() => { if (!isStatic) setIsHovered(true) }}
      onMouseLeave={() => { if (!isStatic) { setIsHovered(false); setIsClicked(false) } }}
      onMouseDown={() => { if (!isStatic) setIsClicked(true) }}
      onMouseUp={() => { if (!isStatic) setIsClicked(false) }}
    >
      {/* Image area */}
      <div className="relative w-full h-[130px] shrink-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[var(--gray-5)]" />
        )}
        {/* 3-dot menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="absolute top-[8px] right-[8px] w-[24px] h-[24px] rounded-full flex items-center justify-center cursor-pointer border-none"
            style={{ backgroundColor: 'rgba(17,18,20,0.6)' }}
            onClick={(e) => {
              e.stopPropagation()
              if (!isStatic) setShowDropdown(!showDropdown)
            }}
          >
            <ThreeDotsIcon />
          </button>
          {currentStatus === 'Dropdown' && (
            <div className="absolute top-[40px] right-[8px] bg-[var(--gray-1)] border border-[var(--gray-6)] rounded-[8px] shadow-lg z-10 min-w-[160px] overflow-clip">
              {['Renomear', 'Excluir', 'Duplicar'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-[12px] py-[10px] border-none bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[var(--gray-3)] border-b border-[var(--gray-6)] last:border-b-0"
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    color: item === 'Excluir' ? 'var(--red-11)' : 'var(--gray-12)',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-[8px] p-[16px] flex-1">
        <span
          className="text-[var(--gray-12)] truncate"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '16px', fontWeight: 600 }}
        >
          {title}
        </span>
        <StatusTag property1={tagType} />
        <span
          className="text-[var(--gray-11)]"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 400 }}
        >
          {editedAt}
        </span>
      </div>
    </div>
  )
}`

const statusTagCode = `import { cn } from '@/lib/cn'

type StatusTagProps = {
  property1?: 'pratico' | 'confortavel' | 'glamuroso'
  className?: string
}

const tagConfig = {
  pratico: {
    bg: 'bg-[var(--principal-5)]',
    text: 'text-[var(--principal-11)]',
    label: 'Pratico',
  },
  confortavel: {
    bg: 'bg-[var(--yellow-5)]',
    text: 'text-[var(--yellow-11)]',
    label: 'Confortavel',
  },
  glamuroso: {
    bg: 'bg-[var(--violet-5)]',
    text: 'text-[var(--violet-11)]',
    label: 'Glamuroso',
  },
} as const

export function StatusTag({ property1 = 'pratico', className }: StatusTagProps) {
  const config = tagConfig[property1]

  return (
    <span
      className={cn(
        'inline-flex items-center w-fit rounded-[32px] px-[16px] py-[8px]',
        config.bg,
        config.text,
        className,
      )}
      style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500 }}
    >
      {config.label}
    </span>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const cellStyle = { fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const projectCardPropsData = [
  { name: 'status', type: '"Default" | "hover" | "click" | "Dropdown"', default: '"Default"' },
  { name: 'title', type: 'string', default: '"Residencial Flor Sao Caetano"' },
  { name: 'tag', type: 'string', default: '"Pratico"' },
  { name: 'tagType', type: '"pratico" | "confortavel" | "glamuroso"', default: '"pratico"' },
  { name: 'editedAt', type: 'string', default: '"Editado  1 hora atras"' },
  { name: 'image', type: 'string', default: 'undefined' },
]

const statusTagPropsData = [
  { name: 'property1', type: '"pratico" | "confortavel" | "glamuroso"', default: '"pratico"' },
]

function PropsTable({ data }: { data: { name: string; type: string; default: string }[] }) {
  return (
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
          {data.map((row) => (
            <tr key={row.name} className="border-b border-[var(--border)] last:border-b-0">
              <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
              <td className="p-4 text-[var(--gray-11)]" style={cellStyle}>{row.type}</td>
              <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
