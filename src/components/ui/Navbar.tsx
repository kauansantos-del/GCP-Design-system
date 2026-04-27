import { cn } from '@/lib/cn'
import { NavbarButton } from './NavbarButton'

type NavbarProps = {
  items?: string[]
  userName?: string
  className?: string
}

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6L8 10L12 6" />
  </svg>
)

export function Navbar({
  items = ['Residencial Flor do Campo', 'Edifício Vista Bela', 'Condomínio Bosque Verde'],
  userName = 'Nome completo',
  className,
}: NavbarProps) {
  return (
    <div
      className={cn(
        'w-[200px] h-full bg-[var(--gray-3)] border-r border-[var(--gray-6)] flex flex-col',
        className,
      )}
    >
      {/* Top: Logo */}
      <div
        className="h-[84px] py-[20px] px-[16px] flex items-center shrink-0"
      >
        <span
          className="text-[var(--gray-12)]"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}
        >
          GCP
        </span>
      </div>

      {/* Middle: Project list */}
      <div className="flex-1 overflow-y-auto scroll-elegant px-[16px] flex flex-col gap-[4px]">
        {items.map((item, index) => (
          <NavbarButton key={index} type="Chat" text={item} />
        ))}
      </div>

      {/* Bottom: User profile + Disconnect */}
      <div className="px-[16px] pb-[24px] flex flex-col gap-[8px] shrink-0">
        {/* User row */}
        <div className="flex items-center gap-[8px] py-[8px] cursor-pointer">
          <div className="w-[32px] h-[32px] rounded-full bg-[var(--gray-6)] shrink-0" />
          <span
            className="text-[var(--gray-12)] truncate flex-1"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', fontWeight: 500 }}
          >
            {userName}
          </span>
          <span className="text-[var(--gray-11)] shrink-0">
            <ChevronDownIcon />
          </span>
        </div>

        {/* Disconnect */}
        <NavbarButton type="Sair" />
      </div>
    </div>
  )
}
