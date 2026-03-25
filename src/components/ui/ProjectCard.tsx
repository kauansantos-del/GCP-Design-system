import { useState, useRef, useEffect } from 'react'
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
  title = 'Residencial Flor São Caetano',
  tag: _tag = 'Prático',
  tagType = 'pratico',
  editedAt = 'Editado  1 hora atrás',
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
}
