import { motion } from 'framer-motion'
import { SocialButton } from '@/components/ui/SocialButton'
import { CodeBlock } from '@/components/ui/CodeBlock'

const statuses = ['enabled', 'hover', 'click'] as const

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const } },
}

export function SocialButtons() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        SocialButton
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Botao de login social. Atualmente suporta Google.
      </p>

      {/* Preview */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="flex items-center justify-center p-12 rounded-xl bg-[var(--gray-1)] border border-[var(--border)]">
          <SocialButton />
        </div>
      </div>

      {/* All status variants */}
      <div className="mb-10">
        <SectionTitle>Todas as variantes</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                <th className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>type / status</th>
                {statuses.map((s) => (
                  <th key={s} className="text-center p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)] last:border-b-0">
                <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>Google</td>
                {statuses.map((status) => (
                  <td key={status} className="p-4 text-center">
                    <div className="inline-flex pointer-events-none">
                      <SocialButton status={status} />
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="mb-10">
        <SectionTitle>Atributos (Props)</SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--gray-2)]">
                {['Prop', 'Tipo', 'Default'].map((h) => (
                  <th key={h} className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--border)]" style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propsData.map((row) => (
                <tr key={row.name} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
                  <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
                  <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-10">
        <SectionTitle>Codigo</SectionTitle>
        <CodeBlock code={componentCode} />
      </div>
    </motion.section>
  )
}

const componentCode = `import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type SocialButtonProps = {
  status?: 'enabled' | 'hover' | 'click'
  type?: 'Google'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

const statusStyles = {
  enabled: 'bg-[var(--gray-1)] border-[var(--gray-6)]',
  hover: 'bg-[var(--gray-4)] border-[var(--gray-7)]',
  click: 'bg-[var(--gray-5)] border-[var(--gray-8)]',
} as const

export function SocialButton({
  status = 'enabled',
  type = 'Google',
  className,
  ...rest
}: SocialButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-[8px] h-[52px] px-[16px] py-[9px] rounded-[8px] border transition-colors cursor-pointer',
        "font-['Archivo',sans-serif] font-semibold text-[16px] leading-[1.1] text-[var(--gray-12)]",
        statusStyles[status],
        status === 'enabled' && 'hover:bg-[var(--gray-4)] hover:border-[var(--gray-7)] active:bg-[var(--gray-5)] active:border-[var(--gray-8)]',
        className
      )}
      {...rest}
    >
      {type === 'Google' && <GoogleIcon />}
      <span>Conectar com o Google</span>
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg className="shrink-0 size-[24px]" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.96 11.96 0 0 0 .96 12c0 1.94.46 3.77 1.22 5.33l2.66-2.07V14.1Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335" />
    </svg>
  )
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'status', type: '"enabled" | "hover" | "click"', default: '"enabled"' },
  { name: 'type', type: '"Google"', default: '"Google"' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
