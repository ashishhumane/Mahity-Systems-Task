import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = glow.current
    if (!layer) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0
    let visible = false

    function animate() {
      if (!layer) return
      frame = 0
      x += (targetX - x) * .24
      y += (targetY - y) * .24
      layer.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`

      if (Math.hypot(targetX - x, targetY - y) > .5) {
        frame = requestAnimationFrame(animate)
      }
    }

    function hide() {
      visible = false
      cancelAnimationFrame(frame)
      frame = 0
      layer?.style.setProperty('--site-glow-opacity', '0')
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || motion.matches) {
        hide()
        return
      }
      targetX = event.clientX
      targetY = event.clientY
      if (!visible) {
        x = targetX
        y = targetY
        visible = true
      }
      if (!frame) frame = requestAnimationFrame(animate)
      layer?.style.setProperty('--site-glow-opacity', '1')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    motion.addEventListener('change', hide)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      motion.removeEventListener('change', hide)
    }
  }, [])

  return <div className="site-cursor-glow" ref={glow} aria-hidden="true" />
}
