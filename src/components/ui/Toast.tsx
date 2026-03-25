import { cn } from '@/lib/cn'

type ToastProps = {
  property1?: 'Default' | 'Variant2' | 'Variant3'
  showText?: boolean
  subtext?: string
  text?: string
  className?: string
  static?: boolean
}

export function Toast({
  property1 = 'Default',
  showText = true,
  subtext = 'Item excluído',
  text = 'Item excluído',
  className,
}: ToastProps) {
  const icon =
    property1 === 'Default' ? <CheckCircleIcon /> :
    property1 === 'Variant2' ? <WarningTriangleIcon /> :
    <InfoCircleIcon />

  return (
    <div
      className={cn(
        'rounded-[8px] overflow-clip bg-[var(--gray-1)] border border-[var(--gray-6)] shadow-[0px_4px_16px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <div className="flex gap-[32px] p-[16px] items-center">
        <div className="flex items-center gap-[12px] flex-1 min-w-0">
          <div className="shrink-0">{icon}</div>
          <div className="flex flex-col gap-[4px] min-w-0">
            <span
              className="text-[var(--gray-12)] truncate"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '16px', fontWeight: 600, lineHeight: 1.1 }}
            >
              {text}
            </span>
            <span
              className="text-[var(--gray-11)] truncate"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: 1.3 }}
            >
              {subtext}
            </span>
          </div>
        </div>

        {showText && (
          <button
            className="shrink-0 bg-transparent border-none cursor-pointer transition-all duration-200 hover:opacity-80"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--red-11)',
            }}
          >
            Desfazer
          </button>
        )}
      </div>

      <div className="w-full h-[6px] bg-[var(--gray-4)]">
        <div
          className="h-full rounded-r-full"
          style={{ width: '24%', backgroundColor: 'var(--green-9)' }}
        />
      </div>
    </div>
  )
}

const CheckCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" fill="var(--green-3)" stroke="var(--green-9)" strokeWidth="2" />
    <path d="M9 14.5L12.5 18L19 11" stroke="var(--green-11)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WarningTriangleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4L25 24H3L14 4Z" fill="var(--yellow-3)" stroke="var(--yellow-9)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 12V17" stroke="var(--yellow-11)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="21" r="1" fill="var(--yellow-11)" />
  </svg>
)

const InfoCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" fill="var(--principal-3)" stroke="var(--principal-9)" strokeWidth="2" />
    <path d="M14 13V20" stroke="var(--principal-11)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="9" r="1.5" fill="var(--principal-11)" />
  </svg>
)
