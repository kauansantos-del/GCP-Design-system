import { cn } from '@/lib/cn'

type CheckboxProps = {
  changeIcon?: React.ReactNode | null
  direction?: 'esquerda' | 'direita'
  iconShow?: boolean
  status?: 'enabled' | 'hover' | 'focus'
  text?: string
  className?: string
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  changeIcon = null,
  direction = 'esquerda',
  iconShow = false,
  status = 'enabled',
  text = 'Lembrar conta',
  className,
  onChange,
}: CheckboxProps) {
  const isChecked = status === 'focus'

  const checkboxBox = (
    <span
      className={cn(
        'inline-flex items-center justify-center shrink-0 size-[20px] rounded-[4px] transition-all duration-200',
        isChecked
          ? 'bg-[var(--principal-10)] group-hover:bg-[var(--principal-9)]'
          : status === 'hover'
            ? 'border-[1.25px] border-[var(--gray-7)] bg-[var(--gray-4)]'
            : 'border-[1.25px] border-[var(--gray-6)] bg-transparent group-hover:border-[var(--gray-7)] group-hover:bg-[var(--gray-4)]'
      )}
    >
      {isChecked && (
        <svg className="size-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  )

  const label = (
    <span className="flex items-center gap-[4px]">
      {iconShow && (changeIcon || <DefaultCheckboxIcon />)}
      <span
        className="text-[var(--gray-12)] text-[16px] leading-[1.3]"
        style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
      >
        {text}
      </span>
    </span>
  )

  return (
    <button
      className={cn('inline-flex items-center gap-[8px] cursor-pointer group', className)}
      onClick={() => onChange?.(!isChecked)}
    >
      {direction === 'esquerda' ? (
        <>{checkboxBox}{label}</>
      ) : (
        <>{label}{checkboxBox}</>
      )}
    </button>
  )
}

function DefaultCheckboxIcon() {
  return (
    <svg className="shrink-0 size-[24px] text-[var(--gray-11)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  )
}
