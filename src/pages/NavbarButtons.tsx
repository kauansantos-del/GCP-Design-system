import { motion } from 'framer-motion'
import { Navbar } from '@/components/ui/Navbar'
import { CodeBlock } from '@/components/ui/CodeBlock'

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function NavbarButtons() {
  return (
    <motion.section className="max-w-4xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1 }}>
        Navbar
      </h1>
      <p className="text-[var(--gray-11)] mb-10" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Componente de sidebar de navegacao que agrupa os projetos do usuario. Ao passar o mouse sobre um item, aparece o menu de 3 pontos. Ao clicar nele, o dropdown com opcoes (Renomear, Excluir, Duplicar) e exibido.
      </p>

      {/* Preview — interactive */}
      <div className="mb-10">
        <SectionTitle>Preview</SectionTitle>
        <div className="rounded-xl bg-[var(--gray-1)] border border-[var(--border)] overflow-clip">
          <div className="h-[560px]">
            <Navbar
              items={[
                'Residencial Flor do Campo',
                'Edifício Vista Bela',
                'Condomínio Bosque Verde',
                'Apartamentos Monte Azul',
                'Residencial Paraíso das Flores',
                'Edifício Solar das Águas',
              ]}
              userName="João da Silva"
            />
          </div>
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

const componentCode = `import { cn } from '@/lib/cn'
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
  items = ['Residencial Flor do Campo', 'Edificio Vista Bela', 'Condominio Bosque Verde'],
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
}`

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

const propsData = [
  { name: 'items', type: 'string[]', default: '["Residencial Flor do Campo", ...]' },
  { name: 'userName', type: 'string', default: '"Nome completo"' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}
