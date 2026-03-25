import { useState } from 'react'
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

  const placeholderImage = `https://placehold.co/400x128/e8e9ec/999999?text=${type}`

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
}
