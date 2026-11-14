import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { NAV, APPLY_HREF, TICKER, CONTACT, CATEGORIES } from '../data/site.js'

const SCHEME_LINKS = CATEGORIES.slice(1).map((c) => ({ label: c, to: `/schemes-grants?category=${encodeURIComponent(c)}#directory` }))

function Ticker() {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <li key={t.text} className="flex items-center gap-2.5 px-6 text-[0.8rem] whitespace-nowrap">
          <span className="rounded-sm bg-gold/15 px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-gold">{t.tag}</span>
          <span className="text-white/90">{t.text}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee-host relative flex h-9 items-center overflow-hidden border-b border-white/10 bg-[#071029]">
      <p className="relative z-10 flex h-full shrink-0 items-center gap-2 bg-[#071029] pl-4 pr-3 text-[0.7rem] font-bold tracking-[0.12em] text-gold sm:pl-6">
        <span className="pulse-dot size-1.5 rounded-full bg-gold" aria-hidden="true" />
        UPDATES
      </p>
      <div className="marquee flex w-max" style={{ '--marquee-duration': '55s' }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

function SchemesMenu({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])
  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center">
        <NavLink to="/schemes-grants" end className={navCls}>
          Schemes &amp; Grants
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="schemes-menu"
          aria-label="Scheme categories"
          onClick={() => setOpen((o) => !o)}
          className="-ml-2 grid size-8 place-items-center rounded-full text-white/70 hover:text-gold"
        >
          <Icon name="chevronRight" size={14} className={`transition-transform ${open ? '-rotate-90' : 'rotate-90'}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            id="schemes-menu"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
            className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
          >
            <ul className="rounded-[var(--radius-card)] border border-white/10 bg-ink-2/95 p-2 shadow-2xl backdrop-blur-xl">
              {SCHEME_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onClick={() => {
                      setOpen(false)
                      onNavigate?.()
                    }}
                    className="group flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                    <Icon name="arrow" size={15} className="text-gold opacity-60 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

const ease = [0.22, 1, 0.36, 1]

// Gold underline that draws in from the left on hover and stays drawn for the active page.
const navCls = ({ isActive }) =>
  `relative px-3 py-2 text-[0.92rem] font-medium transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 ${
    isActive ? 'text-gold after:scale-x-100' : 'text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100'
  }`

const menuList = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }
const menuItem = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } }

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : ''
  }, [menu])

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only z-[60] rounded bg-gold px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-2">
        Skip to content
      </a>
      <Ticker />
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-300 ${scrolled || menu ? 'bg-ink/85 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] backdrop-blur-xl' : 'bg-transparent'}`}
      >
        {/* Bar tightens once the page scrolls; full height while the mobile menu (anchored below it) is open. */}
        <nav
          aria-label="Primary"
          className={`wrap flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled && !menu ? 'h-16' : 'h-[4.5rem]'}`}
        >
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              item.to === '/schemes-grants' ? (
                <SchemesMenu key={item.to} />
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end className={navCls}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
          <div className="flex items-center gap-2">
            <Link to={APPLY_HREF} className="btn btn-gold hidden min-h-11 px-5 py-2 sm:inline-flex">
              Apply Now
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/20 lg:hidden"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              onClick={() => setMenu((m) => !m)}
            >
              <Icon name={menu ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menu && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ duration: 0.35, ease }}
            className="axis-field fixed inset-x-0 bottom-0 top-[6.75rem] overflow-y-auto lg:hidden"
          >
            <m.ul variants={menuList} initial="hidden" animate="show" className="wrap divide-y divide-white/10 pt-4">
              {NAV.map((item) => (
                <m.li key={item.to} variants={menuItem}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 font-display text-2xl ${isActive ? 'text-gold' : 'text-white'}`
                    }
                  >
                    {item.label}
                    <Icon name="arrow" size={20} className="text-gold" />
                  </NavLink>
                  {item.to === '/schemes-grants' && (
                    <ul className="flex flex-wrap gap-2 pb-4">
                      {SCHEME_LINKS.map((l) => (
                        <li key={l.label}>
                          <Link to={l.to} onClick={() => setMenu(false)} className="inline-block rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </m.li>
              ))}
            </m.ul>
            <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.35, ease }} className="wrap space-y-3 py-8">
              <Link to={APPLY_HREF} className="btn btn-gold w-full">
                Apply Now
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn-ghost w-full">
                <Icon name="phone" size={18} /> {CONTACT.phone}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
