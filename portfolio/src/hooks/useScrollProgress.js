import { useEffect, useRef } from 'react'

/**
 * Returns a ref-like object with .current in [0..1] representing full-page scroll.
 * Not a state (to avoid re-renders); read inside R3F useFrame.
 */
export default function useScrollProgress() {
  const ref = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      ref.current = max > 0 ? h.scrollTop / max : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return ref
}
