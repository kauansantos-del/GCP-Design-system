import { useThemeContext } from '@/providers/ThemeProvider'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-[var(--radius-md,8px)] border border-[var(--border)] bg-[var(--gray-2)] hover:bg-[var(--gray-3)] transition-colors cursor-pointer"
      aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
    >
      <motion.span
        key={theme}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
        className="text-[var(--gray-12)] text-lg"
      >
        {theme === 'dark' ? '☀' : '☾'}
      </motion.span>
    </button>
  )
}
