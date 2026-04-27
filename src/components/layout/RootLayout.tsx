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
          <div className="ml-auto flex items-center gap-3">
            <VersionPill />
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
