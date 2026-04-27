import { useMemo, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { CategoryNavRow } from './CategoryNavRow'
import { construirGallery, objetosGallery, type GalleryCategory } from '@/lib/galeriaManifest'
import { toThumb } from '@/lib/imageThumb'

export type CategoryGroup = 'objetos' | 'construir'

export type CategorySubItem = {
  id: string
  title: string
  count?: number
  caption?: string
  thumbnail?: ReactNode
}

export type CategoryPage = {
  id: string
  title: string
  items: CategorySubItem[]
}

const Thumb = ({ src, alt }: { src: string; alt: string }) => (
  <img src={toThumb(src)} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
)

function buildPagesFromGallery(groupTitle: string, gallery: GalleryCategory[]): CategoryPage[] {
  return [
    {
      id: 'geral',
      title: groupTitle,
      items: gallery.map((cat) => ({
        id: cat.id,
        title: cat.title,
        count: cat.subcategories.reduce((acc, s) => acc + s.assets.length, 0),
        thumbnail: cat.hero ? <Thumb src={cat.hero} alt={cat.title} /> : undefined,
      })),
    },
    ...gallery.map<CategoryPage>((cat) => ({
      id: cat.id,
      title: cat.title,
      items: cat.subcategories.flatMap((sub) =>
        sub.assets.map((a) => ({
          id: a.id,
          title: a.title,
          caption: cat.title,
          thumbnail: <Thumb src={a.src} alt={a.title} />,
        }))
      ),
    })),
  ]
}

export const objetosPages: CategoryPage[] = buildPagesFromGallery('Mobília', objetosGallery)
export const construirPages: CategoryPage[] = buildPagesFromGallery('Construção', construirGallery)

type Props = {
  group?: CategoryGroup
  pageId?: string
  query?: string
  onQueryChange?: (q: string) => void
  onClose?: () => void
  onItemClick?: (item: CategorySubItem) => void
  className?: string
}

export function CategoryPanel({
  group = 'objetos',
  pageId = 'geral',
  query: queryProp,
  onQueryChange,
  onClose,
  onItemClick,
  className,
}: Props) {
  const pages = group === 'construir' ? construirPages : objetosPages
  const page = pages.find((p) => p.id === pageId) ?? pages[0]

  const [internalQuery, setInternalQuery] = useState('')
  const query = queryProp ?? internalQuery
  const setQuery = onQueryChange ?? setInternalQuery

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return page.items
    return page.items.filter((it) => it.title.toLowerCase().includes(q))
  }, [page, query])

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col w-[312px] h-[574px] rounded-xl overflow-hidden bg-[var(--gray-1)] border border-[var(--gray-6)] shadow-[0_8px_24px_rgba(17,50,100,0.12)]',
        className
      )}
    >
      <header className="flex items-center justify-between px-4 h-12 shrink-0 border-b border-[var(--gray-5)]">
        <h3
          className="text-[var(--gray-12)]"
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '-0.005em' }}
        >
          {page.title}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="size-7 inline-flex items-center justify-center rounded-md text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)] cursor-pointer bg-transparent border-none transition-colors"
        >
          <CloseIcon />
        </button>
      </header>

      <div className="px-3 py-3 shrink-0 border-b border-[var(--gray-5)]">
        <div className="relative">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar em todas as categorias..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-[var(--gray-5)] bg-[var(--gray-1)] text-[var(--gray-12)] placeholder:text-[var(--gray-9)] outline-none focus:border-[var(--principal-8)] focus:ring-2 focus:ring-[var(--principal-5)] transition"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', fontWeight: 500 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-elegant">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <p className="text-[var(--gray-11)]" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px' }}>
              Nada encontrado para "<span className="text-[var(--gray-12)]">{query}</span>".
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <CategoryNavRow
              key={item.id}
              title={item.title}
              count={item.count}
              caption={item.caption}
              thumbnail={item.thumbnail}
              onClick={() => onItemClick?.(item)}
            />
          ))
        )}
      </div>
    </motion.div>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-9)]"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
