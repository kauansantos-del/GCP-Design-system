import { motion } from 'framer-motion'
import { NavbarButton } from '@/components/ui/NavbarButton'
import { ContextMenuItem } from '@/components/ui/ContextMenuItem'
import { CodeBlock } from '@/components/ui/CodeBlock'

const navbarButtonStatuses = ['Default', 'Hover', 'Click'] as const
const navbarButtonTypes = ['Chat', 'Sair'] as const
const contextMenuTypes = ['Rename', 'Excluir', 'Duplicar'] as const
const contextMenuStatuses = ['Default', 'hover', 'Click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
}

export function NavbarButtonPage() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        NavbarButton
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Botao de item usado dentro da Navbar. Possui dois tipos: <code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1 py-0.5 rounded text-sm" style={{ fontFamily: "'Archivo', sans-serif" }}>Chat</code> (item de projeto) e <code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1 py-0.5 rounded text-sm" style={{ fontFamily: "'Archivo', sans-serif" }}>Sair</code> (desconectar). O <code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1 py-0.5 rounded text-sm" style={{ fontFamily: "'Archivo', sans-serif" }}>ContextMenuItem</code> e o subcomponente que representa cada opcao do dropdown (Renomear, Excluir, Duplicar).
      </p>

      {/* Preview — interactive */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex flex-wrap gap-6 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <div className="flex flex-col gap-2">
            <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
              Chat
            </span>
            <div className="w-[240px]">
              <NavbarButton type="Chat" text="Residencial Flor do Campo" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
              Sair
            </span>
            <div className="w-[240px]">
              <NavbarButton type="Sair" />
            </div>
          </div>
        </div>
      </div>

      {/* Todas as variantes — static */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>type / status</th>
                {navbarButtonStatuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {navbarButtonTypes.map((t) => (
                <tr key={t} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                  {navbarButtonStatuses.map((s) => (
                    <td key={s} className="p-4">
                      <div className="pointer-events-none w-[240px]">
                        <NavbarButton status={s} type={t} static />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Props — NavbarButton */}
      <div className="mb-10">
        <SectionTitle>Props — NavbarButton</SectionTitle>
        <PropsTable data={navbarButtonProps} />
      </div>

      {/* Divider + Subcomponente: ContextMenuItem */}
      <div id="context-menu-item">
        <div className="my-12 border-t border-[var(--border)]" />
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[2px] w-[24px] bg-[var(--principal-10)]" />
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 700 }} className="text-[var(--gray-12)]">
            Subcomponente: ContextMenuItem
          </h2>
        </div>
        <p className="text-[var(--gray-11)] mb-6" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>
          Cada opcao dentro do dropdown do NavbarButton. Possui tres tipos (Rename, Excluir, Duplicar) com estados visuais independentes.
        </p>

        {/* Preview — interactive ContextMenuItem */}
        <div className="mb-10">
          <SectionTitle>Preview</SectionTitle>
          <div className="flex flex-wrap gap-4 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
            {contextMenuTypes.map((t) => (
              <div key={t} className="flex flex-col items-center gap-2">
                <span className="text-[var(--gray-11)] text-[12px] font-semibold block mb-2" style={{ fontFamily: "'Archivo', sans-serif" }}>
                  {t}
                </span>
                <div className="w-[140px]">
                  <ContextMenuItem type={t} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Todas as variantes — static ContextMenuItem */}
        <div className="mb-10">
          <SectionTitle>Todas as variantes</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--gray-2)]">
                  <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>type / status</th>
                  {contextMenuStatuses.map((s) => (
                    <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contextMenuTypes.map((t) => (
                  <tr key={t} className="border-b border-[var(--border)] last:border-b-0">
                    <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>{t}</td>
                    {contextMenuStatuses.map((s) => (
                      <td key={s} className="p-4">
                        <div className="pointer-events-none w-[140px]">
                          <ContextMenuItem status={s} type={t} static />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Props — ContextMenuItem */}
        <div className="mb-10">
          <SectionTitle>Props — ContextMenuItem</SectionTitle>
          <PropsTable data={contextMenuItemProps} />
        </div>
      </div>

      <div className="mb-10">
        <SectionTitle>Codigo: NavbarButton</SectionTitle>
        <CodeBlock code={navbarButtonCode} />
      </div>
      <div className="mb-10">
        <SectionTitle>Codigo: ContextMenuItem (Subcomponente)</SectionTitle>
        <CodeBlock code={contextMenuItemCode} />
      </div>
    </motion.section>
  )
}

const navbarButtonCode = `import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { ContextMenuItem } from './ContextMenuItem'

type NavbarButtonProps = {
  status?: 'Default' | 'Hover' | 'Click'
  text?: string
  type?: 'Chat' | 'Sair'
  className?: string
  static?: boolean
  onClick?: () => void
  onRename?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
}

const ThreeDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="3" r="1.2" fill="currentColor" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="13" r="1.2" fill="currentColor" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H7" />
    <path d="M13 14L17 10L13 6" />
    <path d="M17 10H7" />
  </svg>
)

export function NavbarButton({
  status = 'Default',
  text = 'Oportunidades',
  type = 'Chat',
  className,
  static: isStatic = false,
  onClick,
  onRename,
  onDelete,
  onDuplicate,
}: NavbarButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const currentStatus = isStatic
    ? status
    : isClicked ? 'Click' : isHovered ? 'Hover' : 'Default'

  const handlers = isStatic ? {} : {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => { setIsHovered(false); setIsClicked(false); setMenuOpen(false) },
  }

  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  if (type === 'Sair') {
    return (
      <button
        className={cn(
          'flex items-center gap-[8px] rounded-[8px] cursor-pointer bg-transparent transition-all duration-200 w-full',
          currentStatus === 'Default' && 'py-[8px] px-[4px] text-[var(--gray-12)]',
          currentStatus === 'Hover' && 'py-[8px] px-[8px] bg-[var(--red-2)] text-[var(--red-12)]',
          currentStatus === 'Click' && 'py-[8px] px-[8px] bg-[var(--red-3)] text-[var(--red-12)]',
          className,
        )}
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500 }}
        {...handlers}
        onMouseDown={() => { if (!isStatic) setIsClicked(true) }}
        onMouseUp={() => { if (!isStatic) setIsClicked(false) }}
        onClick={onClick}
      >
        <LogoutIcon />
        <span className="truncate">Desconectar</span>
      </button>
    )
  }

  return (
    <div className="relative" ref={menuRef} {...handlers}>
      <div
        className={cn(
          'flex items-center rounded-[8px] cursor-pointer transition-all duration-200 w-full',
          currentStatus === 'Default' && 'py-[8px] px-[4px] text-[var(--gray-12)]',
          currentStatus === 'Hover' && 'py-[8px] px-[8px] bg-[var(--gray-4)] border border-[var(--gray-6)] text-[var(--gray-12)]',
          currentStatus === 'Click' && 'py-[8px] px-[8px] bg-[var(--gray-4)] border border-[var(--gray-8)] text-[var(--gray-12)]',
          currentStatus === 'Default' && 'border border-transparent',
          className,
        )}
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500 }}
        onClick={onClick}
      >
        <span className="truncate flex-1">{text}</span>
        <span
          className={cn(
            'shrink-0 transition-all duration-200 cursor-pointer',
            currentStatus === 'Default' ? 'opacity-0 w-0' : 'opacity-100 w-[16px] ml-[4px]',
          )}
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
        >
          <ThreeDotsIcon />
        </span>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 top-full mt-[2px] z-50 bg-[var(--gray-3)] border border-[var(--gray-6)] rounded-[8px] overflow-clip shadow-[0px_4px_14px_rgba(0,0,0,0.08)] min-w-[120px]">
          <ContextMenuItem type="Rename" onClick={() => { setMenuOpen(false); onRename?.() }} />
          <ContextMenuItem type="Excluir" onClick={() => { setMenuOpen(false); onDelete?.() }} />
          <ContextMenuItem type="Duplicar" onClick={() => { setMenuOpen(false); onDuplicate?.() }} />
        </div>
      )}
    </div>
  )
}`

const contextMenuItemCode = `import { useState } from 'react'
import { cn } from '@/lib/cn'

type ContextMenuItemProps = {
  status?: 'Default' | 'hover' | 'Click'
  type?: 'Rename' | 'Excluir' | 'Duplicar'
  className?: string
  static?: boolean
  onClick?: () => void
}

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.333 2.00004C11.5081 1.82494 11.7169 1.68605 11.9474 1.59129C12.178 1.49653 12.4254 1.44775 12.6753 1.44775C12.9252 1.44775 13.1726 1.49653 13.4032 1.59129C13.6337 1.68605 13.8425 1.82494 14.0177 2.00004C14.1928 2.17513 14.3317 2.384 14.4264 2.61453C14.5212 2.84506 14.57 3.09247 14.57 3.34237C14.57 3.59227 14.5212 3.83968 14.4264 4.07021C14.3317 4.30074 14.1928 4.50961 14.0177 4.6847L5.00001 13.7024L1.33334 14.6847L2.31567 11.018L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66668C4.00001 14.6667 3.33334 14 3.33334 13.3333V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33334 4V2.66667C5.33334 2 6.00001 1.33334 6.66668 1.33334H9.33334C10 1.33334 10.6667 2 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66666 7.33334V11.3333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.33334 7.33334V11.3333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5.33334" y="5.33334" width="9.33334" height="9.33334" rx="1.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6667 5.33334V2.66667C10.6667 1.93029 10.0697 1.33334 9.33334 1.33334H2.66668C1.93029 1.33334 1.33334 1.93029 1.33334 2.66667V9.33334C1.33334 10.0697 1.93029 10.6667 2.66668 10.6667H5.33334" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const typeConfig = {
  Rename: {
    icon: <PencilIcon />,
    label: 'Renomear',
    defaultColor: 'text-[var(--gray-12)]',
    hoverColor: 'text-[var(--gray-11)]',
    clickColor: 'text-[var(--gray-12)]',
  },
  Excluir: {
    icon: <TrashIcon />,
    label: 'Excluir',
    defaultColor: 'text-[var(--red-11)]',
    hoverColor: 'text-[var(--red-12)]',
    clickColor: 'text-[var(--red-11)]',
  },
  Duplicar: {
    icon: <CopyIcon />,
    label: 'Duplicar',
    defaultColor: 'text-[var(--principal-11)]',
    hoverColor: 'text-[var(--principal-12)]',
    clickColor: 'text-[var(--principal-11)]',
  },
}

export function ContextMenuItem({
  status = 'Default',
  type = 'Rename',
  className,
  static: isStatic = false,
  onClick,
}: ContextMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const currentStatus = isStatic
    ? status
    : isClicked
      ? 'Click'
      : isHovered
        ? 'hover'
        : 'Default'

  const config = typeConfig[type]

  const bgStyles = {
    Default: '',
    hover: 'bg-[var(--gray-3)]',
    Click: 'bg-[var(--gray-5)]',
  }

  const textStyles = {
    Default: config.defaultColor,
    hover: config.hoverColor,
    Click: config.clickColor,
  }

  return (
    <button
      className={cn(
        'flex items-center gap-[8px] h-[40px] px-[8px] py-[12px] border-b border-[var(--gray-6)] w-full border-x-0 border-t-0 bg-transparent cursor-pointer transition-all duration-200',
        bgStyles[currentStatus],
        textStyles[currentStatus],
        className,
      )}
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '14px', fontWeight: 400 }}
      onMouseEnter={() => { if (!isStatic) setIsHovered(true) }}
      onMouseLeave={() => { if (!isStatic) { setIsHovered(false); setIsClicked(false) } }}
      onMouseDown={() => { if (!isStatic) setIsClicked(true) }}
      onMouseUp={() => { if (!isStatic) setIsClicked(false) }}
      onClick={onClick}
    >
      <span className="shrink-0">{config.icon}</span>
      <span>{config.label}</span>
    </button>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const navbarButtonProps = [
  { name: 'status', type: '"Default" | "Hover" | "Click"', default: '"Default"' },
  { name: 'text', type: 'string', default: '"Oportunidades"' },
  { name: 'type', type: '"Chat" | "Sair"', default: '"Chat"' },
  { name: 'onClick', type: '() => void', default: 'undefined' },
  { name: 'onRename', type: '() => void', default: 'undefined' },
  { name: 'onDelete', type: '() => void', default: 'undefined' },
  { name: 'onDuplicate', type: '() => void', default: 'undefined' },
]

const contextMenuItemProps = [
  { name: 'status', type: '"Default" | "hover" | "Click"', default: '"Default"' },
  { name: 'type', type: '"Rename" | "Excluir" | "Duplicar"', default: '"Rename"' },
  { name: 'onClick', type: '() => void', default: 'undefined' },
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
              <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
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
