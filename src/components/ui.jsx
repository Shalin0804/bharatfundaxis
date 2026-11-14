import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Icon from './Icon.jsx'
import { jsonLd } from '../seo.js'

/** Section heading: eyebrow on the axis, two-part title kept on separate lines as the source sets it. */
export function SectionHead({ eyebrow, title, copy, align = 'left', as: H = 'h2', className = '', dark = false }) {
  const [a, b] = Array.isArray(title) ? title : [title]
  return (
    <div className={`reveal ${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <H className={`display-lg ${dark ? 'text-white' : ''}`}>
        {a}
        {b && (
          <>
            {' '}
            <span className="sm:block">{b}</span>
          </>
        )}
      </H>
      {copy && <p className={`lede mt-5 ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-mist' : ''}`}>{copy}</p>}
    </div>
  )
}

/**
 * Counts the leading number of a stat up from zero when it scrolls into view, then settles on the exact
 * source string. Server HTML and no-JS/reduced-motion visitors get the final value as-is.
 */
export function CountUp({ value }) {
  const ref = useRef(null)
  const [text, setText] = useState(value)
  useEffect(() => {
    const match = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s.exec(value)
    if (!match || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, pre, num, post] = match
    const target = parseFloat(num.replace(/,/g, ''))
    const dec = (num.split('.')[1] || '').length
    const fmt = (n) =>
      pre + (num.includes(',') ? n.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : n.toFixed(dec)) + post
    let raf
    setText(fmt(0))
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / 1600)
        if (p === 1) return setText(value)
        setText(fmt(target * (1 - (1 - p) ** 3)))
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      setText(value)
    }
  }, [value])
  return <span ref={ref}>{text}</span>
}

/** Native <details> accordion: answers stay in the HTML for search/answer engines and work without JS. */
export function Accordion({ items, name, dark = false }) {
  return (
    <div className={`divide-y ${dark ? 'divide-white/10 border-white/10' : 'divide-line border-line'} border-y`}>
      {items.map((item, i) => (
        <details key={item.q} name={name} className="group" open={i === 0 ? true : undefined}>
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden ${dark ? 'text-white' : 'text-ink'}`}
          >
            <h3 className="font-sans text-base font-semibold leading-snug sm:text-lg">{item.q}</h3>
            <span
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-open:rotate-45 ${dark ? 'border-white/20 text-gold' : 'border-line text-royal'}`}
            >
              <Icon name="plus" size={16} />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-12 ${dark ? 'text-mist' : ''}`}>{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export function JsonLd({ path, faqs }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(path, faqs)).replace(/</g, '\\u003c') }}
    />
  )
}

export function Breadcrumbs({ label }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-mist">
        <li>
          <Link to="/" className="hover:text-white">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-white">{label}</li>
      </ol>
    </nav>
  )
}

/** Navy hero used by inner pages. `aside` renders in the right column on desktop. */
export function PageHero({ crumb, eyebrow, title, copy, ctas = [], aside, children }) {
  const [a, b] = title
  return (
    <section className="axis-field on-dark relative overflow-hidden pb-16 pt-32 text-white sm:pt-36 lg:pb-24">
      <div aria-hidden="true" className="parallax absolute inset-x-0 -top-40 h-[40rem]">
        <div className="glow -right-40 top-0 size-[40rem]" />
      </div>
      <div aria-hidden="true" className="enter-fade enter absolute inset-y-0 left-[max(1rem,calc(50%-37rem))] hidden w-px lg:block bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
      <div className="wrap relative grid items-end gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="enter enter-fade">
            <Breadcrumbs label={crumb} />
          </div>
          <p className="eyebrow enter mb-6" style={{ '--d': '0.05s' }}>{eyebrow}</p>
          <h1 className="display-xl enter text-white" style={{ '--d': '0.12s' }}>
            {a} <span className="text-gold-pale">{b}</span>
          </h1>
          <p className="lede enter mt-6 text-mist" style={{ '--d': '0.26s' }}>{copy}</p>
          {ctas.length > 0 && (
            <div className="enter enter-scale mt-9 flex flex-wrap gap-3" style={{ '--d': '0.38s' }}>
              {ctas.map((c, i) => (
                <a key={c.label} href={c.href} className={`btn ${i === 0 ? 'btn-gold' : 'btn-ghost'}`}>
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {aside && <div className="enter" style={{ '--d': '0.3s' }}>{aside}</div>}
      </div>
      {children}
    </section>
  )
}

/** Modal built on native <dialog>: focus trapping, Esc and inert background come from the platform. */
export function Dialog({ open, onClose, label, children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto max-h-[92dvh] w-[min(56rem,calc(100vw-1.5rem))] overflow-y-auto rounded-[var(--radius-panel)] bg-white p-0 text-slate shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_0.25s_var(--ease-out)] ${className}`}
    >
      {open && (
        <>
          <button
            type="button"
            onClick={onClose}
            className="sticky top-3 z-10 float-right mr-3 mt-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow ring-1 ring-line hover:bg-paper"
            aria-label="Close"
          >
            <Icon name="close" size={18} />
          </button>
          {children}
        </>
      )}
    </dialog>
  )
}

export function CheckList({ items, className = '', dark = false }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <Icon name="check" size={18} className={`mt-1 shrink-0 ${dark ? 'text-gold' : 'text-royal'}`} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}
