import { motion } from 'framer-motion'
import { useState } from 'react'
import { AppSidebar } from '@/components/ui/AppSidebar'

const projects = [
  { id: 'p1', label: 'Residencial Flor do Campo' },
  { id: 'p2', label: 'Edifício Vista Bela' },
  { id: 'p3', label: 'Condomínio Bosque Verde' },
  { id: 'p4', label: 'Apartamentos Monte Azul' },
  { id: 'p5', label: 'Residencial Paraíso das Flores' },
  { id: 'p6', label: 'Edifício Solar das Águas' },
  { id: 'p7', label: 'Condomínio Nova Aliança' },
  { id: 'p8', label: 'Apartamentos Mirante do Sol' },
]

const backofficeItems = [
  { id: 'admins', label: 'Administradores', icon: <ShieldIcon /> },
  { id: 'users', label: 'Usuários', icon: <UsersIcon /> },
  { id: 'projects', label: 'Projetos', icon: <FolderIcon /> },
  { id: 'products', label: 'Produtos', icon: <BoxIcon /> },
]

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function AppSidebars() {
  const [activeProject, setActiveProject] = useState('p1')
  const [activeBackoffice, setActiveBackoffice] = useState('admins')

  return (
    <motion.section className="max-w-5xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <span
        className="block text-[var(--gray-9)] mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        Navigation · Application Shell
      </span>
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        AppSidebar
      </h1>
      <p className="text-[var(--gray-11)] mb-12 max-w-2xl" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Sidebar principal da aplicação. 200px de largura, com lista de itens, menu de contexto (renomear / duplicar / excluir) e área de usuário.
      </p>

      <SectionTitle>Variant: projects (Default)</SectionTitle>
      <div className="mb-10 rounded-xl border border-[var(--gray-5)] overflow-hidden bg-[var(--gray-2)]">
        <div className="flex" style={{ height: 600 }}>
          <AppSidebar
            variant="projects"
            items={projects}
            activeId={activeProject}
            onSelect={setActiveProject}
          />
          <div className="flex-1 p-10 bg-[var(--gray-1)] flex items-center justify-center">
            <div className="text-center">
              <p className="text-[var(--gray-9)] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Conteúdo do projeto selecionado
              </p>
              <p className="text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 700 }}>
                {projects.find((p) => p.id === activeProject)?.label}
              </p>
              <p className="text-[var(--gray-9)] mt-2" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px' }}>
                Hover num item da sidebar pra ver o menu de contexto.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SectionTitle>Variant: backoffice</SectionTitle>
      <div className="mb-10 rounded-xl border border-[var(--gray-5)] overflow-hidden bg-[var(--gray-2)]">
        <div className="flex" style={{ height: 600 }}>
          <AppSidebar
            variant="backoffice"
            items={backofficeItems}
            activeId={activeBackoffice}
            onSelect={setActiveBackoffice}
          />
          <div className="flex-1 p-10 bg-[var(--gray-1)] flex items-center justify-center">
            <p className="text-[var(--gray-12)]" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 700 }}>
              {backofficeItems.find((p) => p.id === activeBackoffice)?.label}
            </p>
          </div>
        </div>
      </div>

      <SectionTitle>Atributos (Props)</SectionTitle>
      <div className="overflow-x-auto rounded-xl border border-[var(--gray-5)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--gray-2)]">
              {['Prop', 'Tipo', 'Default'].map((h) => (
                <th key={h} className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--gray-5)]" style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propsData.map((row) => (
              <tr key={row.name} className="border-b border-[var(--gray-5)] last:border-b-0">
                <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.name}</code></td>
                <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.type}</td>
                <td className="p-4"><code className="text-[var(--gray-12)] bg-[var(--gray-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.default}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}

const propsData = [
  { name: 'variant', type: '"projects" | "backoffice"', default: '"projects"' },
  { name: 'items', type: '{ id, label, icon? }[]', default: '—' },
  { name: 'activeId', type: 'string', default: '—' },
  { name: 'onSelect', type: '(id: string) => void', default: '—' },
  { name: 'user', type: '{ name, avatarUrl? }', default: '—' },
]

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}

const sw = 1.6
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function BoxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}
