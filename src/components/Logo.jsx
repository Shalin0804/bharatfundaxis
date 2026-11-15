import { Link } from 'react-router'

/**
 * The brand's three-circle symbol (cut unmodified from the company profile) on a cream disc, beside the wordmark
 * set as the profile's own page headers set it: Bharat · Fund (gold) · Axis.
 */
export default function Logo({ dark = true, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 sm:gap-3 ${className}`} aria-label="BharatFundAxis home">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper ring-1 ring-gold/60 sm:size-11">
        <img src="/img/logo-mark.webp" alt="" width="132" height="120" className="w-[78%]" />
      </span>
      <span className="font-display text-[1.3rem] font-medium leading-none tracking-tight sm:text-[1.45rem]" aria-hidden="true">
        <span className={dark ? 'text-white' : 'text-ink'}>Bharat</span>
        <span className={dark ? 'text-gold' : 'text-gold-deep'}>Fund</span>
        <span className={dark ? 'text-white' : 'text-ink'}>Axis</span>
      </span>
    </Link>
  )
}
