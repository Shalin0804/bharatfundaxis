import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import AdvisoryBlock from '../components/AdvisoryBlock.jsx'
import { useTabs } from '../components/Tabs.jsx'
import { PageHero, SectionHead, Accordion, JsonLd } from '../components/ui.jsx'
import { BEYOND_HERO as H, PILLARS, JOURNEY, MODEL, DECISIONS, DIFFERENCE, UNASKED, MANIFESTO, BEYOND_ADVISORY as A } from '../data/beyond.js'

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }

function Pillars() {
  return (
    <section id="invisible-foundation" className="section">
      <div className="wrap">
        <SectionHead eyebrow={PILLARS.eyebrow} title={PILLARS.title} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line md:grid-cols-5">
          {PILLARS.items.map((p, i) => (
            <li key={p.pillar} className="reveal flex flex-col bg-white p-6">
              <p className="text-xs font-semibold tracking-wide text-gold-deep">PILLAR 0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl">{p.pillar}</h3>
              <p className="mt-2 text-sm">{p.short}</p>
              <details className="group mt-auto pt-5">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-royal [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">{PILLARS.more}</span>
                  <span className="hidden group-open:inline">{PILLARS.close}</span>
                  <Icon name="plus" size={15} className="transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm">{p.full}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Journey() {
  const [active, setActive] = useState(0)
  const { tabProps, panelProps } = useTabs(JOURNEY.stages.length, active, setActive)
  const s = JOURNEY.stages[active]
  return (
    <section className="axis-field on-dark section text-white">
      <div className="wrap">
        <SectionHead eyebrow={JOURNEY.eyebrow} title={JOURNEY.title} dark />
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute inset-x-0 top-[1.15rem] hidden h-px bg-white/15 md:block" />
          <div role="tablist" aria-label="Business stages" className="relative -mx-4 flex gap-1 overflow-x-auto px-4 pb-2 md:mx-0 md:justify-between md:px-0">
            {JOURNEY.stages.map((st, i) => (
              <button key={st.label} {...tabProps(i)} className="group flex shrink-0 flex-col items-center gap-3 px-2 text-sm">
                <span className={`grid size-9 place-items-center rounded-full font-display transition-colors ${i === active ? 'bg-gold text-ink' : i < active ? 'bg-white/20 text-white' : 'bg-ink-2 text-mist ring-1 ring-white/15 group-hover:ring-gold'}`}>
                  {i + 1}
                </span>
                <span className={i === active ? 'font-semibold text-gold' : 'text-mist group-hover:text-white'}>{st.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div {...panelProps} className="glass mt-8 rounded-[var(--radius-panel)] p-7 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={s.label} {...fade} className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
              <p className="text-sm font-semibold tracking-wide text-gold">{s.label.toUpperCase()}</p>
              <div>
                <h3 className="display-md text-white">{s.subtitle}</h3>
                <p className="mt-3 max-w-2xl text-mist">{s.details}</p>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Model() {
  const [active, setActive] = useState(0)
  const { tabProps, panelProps } = useTabs(MODEL.nodes.length, active, setActive)
  const n = MODEL.nodes[active]
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={MODEL.eyebrow} title={MODEL.title} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div role="tablist" aria-label="Ecosystem services" aria-orientation="vertical" className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            {MODEL.nodes.map((x, i) => (
              <button
                key={x.label}
                {...tabProps(i)}
                className={`rounded-[var(--radius-card)] p-4 text-left transition-[color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 active:scale-[0.985] ${i === active ? 'bg-ink text-white' : 'bg-white ring-1 ring-line hover:ring-ink'}`}
              >
                <span className={`block text-[0.7rem] font-semibold tracking-wide ${i === active ? 'text-gold' : 'text-gold-deep'}`}>{x.category}</span>
                <span className={`mt-1 block font-semibold ${i === active ? 'text-white' : 'text-ink'}`}>{x.label}</span>
              </button>
            ))}
          </div>
          <div {...panelProps} className="axis-field on-dark relative overflow-hidden rounded-[var(--radius-panel)] p-8 text-white sm:p-10 lg:sticky lg:top-36 lg:self-start">
            <img src="/img/logo-full.webp" alt="Bharat Fund Axis Logo" width="720" height="480" loading="lazy" className="absolute -right-16 -top-10 w-64 rounded-full opacity-10" />
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={n.label} {...fade} className="relative">
                <p className="eyebrow">{MODEL.specLabel}</p>
                <h3 className="display-md mt-5 text-white">{n.label}</h3>
                <p className="mt-3 text-mist">{n.desc}</p>
              </m.div>
            </AnimatePresence>
            <dl className="relative mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              {MODEL.stack.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-semibold tracking-wide text-gold">{s.label}</dt>
                  <dd className="mt-1 font-semibold text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function Decisions() {
  return (
    <section className="section border-y border-line bg-white">
      <div className="wrap">
        <SectionHead eyebrow={DECISIONS.eyebrow} title={DECISIONS.title} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {DECISIONS.items.map((d) => (
            <li key={d.q} className="reveal flex flex-col rounded-[var(--radius-panel)] border border-line p-7 sm:p-8">
              <span className="tag self-start">{d.tag}</span>
              <h3 className="mt-4 font-display text-2xl">{d.q}</h3>
              <p className="mt-3 flex-1">{d.answer}</p>
              <div className="mt-6 rounded-[var(--radius-card)] bg-gold-pale/60 p-5">
                <p className="text-xs font-semibold tracking-wide text-gold-deep">{DECISIONS.takeawayLabel}</p>
                <p className="mt-1.5 font-display text-lg text-ink">“{d.highlight}”</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Difference() {
  const { typical, ours } = DIFFERENCE
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={DIFFERENCE.eyebrow} title={DIFFERENCE.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-[var(--radius-panel)] border border-dashed border-[#c9cfdc] bg-white/50 p-8">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#8a1c12]"><Icon name="close" size={16} />{typical.tag}</p>
            <h3 className="mt-4 font-display text-2xl text-slate">{typical.title}</h3>
            <p className="mt-3">{typical.copy}</p>
          </div>
          <div className="axis-field on-dark reveal rounded-[var(--radius-panel)] p-8 text-white">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gold"><Icon name="check" size={16} />{ours.tag}</p>
            <h3 className="mt-4 font-display text-2xl text-white">{ours.title}</h3>
            <p className="mt-3 text-mist">{ours.copy}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  return (
    <section className="section border-t border-line bg-white">
      <div className="wrap">
        <SectionHead eyebrow={MANIFESTO.eyebrow} title={MANIFESTO.title} />
        <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {MANIFESTO.items.map((m, i) => (
            <li key={m.title} className="reveal border-t-2 border-gold pt-6">
              <p className="text-xs font-semibold tracking-wide text-gold-deep">PRINCIPLE 0{i + 1}</p>
              <h3 className="mt-2 font-sans text-lg font-semibold">{m.title}</h3>
              <blockquote className="mt-3 font-display text-lg leading-relaxed text-ink">“{m.quote}”</blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function BeyondFunding() {
  return (
    <>
      <JsonLd path="/beyond-funding" faqs={UNASKED.items} />
      <PageHero
        crumb="Beyond Funding"
        eyebrow={H.eyebrow}
        title={H.title}
        copy={H.copy}
        ctas={H.ctas}
        aside={
          <ul className="grid gap-3">
            {H.cards.map((c) => (
              <li key={c.title} className="glass rounded-[var(--radius-card)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-wide text-gold">{c.tag}</p>
                  {c.badge && <span className="rounded-full bg-gold px-2.5 py-0.5 text-[0.7rem] font-bold text-ink">{c.badge}</span>}
                </div>
                <p className="mt-2 font-display text-xl text-white">{c.title}</p>
                <p className="mt-1 text-sm text-mist">{c.copy}</p>
              </li>
            ))}
          </ul>
        }
      />
      <Pillars />
      <Journey />
      <Model />
      <Decisions />
      <Difference />
      <section className="section border-t border-line bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead eyebrow={UNASKED.eyebrow} title={UNASKED.title} />
          <Accordion items={UNASKED.items} name="unasked" />
        </div>
      </section>
      <Manifesto />
      <AdvisoryBlock
        id="beyond-contact"
        image="/img/articles/contact_advisory.webp"
        imageAlt="BharatFundAxis Capital Partner"
        eyebrow={A.eyebrow}
        title={A.title}
        copy={A.copy}
        note={A.note}
        formEyebrow={A.formEyebrow}
        formTitle={A.formTitle}
        form={<EnquiryForm topic={A.topic} defaultMessage={A.defaultMessage} placeholders={A.placeholders} labels={A.labels} />}
      />
    </>
  )
}
