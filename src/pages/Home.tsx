import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Sparkles } from '@/components/effects/Sparkles'
import { FadeBlur } from '@/components/effects/FadeBlur'

const cards = [
  { label: 'Cores', description: 'Radix 12-step scale com Light e Dark', path: '/cores', gradient: 'linear-gradient(135deg, var(--principal-3), var(--violet-3))' },
  { label: 'Tipografia', description: 'Archivo + Raleway — Material Design Scale', path: '/tipografia', gradient: 'linear-gradient(135deg, var(--violet-3), var(--principal-3))' },
  { label: 'Spacing', description: 'Escala 2px a 96px — Material Design', path: '/spacing', gradient: 'linear-gradient(135deg, var(--teal-3), var(--green-3))' },
  { label: 'Guia de Uso', description: 'Referencia semantica de tokens', path: '/guia', gradient: 'linear-gradient(135deg, var(--green-3), var(--yellow-3))' },
]

const componentLinks = [
  { label: 'Button', path: '/button' },
  { label: 'Input', path: '/input' },
  { label: 'Checkbox', path: '/checkbox' },
  { label: 'TextLink', path: '/textlink' },
  { label: 'SocialButton', path: '/social-button' },
  { label: 'Tooltip', path: '/tooltip' },
  { label: 'Tag', path: '/tag' },
  { label: 'IconButton', path: '/icon-button' },
  { label: 'Select', path: '/select' },
  { label: 'StyleCard', path: '/style-card' },
  { label: 'ToggleSwitch', path: '/toggle-switch' },
  { label: 'Toast', path: '/toast' },
  { label: 'ProjectCard', path: '/project-card' },
  { label: 'Upload', path: '/upload' },
  { label: 'Navbar', path: '/navbar' },
  { label: 'NavbarButton', path: '/navbar-button' },
]

export function Home() {
  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="inline-block mb-3">
          <h1
            className="text-[var(--gray-12)]"
            style={{ fontFamily: "'Archivo', sans-serif", fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '0.01em' }}
          >
            Design System
          </h1>
        </Sparkles>
        <p
          className="text-[var(--gray-11)] max-w-xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.5 }}
        >
          Base pronta com Radix Colors, tipografia Material Design, e spacing tokens.
          Navegue pela sidebar para explorar cada secao.
        </p>
      </motion.div>

      <FadeBlur delay={0.1}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.path}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={card.path} className="no-underline block">
                <motion.div
                  className="p-6 rounded-2xl border border-[var(--border)] cursor-pointer overflow-hidden"
                  style={{ background: card.gradient }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2
                    className="text-[var(--gray-12)] mb-2"
                    style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}
                  >
                    {card.label}
                  </h2>
                  <p
                    className="text-[var(--gray-11)]"
                    style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.4 }}
                  >
                    {card.description}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </FadeBlur>

      {/* Components Section */}
      <FadeBlur delay={0.2}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="text-[var(--gray-12)]"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.1 }}
            >
              Componentes
            </h2>
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--principal-3)] text-[var(--principal-11)]"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.75rem', fontWeight: 700 }}
            >
              {componentLinks.length}
            </span>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } } }}
          >
            {componentLinks.map((comp) => (
              <motion.div
                key={comp.path}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              >
                <Link to={comp.path} className="no-underline block">
                  <motion.div
                    className="px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--gray-2)] cursor-pointer"
                    whileHover={{ scale: 1.03, y: -2, backgroundColor: 'var(--gray-3)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span
                      className="text-[var(--gray-12)]"
                      style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
                    >
                      {comp.label}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </FadeBlur>
    </motion.div>
  )
}
