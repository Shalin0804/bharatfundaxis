import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Icon from './Icon.jsx'
import { jsonLd } from '../seo.js'

const DEVANAGARI = /[ऀ-ॿ]/
/** Second half of a headline: italic serif accent. Devanagari has no italic face, so it keeps the colour only. */
export function Accent({ children, className = '', ...rest }) {
  return <span {...rest} className={`${DEVANAGARI.test(children) ? 'text-royal [.on-dark_&]:text-gold' : 'accent'} ${className}`}>{children}</span>
}

/** Section heading: a numbered hairline rule (§ 01 …) carrying the eyebrow, then the two-part title. */
export function SectionHead({ eyebrow, title, copy, align = 'left', as: H = 'h2', className = '', dark = false }) {
  const [a, b] = Array.isArray(title) ? title : [title]
  const ref = useRef(null)
  // Number every section rule on this page in order (§ 01, § 02 …). Done here rather than with CSS counters
  // because content-visibility sections contain style, which restarts counters in each section.
  useEffect(() => {
    const page = ref.current.closest('main > div') || document
    page.querySelectorAll('.sec-index').forEach((el, i) => { el.dataset.n = String(i + 1).padStart(2, '0') })
  }, [])
  return (
    <div ref={ref} className={`reveal ${align === 'center' ? 'mx-auto text-center' : ''} max-w-4xl ${className}`}>
      {/* The rule numbers sections itself, so a source eyebrow's own "03 | " prefix is dropped here. */}
      <p className={`sec-index mb-6 sm:mb-8 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow?.replace(/^\d+\s*\|\s*/, '')}</p>
      <H className={`display-lg ${dark ? 'text-white' : ''}`}>
        {a}
        {b && (
          <>
            {' '}
            <Accent className="sm:block">{b}</Accent>
          </>
        )}
      </H>
      {copy && <p className={`lede mt-5 sm:mt-6 ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-mist' : ''}`}>{copy}</p>}
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
    <div className={`divide-y ${dark ? 'divide-white/10 border-white/10' : 'divide-rule border-rule'} border-y`}>
      {items.map((item, i) => (
        <details key={item.q} name={name} className="group" open={i === 0 ? true : undefined}>
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left sm:gap-6 [&::-webkit-details-marker]:hidden ${dark ? 'text-white' : 'text-ink'}`}
          >
            <h3 className="font-sans text-base font-semibold leading-snug sm:text-lg">{item.q}</h3>
            <span
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-[2px] border transition-transform duration-300 group-open:rotate-45 ${dark ? 'border-white/20 text-gold' : 'border-line text-royal'}`}
            >
              <Icon name="plus" size={16} />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-2 sm:pr-12 ${dark ? 'text-mist' : ''}`}>{item.a}</p>
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
    <nav aria-label="Breadcrumb" className="mono text-xs uppercase tracking-[0.08em]">
      <ol className="flex flex-wrap items-center gap-2 text-slate [.on-dark_&]:text-mist">
        <li>
          <Link to="/" className="-my-3 inline-block py-3 hover:text-royal [.on-dark_&]:hover:text-white">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-ink [.on-dark_&]:text-white">{label}</li>
      </ol>
    </nav>
  )
}

/**
 * Inner-page masthead. An editorial layout rather than a centred banner: breadcrumb and eyebrow on a ruled line,
 * an oversized headline across the full width, then the intro and the page's own `aside` side by side.
 * `tone` picks cream paper ("light") or the forest dot field ("dark") so pages don't all open the same way.
 */
export function PageHero({ crumb, eyebrow, title, copy, ctas = [], aside, children, tone = 'dark' }) {
  const [a, b] = title
  const dark = tone === 'dark'
  return (
    <section className={`relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44 ${dark ? 'axis-field on-dark text-white' : 'border-b border-rule'}`}>
      <div className="wrap relative">
        <div className="enter enter-fade flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-4 [.on-dark_&]:border-white/20">
          <Breadcrumbs label={crumb} />
          <p className="eyebrow">{eyebrow}</p>
        </div>
        <h1 className={`display-xl enter enter-solid mt-8 max-w-6xl sm:mt-12 ${dark ? 'text-white' : ''}`} style={{ '--d': '0.1s' }}>
          {a} {b && <Accent>{b}</Accent>}
        </h1>
        <div className={`mt-8 grid gap-10 sm:mt-12 ${aside ? 'lg:grid-cols-[1fr_1fr] lg:gap-16' : ''}`}>
          <div className="enter enter-solid" style={{ '--d': '0.24s' }}>
            <p className={`lede ${dark ? 'text-mist' : ''}`}>{copy}</p>
            {ctas.length > 0 && (
              <div className="cta-row mt-8">
                {ctas.map((c, i) => (
                  <a key={c.label} href={c.href} className={`btn ${i === 0 ? 'btn-gold' : 'btn-ghost'}`}>
                    {c.label} {i === 0 && <Icon name="arrow" size={18} />}
                  </a>
                ))}
              </div>
            )}
          </div>
          {aside && <div className="enter min-w-0" style={{ '--d': '0.36s' }}>{aside}</div>}
        </div>
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
      className={`m-auto max-h-[92dvh] w-[min(56rem,calc(100vw-1.5rem))] overflow-y-auto rounded-[var(--radius-panel)] border-t-4 border-gold bg-white p-0 text-slate shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_0.25s_var(--ease-out)] ${className}`}
    >
      {open && (
        <>
          {/* Sticky, not floated: a float would squeeze the dialog content beside it on narrow screens. */}
          <button
            type="button"
            onClick={onClose}
            className="sticky top-3 z-10 -mb-13 ml-auto mr-3 mt-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow ring-1 ring-line hover:bg-paper"
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

// The company profile alternates forest, navy and gold for its five service verticals.
export const TONE = ['bg-ink text-white', 'bg-navy text-white', 'bg-gold text-ink', 'bg-ink text-white', 'bg-navy text-white']

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
