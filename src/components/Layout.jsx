import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Popup from './Popup.jsx'
import { startReveal } from '../lib/reveal.js'

const ease = [0.22, 1, 0.36, 1]
const page = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export default function Layout() {
  const { pathname } = useLocation()
  // useOutlet (not <Outlet>) so the exiting page keeps rendering its own route while it fades out.
  const outlet = useOutlet()
  useEffect(startReveal, [])
  return (
    <>
      <Header />
      <main id="main">
        {/* The first page is prerendered HTML: no entrance fade. Scroll resets once the old page has left. */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => !window.location.hash && window.scrollTo(0, 0)}>
          <m.div key={pathname} {...page}>
            <Suspense fallback={<div className="min-h-screen bg-ink" />}>{outlet}</Suspense>
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Popup />
    </>
  )
}
