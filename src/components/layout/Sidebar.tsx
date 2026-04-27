import { NavLink, useLocation, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cn } from '@/lib/cn'
import {
  componentCategories,
  docsCategories,
  galeriaCategories,
  type NavCategory,
  type Section,
} from '@/lib/nav'

const sectionMeta: Record<Exclude<Section, 'home'>, { eyebrow: string; title: string; categories: NavCategory[]; searchable: boolean }> = {
  componentes: {
    eyebrow: '02 — Library',
    title: 'Componentes',
    categories: componentCategories,
    searchable: true,
  },
  docs: {
    eyebrow: '03 — Foundations',
    title: 'Documentação',
    categories: docsCategories,
    searchable: false,
  },
  galeria: {
    eyebrow: '04 — Assets',
    title: 'Galeria',
    categories: galeriaCategories,
    searchable: false,
  },
}

export function Sidebar({ section }: { section: Section }) {
  if (section === 'home') return null
  const meta = sectionMeta[section]

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--gray-2)]/50 backdrop-blur-sm flex flex-col">
      <div className="px-5 pt-6 pb-4 border-b border-[var(--border)]">
        <span
          className="block text-[var(--gray-9)] mb-1.5"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em' }}
        >
          {meta.eyebrow}
        </span>
        <h2
          className="text-[var(--gray-12)]"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' }}
        >
          {meta.title}
        </h2>
      </div>

      <ScrollArea.Root className="flex-1 min-h-0" type="hover">
        <ScrollArea.Viewport className="h-full w-full [&>div]:!block">
          <SidebarBody section={section} categories={meta.categories} searchable={meta.searchable} />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none p-0.5 transition-colors duration-200 data-[orientation=vertical]:w-2 hover:bg-[var(--gray-3)]"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-[var(--gray-6)] hover:bg-[var(--gray-8)] transition-colors duration-200" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </aside>
  )
}

function SidebarBody({
  section,
  categories,
  searchable,
}: {
  section: Exclude<Section, 'home'>
  categories: NavCategory[]
  searchable: boolean
}) {
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const filtered = useMemo(() => {
    if (!query.trim()) return categories
    const q = query.trim().toLowerCase()
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((it) => it.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [query, categories])

  const totalCount = categories.reduce((acc, c) => acc + c.items.length, 0)

  return (
    <div className="px-3 py-4">
      {searchable && (
        <SearchBox value={query} onChange={setQuery} placeholder={`Buscar em ${totalCount} componentes`} />
      )}

      <motion.div
        className="flex flex-col gap-5 mt-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
      >
        {filtered.map((cat) => (
          <CategoryGroup
            key={cat.id}
            category={cat}
            collapsed={!!collapsed[cat.id]}
            onToggle={() => setCollapsed((s) => ({ ...s, [cat.id]: !s[cat.id] }))}
            section={section}
          />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="px-3 py-8 text-center">
          <p className="text-[var(--gray-10)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem' }}>
            Nada encontrado para "<span className="text-[var(--gray-12)]">{query}</span>"
          </p>
        </div>
      )}

      <div className="h-6" />
    </div>
  )
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-9)]"
        width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
      >
        <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded-lg border border-[var(--gray-5)] bg-[var(--gray-1)] text-[var(--gray-12)] placeholder:text-[var(--gray-9)] outline-none focus:border-[var(--principal-8)] focus:ring-2 focus:ring-[var(--principal-5)] transition"
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 500 }}
      />
    </div>
  )
}

const itemVariants = {
  hidden: { x: -8, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

function CategoryGroup({
  category,
  collapsed,
  onToggle,
}: {
  category: NavCategory
  collapsed: boolean
  onToggle: () => void
  section: Exclude<Section, 'home'>
}) {
  const headerless = !category.label

  return (
    <motion.div variants={itemVariants}>
      {!headerless && (
        <button
          onClick={onToggle}
          className="group flex items-center justify-between w-full px-3 mb-1.5 cursor-pointer bg-transparent border-none"
        >
          <span
            className="text-[var(--gray-9)] group-hover:text-[var(--gray-11)] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {category.label}
            <span className="ml-1.5 text-[var(--gray-8)]">·</span>
            <span className="ml-1.5 text-[var(--gray-8)]">{category.items.length.toString().padStart(2, '0')}</span>
          </span>
          <Caret expanded={!collapsed} />
        </button>
      )}

      <AnimatePresence initial={false}>
        {(headerless || !collapsed) && (
          <motion.ul
            key="list"
            initial={headerless ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden flex flex-col gap-0.5"
          >
            {category.items.map((item) => (
              <RouteItem key={item.path} label={item.label} path={item.path} children_={item.children} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Caret({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      className="text-[var(--gray-9)] transition-transform duration-200 shrink-0"
      style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
      aria-hidden
    >
      <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RouteItem({
  label,
  path,
  children_,
}: {
  label: string
  path: string
  children_?: { label: string; hash: string }[]
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const onPath = location.pathname === path
  const [open, setOpen] = useState(onPath)

  const handleChild = (hash: string) => {
    navigate(`${path}#${hash}`)
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <li className="relative">
      <div className="flex items-center">
        <NavLink
          to={path}
          className={({ isActive }) =>
            cn(
              'group relative flex items-center flex-1 pl-3 pr-2 py-1.5 rounded-md no-underline transition-colors',
              isActive
                ? 'text-[var(--gray-12)]'
                : 'text-[var(--gray-11)] hover:text-[var(--gray-12)]'
            )
          }
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 500 }}
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full transition-all duration-200',
                  isActive ? 'h-4 bg-[var(--principal-9)]' : 'h-0 bg-transparent group-hover:h-3 group-hover:bg-[var(--gray-7)]'
                )}
              />
              <span className="ml-1">{label}</span>
            </>
          )}
        </NavLink>
        {children_ && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-1 rounded text-[var(--gray-9)] hover:text-[var(--gray-12)] hover:bg-[var(--gray-3)] cursor-pointer bg-transparent border-none transition"
            aria-label="Expandir"
          >
            <Caret expanded={open} />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {children_ && open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="overflow-hidden ml-4 border-l border-[var(--gray-5)] flex flex-col"
          >
            {children_.map((child) => (
              <li key={child.hash}>
                <button
                  onClick={() => handleChild(child.hash)}
                  className="text-left w-full pl-3 pr-2 py-1 text-[var(--gray-10)] hover:text-[var(--gray-12)] cursor-pointer bg-transparent border-none transition-colors"
                  style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.75rem', fontWeight: 500 }}
                >
                  {child.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

