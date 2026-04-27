import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type AppSidebarVariant = 'projects' | 'backoffice'
export type BackofficePage = 'admins' | 'users' | 'projects' | 'products'

type Item = {
  id: string
  label: string
  icon?: ReactNode
}

type Props = {
  variant?: AppSidebarVariant
  items: Item[]
  activeId?: string
  onSelect?: (id: string) => void
  user?: { name: string; avatarUrl?: string }
  brand?: ReactNode
  backofficeActive?: BackofficePage
  className?: string
}

export function AppSidebar({
  variant = 'projects',
  items,
  activeId,
  onSelect,
  user = { name: 'Nome completo' },
  brand,
  className,
}: Props) {
  return (
    <aside
      className={cn(
        'flex flex-col justify-between w-[200px] h-full bg-[var(--gray-3)] border-r border-[var(--gray-6)]',
        className
      )}
    >
      <div className="flex flex-col px-4">
        <div className="flex items-center h-[84px] py-5">
          {brand ?? <DefaultBrand />}
        </div>

        {variant === 'backoffice' && (
          <div className="pb-2 mb-2 border-b border-[var(--gray-5)]">
            <span
              className="block text-[var(--gray-9)] mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Backoffice
            </span>
          </div>
        )}

        <nav className="flex flex-col gap-1">
          {items.map((it) => (
            <SidebarItem
              key={it.id}
              label={it.label}
              icon={it.icon}
              active={activeId === it.id}
              onClick={() => onSelect?.(it.id)}
            />
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-6">
        <UserRow name={user.name} avatarUrl={user.avatarUrl} />
        <button
          type="button"
          className="group flex items-center gap-2 px-2 h-10 py-3 rounded text-left cursor-pointer bg-transparent border-none transition-colors hover:bg-[var(--red-3)]"
        >
          <LogoutIcon />
          <span
            className="text-[var(--gray-12)] group-hover:text-[var(--red-11)] transition-colors"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: 1.3 }}
          >
            Desconectar
          </span>
        </button>
      </div>
    </aside>
  )
}

function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon?: ReactNode
  active?: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMenuOpen(false) }}
        className={cn(
          'group flex items-center gap-2 w-full h-9 py-3 px-2 rounded-lg text-left transition-colors cursor-pointer bg-transparent border-none',
          active ? 'bg-[var(--gray-1)] shadow-sm' : 'hover:bg-[var(--gray-4)]'
        )}
      >
        {icon && <span className="shrink-0 text-[var(--gray-11)]">{icon}</span>}
        <span
          className="flex-1 truncate text-[var(--gray-12)]"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: active ? 600 : 500, lineHeight: 1.3 }}
        >
          {label}
        </span>
        {hovered && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o) }}
            aria-label="Mais opções"
            className="shrink-0 size-6 rounded flex items-center justify-center text-[var(--gray-11)] hover:bg-[var(--gray-5)] hover:text-[var(--gray-12)] cursor-pointer bg-transparent border-none"
          >
            <KebabIcon />
          </button>
        )}
      </button>

      {menuOpen && (
        <div
          className="absolute right-2 top-9 z-20 w-[140px] rounded-lg bg-[var(--gray-1)] border border-[var(--gray-6)] shadow-[0_4px_12px_rgba(17,17,17,0.12)] overflow-hidden"
          onMouseLeave={() => setMenuOpen(false)}
        >
          <KebabMenuItem icon={<PencilIcon />} label="Renomear" />
          <KebabMenuItem icon={<DuplicateIcon />} label="Duplicar" tone="info" />
          <KebabMenuItem icon={<TrashIcon />} label="Excluir" tone="danger" />
        </div>
      )}
    </div>
  )
}

function KebabMenuItem({
  icon,
  label,
  tone,
}: {
  icon: ReactNode
  label: string
  tone?: 'info' | 'danger'
}) {
  const color =
    tone === 'danger' ? 'var(--red-11)' : tone === 'info' ? 'var(--principal-11)' : 'var(--gray-12)'
  return (
    <button
      type="button"
      className="flex items-center gap-1 w-full px-2 py-3 text-left transition-colors hover:bg-[var(--gray-3)] cursor-pointer bg-transparent border-none"
    >
      <span className="shrink-0" style={{ color }}>{icon}</span>
      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500, color, lineHeight: 1.3 }}>
        {label}
      </span>
    </button>
  )
}

function UserRow({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between w-full py-2 px-1 rounded-lg hover:bg-[var(--gray-4)] cursor-pointer bg-transparent border-none transition-colors"
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="size-8 rounded-full bg-[var(--gray-5)] shrink-0 overflow-hidden flex items-center justify-center text-[var(--gray-11)]">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <UserIcon />
          )}
        </div>
        <span
          className="truncate text-[var(--gray-12)] text-left"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: 1.3 }}
        >
          {name}
        </span>
      </div>
      <ChevronRightIcon />
    </button>
  )
}

function DefaultBrand() {
  return (
    <span
      className="text-[var(--gray-12)]"
      style={{ fontFamily: "'Archivo', sans-serif", fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}
    >
      GCP
    </span>
  )
}

const sw = 1.6
function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  )
}
function DuplicateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}
function KebabIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gray-11)]" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--red-11)]" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
