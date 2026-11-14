import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import Icon from './Icon.jsx'
import { BANNERS } from '../data/home.js'

/** Promotional scheme posters. Autoplays every 6s; pauses on hover/focus and for reduced motion. */
export default function BannerCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = useCallback((d) => setI((x) => (x + d + BANNERS.length) % BANNERS.length), [])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused, go])

  const b = BANNERS[i]
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Funding Schemes"
      className="relative mx-auto w-full max-w-[25rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="glass float rounded-[var(--radius-panel)] p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-panel)-8px)] bg-[#f3ead9]">
          <AnimatePresence initial={false} mode="popLayout">
            <m.img
              key={b.image}
              src={b.image}
              alt={b.alt}
              width={b.w}
              height={b.h}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 size-full object-contain"
            />
          </AnimatePresence>
        </div>
        <Link
          to="/contact#connection-panels"
          className="mt-2.5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-center text-[0.8rem] font-bold tracking-wide text-ink transition-colors hover:bg-[#d8b363]"
        >
          {b.cta}
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2" role="group" aria-label="Choose slide">
          {BANNERS.map((x, n) => (
            <button
              key={x.image}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Slide ${n + 1}: ${x.alt}`}
              aria-current={n === i || undefined}
              className="grid h-6 w-8 place-items-center"
            >
              <span className={`h-1 rounded-full transition-all ${n === i ? 'w-8 bg-gold' : 'w-4 bg-white/30'}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid size-10 place-items-center rounded-full text-white ring-1 ring-white/20 hover:ring-gold">
            <Icon name="chevronLeft" size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid size-10 place-items-center rounded-full text-white ring-1 ring-white/20 hover:ring-gold">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`${i + 1} / ${BANNERS.length}: ${b.alt}`}</p>
    </section>
  )
}
