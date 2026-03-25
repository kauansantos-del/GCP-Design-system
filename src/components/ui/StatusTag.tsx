import { cn } from '@/lib/cn'

type StatusTagProps = {
  property1?: 'pratico' | 'confortavel' | 'glamuroso'
  className?: string
}

const tagConfig = {
  pratico: {
    bg: 'bg-[var(--principal-5)]',
    text: 'text-[var(--principal-11)]',
    label: 'Prático',
  },
  confortavel: {
    bg: 'bg-[var(--yellow-5)]',
    text: 'text-[var(--yellow-11)]',
    label: 'Confortável',
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
}
