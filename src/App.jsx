import { lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { MotionConfig, LazyMotion } from 'framer-motion'

const loadMotion = () => import('./lib/motion-features.js').then((r) => r.default)
import Layout from './components/Layout.jsx'
import NotFound from './pages/NotFound.jsx'
import { PAGES, NOT_FOUND } from './seo.js'

// Route-level code splitting: each page's content ships only with that page.
// Prerendering uses react-dom/static `prerender`, which waits for these chunks, and
// hydration keeps the server HTML until the chunk arrives — so no flash.
// After a redeploy an open tab may request a chunk that no longer exists: reload once to pick up the new build.
const page = (load) =>
  lazy(() =>
    load().catch((err) => {
      let retried = true
      try {
        retried = typeof window === 'undefined' || sessionStorage.getItem('bfa-chunk-reload') === '1'
        if (!retried) sessionStorage.setItem('bfa-chunk-reload', '1')
      } catch { /* storage blocked: don't risk a reload loop */ }
      if (retried) throw err
      window.location.reload()
      return new Promise(() => {})
    }),
  )
const Home = page(() => import('./pages/Home.jsx'))
const MarketSuchna = page(() => import('./pages/MarketSuchna.jsx'))
const SchemesGrants = page(() => import('./pages/SchemesGrants.jsx'))
const BeyondFunding = page(() => import('./pages/BeyondFunding.jsx'))
const Contact = page(() => import('./pages/Contact.jsx'))
const Legal = page(() => import('./pages/Legal.jsx'))

// Keeps <title>/description in sync on client-side navigation and handles hash scrolling.
function RouteEffects() {
  const { pathname, hash, search } = useLocation()
  useEffect(() => {
    const meta = PAGES[pathname] || NOT_FOUND
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    if (hash) {
      // The target may live in a lazily loaded page chunk: retry briefly until it exists.
      let tries = 0
      const tick = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el) el.scrollIntoView()
        else if (tries++ < 40) setTimeout(tick, 50)
      }
      tick()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, search])
  return null
}

export default function App() {
  return (
    <LazyMotion features={loadMotion} strict>
    <MotionConfig reducedMotion="user">
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="market-suchna" element={<MarketSuchna />} />
          <Route path="schemes-grants" element={<SchemesGrants />} />
          <Route path="beyond-funding" element={<BeyondFunding />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Legal path="/privacy-policy" />} />
          <Route path="terms-of-service" element={<Legal path="/terms-of-service" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
    </LazyMotion>
  )
}
