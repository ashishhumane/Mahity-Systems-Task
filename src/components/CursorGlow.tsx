import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = glow.current
    if (!layer) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    function hide() {
      layer?.style.setProperty('--site-glow-opacity', '0')
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || motion.matches) {
        hide()
        return
      }
      layer?.style.setProperty('--site-glow-x', `${event.clientX}px`)
      layer?.style.setProperty('--site-glow-y', `${event.clientY}px`)
      layer?.style.setProperty('--site-glow-opacity', '1')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    motion.addEventListener('change', hide)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      motion.removeEventListener('change', hide)
    }
  }, [])

  return <div className="site-cursor-glow" ref={glow} aria-hidden="true" />
}
