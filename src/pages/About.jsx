import { Link } from 'react-router'
import Icon from '../components/Icon.jsx'
import { PageHero, SectionHead, JsonLd, CountUp } from '../components/ui.jsx'
import { APPLY_HREF } from '../data/site.js'
import {
  TAGLINE, PROFILE_INTRO, WELCOME, WHO_WE_ARE, LOGO_MEANING, VALUES, GLANCE, WHO_WE_SERVE, WHY_US, THANK_YOU,
} from '../data/profile.js'

const CTAS = [
  { label: 'Apply Now', href: APPLY_HREF },
  { label: 'Contact Us', href: '/contact' },
]

/** The brand symbol on a cream disc with gold orbit rings, used as the hero visual. */
function BrandMark() {
  return (
    <div className="relative mx-auto grid aspect-square w-[min(22rem,78vw)] place-items-center lg:mr-0">
      <div aria-hidden="true" className="absolute inset-0 rounded-full border border-ink/20" />
      <div aria-hidden="true" className="absolute inset-[7%] rounded-full border border-dashed border-gold/25" />
      <div className="float relative grid size-[78%] place-items-center rounded-full bg-paper shadow-[10px_10px_0_var(--color-gold)] ring-1 ring-ink">
        <img src="/img/logo-symbol.webp" alt="BharatFundAxis logo: three overlapping circles with a handshake, a rising chart and a person" width="499" height="455" className="w-[72%]" />
      </div>
      <p className="mono absolute -bottom-2 text-center text-xs tracking-[0.2em] text-gold-deep">{TAGLINE}</p>
    </div>
  )
}

function Welcome() {
  return (
    <section aria-label={WELCOME.title} className="section">
      <div className="wrap reveal mx-auto max-w-4xl text-center">
        <span aria-hidden="true" className="block font-display text-7xl leading-[0.6] text-gold/50">“</span>
        <blockquote className="mt-4 font-display text-[1.35rem] leading-snug text-ink sm:text-[1.85rem]">{WELCOME.quote}</blockquote>
        <div aria-hidden="true" className="mx-auto mt-8 h-px w-24 bg-gold" />
        <p className="mx-auto mt-8 max-w-2xl">{WELCOME.copy}</p>
      </div>
    </section>
  )
}

function WhoWeAre() {
  const w = WHO_WE_ARE
  return (
    <section className="section border-y border-line bg-white">
      <div className="wrap">
        <SectionHead eyebrow={w.eyebrow} title={w.title} copy={w.copy} />
        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
          {[w.vision, w.mission].map((b, i) => (
            <div key={b.title} className={`reveal rounded-[var(--radius-panel)] p-6 sm:p-9 ${i ? 'bg-navy text-white' : 'axis-field on-dark text-white'}`}>
              <p className="text-xs font-semibold tracking-[0.14em] text-gold">{b.title.toUpperCase()}</p>
              <p className="mt-4 font-display text-xl leading-snug text-white sm:text-2xl">{b.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoMeaning() {
  const l = LOGO_MEANING
  return (
    <section className="section">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal reveal-clip mx-auto w-full max-w-sm rounded-[var(--radius-panel)] bg-white p-8 ring-1 ring-line sm:p-12">
          <img src="/img/logo-symbol.webp" alt="" width="499" height="455" loading="lazy" className="w-full" />
        </div>
        <div>
          <SectionHead title={l.title} copy={l.copy} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {l.items.map((x, i) => (
              <li key={x.title} className="reveal card p-5">
                <span className={`grid size-10 place-items-center rounded-full font-display text-lg ${['bg-ink text-white', 'bg-navy text-white', 'bg-gold text-ink'][i]}`}>{x.letter}</span>
                <h3 className="mt-4 font-sans text-base font-semibold text-ink">{x.title}</h3>
                <p className="mt-1.5 text-sm">{x.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Values() {
  const v = VALUES
  return (
    <section className="section border-y border-line bg-white">
      <div className="wrap">
        <SectionHead eyebrow={v.eyebrow} title={v.title} copy={v.copy} />
        <ul className="rail mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {v.items.map((x, i) => (
            <li key={x.title} className="reveal card group relative overflow-hidden p-6 sm:p-7">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              <p className="font-display text-sm text-gold-deep">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl">{x.title}</h3>
              <p className="mt-2">{x.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Glance() {
  return (
    <section aria-labelledby="glance" className="axis-field on-dark py-12 text-white sm:py-16">
      <div className="wrap">
        <h2 id="glance" className="eyebrow reveal font-sans">{GLANCE.title}</h2>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {GLANCE.items.map((g) => (
            <div key={g.label} className="reveal flex flex-col-reverse border-l border-gold/40 pl-4 sm:pl-6">
              <dt className="mt-2 text-sm text-mist sm:text-base">{g.label}</dt>
              <dd className="font-display text-[2rem] leading-none text-gold tabular-nums sm:text-5xl"><CountUp value={g.value} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function WhoWeServe() {
  const w = WHO_WE_SERVE
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={w.eyebrow} title={w.title} copy={w.copy} />
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((x) => (
            <li key={x.title} className="reveal bg-white p-6 transition-colors hover:bg-royal-soft/50 sm:p-7">
              <h3 className="font-display text-2xl">{x.title}</h3>
              <p className="mt-2">{x.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="section border-y border-line bg-white">
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHead title={WHY_US.title} />
        </div>
        <ol className="relative ml-4 border-l border-gold/50 pl-8 sm:ml-0 sm:pl-12">
          {WHY_US.items.map((x, i) => (
            <li key={x.title} className="reveal reveal-left relative pb-9 last:pb-0 sm:pb-11">
              <span className="absolute -left-[calc(2rem+1.1rem)] top-0 grid size-9 place-items-center rounded-full bg-ink font-display text-sm text-gold sm:-left-[calc(3rem+1.1rem)]">
                {i + 1}
              </span>
              <h3 className="display-md">{x.title}</h3>
              <p className="mt-2 max-w-xl">{x.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ThankYou() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="axis-field on-dark reveal group relative isolate overflow-hidden rounded-[var(--radius-panel)] px-5 py-12 text-center text-white sm:px-12 sm:py-14 lg:py-20">
          <div aria-hidden="true" className="glow -left-40 -top-56 -z-10 size-[36rem]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px scale-x-50 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
          <h2 className="display-lg text-white">{THANK_YOU.title}</h2>
          <p className="lede mx-auto mt-5 text-mist">{THANK_YOU.copy}</p>
          <p className="mx-auto mt-4 font-display text-xl text-gold-pale">{THANK_YOU.close}</p>
          <div className="cta-row justify-center mt-8 sm:mt-9">
            <Link to={CTAS[0].href} className="btn btn-gold">{CTAS[0].label}</Link>
            <Link to="/services" className="btn btn-ghost">Services <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <JsonLd path="/about" />
      <PageHero tone="light" crumb="About Us" eyebrow={WELCOME.eyebrow} title={['Welcome to', 'BharatFundAxis']} copy={PROFILE_INTRO} ctas={CTAS} aside={<BrandMark />} />
      <Welcome />
      <WhoWeAre />
      <LogoMeaning />
      <Values />
      <Glance />
      <WhoWeServe />
      <WhyUs />
      <ThankYou />
    </>
  )
}
