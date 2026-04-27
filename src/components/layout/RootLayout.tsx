import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { TopTabs } from './TopTabs'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { PageTransition } from '@/components/effects/PageTransition'
import { ScrollToTop } from '@/components/effects/ScrollToTop'
import { getActiveSection } from '@/lib/nav'

export function RootLayout() {
  const location = useLocation()
  const section = getActiveSection(location.pathname)
  const showSidebar = section !== 'home'
  const mainRef = useRef<HTMLElement>(null)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--background)]">
      <header className="relative shrink-0 border-b border-[var(--border)] bg-[var(--gray-1)]/85 backdrop-blur-md">
        <div className="flex items-center gap-8 px-8 h-[60px]">
          <Brand />
          <TopTabs section={section} />
          <div className="ml-auto flex items-center gap-2">
            <VersionPill />
            <ExternalLink
              href="https://github.com/kauansantos-del/GCP-Design-system"
              label="Ver repositório no GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </ExternalLink>
            <ExternalLink
              href="https://www.figma.com/design/qUD5KzkCbt1kEQqFv8P9Pd/GCP-Projeto---IA-Arquitetura?node-id=0-1"
              label="Abrir design no Figma"
            >
              <svg width="14" height="14" viewBox="0 0 38 57" fill="none" aria-hidden>
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
                <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
                <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
                <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
                <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
              </svg>
            </ExternalLink>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar section={section} />}
        <main ref={mainRef} className="relative flex-1 overflow-y-auto scroll-elegant">
          <ScrollToTop scroller={mainRef} />
          <BackgroundGrain />
          <div className="relative px-10 py-12 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <a href="/" className="flex items-center gap-2.5 no-underline shrink-0">
      <img
        src="/logo-light-gcp.svg"
        alt="GCP"
        className="h-[26px] w-auto"
        style={{ display: 'var(--logo-light-display, block)' }}
      />
      <img
        src="/logo-dark-gcp.svg"
        alt="GCP"
        className="h-[26px] w-auto"
        style={{ display: 'var(--logo-dark-display, none)' }}
      />
      <span
        className="hidden sm:inline text-[var(--gray-9)] pl-2.5 ml-0.5 border-l border-[var(--gray-5)]"
        style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
        Design System
      </span>
    </a>
  )
}

function ExternalLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="size-9 inline-flex items-center justify-center rounded-lg text-[var(--gray-11)] hover:text-[var(--gray-12)] hover:bg-[var(--gray-3)] transition-colors no-underline"
    >
      {children}
    </a>
  )
}

function VersionPill() {
  return (
    <span
      className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-11)]"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', fontWeight: 500 }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-9)] shadow-[0_0_8px_var(--green-9)]" />
      v0.1.0
    </span>
  )
}

function BackgroundGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, var(--gray-5) 1px, transparent 0)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 80%)',
      }}
    />
  )
}
