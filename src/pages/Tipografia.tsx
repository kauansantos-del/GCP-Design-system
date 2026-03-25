import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const } },
}

const stagger = { animate: { transition: { staggerChildren: 0.04 } } }
const itemVariants = { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } }

/* ── Data ── */
const displayTokens = [72, 64, 60, 56, 52, 48, 44, 40, 36]

const headingWeights = [
  { label: 'Extrabold', weight: 800 },
  { label: 'Bold', weight: 700 },
  { label: 'Semibold', weight: 600 },
]
const headingSizes = [32, 28, 24, 20, 18, 16, 14]

const bodyWeights = [
  { label: 'Bold', weight: 700 },
  { label: 'Semibold', weight: 600 },
  { label: 'Medium', weight: 500 },
  { label: 'Regular', weight: 400 },
]
const bodySizes = [20, 18, 16, 14, 12]

export function Tipografia() {
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
        style={{ background: 'linear-gradient(135deg, var(--violet-3), var(--principal-3))' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '0.01em' }}
        >
          Tipografia
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 }}
        >
          Escala baseada no Material Design 3. Display e Heading usam <strong className="text-[var(--gray-12)]">Archivo</strong>,
          Body usa <strong className="text-[var(--gray-12)]">Raleway</strong>.
          O padrao de nomenclatura e: <code className="px-1.5 py-0.5 rounded bg-[var(--gray-4)] text-[var(--gray-12)]" style={{ fontSize: '0.875rem', fontFamily: 'ui-monospace, Consolas, monospace' }}>categoria-peso-tamanho</code>
        </p>
      </motion.div>

      {/* ════════════════════════════════════
          DISPLAY
         ════════════════════════════════════ */}
      <Section
        title="Display — Archivo Extrabold (800)"
        subtitle="Line-height: 110% | Letter-spacing: 0.01em | Hero sections, banners, destaque maximo."
      >
        <motion.div className="flex flex-col gap-4" variants={stagger} initial="initial" animate="animate">
          {displayTokens.map((size) => (
            <motion.div
              key={size}
              variants={itemVariants}
              whileHover={{ x: 6, transition: { duration: 0.15 } }}
              className="flex items-baseline gap-5 p-4 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--gray-2)] transition-colors"
            >
              <span
                className="w-48 shrink-0 text-right text-[var(--gray-9)]"
                style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.875rem', fontWeight: 500 }}
              >
                display-{size}
              </span>
              <span
                className="text-[var(--gray-12)] truncate"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: `${size / 16}rem`,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                }}
              >
                Archivo {size}px
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ════════════════════════════════════
          HEADING
         ════════════════════════════════════ */}
      <Section
        title="Heading — Archivo"
        subtitle="Line-height: 100% | Letter-spacing: 0 | Titulos de secao, subtitulos, cards, navegacao."
      >
        {headingWeights.map((w) => (
          <div key={w.label} className="mb-10">
            <h4
              className="text-[var(--principal-11)] mb-4"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1rem', fontWeight: 700 }}
            >
              {w.label} ({w.weight})
            </h4>
            <motion.div className="flex flex-col gap-2" variants={stagger} initial="initial" animate="animate">
              {headingSizes.map((size) => (
                <motion.div
                  key={size}
                  variants={itemVariants}
                  whileHover={{ x: 6, transition: { duration: 0.15 } }}
                  className="flex items-baseline gap-5 p-3 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--gray-2)] transition-colors"
                >
                  <span
                    className="w-56 shrink-0 text-right text-[var(--gray-9)]"
                    style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    heading-{w.label.toLowerCase()}-{size}
                  </span>
                  <span
                    className="text-[var(--gray-12)]"
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontSize: `${size / 16}rem`,
                      fontWeight: w.weight,
                      lineHeight: 1,
                    }}
                  >
                    Archivo {size}px
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </Section>

      {/* ════════════════════════════════════
          BODY
         ════════════════════════════════════ */}
      <Section
        title="Body — Raleway"
        subtitle="Line-height: 130% | Letter-spacing: 0 | Paragrafos, labels, inputs, textos de UI."
      >
        {bodyWeights.map((w) => (
          <div key={w.label} className="mb-10">
            <h4
              className="text-[var(--principal-11)] mb-4"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1rem', fontWeight: 700 }}
            >
              {w.label} ({w.weight})
            </h4>
            <motion.div className="flex flex-col gap-2" variants={stagger} initial="initial" animate="animate">
              {bodySizes.map((size) => (
                <motion.div
                  key={size}
                  variants={itemVariants}
                  whileHover={{ x: 6, transition: { duration: 0.15 } }}
                  className="flex items-baseline gap-5 p-3 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--gray-2)] transition-colors"
                >
                  <span
                    className="w-56 shrink-0 text-right text-[var(--gray-9)]"
                    style={{ fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    body-{w.label.toLowerCase()}-{size}
                  </span>
                  <span
                    className="text-[var(--gray-12)]"
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: `${size / 16}rem`,
                      fontWeight: w.weight,
                      lineHeight: 1.3,
                    }}
                  >
                    Raleway {size}px — Texto de exemplo para leitura.
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </Section>
    </motion.div>
  )
}

/* ── Reusable section wrapper ── */
function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <h2
        className="text-[var(--gray-12)] mb-1 pb-3 border-b border-[var(--border)]"
        style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}
      >
        {title}
      </h2>
      <p
        className="text-[var(--gray-10)] mb-6"
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', lineHeight: 1.4 }}
      >
        {subtitle}
      </p>
      {children}
    </motion.div>
  )
}
