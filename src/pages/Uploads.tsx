import { motion } from 'framer-motion'
import { Upload } from '@/components/ui/Upload'
import { CodeBlock } from '@/components/ui/CodeBlock'

const statuses = ['Default', 'hover', 'Click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Uploads() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Upload
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Area de drag and drop para upload de arquivos com estados visuais interativos.
      </p>

      {/* Preview — interactive */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-col gap-8 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <Upload />
        </div>
      </div>

      {/* Todas as variantes — static */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="flex flex-col gap-8 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          {statuses.map((s) => (
            <div key={s}>
              <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                {s}
              </span>
              <div className="inline-flex pointer-events-none">
                <Upload status={s} static />
              </div>
            </div>
          ))}
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
                  <td className="p-4 text-[var(--gray-11)]" style={cellStyle}>{row.type}</td>
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

type UploadProps = {
  status?: 'Default' | 'Click' | 'hover'
  className?: string
  static?: boolean
  onFileSelect?: (files: FileList) => void
}

const UploadIcon = ({ color }: { color: string }) => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 34V18M26 18L20 24M26 18L32 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38 34V38C38 39.1046 37.1046 40 36 40H16C14.8954 40 14 39.1046 14 38V34" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="2" width="48" height="48" rx="6" stroke={color} strokeWidth="2.5" />
  </svg>
)

export function Upload({
  status = 'Default',
  className,
  static: isStatic = false,
  onFileSelect,
}: UploadProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const currentStatus = isStatic
    ? status
    : isClicked
      ? 'Click'
      : isHovered
        ? 'hover'
        : 'Default'

  const statusStyles = {
    Default: {
      bg: 'bg-[var(--gray-2)]',
      border: 'border-[var(--gray-6)]',
      borderWidth: '1px',
      iconColor: 'var(--gray-12)',
      titleColor: 'text-[var(--gray-12)]',
      subtitleColor: 'text-[var(--gray-11)]',
    },
    hover: {
      bg: 'bg-[var(--principal-4)]',
      border: 'border-[var(--principal-7)]',
      borderWidth: '2px',
      iconColor: 'var(--principal-12)',
      titleColor: 'text-[var(--principal-12)]',
      subtitleColor: 'text-[var(--principal-12)]',
    },
    Click: {
      bg: 'bg-[var(--principal-5)]',
      border: 'border-[var(--principal-8)]',
      borderWidth: '1px',
      iconColor: 'var(--principal-12)',
      titleColor: 'text-[var(--principal-12)]',
      subtitleColor: 'text-[var(--principal-12)]',
    },
  }

  const s = statusStyles[currentStatus]

  return (
    <div
      className={cn(
        'rounded-[8px] border-dashed px-[20px] py-[24px] gap-[16px] flex flex-col items-center cursor-pointer transition-all duration-200',
        s.bg,
        s.border,
        className,
      )}
      style={{ borderWidth: s.borderWidth, borderStyle: 'dashed' }}
      onMouseEnter={() => { if (!isStatic) setIsHovered(true) }}
      onMouseLeave={() => { if (!isStatic) { setIsHovered(false); setIsClicked(false) } }}
      onMouseDown={() => { if (!isStatic) setIsClicked(true) }}
      onMouseUp={() => { if (!isStatic) setIsClicked(false) }}
      onDragOver={(e) => { e.preventDefault(); if (!isStatic) setIsHovered(true) }}
      onDragLeave={() => { if (!isStatic) setIsHovered(false) }}
      onDrop={(e) => {
        e.preventDefault()
        if (!isStatic && e.dataTransfer.files.length > 0) {
          onFileSelect?.(e.dataTransfer.files)
        }
        setIsHovered(false)
      }}
    >
      <UploadIcon color={s.iconColor} />
      <div className="flex flex-col items-center gap-[4px]">
        <span
          className={cn('text-center transition-all duration-200', s.titleColor)}
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '16px', fontWeight: 500 }}
        >
          Clique ou arraste um arquivo para este campo
        </span>
        <span
          className={cn('text-center transition-all duration-200', s.subtitleColor)}
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 400 }}
        >
          Tipos de arquivo: PDF, PNG e JPEG
        </span>
      </div>
    </div>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const cellStyle = { fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'status', type: '"Default" | "Click" | "hover"', default: '"Default"' },
  { name: 'onFileSelect', type: '(files: FileList) => void', default: 'undefined' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
