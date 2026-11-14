import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { PageHero, SectionHead, Accordion, JsonLd } from '../components/ui.jsx'
import { CONTACT, FORM_MESSAGES_HI } from '../data/site.js'
import { CONTACT_HERO as H, PATHS, CONTACT_FORM as F, PROCESS, PRESENCE, CONTACT_FAQ, BEGINNING } from '../data/contact.js'

function Select({ id, name, label, options, defaultValue }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <div className="relative">
        <select id={id} name={name} defaultValue={defaultValue} className="field appearance-none pr-10">
          {options.map((o) => {
            const { value, label: text } = typeof o === 'string' ? { value: o, label: o } : o
            return <option key={value} value={value}>{text}</option>
          })}
        </select>
        <Icon name="chevronRight" size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate" />
      </div>
    </div>
  )
}

function ExtraFields({ path }) {
  return (
    <>
      <div>
        <label htmlFor="c-business" className="mb-1.5 block text-sm font-medium text-ink">{F.labels.business}</label>
        <input id="c-business" name="business" type="text" autoComplete="organization" maxLength={120} placeholder={F.placeholders.business} className="field" />
      </div>
      {path === 'funding' && (
        <div className="grid gap-4 md:grid-cols-2">
          <Select id="c-funding" name="fundingReq" label={F.labels.fundingReq} options={F.fundingOptions} defaultValue="₹10 Lakhs - ₹50 Lakhs" />
          <Select id="c-stage" name="stage" label={F.labels.stage} options={F.stageOptions} defaultValue="Early Revenue Startup" />
        </div>
      )}
      {path === 'consultation' && (
        <div className="grid gap-4 md:grid-cols-2">
          <Select id="c-focus" name="focus" label={F.labels.focus} options={F.focusOptions} />
          <Select id="c-timeframe" name="timeframe" label={F.labels.timeframe} options={F.timeframeOptions} />
        </div>
      )}
    </>
  )
}

export default function Contact() {
  const [pathId, setPathId] = useState(PATHS.items[0].id)
  const path = PATHS.items.find((p) => p.id === pathId)

  const choose = (id) => {
    setPathId(id)
    requestAnimationFrame(() => document.getElementById('writing-desk')?.scrollIntoView())
  }

  return (
    <>
      <JsonLd path="/contact" faqs={CONTACT_FAQ.items} />
      <PageHero
        crumb="Contact Us"
        eyebrow={H.eyebrow}
        title={H.title}
        copy={H.copy}
        ctas={H.ctas}
        aside={
          <div className="glass rounded-[var(--radius-panel)] p-7">
            <p className="text-xs font-semibold tracking-wide text-gold">{H.studio.tag}</p>
            <p className="mt-3 font-display text-3xl text-white">{H.studio.title}</p>
            <p className="mt-1 text-mist">{H.studio.copy}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {H.studio.desks.map((d) => (
                <div key={d.label} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs text-mist">{d.label}</dt>
                  <dd className="mt-1 font-semibold text-white">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section id="connection-panels" className="section">
        <div className="wrap">
          <SectionHead eyebrow={PATHS.eyebrow} title={PATHS.title} copy={PATHS.copy} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PATHS.items.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={p.id === pathId}
                  onClick={() => choose(p.id)}
                  className={`flex h-full w-full flex-col rounded-[var(--radius-panel)] p-6 text-left transition-[color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 active:scale-[0.985] ${p.id === pathId ? 'axis-field text-white' : 'bg-white ring-1 ring-line hover:ring-ink'}`}
                >
                  <span className="flex items-center justify-between">
                    <span className={`text-xs font-semibold tracking-wide ${p.id === pathId ? 'text-gold' : 'text-gold-deep'}`}>{p.badge}</span>
                    <span className={`font-display ${p.id === pathId ? 'text-white/70' : 'text-slate'}`}>0{i + 1}</span>
                  </span>
                  <span className={`mt-4 font-display text-2xl leading-tight ${p.id === pathId ? 'text-white' : 'text-ink'}`}>{p.title}</span>
                  <span className={`mt-3 flex-1 text-sm ${p.id === pathId ? 'text-mist' : ''}`}>{p.desc}</span>
                  <span className={`mt-6 text-sm font-semibold ${p.id === pathId ? 'text-gold' : 'text-royal'}`}>{p.actionText}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="writing-desk" className="pb-20 lg:pb-28">
        <div className="wrap">
          <div className="mx-auto max-w-3xl rounded-[var(--radius-panel)] bg-white p-6 shadow-[0_40px_80px_-50px_rgb(10_24_56/0.5)] ring-1 ring-line sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={path.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <p className="eyebrow">{path.form.tag}</p>
                <h2 className="display-md mt-4">{path.form.title}</h2>
                <p className="mb-8 mt-2">{path.form.desc}</p>
              </m.div>
            </AnimatePresence>
            <EnquiryForm
              key={path.id}
              topic={path.title}
              defaultMessage={`Enquiry for ${path.title}`}
              labels={F.labels}
              placeholders={F.placeholders}
              messages={FORM_MESSAGES_HI}
              consent={{ prefix: F.consentPrefix, and: ' और ', suffix: ` ${F.consentSuffix}` }}
              extra={<ExtraFields path={path.id} />}
              buildPayload={(base, fd) => ({
                ...base,
                enterpriseType: fd.business || '',
                fundingAmount: fd.fundingReq,
                stage: fd.stage,
                consultationFocus: fd.focus,
                timeframe: fd.timeframe,
              })}
            />
          </div>
        </div>
      </section>

      <section className="axis-field on-dark section text-white">
        <div className="wrap">
          <SectionHead eyebrow={PROCESS.eyebrow} title={PROCESS.title} dark />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.steps.map((s, i) => (
              <li key={s.phase} className="reveal bg-ink/90 p-6 sm:p-7">
                <p className="font-display text-[2rem] leading-none text-gold sm:text-4xl">0{i + 1}</p>
                <p className="mt-4 text-xs font-semibold tracking-wide text-mist">{s.phase}</p>
                <h3 className="mt-2 font-display text-xl text-white">{s.title}</h3>
                <p className="mt-2 text-sm font-semibold text-gold-pale">{s.short}</p>
                <p className="mt-3 text-sm text-mist">{s.details}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-8 flex flex-wrap gap-3">
            {PROCESS.badges.map((b) => (
              <li key={b} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                <Icon name="shield" size={15} className="text-gold" />{b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow={PRESENCE.eyebrow} title={PRESENCE.title} />
            <p className="mt-8 text-xs font-semibold tracking-wide text-gold-deep">{PRESENCE.hqLabel}</p>
            <address className="mt-2 font-display text-2xl not-italic text-ink">{CONTACT.address}</address>
            <p className="mt-4">{PRESENCE.copy}</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {[
                ['clock', PRESENCE.hoursLabel, CONTACT.hours],
                ['mail', PRESENCE.emailLabel, <a href={`mailto:${CONTACT.email}`} className="break-all text-ink hover:text-royal">{CONTACT.email}</a>],
                ['phone', PRESENCE.phoneLabel, <a href={CONTACT.phoneHref} className="text-ink hover:text-royal">{CONTACT.phone}</a>],
              ].map(([icon, label, value]) => (
                <li key={label} className="flex items-start gap-4 py-4">
                  <Icon name={icon} size={20} className="mt-0.5 text-royal" />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-gold-deep">{label}</p>
                    <p className="text-ink">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[18rem] overflow-hidden rounded-[var(--radius-panel)] bg-white ring-1 ring-line sm:min-h-[22rem]">
            <iframe title={PRESENCE.mapTitle} src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full min-h-[18rem] border-0 sm:min-h-[22rem]" />
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead eyebrow={CONTACT_FAQ.eyebrow} title={CONTACT_FAQ.title} />
          <Accordion items={CONTACT_FAQ.items} name="contact-faq" />
        </div>
      </section>

      <section className="section text-center">
        <div className="wrap">
          <p className="eyebrow justify-center">{BEGINNING.eyebrow}</p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl">{BEGINNING.title[0]} <span className="sm:block">{BEGINNING.title[1]}</span></h2>
          <p className="lede mx-auto mt-5">{BEGINNING.copy}</p>
          <a href={BEGINNING.cta.href} className="btn btn-royal mt-8">{BEGINNING.cta.label}</a>
        </div>
      </section>
    </>
  )
}
