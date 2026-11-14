import { Link } from 'react-router'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { NAV, CONTACT, FOOTER_TAGLINE, DISCLAIMER, COPYRIGHT } from '../data/site.js'

const heading = 'mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-white/90 sm:mb-4'

/** Contact row: icon chip + text, a full-width tap target on phones. */
function ContactRow({ href, icon, children }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      href={href}
      className={`flex min-h-12 items-center gap-3 rounded-[var(--radius-card)] py-1.5 ${href ? 'transition-colors hover:text-gold' : ''}`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.06] text-gold ring-1 ring-white/10">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0 break-words">{children}</span>
    </Tag>
  )
}

export default function Footer() {
  return (
    <footer className="on-dark relative bg-ink text-mist">
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-sm text-[0.95rem]">{FOOTER_TAGLINE}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className={heading}>QUICK LINKS</h2>
          <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="flex min-h-11 items-center transition-colors hover:text-gold">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={heading}>OFFICES</h2>
          <p className="mb-1 text-sm text-white/90">{CONTACT.addressLabel}</p>
          <address className="not-italic">
            <ContactRow icon="pin">{CONTACT.address}</ContactRow>
          </address>
        </div>
        <div>
          <h2 className={heading}>CONTACT</h2>
          <ul className="space-y-1">
            <li>
              <ContactRow href={`mailto:${CONTACT.email}`} icon="mail">{CONTACT.email}</ContactRow>
            </li>
            <li>
              <ContactRow href={CONTACT.phoneHref} icon="phone">{CONTACT.phone}</ContactRow>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap grid gap-6 py-8 text-sm lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="rounded-[var(--radius-card)] bg-white/[0.04] p-5 ring-1 ring-white/10 lg:bg-transparent lg:p-0 lg:ring-0">
            <p className="mb-2 text-xs font-semibold tracking-wide text-white/80">REGULATORY DISCLAIMER</p>
            <p className="max-w-4xl text-[0.82rem] leading-relaxed">{DISCLAIMER}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 lg:justify-end">
            <li><Link to="/privacy-policy" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">Terms of Service</Link></li>
          </ul>
        </div>
        <p className="wrap pb-8 text-xs text-mist/80">{COPYRIGHT}</p>
      </div>
    </footer>
  )
}
