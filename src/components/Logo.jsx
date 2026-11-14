import { Link } from 'react-router'

/** Lotus emblem (the brand's own artwork) in a gold ring + live-text wordmark styled after the logo. */
export default function Logo({ dark = true, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 sm:gap-3 ${className}`} aria-label="BharatFundAxis home">
      <span className="grid size-10 shrink-0 sm:size-11 place-items-center overflow-hidden rounded-full ring-1 ring-gold/70">
        <img src="/img/emblem.webp" alt="" width="44" height="41" className="size-full scale-110 object-cover" />
      </span>
      <span className="font-display text-[1.3rem] leading-none tracking-tight sm:text-[1.45rem]" aria-hidden="true">
        <span className={dark ? 'text-white' : 'text-ink'}>bharat</span>
        <span className={dark ? 'text-gold' : 'text-gold-deep'}>fundaxis</span>
      </span>
    </Link>
  )
}
