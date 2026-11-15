import { Link } from 'react-router'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { NAV, CONTACT, FOOTER_TAGLINE, DISCLAIMER, COPYRIGHT, TAGLINE, VERTICALS, APPLY_HREF } from '../data/site.js'

const heading = 'mono mb-3 text-xs font-medium tracking-[0.1em] text-gold sm:mb-4'
const link = 'flex min-h-11 items-center transition-colors hover:text-gold'

export default function Footer() {
  return (
    <footer className="on-dark relative bg-ink-3 pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-mist lg:pb-0">
      {/* Masthead: the profile tagline set large, with the primary action beside it. */}
      <div className="wrap grid gap-8 border-b border-white/15 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <p className="font-display text-[clamp(2.2rem,1rem+5vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-white">
          {TAGLINE.split('. ').map((t, i, all) => (
            <span key={t} className={`block ${i ? 'italic text-gold' : ''}`}>{t}{i < all.length - 1 ? '.' : ''}</span>
          ))}
        </p>
        <Link to={APPLY_HREF} className="btn btn-gold self-start lg:self-end">Apply Now <Icon name="arrow" size={18} /></Link>
      </div>

      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 sm:gap-12 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-sm text-[0.95rem]">{FOOTER_TAGLINE}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className={heading}>QUICK LINKS</h2>
          <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className={link}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={heading}>WHAT WE DO</h2>
          <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-1">
            {VERTICALS.map((v) => (
              <li key={v.id}><Link to={`/services#${v.id}`} className={link}>{v.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={heading}>CONTACT</h2>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            <li><a href={`mailto:${CONTACT.email}`} className={`${link} gap-3 py-2`}><Icon name="mail" size={18} className="shrink-0 text-gold" /><span className="break-all">{CONTACT.email}</span></a></li>
            <li><a href={CONTACT.phoneHref} className={`${link} gap-3 py-2`}><Icon name="phone" size={18} className="shrink-0 text-gold" />{CONTACT.phone}</a></li>
            <li>
              <address className="flex gap-3 py-3 not-italic">
                <Icon name="pin" size={18} className="mt-1 shrink-0 text-gold" />
                <span><span className="block text-sm text-white/90">{CONTACT.addressLabel}</span>{CONTACT.address}</span>
              </address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap grid gap-6 py-8 text-sm lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="mono mb-2 text-xs tracking-[0.08em] text-white/80">REGULATORY DISCLAIMER</p>
            <p className="max-w-4xl text-[0.82rem] leading-relaxed">{DISCLAIMER}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 lg:justify-end">
            <li><Link to="/privacy-policy" className={link}>Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className={link}>Terms of Service</Link></li>
          </ul>
        </div>
        <p className="wrap mono pb-8 text-xs text-mist/80">{COPYRIGHT}</p>
      </div>
    </footer>
  )
}
