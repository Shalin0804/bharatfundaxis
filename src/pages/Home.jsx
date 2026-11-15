import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import BannerCarousel from '../components/BannerCarousel.jsx'
import Icon from '../components/Icon.jsx'
import { useTabs } from '../components/Tabs.jsx'
import { SectionHead, Accordion, JsonLd, CheckList, CountUp, TONE } from '../components/ui.jsx'
import { PARTNERS } from '../data/site.js'
import {
  HERO, FRAMEWORK, CORRIDORS, ECOSYSTEM, SECTORS, SOVEREIGN_SCHEMES,
  ROADMAP, DISPATCHES, FAQ, KNOWLEDGE, FINAL_CTA,
} from '../data/home.js'
import { WHAT_WE_DO } from '../data/profile.js'

const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }

function Hero() {
  return (
    <section className="axis-field on-dark relative overflow-hidden pb-14 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-44">
      {/* Background glow drifts slowly and parallaxes with scroll (desktop only, see index.css). */}
      <div aria-hidden="true" className="parallax absolute inset-x-0 -top-40 h-[48rem]">
        <div className="glow -right-48 top-0 size-[46rem]" />
      </div>
      {/* The axis: one gold vertical line the hero copy hangs from. */}
      <div aria-hidden="true" className="enter enter-fade absolute inset-y-0 left-[max(1rem,calc(50%-38rem))] w-px bg-gradient-to-b from-transparent via-gold/70 to-gold/10" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div className="pl-4 sm:pl-8">
          <p className="eyebrow enter mb-5 sm:mb-7">{HERO.eyebrow}</p>
          <h1 className="display-xl enter text-white" style={{ '--d': '0.08s' }}>
            {HERO.titleTop}
            <span className="enter mt-2 block text-gold-pale" style={{ '--d': '0.2s' }}>{HERO.titleBottom}</span>
          </h1>
          <p className="lede enter mt-5 text-mist sm:mt-7" style={{ '--d': '0.32s' }}>{HERO.copy}</p>
          <div className="enter enter-scale cta-row mt-8 sm:mt-10" style={{ '--d': '0.44s' }}>
            {HERO.ctas.map((c, i) => (
              <Link key={c.label} to={c.href} className={`btn ${i === 0 ? 'btn-gold' : 'btn-ghost'}`}>
                {c.label}
              </Link>
            ))}
          </div>
          <dl className="enter mt-10 grid max-w-md grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:mt-14 sm:pt-7" style={{ '--d': '0.56s' }}>
            {HERO.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[2.35rem] leading-none text-gold tabular-nums sm:text-5xl"><CountUp value={s.value} /></dd>
                <dd className="mt-2 text-sm leading-snug text-mist">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="enter enter-fade" style={{ '--d': '0.3s' }}>
          <BannerCarousel />
        </div>
      </div>
    </section>
  )
}

function Partners() {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={hidden || undefined}>
      {PARTNERS.map((p) => (
        <li key={p.name} className="flex items-center gap-3">
          <img src={p.image} alt={hidden ? '' : p.name} height="48" width="86" loading="lazy" className="h-12 w-auto object-contain" />
          <span className="text-sm leading-tight">
            <span className="block font-semibold text-ink">{p.name}</span>
            <span className="text-xs">{p.sub}</span>
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Ecosystem" className="border-b border-line bg-white py-10">
      <p className="wrap mb-7 text-center text-sm font-medium">{HERO.partnersLine}</p>
      <div className="marquee-host overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  )
}

// The five service verticals from the company profile, each linking to its section on /services.

function Verticals() {
  const w = WHAT_WE_DO
  return (
    <section className="section pb-0 sm:pb-0 lg:pb-0">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHead eyebrow={w.eyebrow} title={w.title} copy={w.copy} />
          <div className="reveal lg:justify-self-end">
            <Link to="/services" className="btn btn-ghost">Services <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
        <ul aria-label={w.title} className="rail mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {w.verticals.map((v, i) => (
            <li key={v.id} className="reveal">
              <Link to={`/services#${v.id}`} className="card group flex h-full flex-col p-5 sm:p-6">
                <span className={`grid size-11 place-items-center rounded-xl font-display text-lg ${TONE[i]}`}>0{i + 1}</span>
                <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                <p className="mt-2 flex-1 text-sm">{v.copy}</p>
                <Icon name="arrow" size={18} className="mt-5 text-royal" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Framework() {
  const f = FRAMEWORK
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} copy={f.copy} />
        <ol className="reveal mt-10 grid grid-cols-2 sm:mt-14 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-5">
          {f.phases.map((p, i) => (
            <li key={p.name} className={`bg-white p-4 sm:p-5 ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <span className="font-display text-sm text-gold-deep">Phase {i + 1}</span>
              <p className="mt-3 font-semibold text-ink">{p.name}</p>
              <p className="text-sm">{p.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="axis-field on-dark reveal flex flex-col justify-between rounded-[var(--radius-panel)] p-6 text-white sm:p-8">
            <p className="eyebrow">{f.engine.label}</p>
            <div className="my-8 sm:my-10">
              <p className="font-display text-[3.25rem] leading-none text-gold tabular-nums sm:text-7xl"><CountUp value={f.engine.value} /></p>
              <p className="mt-3 text-lg text-white">{f.engine.text}</p>
            </div>
            <p className="flex items-center gap-2 text-sm text-mist">
              <Icon name="shield" size={18} className="text-gold" /> {f.engine.foot}
            </p>
          </div>
          <dl className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line lg:grid-cols-3">
            {f.metrics.map((m) => (
              <div key={m.label} className="bg-white p-4 sm:p-6">
                <dt className="text-[0.7rem] font-semibold tracking-wide text-gold-deep sm:text-xs">{m.label}</dt>
                <dd className="mt-3 font-display text-xl leading-tight text-ink tabular-nums sm:mt-4 sm:text-2xl"><CountUp value={m.value} /></dd>
                <dd className="mt-1 text-[0.8rem] leading-snug sm:text-sm">{m.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {f.badges.map((b) => (
            <li key={b} className="tag">{b}</li>
          ))}
        </ul>
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
    <section className="section border-y border-line bg-white">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} copy={c.copy} />
          <p className="mt-10 flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="pulse-dot size-2 rounded-full bg-[#1a9a5b]" aria-hidden="true" /> {c.listLabel}
          </p>
          <div role="tablist" aria-label={c.listLabel} className="mt-4 flex flex-wrap gap-2">
            {c.states.map((st, i) => (
              <button key={st.name} {...tabProps(i)} className={`btn min-h-11 px-5 py-2 ${i === active ? 'bg-ink text-white' : 'btn-ghost'}`}>
                {st.name}
              </button>
            ))}
          </div>
          <div {...panelProps} className="mt-6 rounded-[var(--radius-card)] border border-line bg-paper p-5 sm:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={s.name} {...fade}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="display-md">{s.name}</h3>
                  <span className="tag tag-gold">Active Corridor</span>
                </div>
                <p className="mt-1 font-semibold text-royal">{s.tagline}</p>
                <p className="mt-3">{s.summary}</p>
                <CheckList items={s.points} className="mt-5" />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="lg:pt-24">
          <p className="eyebrow">{c.reach.eyebrow}</p>
          <h3 className="display-md mt-4">{c.reach.title}</h3>
          <p className="mt-4">{c.reach.copy}</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {c.reach.items.map((r) => (
              <li key={r.heading} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <h4 className="font-sans text-base font-semibold">{r.heading}</h4>
                <p>{r.sentence}</p>
              </li>
            ))}
          </ul>
          <blockquote className="mt-10 border-l-2 border-gold pl-5 font-display text-lg leading-relaxed text-ink sm:pl-6 sm:text-xl">
            “{c.quote}”
          </blockquote>
        </div>
      </div>
    </section>
  )
}

function Ecosystem() {
  const e = ECOSYSTEM
  return (
    <section className="section">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHead title={e.title} copy={e.copy} />
          <div className="reveal flex flex-col gap-5 lg:items-end">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {e.pillars.map((p) => <li key={p} className="tag tag-gold">{p}</li>)}
            </ul>
            <div className="cta-row">
              <Link to={e.ctas[0].href} className="btn btn-royal">{e.ctas[0].label}</Link>
              <Link to={e.ctas[1].href} className="btn btn-ghost">{e.ctas[1].label} <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
        </div>
        <ul aria-label={e.title} className="rail mt-10 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {e.services.map((s) => (
            <li key={s.title} className="reveal bg-white p-6 transition-colors hover:bg-royal-soft/40 max-sm:border max-sm:border-line sm:p-7">
              <h3 className="font-display text-2xl">{s.title}</h3>
              <p className="mt-2">{s.desc}</p>
              <CheckList items={s.points} className="mt-5 text-sm" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Sectors() {
  const [active, setActive] = useState(0)
  const { tabProps, panelProps } = useTabs(SECTORS.items.length, active, setActive)
  const s = SECTORS.items[active]
  return (
    <section className="axis-field on-dark section text-white">
      <div className="wrap">
        <SectionHead title={SECTORS.title} copy={SECTORS.copy} dark />
        <div role="tablist" aria-label="Sectors" className="reveal -mx-4 mt-10 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:flex-wrap sm:px-0">
          {SECTORS.items.map((x, i) => (
            <button
              key={x.name}
              {...tabProps(i)}
              className={`min-h-11 shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${i === active ? 'bg-gold text-ink' : 'text-white/80 ring-1 ring-white/20 hover:text-white'}`}
            >
              {x.name}
            </button>
          ))}
        </div>
        <div {...panelProps} className="mt-8 focus-visible:outline-gold">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={s.name} {...fade} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.25fr]">
              <div className="glass rounded-[var(--radius-panel)] p-6 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-mist">{s.hindiTag}</span>
                  <span className="rounded-full bg-[#1a9a5b]/20 px-3 py-1 text-xs font-semibold text-[#7ee2ad]">{s.approvalRate} Success</span>
                </div>
                <p className="mt-8 text-xs font-semibold tracking-wide text-gold">SANCTION CAP</p>
                <p className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none text-white">{s.maxCap}</p>
                <p className="mt-3 text-white">{s.schemeType}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-mist">
                  <Icon name="clock" size={16} className="text-gold" /> Velocity: {s.turnaround}
                </p>
                <ul className="mt-8 space-y-4 border-t border-white/10 pt-6">
                  {s.perks.map((p) => (
                    <li key={p.title}>
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="text-sm text-mist">{p.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <div className="rounded-[var(--radius-card)] border border-gold/40 bg-gold/10 p-5 sm:p-6">
                  <h3 className="font-display text-2xl text-white">{s.flagship}</h3>
                  <p className="mt-1 text-mist">Official government scheme backing for {s.name} ventures via BharatFundAxis digital portal.</p>
                  <Link to="/schemes-grants" className="btn btn-gold mt-5">Check Eligibility Now</Link>
                </div>
                <h3 className="mt-8 font-sans text-base font-semibold text-white">लोकप्रिय Capital Schemes for {s.name}</h3>
                <ul aria-label={`Schemes for ${s.name}`} className="rail mt-4 grid gap-3 sm:grid-cols-2">
                  {s.schemes.map((x) => (
                    <li key={x.title} className="glass group flex flex-col rounded-[var(--radius-card)] p-5 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.09]">
                      <p className="text-xs text-mist">SANCTION UP TO</p>
                      <p className="font-display text-3xl text-gold">{x.cap}</p>
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
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function SovereignSchemes() {
  const d = SOVEREIGN_SCHEMES
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={d.eyebrow} title={d.title} copy={d.copy} />
        <ul aria-label={d.eyebrow} className="rail mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {d.items.map((s) => (
            <li key={s.title} className="card reveal group flex flex-col p-6 sm:p-7">
              <p className="text-sm text-gold-deep">{s.fullName}</p>
              <h3 className="mt-1 font-display text-[1.7rem] leading-tight sm:text-3xl">{s.title}</h3>
              <p className="mt-3 flex-1">{s.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
              <Link to="/schemes-grants" className="-mb-2 mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-royal group-hover:gap-3">
                {s.cta} <Icon name="arrow" size={18} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link to="/schemes-grants" className="btn btn-ghost">{d.allCta} <Icon name="arrow" size={18} /></Link>
        </div>
      </div>
    </section>
  )
}

function Roadmap() {
  const r = ROADMAP
  return (
    <section className="section border-y border-line bg-white">
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHead eyebrow={r.eyebrow} title={r.title} copy={r.copy} />
        </div>
        <ol className="relative ml-4 border-l border-gold/50 pl-8 sm:ml-0 sm:pl-12">
          {r.steps.map((s, i) => (
            <li key={s.title} className="reveal reveal-left relative pb-10 last:pb-0 sm:pb-12">
              <span className="absolute -left-[calc(2rem+1.1rem)] top-0 grid size-9 place-items-center rounded-full bg-ink font-display text-sm text-gold sm:-left-[calc(3rem+1.1rem)]">
                {i + 1}
              </span>
              <h3 className="display-md">{s.title}</h3>
              <p className="mt-3 max-w-xl">{s.desc}</p>
              <p className="mt-5 text-xs font-semibold tracking-wide text-gold-deep">{r.deliverablesLabel}</p>
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
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[1.4fr_1fr]">
          <Link to="/market-suchna" className="group reveal reveal-clip relative block overflow-hidden rounded-[var(--radius-panel)] bg-ink">
            {/* Phones: image above the copy (the artwork carries its own text). Desktop: copy overlays the image. */}
            <img src={d.featured.image} alt={d.featured.alt} width="960" height="960" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-auto lg:h-full lg:opacity-70" />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/40 to-transparent lg:block" />
            <div className="p-6 sm:p-9 lg:absolute lg:inset-x-0 lg:bottom-0">
              <p className="text-sm text-gold">{d.featured.meta}</p>
              <h3 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.3rem)] text-white">{d.featured.title}</h3>
              <p className="mt-3 max-w-xl text-mist">{d.featured.copy}</p>
            </div>
          </Link>
          <ul className="grid gap-4">
            {d.items.map((a) => (
              <li key={a.title}>
                <Link to="/market-suchna" className="card reveal group grid grid-cols-[5.5rem_1fr] gap-3.5 p-3 min-[400px]:grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <img src={a.image} alt={a.title} width="256" height="256" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
                  <div className="py-1 pr-2">
                    <p className="text-xs font-semibold tracking-wide text-gold-deep">{a.category}</p>
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
    <section className="section border-t border-line bg-white">
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
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors ${c === cat ? 'bg-ink text-white' : 'bg-paper text-ink hover:bg-royal-soft'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <Accordion key={cat} items={items} name="home-faq" />
          </div>
        </div>
        <aside className="axis-field on-dark self-start rounded-[var(--radius-panel)] p-6 text-white sm:p-8 lg:sticky lg:top-36">
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
        <ul aria-label={k.eyebrow} className="rail mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
          {k.items.map((a) => (
            <li key={a.title} className="reveal">
              <Link to="/market-suchna" className="group block">
                <div className="overflow-hidden rounded-[var(--radius-card)]">
                  <img src={a.image} alt={a.title} width="960" height="960" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-5 text-xs font-semibold tracking-wide text-gold-deep">
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

export function FinalCta() {
  const f = FINAL_CTA
  return (
    <section className="pb-14 sm:pb-20 lg:pb-28">
      <div className="wrap">
        <div className="axis-field on-dark reveal group relative isolate overflow-hidden rounded-[var(--radius-panel)] px-5 py-12 text-center text-white sm:px-12 sm:py-14 lg:py-20">
          <div aria-hidden="true" className="glow -left-40 -top-56 -z-10 size-[36rem]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px scale-x-50 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
          <p className="eyebrow justify-center">{f.eyebrow}</p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl text-white">
            {f.title[0]} <span className="sm:block">{f.title[1]}</span>
          </h2>
          <p className="lede mx-auto mt-5 text-mist">{f.copy}</p>
          <div className="cta-row justify-center mt-8 sm:mt-9">
            <Link to={f.ctas[0].href} className="btn btn-gold">{f.ctas[0].label}</Link>
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
