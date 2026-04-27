import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { CategoryNavRow } from '@/components/ui/CategoryNavRow'
import { CartLineItem } from '@/components/ui/CartLineItem'

const statuses = ['idle', 'hover', 'active'] as const

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ProductCards() {
  return (
    <motion.section className="max-w-5xl mx-auto" variants={pageVariants} initial="initial" animate="animate">
      <span
        className="block text-[var(--gray-9)] mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        Display · Cards
      </span>
      <h1 className="text-[var(--gray-12)] mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        ProductCard, CategoryNavRow & CartLineItem
      </h1>
      <p className="text-[var(--gray-11)] mb-12 max-w-2xl" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', lineHeight: 1.5 }}>
        Família de cards para exibição de produtos, navegação por categorias e linhas de carrinho. Hover dispara animação spring (lift + scale).
      </p>

      <SectionTitle>Interativo</SectionTitle>
      <p className="text-[var(--gray-11)] mb-4" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>
        Passe o mouse sobre os cards pra ver a animação spring no hover.
      </p>
      <div className="mb-10 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="flex flex-wrap gap-6 items-start">
          <ProductCard
            variant="vertical"
            title="Sofá 3 lugares linho"
            brand="Etna"
            price="R$ 2.890,00"
            badge={{ label: 'Confortável', tone: 'amarelo' }}
          />
          <ProductCard
            variant="horizontal"
            title="Sofá 3 lugares linho"
            brand="MadeiraMadeira"
            price="R$ 2.890,00"
          />
          <CartLineItem
            title="Sofá 3 lugares linho"
            brand="MadeiraMadeira"
            price="R$ 2.890,00"
            quantity={1}
          />
        </div>
      </div>

      <SectionTitle>ProductCard · vertical</SectionTitle>
      <div className="mb-10 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="flex flex-wrap gap-6 items-start">
          {statuses.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Caption>{s}</Caption>
              <ProductCard
                static
                status={s}
                variant="vertical"
                title="Sofá 3 lugares linho"
                brand="Etna"
                price="R$ 2.890,00"
                badge={{ label: 'Confortável', tone: 'amarelo' }}
              />
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <Caption>mobile · default</Caption>
            <ProductCard
              static
              variant="vertical"
              size="mobile"
              title="Residencial Flor São Caetano"
              brand="Editado 1 hora atrás"
              price=""
              badge={{ label: 'Prático', tone: 'azul' }}
            />
          </div>
        </div>
      </div>

      <SectionTitle>ProductCard · horizontal (Compact)</SectionTitle>
      <div className="mb-10 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="flex flex-col gap-4">
          {statuses.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <Caption className="w-16">{s}</Caption>
              <ProductCard static status={s} variant="horizontal" title="Sofá 3 lugares linho" brand="MadeiraMadeira" price="R$ 2.890,00" />
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>CategoryNavRow (substitui o "Construir")</SectionTitle>
      <div className="mb-10 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="flex flex-col gap-4">
          {statuses.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <Caption className="w-16">{s}</Caption>
              <div className="w-[247px]">
                <CategoryNavRow static status={s} title="Portas" count={6} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>CartLineItem (substitui o "Resumo da compra")</SectionTitle>
      <div className="mb-10 p-8 rounded-xl bg-[var(--gray-1)] border border-[var(--gray-5)]">
        <div className="flex flex-col gap-4">
          {statuses.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <Caption className="w-16">{s}</Caption>
              <CartLineItem static status={s} title="Sofá 3 lugares linho" brand="MadeiraMadeira" price="R$ 2.890,00" quantity={1} />
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>Mapeamento Figma → Design System</SectionTitle>
      <div className="overflow-x-auto rounded-xl border border-[var(--gray-5)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--gray-2)]">
              {['Figma (variante)', 'Design System (componente)', 'Props'].map((h) => (
                <th key={h} className="text-left p-4 text-[var(--gray-11)] border-b border-[var(--gray-5)]" style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mappings.map((row) => (
              <tr key={row.figma} className="border-b border-[var(--gray-5)] last:border-b-0">
                <td className="p-4 text-[var(--gray-12)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem' }}>{row.figma}</td>
                <td className="p-4"><code className="text-[var(--principal-11)] bg-[var(--principal-3)] px-1.5 py-0.5 rounded text-sm" style={monoStyle}>{row.component}</code></td>
                <td className="p-4 text-[var(--gray-11)]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem' }}>{row.props}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}

const mappings = [
  { figma: 'Type=Extend, Size=Desktop', component: 'ProductCard', props: 'variant="vertical"' },
  { figma: 'Type=Default, Size=Mobile', component: 'ProductCard', props: 'variant="vertical" size="mobile"' },
  { figma: 'Type=Compact, Size=Desktop', component: 'ProductCard', props: 'variant="horizontal"' },
  { figma: 'Type=Construir, Size=Desktop', component: 'CategoryNavRow', props: 'count={N}' },
  { figma: 'Type=Resumo da compra', component: 'CartLineItem', props: 'quantity={N}' },
]

const thStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 600 } as const
const monoStyle = { fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem' } as const

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[var(--gray-12)] mb-4" style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>{children}</h2>
}

function Caption({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-[var(--gray-9)] ${className}`}
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
    >
      {children}
    </span>
  )
}
