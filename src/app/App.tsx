import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '../components/SiteLayout'
import { ActionLink } from '../components/ActionLink'
import { HomePage } from '../pages/HomePage'
import { ContactPage } from '../pages/ContactPage'

export function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = location.pathname === '/contact' ? 'Contact — SourceControl' : 'SourceControl — AI should earn your trust'

    if (location.pathname === '/' && location.hash === '#platform') {
      const platform = document.getElementById('platform')
      platform?.focus({ preventScroll: true })
      platform?.scrollIntoView({ block: 'start' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location])

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<section className="shell page-section"><h1>Page not found</h1><ActionLink to="/">Back to home</ActionLink></section>} />
      </Route>
    </Routes>
  )
}
