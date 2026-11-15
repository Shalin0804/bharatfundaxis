import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion'
import BannerCarousel from '../components/BannerCarousel.jsx'
import Icon from '../components/Icon.jsx'
import { useTabs } from '../components/Tabs.jsx'
import { SectionHead, Accordion, JsonLd, CheckList, CountUp, Accent } from '../components/ui.jsx'
import { PARTNERS } from '../data/site.js'
import {
  HERO, FRAMEWORK, CORRIDORS, ECOSYSTEM, SECTORS, SOVEREIGN_SCHEMES,
  ROADMAP, DISPATCHES, FAQ, KNOWLEDGE, FINAL_CTA,
} from '../data/home.js'
import { WHAT_WE_DO } from '../data/profile.js'

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }
const pad2 = (n) => String(n).padStart(2, '0')

/**
 * Hero visual: an abstract growth chart across the five framework phases. Bars rise, the curve draws itself and
 * the points pop in (CSS, see index.css), over the brand's three-circle motif. Purely decorative.
 */
function GrowthViz() {
  const pts = [[70, 430], [180, 372], [290, 300], [400, 205], [510, 110]]
  const curve = `M${pts[0]} ` + pts.slice(1).map((p, i) => `C${pts[i][0] + 55},${pts[i][1]} ${p[0] - 55},${p[1]} ${p}`).join(' ')
  return (
    <svg viewBox="0 0 580 520" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <g className="orbit" opacity="0.18" fill="none" stroke="#d1ab4f" strokeWidth="1">
        <circle cx="300" cy="215" r="120" />
        <circle cx="240" cy="320" r="120" />
        <circle cx="360" cy="320" r="120" />
      </g>
      {[110, 205, 300, 372, 430].map((y) => <line key={y} x1="40" x2="560" y1={y} y2={y} stroke="#fff" strokeOpacity="0.08" />)}
      <line x1="40" x2="560" y1="470" y2="470" stroke="#d1ab4f" strokeOpacity="0.6" />
      {pts.map(([x, y], i) => (
        <rect key={x} className="viz-bar" style={{ '--d': `${0.3 + i * 0.12}s` }} x={x - 22} y={y} width="44" height={470 - y} fill={i === 4 ? '#d1ab4f' : '#fff'} fillOpacity={i === 4 ? 0.9 : 0.1 + i * 0.03} />
      ))}
      <path className="viz-line" style={{ '--len': 700, '--d': '0.9s' }} d={curve} fill="none" stroke="#d1ab4f" strokeWidth="2.5" />
      {pts.map(([x, y], i) => (
        <g key={x} className="viz-dot" style={{ '--d': `${1.4 + i * 0.15}s` }}>
          <circle cx={x} cy={y} r="9" fill="#0b4a3a" stroke="#d1ab4f" strokeWidth="2.5" />
          <text x={x} y="498" textAnchor="middle" fill="#cfe3db" fontSize="15" fontFamily="IBM Plex Mono, monospace">{pad2(i + 1)}</text>
        </g>
      ))}
    </svg>
  )
}

function Hero() {
  return (
    <section className="relative pt-[6.75rem]">
      <div className="grid lg:min-h-[calc(100svh-6.75rem)] lg:grid-cols-[1.12fr_1fr]">
        <div className="flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-14">
          <p className="eyebrow enter">{HERO.eyebrow}</p>
          <h1 className="enter enter-solid mt-6 text-[clamp(2.25rem,1rem+4.2vw,4.4rem)] leading-[1.03] tracking-[-0.03em] sm:mt-8" style={{ '--d': '0.08s' }}>
            {HERO.titleTop}{' '}
            <Accent className="enter enter-solid block" style={{ '--d': '0.2s' }}>{HERO.titleBottom}</Accent>
          </h1>
          <p className="lede enter enter-solid mt-6 sm:mt-8" style={{ '--d': '0.32s' }}>{HERO.copy}</p>
          <div className="enter enter-scale cta-row mt-8 sm:mt-10" style={{ '--d': '0.44s' }}>
            {HERO.ctas.map((c, i) => (
              <Link key={c.label} to={c.href} className={`btn ${i === 0 ? 'btn-ink' : 'btn-ghost'}`}>
                {c.label} {i === 0 && <Icon name="arrow" size={18} className="text-gold" />}
              </Link>
            ))}
          </div>
        </div>

        <div className="axis-field on-dark relative flex min-h-[24rem] flex-col justify-end overflow-hidden px-4 pb-6 pt-8 text-white sm:min-h-[30rem] sm:px-8 lg:min-h-0 lg:px-12 lg:pb-12">
          <div className="enter enter-fade absolute inset-x-0 top-6 bottom-28 px-2 sm:bottom-32 lg:top-14 lg:bottom-40" style={{ '--d': '0.2s' }}>
            <GrowthViz />
          </div>
          <dl className="enter relative grid grid-cols-2 border-t border-white/20" style={{ '--d': '0.6s' }}>
            {HERO.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse pt-4 ${i ? 'border-l border-white/20 pl-4 sm:pl-6' : 'pr-4'}`}>
                <dt className="mt-2 text-sm leading-snug text-mist">{s.label}</dt>
                <dd className="figure text-[2.4rem] text-gold sm:text-6xl"><CountUp value={s.value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/** Institutional strip: a ruled register of the ecosystem names the live site lists (no endorsement implied). */
function Partners() {
  return (
    <section aria-label="Ecosystem" className="border-y border-rule bg-white">
      <div className="wrap py-8 sm:py-10">
        <p className="mono text-center text-xs tracking-[0.06em] text-slate sm:text-left">{HERO.partnersLine}</p>
        <ul className="mt-6 grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p) => (
            <li key={p.name} className="flex flex-col items-start gap-3 border-b border-r border-rule p-4 sm:p-5">
              <img src={p.image} alt={p.name} height="40" width="72" loading="lazy" className="h-10 w-auto object-contain grayscale transition duration-500 hover:grayscale-0" />
              <span className="text-sm leading-tight">
                <span className="block font-semibold text-ink">{p.name}</span>
                <span className="text-xs">{p.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The five service verticals as an index: full-width numbered rows that fill with forest on hover. */
function Verticals() {
  const w = WHAT_WE_DO
  return (
    <section className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHead eyebrow={w.eyebrow} title={w.title} copy={w.copy} />
          <Link to="/services" className="btn btn-ghost reveal mt-8">Services <Icon name="arrow" size={18} /></Link>
        </div>
        <ol aria-label={w.title} className="border-t border-ink">
          {w.verticals.map((v, i) => (
            <li key={v.id} className="reveal" style={{ '--reveal-delay': `${i * 0.06}s` }}>
              <Link to={`/services#${v.id}`} className="index-row group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-b border-rule px-1 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-4 sm:px-4 sm:py-8">
                <span className="index-num mono pt-2 text-sm text-gold-deep">{pad2(i + 1)}</span>
                <span>
                  <h3 className="font-display text-[1.65rem] leading-tight sm:text-4xl">{v.title}</h3>
                  <p className="mt-2 max-w-xl text-sm sm:text-base">{v.copy}</p>
                </span>
                <Icon name="arrow" size={22} className="mt-2 text-ink" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** Five-phase framework as a connected journey: nodes on a track, a gold progress rule, details for the active phase. */
function Framework() {
  const f = FRAMEWORK
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef(null)
  const pick = (i) => { setAuto(false); setActive(i) }
  const { tabProps, panelProps } = useTabs(f.phases.length, active, pick)

  // Walk through the phases while the journey is on screen, until the visitor picks one.
  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t)
      if (e.isIntersecting) t = setInterval(() => setActive((a) => (a + 1) % f.phases.length), 3200)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => { io.disconnect(); clearInterval(t) }
  }, [auto, f.phases.length])

  const p = f.phases[active]
  return (
    <section className="section bg-paper-2">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} copy={f.copy} />
        <div ref={ref} className="reveal mt-12 sm:mt-16" onMouseEnter={() => setAuto(false)}>
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-[10%] top-5 h-px bg-ink/20" />
            <m.div aria-hidden="true" className="absolute left-[10%] top-[1.19rem] h-[2px] w-[80%] origin-left bg-gold" animate={{ scaleX: active / (f.phases.length - 1) }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
            <div role="tablist" aria-label={f.eyebrow} className="relative grid grid-cols-5">
              {f.phases.map((x, i) => (
                <button key={x.name} {...tabProps(i)} className="group flex flex-col items-center gap-3 px-1 text-center">
                  <span className={`mono grid size-10 place-items-center border text-sm transition-colors duration-300 ${i <= active ? 'border-ink bg-ink text-gold' : 'border-ink/30 bg-paper-2 text-slate group-hover:border-ink'}`}>
                    {pad2(i + 1)}
                  </span>
                  <span className={`text-xs font-semibold leading-tight sm:text-sm ${i === active ? 'text-ink' : 'text-slate'}`}>{x.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div {...panelProps} className="mt-10 grid items-end gap-4 border-t border-ink pt-8 sm:grid-cols-[auto_1fr] sm:gap-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.p key={p.name} {...fade} className="figure text-[5rem] text-gold-deep sm:text-[8rem]">{pad2(active + 1)}</m.p>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={p.name} {...fade} className="pb-2 sm:pb-5">
                <p className="mono text-xs tracking-[0.08em] text-gold-deep">PHASE {active + 1} / {f.phases.length}</p>
                <h3 className="display-lg mt-2">{p.name}</h3>
                <p className="mt-2 text-lg">{p.desc}</p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/** A thin ring drawn to the stated percentage (only for figures that are themselves percentages). */
function Ring({ value }) {
  const pct = parseFloat(value)
  if (!/%/.test(value) || !pct) return null
  const c = 2 * Math.PI * 16
  return (
    <svg viewBox="0 0 40 40" className="size-11 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="3" />
      <m.circle cx="20" cy="20" r="16" fill="none" stroke="#d1ab4f" strokeWidth="3" strokeDasharray={c}
        initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c * (1 - pct / 100) }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  )
}

/** Figures: one oversized headline number, then the rest as a statement ledger. */
function Figures() {
  const f = FRAMEWORK
  return (
    <section aria-label={f.engine.label} className="axis-field on-dark section text-white">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="reveal flex flex-col">
          <p className="sec-index">{f.engine.label}</p>
          <p className="figure mt-10 text-[clamp(4.2rem,2rem+11vw,10rem)] text-gold"><CountUp value={f.engine.value} /></p>
          <p className="mt-6 max-w-md font-display text-2xl leading-snug text-white sm:text-3xl">{f.engine.text}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-mist"><Icon name="shield" size={18} className="text-gold" /> {f.engine.foot}</p>
          <ul className="mt-10 flex flex-wrap gap-2 lg:mt-auto lg:pt-12">
            {f.badges.map((b) => <li key={b} className="mono border border-white/20 px-3 py-1.5 text-xs text-white/85">{b}</li>)}
          </ul>
        </div>
        <dl className="reveal border-t border-white/25">
          {f.metrics.map((x) => (
            <div key={x.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-white/15 py-5">
              <dt className="mono text-xs tracking-[0.06em] text-gold">{x.label}</dt>
              <dd className="figure row-span-2 flex items-center justify-end gap-3 text-right text-[1.6rem] text-white sm:text-4xl"><Ring value={x.value} /><CountUp value={x.value} /></dd>
              <dd className="mt-1 text-sm text-mist">{x.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Corridors() {
  const c = CORRIDORS
  const [active, setActive] = useState(0)
  const { tabProps, panelProps } = useTabs(c.states.length, active, setActive)
  const s = c.states[active]
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} copy={c.copy} />
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <p className="mono flex items-center gap-2 text-xs tracking-[0.06em] text-ink">
              <span className="pulse-dot size-2 bg-[#1a9a5b]" aria-hidden="true" /> {c.listLabel}
            </p>
            <div role="tablist" aria-label={c.listLabel} aria-orientation="vertical" className="mt-4 border-t border-ink">
              {c.states.map((st, i) => (
                <button
                  key={st.name}
                  {...tabProps(i)}
                  className={`flex min-h-16 w-full items-baseline gap-4 border-b border-rule px-3 py-4 text-left transition-colors duration-300 ${i === active ? 'bg-ink text-white' : 'hover:bg-white'}`}
                >
                  <span className={`mono text-sm ${i === active ? 'text-gold' : 'text-gold-deep'}`}>{pad2(i + 1)}</span>
                  <span className={`font-display text-3xl sm:text-4xl ${i === active ? 'text-white' : 'text-ink'}`}>{st.name}</span>
                  <Icon name="arrow" size={20} className={`ml-auto self-center ${i === active ? 'text-gold' : 'text-ink/40'}`} />
                </button>
              ))}
            </div>
          </div>
          <div {...panelProps} className="border border-ink bg-white p-5 shadow-[8px_8px_0_var(--color-gold)] sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={s.name} {...fade}>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
                  <span className="tag tag-gold">Active Corridor</span>
                  <span className="mono text-xs text-slate">{pad2(active + 1)} / {pad2(c.states.length)}</span>
                </div>
                <h3 className="display-lg mt-6">{s.name}</h3>
                <p className="mt-2 font-display text-xl italic text-royal">{s.tagline}</p>
                <p className="mt-4">{s.summary}</p>
                <CheckList items={s.points} className="mt-6" />
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-rule pt-12 lg:mt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="reveal">
            <p className="eyebrow">{c.reach.eyebrow}</p>
            <h3 className="display-md mt-4">{c.reach.title}</h3>
            <p className="mt-4">{c.reach.copy}</p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {c.reach.items.map((r, i) => (
              <li key={r.heading} className="reveal border-t border-ink py-5" style={{ '--reveal-delay': `${i * 0.08}s` }}>
                <p className="mono text-xs text-gold-deep">{pad2(i + 1)}</p>
                <h4 className="mt-2 font-sans text-base font-semibold">{r.heading}</h4>
                <p className="mt-1">{r.sentence}</p>
              </li>
            ))}
          </ul>
        </div>
        <blockquote className="reveal mx-auto mt-16 max-w-4xl text-center font-display text-[1.45rem] leading-snug text-ink sm:mt-24 sm:text-[2.1rem]">
          <span aria-hidden="true" className="block text-6xl leading-[0.5] text-gold">“</span>
          {c.quote}
        </blockquote>
      </div>
    </section>
  )
}

// Asymmetric 6-column grid: each service gets its own surface and span (wide / narrow / thirds / halves).
const ECO_LAYOUT = [
  'lg:col-span-4 bg-ink text-white on-dark',
  'lg:col-span-2 bg-white',
  'lg:col-span-2 bg-white',
  'lg:col-span-2 bg-gold-pale',
  'lg:col-span-2 bg-white',
  'lg:col-span-6 bg-navy text-white on-dark lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10',
]

function Ecosystem() {
  const e = ECOSYSTEM
  return (
    <section className="section bg-paper-2">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHead title={e.title} copy={e.copy} />
          <div className="reveal flex flex-col gap-5 lg:items-end">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {e.pillars.map((p) => <li key={p} className="tag tag-gold">{p}</li>)}
            </ul>
            <div className="cta-row">
              <Link to={e.ctas[0].href} className="btn btn-ink">{e.ctas[0].label}</Link>
              <Link to={e.ctas[1].href} className="btn btn-ghost">{e.ctas[1].label} <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
        </div>
        <ul aria-label={e.title} className="rail mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-6">
          {e.services.map((s, i) => {
            const dark = ECO_LAYOUT[i].includes('on-dark')
            return (
              <li key={s.title} className={`reveal border border-ink/15 p-6 sm:p-8 ${ECO_LAYOUT[i] || 'bg-white'}`}>
                <div>
                  <p className={`mono text-xs ${dark ? 'text-gold' : 'text-gold-deep'}`}>{pad2(i + 1)} / {pad2(e.services.length)}</p>
                  <h3 className={`mt-4 font-display leading-tight ${i === 0 ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'} ${dark ? 'text-white' : ''}`}>{s.title}</h3>
                  <p className={`mt-3 ${dark ? 'text-mist' : ''}`}>{s.desc}</p>
                </div>
                <CheckList items={s.points} dark={dark} className={`mt-6 text-sm ${dark ? 'text-white' : ''} ${i === 5 ? 'lg:mt-0' : ''}`} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Industry navigator: an index of sectors (vertical on desktop, a swipe row on phones) driving one detail view. */
function Sectors() {
  const [active, setActive] = useState(0)
  const { tabProps, panelProps } = useTabs(SECTORS.items.length, active, setActive)
  const s = SECTORS.items[active]
  return (
    <section className="axis-field on-dark section text-white">
      <div className="wrap">
        <SectionHead title={SECTORS.title} copy={SECTORS.copy} dark />
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[15rem_1fr] lg:gap-12">
          <div role="tablist" aria-label="Sectors" aria-orientation="vertical" className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/20 lg:px-0 lg:pb-0">
            {SECTORS.items.map((x, i) => (
              <button
                key={x.name}
                {...tabProps(i)}
                className={`flex min-h-11 shrink-0 snap-start items-center gap-3 border px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:min-h-14 lg:border-0 lg:border-b lg:border-white/15 lg:px-3 lg:text-base ${i === active ? 'border-gold bg-gold text-ink' : 'border-white/25 text-white/85 hover:text-white lg:hover:bg-white/5'}`}
              >
                <span className={`mono hidden text-xs lg:inline ${i === active ? 'text-ink' : 'text-gold'}`}>{pad2(i + 1)}</span>
                {x.name}
              </button>
            ))}
          </div>
          <div {...panelProps} className="min-w-0 focus-visible:outline-gold">
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={s.name} {...fade}>
                <div className="grid gap-6 border-b border-white/20 pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="mono text-xs tracking-[0.08em] text-gold">SANCTION CAP · {s.hindiTag}</p>
                    <p className="figure mt-3 text-[clamp(2.6rem,6vw,5rem)] text-white">{s.maxCap}</p>
                    <p className="mt-3 text-white">{s.schemeType}</p>
                  </div>
                  <dl className="grid grid-cols-2 gap-6 sm:text-right">
                    <div><dt className="mono text-xs text-mist">SUCCESS</dt><dd className="figure mt-1 text-3xl text-gold">{s.approvalRate}</dd></div>
                    <div><dt className="mono text-xs text-mist">VELOCITY</dt><dd className="mt-2 font-semibold text-white">{s.turnaround}</dd></div>
                  </dl>
                </div>
                <div className="grid gap-8 pt-8 xl:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <ul className="space-y-5">
                      {s.perks.map((p) => (
                        <li key={p.title} className="border-l-2 border-gold pl-4">
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="text-sm text-mist">{p.desc}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 bg-gold p-5 text-ink sm:p-6">
                      <h3 className="font-display text-2xl text-ink">{s.flagship}</h3>
                      <p className="mt-1 text-sm">Official government scheme backing for {s.name} ventures via BharatFundAxis digital portal.</p>
                      <Link to="/schemes-grants" className="btn btn-ink mt-5">Check Eligibility Now</Link>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-base font-semibold text-white">लोकप्रिय Capital Schemes for {s.name}</h3>
                    <ul aria-label={`Schemes for ${s.name}`} className="rail mt-4 grid gap-3 sm:grid-cols-2">
                      {s.schemes.map((x) => (
                        <li key={x.title} className="glass group flex flex-col p-5 transition-colors duration-300 hover:border-gold/60">
                          <p className="mono text-xs text-mist">SANCTION UP TO</p>
                          <p className="figure mt-1 text-3xl text-gold">{x.cap}</p>
                          <p className="mt-3 font-semibold text-white">{x.title}</p>
                          <p className="text-xs text-gold/90">{x.tag}</p>
                          <p className="mt-2 flex-1 text-sm text-mist">{x.desc}</p>
                          <Link to="/schemes-grants" className="-mb-2 mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white hover:text-gold">
                            Explore Scheme <Icon name="arrow" size={16} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Schemes as a term-sheet ledger beside the featured scheme posters. */
function SovereignSchemes() {
  const d = SOVEREIGN_SCHEMES
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div className="min-w-0">
          <SectionHead eyebrow={d.eyebrow} title={d.title} copy={d.copy} />
          <ul aria-label={d.eyebrow} className="mt-12 border-t border-ink">
            {d.items.map((s, i) => (
              <li key={s.title} className="reveal group grid gap-4 border-b border-rule py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-6">
                <span className="mono text-sm text-gold-deep">{pad2(i + 1)}</span>
                <div>
                  <p className="mono text-xs tracking-[0.04em] text-slate">{s.fullName}</p>
                  <h3 className="mt-1 font-display text-[1.8rem] leading-tight sm:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-2xl">{s.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                  </ul>
                </div>
                <Link to="/schemes-grants" className="btn btn-ghost self-start whitespace-nowrap">
                  {s.cta} <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/schemes-grants" className="btn btn-ink mt-10">{d.allCta} <Icon name="arrow" size={18} className="text-gold" /></Link>
        </div>
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="axis-field on-dark p-4 pb-2">
            <BannerCarousel />
          </div>
        </aside>
      </div>
    </section>
  )
}

/** Execution roadmap: a vertical track whose gold rule fills as the visitor scrolls through the steps. */
function Roadmap() {
  const r = ROADMAP
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <section className="section bg-paper-2">
      <div className="wrap grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHead eyebrow={r.eyebrow} title={r.title} copy={r.copy} />
        </div>
        <ol ref={ref} className="relative pl-14 sm:pl-20">
          <div aria-hidden="true" className="absolute bottom-2 left-5 top-2 w-px bg-ink/20 sm:left-7" />
          <m.div aria-hidden="true" style={{ scaleY: fill }} className="absolute bottom-2 left-[1.2rem] top-2 w-[3px] origin-top bg-gold sm:left-[1.7rem]" />
          {r.steps.map((s, i) => (
            <li key={s.title} className="reveal relative pb-12 last:pb-0 sm:pb-16">
              <span className="mono absolute -left-14 top-0 grid size-10 place-items-center bg-ink text-sm text-gold sm:-left-20 sm:size-14 sm:text-base">
                {pad2(i + 1)}
              </span>
              <h3 className="display-md">{s.title}</h3>
              <p className="mt-3 max-w-xl">{s.desc}</p>
              <p className="mono mt-6 text-xs tracking-[0.06em] text-gold-deep">{r.deliverablesLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {s.points.map((p) => <li key={p} className="tag">{p}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Dispatches() {
  const d = DISPATCHES
  return (
    <section className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow={d.eyebrow} title={d.title} />
          <Link to="/market-suchna" className="btn btn-ghost">{d.cta} <Icon name="arrow" size={18} /></Link>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Link to="/market-suchna" className="group reveal reveal-clip relative block overflow-hidden bg-ink">
            <img src={d.featured.image} alt={d.featured.alt} width="960" height="960" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-auto lg:h-full lg:opacity-70" />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/40 to-transparent lg:block" />
            <div className="p-6 sm:p-9 lg:absolute lg:inset-x-0 lg:bottom-0">
              <p className="mono text-xs text-gold">{d.featured.meta}</p>
              <h3 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.4rem)] text-white">{d.featured.title}</h3>
              <p className="mt-3 max-w-xl text-mist">{d.featured.copy}</p>
            </div>
          </Link>
          <ul className="border-t border-ink">
            {d.items.map((a) => (
              <li key={a.title} className="border-b border-rule">
                <Link to="/market-suchna" className="reveal group grid grid-cols-[5.5rem_1fr] gap-4 py-4 min-[400px]:grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr]">
                  <img src={a.image} alt={a.title} width="256" height="256" loading="lazy" className="aspect-square w-full object-cover" />
                  <div>
                    <p className="mono text-xs text-gold-deep">{a.category}</p>
                    <h3 className="mt-1 font-sans text-base font-semibold group-hover:text-royal">{a.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm">{a.snippet}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [cat, setCat] = useState(FAQ.categories[0])
  const items = cat === FAQ.categories[0] ? FAQ.items : FAQ.items.filter((f) => f.category === cat)
  return (
    <section className="section border-t border-rule bg-white">
      <div className="wrap grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <SectionHead eyebrow={FAQ.eyebrow} title={FAQ.title} copy={FAQ.copy} />
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter questions">
            {FAQ.categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === cat}
                onClick={() => setCat(c)}
                className={`min-h-11 border px-4 py-2 text-sm font-medium transition-colors ${c === cat ? 'border-ink bg-ink text-white' : 'border-ink/20 text-ink hover:border-ink'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <Accordion key={cat} items={items} name="home-faq" />
          </div>
        </div>
        <aside className="axis-field on-dark self-start p-6 text-white sm:p-8 lg:sticky lg:top-36">
          <p className="eyebrow">{FAQ.desk.eyebrow}</p>
          <h3 className="display-md mt-5 text-white">{FAQ.desk.title}</h3>
          <p className="mt-3 text-mist">{FAQ.desk.copy}</p>
          <Link to="/contact#connection-panels" className="btn btn-gold mt-7 w-full">{FAQ.desk.cta}</Link>
        </aside>
      </div>
    </section>
  )
}

function Knowledge() {
  const k = KNOWLEDGE
  return (
    <section className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow={k.eyebrow} title={k.title} />
          <Link to="/market-suchna" className="btn btn-ghost">{k.cta} <Icon name="arrow" size={18} /></Link>
        </div>
        <ul aria-label={k.eyebrow} className="rail mt-12 grid gap-8 md:grid-cols-3">
          {k.items.map((a, i) => (
            <li key={a.title} className={`reveal ${i === 1 ? 'md:mt-16' : ''}`}>
              <Link to="/market-suchna" className="group block border-t border-ink pt-5">
                <div className="overflow-hidden">
                  <img src={a.image} alt={a.title} width="960" height="960" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mono mt-5 text-xs text-gold-deep">
                  {a.category} • <time dateTime={a.iso}>{a.date}</time>
                </p>
                <h3 className="mt-2 font-display text-2xl group-hover:text-royal">{a.title}</h3>
                <p className="mt-2 text-sm">{a.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-royal">
                  {k.readLabel} <Icon name="arrow" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Closing statement: full-bleed forest band, headline set large and left-aligned, actions underneath. */
export function FinalCta() {
  const f = FINAL_CTA
  return (
    <section className="axis-field on-dark relative overflow-hidden py-16 text-white sm:py-24 lg:py-32">
      <img src="/img/logo-symbol.webp" alt="" width="499" height="455" loading="lazy" aria-hidden="true" className="pointer-events-none absolute -right-24 -top-10 w-[30rem] opacity-[0.07] sm:w-[40rem]" />
      <div className="wrap relative reveal">
        <p className="sec-index">{f.eyebrow}</p>
        <h2 className="display-xl mt-10 max-w-5xl text-white">
          {f.title[0]} <Accent className="sm:block">{f.title[1]}</Accent>
        </h2>
        <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="lede text-mist">{f.copy}</p>
          <div className="cta-row">
            <Link to={f.ctas[0].href} className="btn btn-gold">{f.ctas[0].label} <Icon name="arrow" size={18} /></Link>
            <Link to={f.ctas[1].href} className="btn btn-ghost">{f.ctas[1].label}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <JsonLd path="/" faqs={FAQ.items} />
      <Hero />
      <Partners />
      <Verticals />
      <Framework />
      <Figures />
      <Corridors />
      <Ecosystem />
      <Sectors />
      <SovereignSchemes />
      <Roadmap />
      <Dispatches />
      <Faq />
      <Knowledge />
      <FinalCta />
    </>
  )
}
