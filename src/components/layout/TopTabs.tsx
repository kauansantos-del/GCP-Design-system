import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Section } from '@/lib/nav'

const tabs: { id: Section; label: string; path: string }[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'componentes', label: 'Componentes', path: '/componentes' },
  { id: 'docs', label: 'Documentação', path: '/docs' },
  { id: 'galeria', label: 'Galeria', path: '/galeria' },
]

export function TopTabs({ section }: { section: Section }) {
  return (
    <nav className="flex items-center gap-1">
      {tabs.map((tab) => {
        const active = section === tab.id
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className="relative px-3.5 py-1.5 rounded-full no-underline transition-colors"
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
              color: active ? 'var(--gray-12)' : 'var(--gray-10)',
            }}
          >
            {active && (
              <motion.span
                layoutId="top-tabs-indicator"
                className="absolute inset-0 rounded-full bg-[var(--gray-3)] border border-[var(--gray-5)]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                aria-hidden
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
