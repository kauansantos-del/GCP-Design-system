import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const } },
}

const guia = [
  ['Hero / Banner principal', 'display-72 a display-48'],
  ['Titulo de pagina', 'heading-extrabold-32 a 28'],
  ['Titulo de secao', 'heading-bold-24 a 20'],
  ['Subtitulo / Card title', 'heading-semibold-20 a 16'],
  ['Paragrafo principal', 'body-regular-16'],
  ['Texto secundario / Caption', 'body-regular-14 ou 12'],
  ['Label de formulario', 'body-medium-14'],
  ['Botao principal', 'body-semibold-16'],
  ['Botao secundario', 'body-medium-14'],
  ['Navegacao', 'body-semibold-14 ou 16'],
  ['Badge / Tag', 'body-bold-12'],
  ['Input placeholder', 'body-regular-14'],
  ['Tooltip', 'body-regular-12'],
]

const colorGuia = [
  ['Fundo da aplicacao', '--gray-1'],
  ['Fundo sutil (sidebar, card)', '--gray-2'],
  ['Fundo de botao / input', '--gray-3 a 5'],
  ['Borda sutil', '--gray-6'],
  ['Borda de elemento / focus ring', '--gray-7 ou --principal-7'],
  ['Borda hover', '--gray-8'],
  ['Botao principal (solid)', '--principal-9'],
  ['Botao principal (hover)', '--principal-10'],
  ['Texto secundario', '--gray-11'],
  ['Texto principal', '--gray-12'],
  ['Erro / Destructive', '--red-9 a 11'],
  ['Sucesso', '--green-9 a 11'],
  ['Warning', '--yellow-9 a 11'],
]

export function Guia() {
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
        style={{ background: 'linear-gradient(135deg, var(--green-3), var(--yellow-3))' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '0.01em' }}
        >
          Guia de Uso Semantico
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 }}
        >
          Referencia rapida de qual token usar em cada contexto da interface.
        </p>
      </motion.div>

      {/* ── Typography guide ── */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h2
          className="text-[var(--gray-12)] mb-4 pb-3 border-b border-[var(--border)]"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}
        >
          Tipografia
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem', lineHeight: 1.4 }}>
            <thead>
              <tr className="bg-[var(--gray-3)]">
                <th className="px-5 py-3 text-left font-semibold text-[var(--gray-12)]">Contexto</th>
                <th className="px-5 py-3 text-left font-semibold text-[var(--gray-12)]">Token</th>
              </tr>
            </thead>
            <tbody>
              {guia.map(([ctx, token], i) => (
                <motion.tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-[var(--gray-2)]' : 'bg-[var(--gray-1)]'}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <td className="px-5 py-3 text-[var(--gray-11)]">{ctx}</td>
                  <td className="px-5 py-3">
                    <code
                      className="px-2 py-1 rounded-md bg-[var(--gray-4)] text-[var(--gray-12)]"
                      style={{ fontSize: '0.8125rem', fontFamily: 'ui-monospace, Consolas, monospace' }}
                    >
                      {token}
                    </code>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Color usage guide ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2
          className="text-[var(--gray-12)] mb-4 pb-3 border-b border-[var(--border)]"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}
        >
          Cores
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem', lineHeight: 1.4 }}>
            <thead>
              <tr className="bg-[var(--gray-3)]">
                <th className="px-5 py-3 text-left font-semibold text-[var(--gray-12)]">Contexto</th>
                <th className="px-5 py-3 text-left font-semibold text-[var(--gray-12)]">Token</th>
              </tr>
            </thead>
            <tbody>
              {colorGuia.map(([ctx, token], i) => (
                <motion.tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-[var(--gray-2)]' : 'bg-[var(--gray-1)]'}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <td className="px-5 py-3 text-[var(--gray-11)]">{ctx}</td>
                  <td className="px-5 py-3 flex items-center gap-2">
                    <code
                      className="px-2 py-1 rounded-md bg-[var(--gray-4)] text-[var(--gray-12)]"
                      style={{ fontSize: '0.8125rem', fontFamily: 'ui-monospace, Consolas, monospace' }}
                    >
                      {token}
                    </code>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
