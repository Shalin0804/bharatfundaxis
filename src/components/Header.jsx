import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { NAV, APPLY_HREF, TICKER, CONTACT, CATEGORIES, WHATSAPP_NUMBER } from '../data/site.js'

const SCHEME_LINKS = CATEGORIES.slice(1).map((c) => ({ label: c, to: `/schemes-grants?category=${encodeURIComponent(c)}#directory` }))
const ease = [0.22, 1, 0.36, 1]

/** Market tape: monospaced scheme updates scrolling like a stock ticker. */
function Ticker() {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <li key={t.text} className="mono flex items-center gap-2.5 whitespace-nowrap px-6 text-[0.78rem]">
          <span className="text-gold">▲ {t.tag}</span>
          <span className="text-white/90">{t.text}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee-host relative flex h-9 items-center overflow-hidden bg-ink-3">
      <p className="mono relative z-10 flex h-full shrink-0 items-center gap-2 border-r border-white/15 bg-ink-3 pl-4 pr-4 text-xs font-medium tracking-[0.1em] text-gold sm:pl-6">
        <span className="pulse-dot size-1.5 bg-gold" aria-hidden="true" />
        UPDATES
      </p>
      <div className="marquee flex w-max" style={{ '--marquee-duration': '55s' }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

// Underline that draws in from the left on hover and stays drawn for the active page.
const navCls = ({ isActive }) =>
  `relative px-2.5 py-2 text-[0.9rem] font-medium transition-colors after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-[2px] after:origin-left after:bg-gold after:transition-transform after:duration-300 ${
    isActive ? 'text-ink after:scale-x-100' : 'text-slate after:scale-x-0 hover:text-ink hover:after:scale-x-100'
  }`

/** Schemes dropdown: an indexed panel of the directory's categories. */
function SchemesMenu() {
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
        <NavLink to="/schemes-grants" end className={navCls}>Schemes &amp; Grants</NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="schemes-menu"
          aria-label="Scheme categories"
          onClick={() => setOpen((o) => !o)}
          className="-ml-2 grid size-8 place-items-center text-slate hover:text-ink"
        >
          <Icon name="chevronRight" size={14} className={`transition-transform ${open ? '-rotate-90' : 'rotate-90'}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            id="schemes-menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease }}
            className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3"
          >
            <div className="border border-ink bg-paper shadow-[6px_6px_0_var(--color-gold)]">
              <p className="mono border-b border-rule px-4 py-2.5 text-xs tracking-[0.08em] text-gold-deep">DIRECTORY · BY CATEGORY</p>
              <ul className="p-1.5">
                {SCHEME_LINKS.map((l, i) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 px-3 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
                    >
                      <span className="mono text-xs text-gold-deep group-hover:text-gold">{String(i + 1).padStart(2, '0')}</span>
                      {l.label}
                      <Icon name="arrow" size={15} className="ml-auto opacity-50 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

const menuList = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }
const menuItem = { hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } }

/** Phones only: a docked action bar (apply, call, WhatsApp) within thumb reach. */
export function MobileDock() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto_auto] border-t border-ink/15 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <Link to={APPLY_HREF} className="flex min-h-14 items-center justify-center gap-2 bg-ink px-4 font-semibold text-white">
        Apply Now <Icon name="arrow" size={18} className="text-gold" />
      </Link>
      <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`} className="grid min-h-14 w-16 place-items-center border-r border-rule text-ink">
        <Icon name="phone" size={20} />
      </a>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} aria-label="WhatsApp" className="grid min-h-14 w-16 place-items-center text-ink">
        <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3Z" /></svg>
      </a>
    </nav>
  )
}

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
    <header className="fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only z-[60] bg-gold px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-2">
        Skip to content
      </a>
      <Ticker />
      <div className={`border-b bg-paper/95 transition-[box-shadow,border-color] duration-300 lg:backdrop-blur-md ${scrolled || menu ? 'border-ink/15 shadow-[0_12px_30px_-20px_rgb(11_74_58/0.45)]' : 'border-transparent'}`}>
        <nav
          aria-label="Primary"
          className={`wrap flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled && !menu ? 'h-16' : 'h-[4.5rem]'}`}
        >
          <Logo dark={false} />
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) =>
              item.to === '/schemes-grants' ? (
                <SchemesMenu key={item.to} />
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end className={navCls}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
          <div className="flex items-center gap-2">
            <Link to={APPLY_HREF} className="btn btn-ink hidden min-h-11 px-5 py-2 sm:inline-flex">
              Apply Now <Icon name="arrow" size={16} className="text-gold" />
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center border border-ink/25 text-ink lg:hidden"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              onClick={() => setMenu((x) => !x)}
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
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.3, ease: 'easeIn' } }}
            transition={{ duration: 0.5, ease }}
            className="axis-field on-dark fixed inset-x-0 bottom-0 top-[6.75rem] overflow-y-auto lg:hidden"
          >
            <m.ul variants={menuList} initial="hidden" animate="show" className="wrap pt-2">
              {NAV.map((item, i) => (
                <m.li key={item.to} variants={menuItem} className="border-b border-white/12">
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) => `flex min-h-15 items-baseline gap-4 py-3.5 font-display text-[1.7rem] leading-tight ${isActive ? 'text-gold' : 'text-white'}`}
                  >
                    <span className="mono w-7 shrink-0 text-xs text-gold/80">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </NavLink>
                  {item.to === '/schemes-grants' && (
                    <ul className="flex flex-wrap gap-2 pb-4 pl-11">
                      {SCHEME_LINKS.map((l) => (
                        <li key={l.label}>
                          <Link to={l.to} onClick={() => setMenu(false)} className="inline-flex min-h-11 items-center border border-white/20 px-3 text-sm text-white/85">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </m.li>
              ))}
            </m.ul>
            <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.35, ease }} className="wrap space-y-3 py-8">
              <a href={CONTACT.phoneHref} className="btn btn-ghost w-full"><Icon name="phone" size={18} /> {CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost w-full"><Icon name="mail" size={18} /> {CONTACT.email}</a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
