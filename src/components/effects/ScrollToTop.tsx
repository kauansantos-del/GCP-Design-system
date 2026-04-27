import { useEffect, useRef, type RefObject } from 'react'
import { useLocation } from 'react-router'

export function ScrollToTop({ scroller }: { scroller: RefObject<HTMLElement | null> }) {
  const { pathname, hash } = useLocation()
  const prev = useRef(pathname)

  useEffect(() => {
    if (hash) return
    if (prev.current !== pathname && scroller.current) {
      scroller.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    prev.current = pathname
  }, [pathname, hash, scroller])

  return null
}
