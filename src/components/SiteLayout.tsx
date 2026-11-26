import { Link, Outlet } from 'react-router-dom'
import { ActionLink } from './ActionLink'
import { CursorGlow } from './CursorGlow'

function Brand() {
  return <Link className="brand" to="/"><span className="brand-mark" aria-hidden="true">◈</span>SourceControl</Link>
}

export function SiteLayout() {
  return (
    <>
      <CursorGlow />
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav aria-label="Main navigation">
            <Link className="text-link platform-link" to="/#platform">Platform</Link>
            <ActionLink to="/contact">Contact</ActionLink>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <p>Built by Ashish</p>
      </footer>
    </>
  )
}
