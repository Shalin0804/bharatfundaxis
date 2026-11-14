import { Link } from 'react-router'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { NAV, CONTACT, FOOTER_TAGLINE, DISCLAIMER, COPYRIGHT } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="on-dark relative bg-ink text-mist">
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[0.95rem]">{FOOTER_TAGLINE}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-4 font-sans text-sm font-semibold tracking-wide text-white">QUICK LINKS</h2>
          <ul className="space-y-2.5">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-gold">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold tracking-wide text-white">OFFICES</h2>
          <p className="text-sm text-white/90">{CONTACT.addressLabel}</p>
          <address className="mt-1.5 flex gap-2.5 not-italic">
            <Icon name="pin" size={18} className="mt-1 shrink-0 text-gold" />
            {CONTACT.address}
          </address>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold tracking-wide text-white">CONTACT</h2>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 break-all hover:text-gold">
                <Icon name="mail" size={18} className="shrink-0 text-gold" /> {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 hover:text-gold">
                <Icon name="phone" size={18} className="shrink-0 text-gold" /> {CONTACT.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap grid gap-6 py-8 text-sm lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-white/80">REGULATORY DISCLAIMER</p>
            <p className="max-w-4xl text-[0.82rem] leading-relaxed">{DISCLAIMER}</p>
          </div>
          <ul className="flex gap-5 lg:justify-end">
            <li><Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-gold">Terms of Service</Link></li>
          </ul>
        </div>
        <p className="wrap pb-8 text-xs text-mist/80">{COPYRIGHT}</p>
      </div>
    </footer>
  )
}
