import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

/* ── Radix scale rules ── */
const radixRules = [
  { steps: '1 – 2', group: 'Backgrounds', color: 'var(--gray-3)', description: 'Fundos da aplicacao. Step 1 para o fundo principal, Step 2 para fundos sutis como sidebars, cards e areas alternadas.' },
  { steps: '3 – 5', group: 'Componentes interativos', color: 'var(--principal-3)', description: 'Fundos de elementos UI. Step 3 para o estado normal, Step 4 para hover, Step 5 para active/selecionado.' },
  { steps: '6 – 8', group: 'Bordas e contornos', color: 'var(--principal-6)', description: 'Borders e separadores. Step 6 para bordas sutis, Step 7 para bordas de elementos e focus rings, Step 8 para bordas em hover.' },
  { steps: '9 – 10', group: 'Cores solidas', color: 'var(--principal-9)', description: 'Backgrounds solidos e de alto impacto. Step 9 e a cor principal (botoes, badges), Step 10 e o hover dessa cor.' },
  { steps: '11 – 12', group: 'Texto acessivel', color: 'var(--gray-12)', description: 'Texto com contraste acessivel. Step 11 para texto secundario (low-contrast), Step 12 para texto principal (high-contrast).' },
]

/* ── Color data ── */
const colorGroups = [
  { key: 'gray', label: 'Gray' },
  { key: 'principal', label: 'Principal (Blue)' },
  { key: 'red', label: 'Vermelho' },
  { key: 'yellow', label: 'Amarelo' },
  { key: 'green', label: 'Green' },
  { key: 'teal', label: 'Teal / Azul' },
  { key: 'violet', label: 'Violeta' },
] as const

const lightHexes: Record<string, string[]> = {
  gray:      ['#FCFCFD','#F8F9FA','#F0F1F3','#E8E9EC','#DFE1E4','#D4D6DA','#C2C5CA','#A9ADB4','#8B8F96','#808489','#60646C','#272A2E'],
  principal: ['#FBFDFF','#F4FAFF','#E6F4FE','#D5ECFD','#C2E1FC','#A9D3F7','#8AC0EF','#5FA8E4','#0091FF','#0081E6','#006DCB','#113264'],
  red:       ['#FFFCFC','#FFF7F7','#FEEBEC','#FFDBDC','#FFCDCE','#FDBDBE','#F4A9AA','#EB8E90','#E5484D','#DC3D43','#CE2C31','#641723'],
  yellow:    ['#FDFDF9','#FFFCE8','#FFFBD1','#FFF8BB','#FEF2A4','#F9E68C','#EFD36C','#EBBC00','#F5D90A','#F7CE00','#946800','#35290F'],
  green:     ['#FBFEFC','#F4FBF6','#E6F6EB','#D6F1DE','#C4E8D1','#AFDDC2','#93CEAF','#65BA97','#46A758','#3E9B4F','#2A7E3B','#203C25'],
  teal:      ['#FAFDFE','#F2FAFB','#DEF7F9','#CAF1F6','#B5E9F0','#9DDDE7','#7DCEDC','#3DB9CF','#00A2C7','#0797B9','#107D98','#0D3C48'],
  violet:    ['#FDFCFE','#FAF8FF','#F4F0FE','#EBE4FF','#E1D9FF','#D4CAFE','#C2B5F5','#AA99EC','#6E56CF','#654DC4','#6550B9','#2F265F'],
}

const darkHexes: Record<string, string[]> = {
  gray:      ['#111214','#18191B','#212225','#28292D','#2F3035','#393A40','#46484F','#5F6169','#6C6E76','#797B83','#B0B2B8','#EBEBED'],
  principal: ['#0D1520','#111B2A','#0D2847','#003362','#004074','#104D87','#205D9E','#2870BD','#0090FF','#3B9EFF','#70B8FF','#C2E0FF'],
  red:       ['#191111','#201314','#3B1219','#500F1C','#611623','#72232D','#8C333A','#B54548','#E5484D','#EC5D5E','#FF9592','#FFD1D9'],
  yellow:    ['#14120B','#1B180F','#2D2305','#362B00','#433500','#524202','#665417','#836A21','#FFC53D','#FFFF57','#F5E147','#F6EEB4'],
  green:     ['#0E1512','#121B17','#132D21','#113B29','#174937','#174933','#174933','#2F7C57','#46A758','#55B467','#71D083','#C2F0C2'],
  teal:      ['#0B161A','#101B20','#082C36','#003848','#004558','#045468','#12677E','#11809C','#00A2C7','#23AFD0','#4CCCE6','#B6ECF7'],
  violet:    ['#14121F','#1B1525','#291F43','#33255B','#3C2E69','#473876','#56468B','#6958AD','#6E56CF','#7D66D9','#BAA7FF','#E2DDFE'],
}

function getStepGroup(step: number): string {
  if (step <= 2) return 'bg'
  if (step <= 5) return 'interactive'
  if (step <= 8) return 'border'
  if (step <= 10) return 'solid'
  return 'text'
}

const groupColors: Record<string, string> = {
  bg: 'var(--gray-9)',
  interactive: 'var(--principal-9)',
  border: 'var(--teal-9)',
  solid: 'var(--violet-9)',
  text: 'var(--green-9)',
}

const groupLabels: Record<string, string> = {
  bg: 'Background',
  interactive: 'Interativo',
  border: 'Borda',
  solid: 'Solido',
  text: 'Texto',
}

/* ── Determine if a hex color is light ── */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

/* ── Page animations ── */
const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function Cores() {
  const { copiedValue, copy } = useCopyToClipboard()
  const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light')

  const hexes = activeTab === 'light' ? lightHexes : darkHexes

  return (
    <motion.div
      className="px-8 py-10 max-w-6xl mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* ── Banner hero ── */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-8 mb-10 border border-[var(--border)]"
        style={{ background: 'linear-gradient(135deg, var(--principal-3), var(--violet-3), var(--teal-3))' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-[var(--gray-12)] mb-3"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '0.01em' }}
        >
          Cores — Radix Scale
        </h1>
        <p
          className="text-[var(--gray-11)] max-w-2xl"
          style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 }}
        >
          O sistema Radix Colors usa uma escala de 12 steps por cor. Cada step tem um proposito semantico
          especifico, garantindo consistencia e acessibilidade em toda a interface.
          Clique em qualquer cor para copiar o hex.
        </p>
      </motion.div>

      {/* ── Radix rules cards ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-12"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {radixRules.map((rule, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--gray-2)] flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: rule.color }} />
              <span
                className="text-[var(--gray-12)]"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.9375rem', fontWeight: 700 }}
              >
                {rule.steps}
              </span>
            </div>
            <span
              className="text-[var(--principal-11)]"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '0.8125rem', fontWeight: 600 }}
            >
              {rule.group}
            </span>
            <p
              className="text-[var(--gray-11)]"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.4 }}
            >
              {rule.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Light/Dark tab toggle ── */}
      <div className="flex items-center gap-2 mb-8">
        {(['light', 'dark'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border capitalize cursor-pointer transition-all ${
              activeTab === tab
                ? 'bg-[var(--principal-9)] text-white border-transparent'
                : 'bg-[var(--gray-2)] text-[var(--gray-11)] border-[var(--border)] hover:bg-[var(--gray-3)]'
            }`}
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}
          >
            {tab}
          </button>
        ))}

        <AnimatePresence>
          {copiedValue && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="ml-3 px-3 py-1 rounded-lg bg-[var(--green-3)] text-[var(--green-11)]"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.8125rem', fontWeight: 600 }}
            >
              Copiado: {copiedValue}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Color palettes ── */}
      <motion.div
        className="flex flex-col gap-12"
        variants={stagger}
        initial="initial"
        animate="animate"
        key={activeTab}
      >
        {colorGroups.map(({ key, label }) => (
          <motion.div key={key} variants={cardVariants}>
            <h2
              className="text-[var(--gray-12)] mb-4"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.375rem', fontWeight: 700, lineHeight: 1 }}
            >
              {label}
            </h2>

            <div className="grid grid-cols-12 gap-2">
              {hexes[key].map((hex, i) => {
                const step = i + 1
                const group = getStepGroup(step)
                const light = isLightColor(hex)

                return (
                  <motion.button
                    key={step}
                    onClick={() => copy(hex)}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0 group"
                  >
                    {/* Step number + group badge */}
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="text-[var(--gray-12)]"
                        style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1rem', fontWeight: 700 }}
                      >
                        {step}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded-md text-white"
                        style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: '0.5625rem',
                          fontWeight: 600,
                          backgroundColor: groupColors[group],
                          lineHeight: 1,
                        }}
                      >
                        {groupLabels[group]}
                      </span>
                    </div>

                    {/* Color swatch */}
                    <div
                      className="w-full aspect-square rounded-xl border border-[var(--border)] shadow-sm transition-shadow group-hover:shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: hex }}
                    >
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          fontFamily: 'ui-monospace, Consolas, monospace',
                          fontSize: '0.625rem',
                          fontWeight: 600,
                          color: light ? '#000' : '#fff',
                        }}
                      >
                        COPY
                      </span>
                    </div>

                    {/* Hex value */}
                    <span
                      className="text-[var(--gray-11)] group-hover:text-[var(--gray-12)] transition-colors"
                      style={{
                        fontFamily: 'ui-monospace, Consolas, monospace',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                      }}
                    >
                      {hex}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
