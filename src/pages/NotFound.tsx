import { Link } from 'react-router'
import { motion } from 'framer-motion'

export function NotFound() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="display-72 text-[var(--gray-12)]">404</h1>
      <p className="text-body-regular-16 text-[var(--gray-11)]">Página não encontrada.</p>
      <Link
        to="/"
        className="mt-4 px-6 py-2.5 rounded-lg bg-[var(--principal-9)] text-white text-body-semibold-14 no-underline hover:bg-[var(--principal-10)] transition-colors"
      >
        Voltar ao início
      </Link>
    </motion.section>
  )
}
