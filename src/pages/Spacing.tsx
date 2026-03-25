import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

const spacingScale = [2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96]

export function Spacing() {
  return (
    <motion.div
      className="px-8 py-10 max-w-6xl mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* ── Banner ── */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-8 mb-10 border border-[var(--border)]"
        style={{ background: 'linear-gradient(135deg, var(--teal-3), var(--green-3))' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '0.01em' }}
        >
          Spacing
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 }}
        >
          Escala de espacamento baseada no Material Design. Progressao: 2, 4, 6, 8, 12, 16, 20, 24, 28px em diante.
        </p>
      </motion.div>

      {/* ── Spacing bars ── */}
      <div className="flex flex-col gap-3 p-6 rounded-xl border border-[var(--border)] bg-[var(--gray-2)]">
        {spacingScale.map((px, i) => (
          <motion.div
            key={px}
            className="flex items-center gap-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.35 }}
          >
            <span
              className="w-16 shrink-0 text-right text-[var(--gray-12)]"
              style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.9375rem', fontWeight: 600 }}
            >
              {px}px
            </span>
            <motion.div
              className="h-5 rounded-md bg-[var(--principal-9)]"
              style={{ width: `${px}px`, minWidth: '2px' }}
              whileHover={{ scaleY: 1.5, transition: { duration: 0.15 } }}
            />
            <span
              className="text-[var(--gray-9)]"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 400 }}
            >
              {px / 16}rem
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
