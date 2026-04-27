// Maps an asset URL into one of two pre-built WebP variants:
//   thumb  → 360px wide, used in grid cards (small download, fast scroll)
//   medium → 1080px wide, used in modal preview and "Baixar" button
//
// Pre-built artifacts live under /galeria/.thumbs/<path>.webp and
// /galeria/.medium/<path>.webp, which both ship in /public so they
// work in dev and on Vercel without a runtime resize service.

const THUMB_PREFIX = '/galeria/_thumbs/'
const MEDIUM_PREFIX = '/galeria/_medium/'
const SOURCE_PREFIX = '/galeria/'

function rewrite(src: string, prefix: string): string {
  if (!src) return src
  if (!src.startsWith(SOURCE_PREFIX)) return src
  // Skip SVGs and the icon pack — both are served as-is.
  if (src.endsWith('.svg')) return src
  if (src.startsWith('/galeria/huge icons pack.iconjar/')) return src
  // Already a thumb/medium URL — leave it.
  if (src.startsWith(THUMB_PREFIX) || src.startsWith(MEDIUM_PREFIX)) return src
  const tail = src.slice(SOURCE_PREFIX.length).replace(/\.(png|jpe?g)$/i, '.webp')
  return prefix + tail
}

export function toThumb(src: string): string {
  return rewrite(src, THUMB_PREFIX)
}

export function toMedium(src: string): string {
  return rewrite(src, MEDIUM_PREFIX)
}
