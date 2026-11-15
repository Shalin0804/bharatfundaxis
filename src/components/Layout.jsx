import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import Header, { MobileDock } from './Header.jsx'
import Footer from './Footer.jsx'
import Popup from './Popup.jsx'
import { startReveal } from '../lib/reveal.js'

const ease = [0.22, 1, 0.36, 1]
const page = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: 0.05 } },
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
      {/* Route change: a gold rule sweeps across under the header while the next page comes in. */}
      <m.div
        key={pathname}
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0, transition: { scaleX: { duration: 0.6, ease }, opacity: { delay: 0.6, duration: 0.3 } } }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gold"
      />
      <main id="main">
        {/* The first page is prerendered HTML: no entrance fade. Scroll resets once the old page has left. */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => !window.location.hash && window.scrollTo(0, 0)}>
          <m.div key={pathname} {...page}>
            <Suspense fallback={<div className="min-h-screen bg-paper" />}>{outlet}</Suspense>
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileDock />
      <Popup />
    </>
  )
}
