import { useState } from 'react'
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
}
