import { Link } from 'react-router'
import { NAV } from '../data/site.js'

export default function NotFound() {
  return (
    <section className="axis-field on-dark flex min-h-[80vh] items-center pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      <div className="wrap">
        <p className="font-display text-7xl text-gold sm:text-8xl">404</p>
        <h1 className="display-lg mt-4 text-white">This page doesn’t exist</h1>
        <p className="lede mt-4 text-mist">The link may be old or mistyped. Pick a section below.</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {NAV.map((n, i) => (
            <li key={n.to}>
              <Link to={n.to} className={`btn ${i === 0 ? 'btn-gold' : 'btn-ghost'}`}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
