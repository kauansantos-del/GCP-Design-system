import { useState } from 'react'
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
}
