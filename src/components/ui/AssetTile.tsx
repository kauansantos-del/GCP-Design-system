import { motion } from 'framer-motion'
import { toThumb } from '@/lib/imageThumb'

export type AssetTileItem = {
  id: string
  title: string
  src: string
  ext?: string
  caption?: string
}

type Variant = 'default' | 'icon'

export function AssetTile({
  asset,
  variant = 'default',
  onClick,
  iconFilterClass,
}: {
  asset: AssetTileItem
  variant?: Variant
  onClick: () => void
  iconFilterClass?: string
}) {
  const isIcon = variant === 'icon'

  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      onClick={onClick}
      title={asset.title}
      className="group relative flex flex-col items-stretch text-left bg-transparent border-none cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--principal-8)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] p-0"
    >
      {/* Card frame */}
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--gray-5)] bg-[var(--gray-1)] transition-all duration-200 group-hover:border-[var(--gray-7)] group-hover:shadow-[0_14px_36px_-16px_rgba(17,50,100,0.28)]">
        {/* Image area — solid bg, image fills */}
        <div
          className={`relative ${isIcon ? 'aspect-square' : 'aspect-[4/3]'} flex items-center justify-center overflow-hidden`}
          style={{ background: isIcon ? 'var(--gray-2)' : 'var(--gray-2)' }}
        >
          {/* Soft inner glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, transparent 70%)' }}
          />

          {/* Subtle bottom shadow line for grounding (renders only) */}
          {!isIcon && (
            <div
              aria-hidden
              className="absolute left-[10%] right-[10%] bottom-[10%] h-2 rounded-full opacity-40 blur-md"
              style={{ background: 'rgba(17, 50, 100, 0.25)' }}
            />
          )}

          <img
            src={isIcon ? asset.src : toThumb(asset.src)}
            alt={asset.title}
            loading="lazy"
            decoding="async"
            className={
              isIcon
                ? `relative z-10 w-[58%] h-[58%] object-contain transition-transform duration-300 group-hover:scale-[1.10] ${iconFilterClass ?? ''}`
                : 'relative z-10 max-w-[92%] max-h-[92%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05] drop-shadow-[0_10px_18px_rgba(17,50,100,0.18)]'
            }
          />

          {/* Format badge */}
          {asset.ext && (
            <span
              className="absolute z-20 top-2.5 left-2.5 px-1.5 py-0.5 rounded-md bg-[var(--gray-12)]/90 text-[var(--gray-1)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em' }}
            >
              {asset.ext}
            </span>
          )}

          {/* Expand indicator top-right */}
          <span
            aria-hidden
            className="absolute z-20 top-2.5 right-2.5 size-6 inline-flex items-center justify-center rounded-md bg-[var(--gray-1)]/95 border border-[var(--gray-5)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0 text-[var(--gray-12)]"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-t border-[var(--gray-4)] bg-[var(--gray-1)]">
          <div className="flex flex-col min-w-0 flex-1">
            <span
              className="block truncate text-[var(--gray-12)] capitalize"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.005em' }}
            >
              {asset.title}
            </span>
            {asset.caption && !isIcon && (
              <span
                className="block truncate text-[var(--gray-9)] mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9.5px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
              >
                {asset.caption}
              </span>
            )}
          </div>
          <span
            className="shrink-0 text-[var(--gray-9)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--gray-12)] group-hover:translate-x-0.5 transition-all duration-200"
            aria-hidden
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  )
}
