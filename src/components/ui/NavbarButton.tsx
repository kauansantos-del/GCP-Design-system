import { useState, useRef, useEffect } from 'react'
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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--red-9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
          'flex items-center gap-[4px] rounded-[8px] cursor-pointer bg-transparent transition-all duration-200 w-full px-[8px] py-[12px] h-[40px]',
          currentStatus === 'Default' && 'text-[var(--gray-12)]',
          currentStatus === 'Hover' && 'bg-[var(--red-2)] text-[var(--red-12)]',
          currentStatus === 'Click' && 'bg-[var(--red-3)] text-[var(--red-12)]',
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
}
