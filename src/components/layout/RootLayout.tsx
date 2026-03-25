import { Outlet, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { PageTransition } from '@/components/effects/PageTransition'

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex items-center justify-end px-6 py-3 border-b border-[var(--border)] shrink-0">
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto px-8 py-10">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
