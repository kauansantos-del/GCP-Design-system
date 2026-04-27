import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { AssetTileItem } from './AssetTile'
import { toMedium } from '@/lib/imageThumb'

export function AssetModal({
  list,
  index,
  onClose,
  onIndexChange,
  iconFilterClass,
}: {
  list: AssetTileItem[]
  index: number
  onClose: () => void
  onIndexChange: (next: number) => void
  iconFilterClass?: string
}) {
  const [copied, setCopied] = useState(false)
  const [direction, setDirection] = useState(0)

  const total = list.length
  const safeIndex = Math.max(0, Math.min(index, total - 1))
  const asset = list[safeIndex]
  const isIcon = !!iconFilterClass
  const previewSrc = isIcon ? asset.src : toMedium(asset.src)
  const downloadSrc = isIcon ? asset.src : toMedium(asset.src)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${downloadSrc}` : downloadSrc
  const filename = downloadSrc.split('/').pop() ?? asset.id
  const decoded = (() => { try { return decodeURIComponent(filename) } catch { return filename } })()

  const goPrev = useCallback(() => {
    if (total < 2) return
    setDirection(-1)
    onIndexChange((safeIndex - 1 + total) % total)
  }, [safeIndex, total, onIndexChange])

  const goNext = useCallback(() => {
    if (total < 2) return
    setDirection(1)
    onIndexChange((safeIndex + 1) % total)
  }, [safeIndex, total, onIndexChange])

  const copyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard unavailable */
    }
  }, [fullUrl])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
      else if ((e.key === 'c' || e.key === 'C') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        copyUrl()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goPrev, goNext, copyUrl])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    if (total < 2) return
    const preload = (i: number) => {
      const item = list[(i + total) % total]
      if (item) {
        const img = new Image()
        img.src = item.src
      }
    }
    preload(safeIndex + 1)
    preload(safeIndex - 1)
  }, [safeIndex, list, total])

  if (typeof document === 'undefined') return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 z-[1000] overflow-y-auto"
      style={{ background: 'rgba(8, 10, 16, 0.82)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="min-h-full flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl rounded-3xl bg-[var(--gray-1)] border border-[var(--gray-5)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] overflow-hidden"
        >
          {/* Top bar — counter + close */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            {total > 1 ? (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--gray-3)] border border-[var(--gray-4)] text-[var(--gray-12)]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600 }}
              >
                <span>{(safeIndex + 1).toString().padStart(2, '0')}</span>
                <span className="text-[var(--gray-7)]">/</span>
                <span className="text-[var(--gray-10)]">{total.toString().padStart(2, '0')}</span>
              </span>
            ) : <span />}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="size-9 inline-flex items-center justify-center rounded-lg text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)] cursor-pointer bg-transparent border-none transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Preview — fixed height, solid contrasted background */}
          <div
            className="relative mx-5 rounded-2xl overflow-hidden border border-[var(--gray-4)] h-[440px] md:h-[500px]"
            style={{ background: isIcon ? 'var(--gray-2)' : 'var(--gray-3)' }}
          >
            {/* Soft inner glow for depth — skip when previewing an icon
                so the dark theme doesn't render a glowing halo. */}
            {!isIcon && (
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 65%)' }}
              />
            )}

            {/* Image (animated) */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={previewSrc}
                  src={previewSrc}
                  alt={asset.title}
                  initial={{ opacity: 0, x: direction * 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -direction * 40, scale: 0.97 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    isIcon
                      ? `w-[80%] h-[80%] max-w-[400px] max-h-[400px] object-contain ${iconFilterClass}`
                      : 'max-w-full max-h-full object-contain drop-shadow-[0_22px_38px_rgba(17,50,100,0.28)]'
                  }
                />
              </AnimatePresence>
            </div>

            {/* Inline arrows inside preview */}
            {total > 1 && (
              <>
                <InlineArrow side="left" onClick={(e) => { e.stopPropagation(); goPrev() }} />
                <InlineArrow side="right" onClick={(e) => { e.stopPropagation(); goNext() }} />
              </>
            )}
          </div>

          {/* Info + actions */}
          <div className="px-5 pt-4 pb-5">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[var(--gray-3)] text-[var(--gray-11)]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.06em' }}
              >
                {asset.ext ?? 'PNG'}
              </span>
              {asset.caption && (
                <span
                  className="text-[var(--gray-9)] truncate"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  {asset.caption}
                </span>
              )}
            </div>
            <p
              className="text-[var(--gray-12)] truncate capitalize mb-0.5"
              style={{ fontFamily: "'Archivo', sans-serif", fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.015em' }}
            >
              {asset.title}
            </p>
            <p
              className="text-[var(--gray-9)] truncate mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px' }}
            >
              {decoded}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <code
                className="flex-1 min-w-0 truncate text-[var(--gray-11)] bg-[var(--gray-2)] border border-[var(--gray-4)] px-3 py-2 rounded-lg"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px' }}
                title={fullUrl}
              >
                {fullUrl}
              </code>
              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--gray-5)] text-[var(--gray-12)] hover:bg-[var(--gray-3)] hover:border-[var(--gray-7)] cursor-pointer bg-transparent transition-colors"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '12.5px', fontWeight: 600 }}
              >
                {copied ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green-9)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[var(--green-11)]">Copiado</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copiar URL
                  </>
                )}
              </button>
              <a
                href={downloadSrc}
                download={decoded}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--gray-12)] text-[var(--gray-1)] hover:opacity-90 no-underline transition-opacity"
                style={{ fontFamily: "'Archivo', sans-serif", fontSize: '12.5px', fontWeight: 600 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12m0 0-4-4m4 4 4-4" />
                  <path d="M5 21h14" />
                </svg>
                Baixar
              </a>
            </div>

            <div className="hidden md:flex items-center gap-2.5 text-[var(--gray-10)] mt-4 pt-3 border-t border-[var(--gray-4)]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
              <KeyHint k="←" /> <KeyHint k="→" /> <span>navegar</span>
              <span className="text-[var(--gray-7)]">·</span>
              <KeyHint k="Esc" /> <span>fechar</span>
              <span className="text-[var(--gray-7)]">·</span>
              <KeyHint k="⌘C" /> <span>copiar URL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  )
}

function KeyHint({ k }: { k: string }) {
  return (
    <kbd
      className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded border border-[var(--gray-5)] bg-[var(--gray-2)] text-[var(--gray-11)]"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9.5px', fontWeight: 600, lineHeight: 1 }}
    >
      {k}
    </kbd>
  )
}

function InlineArrow({
  side,
  onClick,
}: {
  side: 'left' | 'right'
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Anterior' : 'Próximo'}
      className={`absolute top-1/2 -translate-y-1/2 z-20 size-10 inline-flex items-center justify-center rounded-full bg-[var(--gray-1)]/85 hover:bg-[var(--gray-1)] border border-[var(--gray-5)] backdrop-blur-md text-[var(--gray-12)] hover:scale-105 active:scale-95 cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {side === 'left' ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  )
}
