import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Popup from './Popup.jsx'

export default function Layout() {
  return (
    <>
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Popup />
    </>
  )
}
