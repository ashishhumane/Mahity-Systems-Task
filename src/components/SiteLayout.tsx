import { useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ActionLink } from './ActionLink'
import { CursorGlow } from './CursorGlow'

function Brand() {
  return <Link className="brand" to="/"><span className="brand-mark" aria-hidden="true">◈</span>SourceControl</Link>
}

function MobileNavigation() {
  const menu = useRef<HTMLDetailsElement>(null)
  const toggle = useRef<HTMLElement>(null)

  function closeMenu() {
    if (menu.current) menu.current.open = false
  }

  return (
    <details className="mobile-navigation" ref={menu} onKeyDown={(event) => {
      if (event.key !== 'Escape' || !menu.current?.open) return
      closeMenu()
      toggle.current?.focus()
    }}>
      <summary ref={toggle} aria-label="Navigation menu"><span aria-hidden="true" /></summary>
      <nav aria-label="Mobile navigation">
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/#platform" onClick={closeMenu}>Platform</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </nav>
    </details>
  )
}

export function SiteLayout() {
  return (
    <>
      <CursorGlow />
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav className="desktop-navigation" aria-label="Main navigation">
            <Link className="text-link platform-link" to="/#platform">Platform</Link>
            <ActionLink to="/contact">Contact</ActionLink>
          </nav>
          <MobileNavigation />
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <p>Built by Ashish</p>
      </footer>
    </>
  )
}
