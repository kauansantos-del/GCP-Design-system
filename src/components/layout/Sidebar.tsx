import { NavLink, useLocation, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import * as ScrollArea from '@radix-ui/react-scroll-area'

type Section = {
  label: string
  path: string
  children?: { label: string; hash: string }[]
}

const fundamentosSections: Section[] = [
  { label: 'Overview', path: '/' },
  { label: 'Cores', path: '/cores' },
  { label: 'Tipografia', path: '/tipografia' },
  { label: 'Spacing', path: '/spacing' },
  { label: 'Guia de Uso', path: '/guia' },
]

const componentSections: Section[] = [
  { label: 'Button', path: '/button' },
  { label: 'Input', path: '/input' },
  { label: 'Checkbox', path: '/checkbox' },
  { label: 'TextLink', path: '/textlink' },
  { label: 'SocialButton', path: '/social-button' },
  { label: 'Tooltip', path: '/tooltip' },
  { label: 'Tag', path: '/tag' },
  { label: 'IconButton', path: '/icon-button' },
  { label: 'Select', path: '/select', children: [
    { label: 'DropdownItem', hash: 'dropdown-item' },
  ]},
  { label: 'StyleCard', path: '/style-card' },
  { label: 'ToggleSwitch', path: '/toggle-switch' },
  { label: 'Toast', path: '/toast' },
  { label: 'ProjectCard', path: '/project-card', children: [
    { label: 'StatusTag', hash: 'status-tag' },
  ]},
  { label: 'Upload', path: '/upload' },
  { label: 'Navbar', path: '/navbar' },
  { label: 'NavbarButton', path: '/navbar-button', children: [
    { label: 'ContextMenuItem', hash: 'context-menu-item' },
  ]},
]

const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { x: -12, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className="shrink-0 transition-transform duration-200"
    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  const toggleExpanded = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }))
  }

  const handleChildClick = (parentPath: string, hash: string) => {
    navigate(`${parentPath}#${hash}`)
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--gray-2)] h-screen">
      <ScrollArea.Root className="h-full" type="hover">
        <ScrollArea.Viewport className="h-full w-full [&>div]:!block">
      <div className="p-5">
        <NavLink to="/" className="no-underline flex flex-col">
          <img
            src="/logo-light-gcp.svg"
            alt="GCP"
            className="h-[32px] w-auto self-start"
            style={{ display: 'var(--logo-light-display, block)' }}
          />
          <img
            src="/logo-dark-gcp.svg"
            alt="GCP"
            className="h-[32px] w-auto self-start"
            style={{ display: 'var(--logo-dark-display, none)' }}
          />
          <span
            className="text-[var(--gray-9)] mt-1"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.75rem', fontWeight: 500 }}
          >
            Design System
          </span>
        </NavLink>
      </div>

      <motion.nav
        className="flex flex-col px-3"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Fundamentos Group */}
        <span
          className="text-[var(--gray-9)] text-[10px] font-semibold uppercase tracking-[0.1em] px-3 pt-4 pb-1"
          style={{ fontFamily: "'Archivo', sans-serif" }}
        >
          Fundamentos
        </span>
        <div className="flex flex-col gap-0.5 mb-2">
          {fundamentosSections.map((s) => (
            <motion.div key={s.path} variants={itemVariants}>
              <NavLink
                to={s.path}
                end={s.path === '/'}
                className={({ isActive: navActive }) =>
                  `flex items-center px-3 py-2 rounded-lg no-underline transition-colors ${
                    navActive
                      ? 'bg-[var(--principal-3)] text-[var(--principal-11)]'
                      : 'text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)]'
                  }`
                }
                style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 500 }}
              >
                {s.label}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Componentes Group */}
        <span
          className="text-[var(--gray-9)] text-[10px] font-semibold uppercase tracking-[0.1em] px-3 pt-4 pb-1"
          style={{ fontFamily: "'Archivo', sans-serif" }}
        >
          Componentes
        </span>
        <div className="relative pl-6">
          {/* Vertical timeline line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-[var(--gray-5)]" />

          <div className="flex flex-col gap-0.5">
            {componentSections.map((s) => {
              const active = isActive(s.path)
              const isExpanded = expanded[s.path] || active

              return (
                <motion.div key={s.path} variants={itemVariants} className="relative">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      'absolute left-[-15px] top-[12px] w-[8px] h-[8px] rounded-full border-2 transition-colors duration-200 z-10',
                      active
                        ? 'bg-[var(--principal-10)] border-[var(--principal-10)]'
                        : 'bg-[var(--gray-2)] border-[var(--gray-6)]'
                    )}
                  />

                  {/* Link row */}
                  <div className="flex items-center">
                    <NavLink
                      to={s.path}
                      className={({ isActive: navActive }) =>
                        `flex items-center flex-1 px-3 py-2 rounded-lg no-underline transition-colors ${
                          navActive
                            ? 'bg-[var(--principal-3)] text-[var(--principal-11)]'
                            : 'text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)]'
                        }`
                      }
                      style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 500 }}
                    >
                      {s.label}
                    </NavLink>
                    {s.children && (
                      <button
                        onClick={(e) => { e.preventDefault(); toggleExpanded(s.path) }}
                        className="p-1 rounded-md text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)] transition-colors cursor-pointer bg-transparent border-none"
                      >
                        <ChevronIcon expanded={!!isExpanded} />
                      </button>
                    )}
                  </div>

                  {/* Children with branch connector */}
                  {s.children && isExpanded && (
                    <div className="relative ml-4 mt-0.5">
                      {s.children.map((child) => (
                        <div key={child.hash} className="relative flex items-center">
                          {/* Horizontal connector */}
                          <div className="absolute left-[-20px] top-1/2 w-[16px] h-[2px] bg-[var(--gray-5)]" />
                          {/* Small dot */}
                          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-[var(--gray-6)]" />
                          <button
                            onClick={() => handleChildClick(s.path, child.hash)}
                            className={`flex items-center px-3 py-1.5 rounded-lg no-underline transition-colors text-left cursor-pointer bg-transparent border-none ${
                              location.pathname === s.path && location.hash === `#${child.hash}`
                                ? 'text-[var(--principal-11)]'
                                : 'text-[var(--gray-9)] hover:text-[var(--gray-11)]'
                            }`}
                            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 500 }}
                          >
                            {child.label}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.nav>
        <div className="h-6" />
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
