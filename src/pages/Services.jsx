import { Link } from 'react-router'
import Icon from '../components/Icon.jsx'
import { PageHero, SectionHead, Accordion, JsonLd, CheckList, TONE } from '../components/ui.jsx'
import { APPLY_HREF } from '../data/site.js'
import { WHAT_WE_DO, SERVICE_DETAILS, HOW_WE_WORK, GETTING_STARTED as G } from '../data/profile.js'

const CTAS = [
  { label: 'Apply Now', href: APPLY_HREF },
  { label: 'Contact Us', href: '/contact' },
]


/** Hero aside: the five verticals as jump links to their sections. */
function VerticalIndex() {
  return (
    <ol className="glass hidden gap-1.5 rounded-[var(--radius-panel)] p-2.5 lg:grid">
      {WHAT_WE_DO.verticals.map((v, i) => (
        <li key={v.id}>
          <a href={`#${v.id}`} className="group flex min-h-13 items-center gap-4 rounded-[2px] px-3 py-2 transition-colors hover:bg-white/5">
            <span className={`grid size-10 shrink-0 place-items-center rounded-[2px] font-display text-lg ring-1 ring-white/15 ${TONE[i]}`}>0{i + 1}</span>
            <span className="font-semibold text-white">{v.title}</span>
            <Icon name="arrow" size={18} className="ml-auto text-gold" />
          </a>
        </li>
      ))}
    </ol>
  )
}

function Overview() {
  return (
    <section className="section">
      <div className="wrap">
        <ul className="rail grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WHAT_WE_DO.verticals.map((v, i) => (
            <li key={v.id} className="reveal">
              <a href={`#${v.id}`} className="card group flex h-full flex-col overflow-hidden">
                <span className={`flex items-center justify-between px-5 py-4 font-display text-3xl ${TONE[i]}`}>
                  0{i + 1}
                  <Icon name="arrowDown" size={20} className="opacity-70 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-xl text-ink">{v.title}</span>
                  <span className="mt-2 text-sm">{v.copy}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Vertical({ v, i }) {
  const d = SERVICE_DETAILS[v.id]
  const dark = i % 2 === 1
  return (
    <section id={v.id} className={`section ${dark ? 'border-y border-line bg-white' : ''}`}>
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <span aria-hidden="true" className={`reveal mb-6 grid size-14 place-items-center rounded-[2px] font-display text-2xl ${TONE[i]}`}>0{i + 1}</span>
          <SectionHead eyebrow={d.eyebrow} title={v.title} copy={d.copy} />
        </div>
        <div className="grid content-start gap-5">
          {d.lists.map((l, j) => (
            <div key={l.title || j} className="reveal card p-6 sm:p-8">
              {l.title && <h3 className="mb-4 font-sans text-base font-semibold text-ink">{l.title}</h3>}
              <CheckList items={l.items} className={l.items.length > 5 ? 'sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-2.5' : ''} />
            </div>
          ))}
          {d.approach && (
            <div className="reveal">
              <h3 className="display-md mt-4">{d.approach.title}</h3>
              <ol className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {d.approach.steps.map((s, k) => (
                  <li key={s.title} className={`rounded-[var(--radius-card)] p-4 sm:p-5 ${k % 2 ? 'bg-navy' : 'bg-ink'}`}>
                    <span className="font-display text-2xl text-gold">0{k + 1}</span>
                    <p className="mt-2 font-semibold text-white">{s.title}</p>
                    <p className="mt-1 text-sm text-mist">{s.copy}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {d.note && (
            <p className="reveal rounded-[var(--radius-card)] bg-gold-pale p-5 text-sm text-ink sm:p-6">
              {d.note.label && <strong>{d.note.label} </strong>}
              {d.note.text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function HowWeWork() {
  const h = HOW_WE_WORK
  return (
    <section id="how-we-work" className="axis-field on-dark section text-white">
      <div className="wrap">
        <SectionHead eyebrow={h.eyebrow} title={h.title} copy={h.copy} dark />
        <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {h.steps.map((s, i) => (
            <li key={s.title} className="glass reveal group relative rounded-[var(--radius-panel)] p-6 sm:p-7">
              <span className="grid size-10 place-items-center rounded-[2px] bg-gold font-display text-lg text-ink transition-transform duration-500 group-hover:scale-110">{i + 1}</span>
              <h3 className="mt-5 font-display text-2xl text-white">{s.title}</h3>
              <p className="mt-2 text-mist">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function GettingStarted() {
  return (
    <section id="getting-started" className="section">
      <div className="wrap">
        <SectionHead eyebrow={G.eyebrow} title={G.title} copy={G.copy} />
        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="reveal card self-start p-6 sm:p-8">
            <h3 className="mb-5 font-display text-2xl">{G.documents.title}</h3>
            <CheckList items={G.documents.items} />
            <p className="mt-5 border-t border-line pt-4 text-sm italic">{G.documents.note}</p>
          </div>
          <div className="reveal">
            <h3 className="mb-2 font-display text-2xl">{G.faqTitle}</h3>
            <Accordion items={G.faqs} name="getting-started" />
          </div>
        </div>

        <div className="axis-field on-dark reveal group relative isolate mt-12 overflow-hidden rounded-[var(--radius-panel)] px-5 py-12 text-center text-white sm:mt-16 sm:px-12 sm:py-14">
          <div aria-hidden="true" className="glow -right-40 -top-56 -z-10 size-[36rem]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px scale-x-50 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
          <p className="eyebrow justify-center">{G.cta.eyebrow}</p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl text-white">{G.cta.title}</h2>
          <p className="lede mx-auto mt-5 text-mist">{G.cta.copy}</p>
          <div className="cta-row justify-center mt-8 sm:mt-9">
            <Link to={CTAS[0].href} className="btn btn-gold">{CTAS[0].label}</Link>
            <Link to={CTAS[1].href} className="btn btn-ghost">{CTAS[1].label}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <JsonLd path="/services" faqs={G.faqs} />
      <PageHero crumb="Services" eyebrow={WHAT_WE_DO.eyebrow} title={['What', 'We Do']} copy={WHAT_WE_DO.copy} ctas={CTAS} aside={<VerticalIndex />} />
      <Overview />
      {WHAT_WE_DO.verticals.map((v, i) => <Vertical key={v.id} v={v} i={i} />)}
      <HowWeWork />
      <GettingStarted />
    </>
  )
}
