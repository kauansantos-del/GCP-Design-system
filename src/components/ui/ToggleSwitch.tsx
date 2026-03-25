import { useState } from 'react'
import { cn } from '@/lib/cn'

type ToggleSwitchProps = {
  showText?: boolean
  status?: boolean
  type?: 'Direita' | 'Esquerda'
  className?: string
  static?: boolean
  onChange?: (value: boolean) => void
  label?: string
  subtitle?: string
}

export function ToggleSwitch({
  showText = true,
  status = false,
  type = 'Esquerda',
  static: isStatic = false,
  className,
  onChange,
  label = 'Ativar',
  subtitle = 'Descricao do toggle',
}: ToggleSwitchProps) {
  const [internalStatus, setInternalStatus] = useState(status)

  const isOn = isStatic ? status : internalStatus

  const handleClick = () => {
    if (isStatic) return
    const newValue = !internalStatus
    setInternalStatus(newValue)
    onChange?.(newValue)
  }

  const toggle = (
    <button
      className={cn(
        'relative flex items-center w-[50px] h-[24px] rounded-full cursor-pointer transition-colors duration-200 p-[2px] shrink-0',
        isOn ? 'bg-[var(--green-9)]' : 'bg-[var(--gray-6)]'
      )}
      onClick={handleClick}
    >
      <span
        className={cn(
          'block w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-all duration-200',
          isOn ? 'translate-x-[26px]' : 'translate-x-0'
        )}
      />
    </button>
  )

  const textContent = showText ? (
    <div className="flex flex-col">
      <span
        className={cn(
          'text-[16px] leading-[1.3] transition-colors duration-200',
          isOn ? 'text-[var(--gray-12)]' : 'text-[var(--gray-11)]'
        )}
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
      >
        {label}
      </span>
      {type === 'Direita' && (
        <span
          className="text-[14px] leading-[1.3] text-[var(--gray-11)]"
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
        >
          {subtitle}
        </span>
      )}
    </div>
  ) : null

  return (
    <div className={cn('inline-flex items-center gap-[12px]', className)}>
      {type === 'Esquerda' ? (
        <>
          {toggle}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {toggle}
        </>
      )}
    </div>
  )
}
