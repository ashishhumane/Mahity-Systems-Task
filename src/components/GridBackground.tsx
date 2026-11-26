import type { PointerEvent } from 'react'

const pendingMovement = new WeakMap<HTMLElement, number>()

export function moveGridLight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const hero = event.currentTarget
  const { clientX, clientY } = event
  cancelAnimationFrame(pendingMovement.get(hero) ?? 0)
  pendingMovement.set(hero, requestAnimationFrame(() => {
    pendingMovement.delete(hero)
    const bounds = hero.getBoundingClientRect()
    hero.style.setProperty('--cursor-x', `${clientX - bounds.left}px`)
    hero.style.setProperty('--cursor-y', `${clientY - bounds.top}px`)
    hero.style.setProperty('--cursor-visible', '1')
  }))
}

export function hideGridLight(event: PointerEvent<HTMLElement>) {
  const hero = event.currentTarget
  cancelAnimationFrame(pendingMovement.get(hero) ?? 0)
  pendingMovement.delete(hero)
  hero.style.setProperty('--cursor-visible', '0')
}

const points = [
  [2, 6], [7, 13], [12, 4], [16, 19], [19, 8], [24, 15],
  [29, 5], [33, 17], [37, 10], [41, 21], [46, 7], [51, 14],
  [55, 3], [60, 18], [66, 9], [70, 23], [75, 12], [79, 5],
]

export function GridBackground() {
  return (
    <div className="grid-background" aria-hidden="true">
      {points.map(([column, row], index) => (
        <span
          key={column}
          style={{ left: column * 16, top: row * 16, animationDelay: `-${index * .73}s` }}
        />
      ))}
    </div>
  )
}
