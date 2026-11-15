import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Icon from '../components/Icon.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import AdvisoryBlock from '../components/AdvisoryBlock.jsx'
import { PageHero, SectionHead, Accordion, JsonLd, Dialog, CheckList, CountUp } from '../components/ui.jsx'
import {
  MARKET_HERO as H, FEATURED, LIVE_NEWS, NEWS_FEED_URL, DISPATCH, DISPATCH_FEED_URL, NOTIFICATIONS,
  INDUSTRIES, MARKET_FAQ, REPORTS, PLAYBOOKS, RESOURCES, MARKET_ADVISORY as A,
} from '../data/market.js'

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const stripTags = (s = '') => s.replace(/<[^>]*>?/gm, '').trim()

/** Fetches an rss2json feed once on mount; keeps `fallback` if the request fails or is empty. */
function useFeed(url, fallback, map) {
  const [items, setItems] = useState(fallback)
  const [live, setLive] = useState(false)
  useEffect(() => {
    let alive = true
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        const next = (d?.items || []).filter((x) => x.title && x.link).map(map).filter(Boolean)
        if (alive && next.length) {
          setItems(next)
          setLive(true)
        }
      })
      .catch(() => { /* keep the curated fallback list */ })
    return () => { alive = false }
  }, [url]) // eslint-disable-line react-hooks/exhaustive-deps
  return [items, live]
}

function LiveNews() {
  const [items] = useFeed(NEWS_FEED_URL, LIVE_NEWS.items, (x, i) =>
    i < 4
      ? {
          title: x.title,
          source: 'Economic Times',
          url: x.link,
          category: 'MARKET DISPATCH',
          image: LIVE_NEWS.items[i % LIVE_NEWS.items.length].image,
          snippet: stripTags(x.description).slice(0, 100) + '...',
        }
      : null,
  )
  return (
    <section id="live-news" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow={LIVE_NEWS.eyebrow} title={LIVE_NEWS.title} />
          <p className="flex items-center gap-2 rounded-[2px] bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-line">
            <span className="pulse-dot size-2 rounded-[2px] bg-[#1a9a5b]" aria-hidden="true" /> {LIVE_NEWS.badge}
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {items.map((n) => (
            <li key={n.url + n.title} className="reveal">
              <a href={n.url} {...ext} className="card group grid h-full grid-cols-[5.75rem_1fr] overflow-hidden sm:flex sm:flex-col">
                <img src={n.image} alt="" width="960" height="960" loading="lazy" className="h-full min-h-28 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:aspect-[16/10] sm:h-auto sm:min-h-0" />
                <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                  <span className="tag self-start">{n.category}</span>
                  <h3 className="mt-2 font-sans text-[0.95rem] font-semibold leading-snug group-hover:text-royal sm:mt-3 sm:text-base">{n.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm sm:line-clamp-none">{n.snippet}</p>
                  <p className="mt-3 flex gap-2 sm:mt-4 items-center justify-between text-xs font-semibold text-gold-deep">
                    Source: {n.source} <Icon name="external" size={15} />
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function DispatchBar() {
  const [items, live] = useFeed(DISPATCH_FEED_URL, DISPATCH.items, (x, i) =>
    i < 10 ? { title: x.title.replace(/\s*-\s*[^-]+$/, '').trim(), source: x.author || 'LIVE GAZETTE', status: 'LIVE DISPATCH' } : null,
  )
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((d) => (
        <li key={d.title} className="flex items-center gap-3 px-7 whitespace-nowrap text-sm">
          <span className="rounded-sm border border-gold/40 bg-gold/15 px-2 py-0.5 text-xs font-bold tracking-wide text-gold">{d.status}</span>
          <span className="font-semibold text-white">{d.title}</span>
          <span className="text-mist">• {d.source}</span>
          <span className="text-gold/50" aria-hidden="true">◆</span>
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label={DISPATCH.label} className="marquee-host relative flex items-center overflow-hidden border-y-2 border-gold bg-ink py-3.5">
      <p className="relative z-10 flex shrink-0 items-center gap-2 bg-ink pl-4 pr-5 text-xs font-black tracking-[0.15em] text-gold sm:pl-6">
        <span className="pulse-dot size-2 rounded-[2px] bg-[#e5484d]" aria-hidden="true" />
        {live ? DISPATCH.label : DISPATCH.liveLabel}
      </p>
      <div className="marquee flex w-max" style={{ '--marquee-duration': '70s' }}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}

function IndustryDetail({ s }) {
  const L = INDUSTRIES.labels
  return (
    <article>
      <header className="axis-field on-dark px-6 pb-8 pt-14 text-white sm:px-10">
        <p className="text-xs font-semibold tracking-wide text-gold">{L.dispatch} • {s.category}</p>
        <h2 className="display-md mt-3 text-white">{s.title}</h2>
        <p className="mt-2 text-mist">{L.pool}<span className="font-semibold text-gold-pale">{s.capital}</span></p>
        <p className="mt-3 max-w-2xl text-mist">{s.description}</p>
      </header>
      <div className="grid gap-8 px-5 py-7 sm:px-10 sm:py-8 md:grid-cols-2">
        <dl className="space-y-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {[[L.authority, s.nodalAuthority], [L.limit, s.maxGrantCap]].map(([k, v]) => (
            <div key={k} className="rounded-[var(--radius-card)] bg-paper p-4">
              <dt className="text-xs font-semibold tracking-wide text-gold-deep">{k}</dt>
              <dd className="mt-1 font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <section>
          <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.eligibility}</h3>
          <CheckList items={s.eligibility} className="mt-3 text-sm" />
        </section>
        <section>
          <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.documents}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {s.documents.map((d) => <li key={d} className="flex gap-2.5"><Icon name="doc" size={17} className="mt-0.5 shrink-0 text-royal" />{d}</li>)}
          </ul>
        </section>
        <h3 className="flex items-center gap-2 border-t border-line pt-6 font-sans text-sm font-semibold tracking-wide text-gold-deep md:col-span-2">
          <Icon name="clock" size={17} /> Fast-Track Milestone Timeline ({s.fastTrackTime})
        </h3>
        <ol className="-mt-4 grid gap-4 sm:grid-cols-4 md:col-span-2">
          {s.steps.map((st) => (
            <li key={st.day}>
              <p className="font-display text-lg text-royal">{st.day}</p>
              <p className="text-sm">{st.step}</p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}

function ReportDetail({ r }) {
  const L = REPORTS.labels
  return (
    <article>
      <img src={r.image} alt="" width="960" height="960" className="aspect-[21/9] w-full object-cover" />
      <div className="px-6 py-8 sm:px-10">
        <p className="text-xs font-semibold tracking-wide text-gold-deep">{L.dispatch} • {r.category} • {r.readTime}</p>
        <h2 className="display-md mt-3">{r.title}</h2>
        <p className="mt-2 text-sm">{L.author}{r.author}</p>
        <h3 className="mt-8 font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.summary}</h3>
        <p className="mt-2">{r.executiveSummary}</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.takeaways}</h3>
            <CheckList items={r.takeaways} className="mt-3 text-sm" />
          </section>
          <section>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.filing}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {r.filing.map((d) => <li key={d} className="flex gap-2.5"><Icon name="doc" size={17} className="mt-0.5 shrink-0 text-royal" />{d}</li>)}
            </ul>
          </section>
        </div>
        <p className="mt-8 rounded-[var(--radius-card)] bg-paper p-4 text-sm"><strong className="text-ink">{L.desks}:</strong> {r.sanctionDesks}</p>
        <div className="mt-6 border-t border-line pt-5 text-xs">
          <p className="font-semibold text-ink">{L.disclaimerTitle}</p>
          <p className="mt-1">{L.disclaimer}</p>
        </div>
      </div>
    </article>
  )
}

export default function MarketSuchna() {
  const [industry, setIndustry] = useState(null)
  const [report, setReport] = useState(null)
  const cover = FEATURED.cover
  return (
    <>
      <JsonLd path="/market-suchna" faqs={MARKET_FAQ.items} />
      <PageHero tone="light" crumb="Market Suchna" eyebrow={H.eyebrow} title={H.title} copy={H.copy} ctas={H.ctas}>
        <div className="wrap relative mt-10 sm:mt-14">
          <dl className="grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3 lg:grid-cols-6">
            {H.stats.map((s) => (
              <div key={s.label} className="border-b border-r border-ink bg-white p-4 sm:p-5">
                <dt className="mono text-xs text-slate">{s.label}</dt>
                <dd className="figure mt-2 text-3xl text-ink"><CountUp value={s.count} /></dd>
                <dd className="mono mt-1 text-xs text-royal">▲ {s.trend}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHero>

      <section id="featured-stories" className="section">
        <div className="wrap">
          <SectionHead eyebrow={FEATURED.eyebrow} title={FEATURED.title} />
          <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[1.5fr_1fr]">
            <a href={cover.url} {...ext} className="group reveal reveal-clip relative block overflow-hidden rounded-[var(--radius-panel)] bg-ink lg:min-h-[26rem]">
              {/* Phones: the cover art (which has its own lettering) sits above the copy instead of under it. */}
              <img src={cover.image} alt={cover.alt} width="960" height="960" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:absolute lg:inset-0 lg:aspect-auto lg:size-full lg:opacity-60" />
              <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/50 to-transparent lg:block" />
              <div className="relative p-6 sm:p-10 lg:absolute lg:inset-x-0 lg:bottom-0">
                <p className="text-sm text-gold">{cover.meta}</p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.4rem)] text-white">{cover.title}</h3>
                <p className="mt-3 max-w-2xl text-mist">{cover.copy}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white group-hover:text-gold">
                  {cover.cta} <Icon name="external" size={17} />
                </span>
              </div>
            </a>
            <ul className="grid gap-4">
              {FEATURED.stories.map((s) => (
                <li key={s.title} className="reveal">
                  <a href={s.url} {...ext} className="card group block h-full p-5 sm:p-6">
                    <p className="text-xs font-semibold tracking-wide text-gold-deep">{s.category} • {s.date}</p>
                    <h3 className="mt-2 font-display text-xl group-hover:text-royal">{s.title}</h3>
                    <p className="mt-2 text-sm">{s.excerpt}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DispatchBar />
      <LiveNews />

      <section className="section border-y border-line bg-white">
        <div className="wrap">
          <SectionHead eyebrow={NOTIFICATIONS.eyebrow} title={NOTIFICATIONS.title} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line md:grid-cols-2">
            {NOTIFICATIONS.items.map((n) => (
              <li key={n.title} className="reveal bg-white p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag tag-gold">{n.tag}</span>
                  <span className="text-xs font-semibold tracking-wide">{n.authority}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl">{n.title}</h3>
                <p className="mt-2">{n.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={INDUSTRIES.eyebrow} title={INDUSTRIES.title} />
          <ul aria-label={INDUSTRIES.eyebrow} className="rail mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.items.map((s) => (
              <li key={s.title} className="reveal">
                <button type="button" onClick={() => setIndustry(s)} className="card group flex h-full w-full flex-col overflow-hidden text-left">
                  <img src={s.image} alt={s.title} width="960" height="960" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold tracking-wide text-gold-deep">{s.category}</p>
                    <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                    <p className="mt-2 font-display text-[1.7rem] leading-tight text-royal sm:text-3xl">{s.capital}</p>
                    <p className="mt-2 flex-1 text-sm">{s.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal group-hover:gap-3">
                      {INDUSTRIES.cta} <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-y border-line bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead eyebrow={MARKET_FAQ.eyebrow} title={MARKET_FAQ.title} />
          <Accordion items={MARKET_FAQ.items} name="market-faq" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={REPORTS.eyebrow} title={REPORTS.title} />
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {REPORTS.items.map((r) => (
              <li key={r.title} className="card reveal grid overflow-hidden sm:grid-cols-[0.8fr_1.2fr]">
                <img src={r.image} alt={r.title} width="960" height="960" loading="lazy" className="aspect-[16/10] size-full object-cover sm:aspect-auto" />
                <div className="flex flex-col p-6">
                  <p className="text-xs font-semibold tracking-wide text-gold-deep">{r.category} • {r.author}</p>
                  <h3 className="mt-2 font-display text-xl">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm">{r.summary}</p>
                  <button type="button" onClick={() => setReport(r)} className="btn btn-ghost mt-5 self-start">
                    {REPORTS.cta} <Icon name="arrow" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="axis-field on-dark section text-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead eyebrow={PLAYBOOKS.eyebrow} title={PLAYBOOKS.title} copy={PLAYBOOKS.copy} dark />
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {PLAYBOOKS.items.map((p) => (
                <li key={p.title} className="grid gap-1 py-5 sm:grid-cols-[15rem_1fr] sm:gap-8 sm:py-6">
                  <h3 className="font-display text-xl text-white">{p.title}</h3>
                  <p className="text-mist">{p.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="glass self-end rounded-[var(--radius-panel)] p-6 sm:p-8">
            <p className="eyebrow">{PLAYBOOKS.summary.eyebrow}</p>
            <h3 className="display-md mt-5 text-white">{PLAYBOOKS.summary.title}</h3>
            <p className="mt-3 text-mist">{PLAYBOOKS.summary.copy}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {PLAYBOOKS.summary.badges.map((b) => (
                <li key={b} className="flex items-center gap-1.5 rounded-[2px] bg-white/10 px-3 py-1 text-sm text-white">
                  <Icon name="check" size={15} className="text-gold" />{b}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={RESOURCES.eyebrow} title={RESOURCES.title} />
          <ul aria-label={RESOURCES.eyebrow} className="rail mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.items.map((r) => (
              <li key={r.title} className="reveal">
                <Link to={r.href} className="card group block h-full overflow-hidden">
                  <img src={r.image} alt={r.title} width="960" height="960" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="p-5">
                    <h3 className="flex items-center justify-between gap-2 font-sans text-base font-semibold group-hover:text-royal">
                      {r.title} <Icon name="arrow" size={17} className="shrink-0" />
                    </h3>
                    <p className="mt-2 text-sm">{r.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AdvisoryBlock
        image="/img/articles/contact_advisory.webp"
        imageAlt="BharatFundAxis Executive Advisory"
        title={A.title}
        copy={A.copy}
        points={A.points}
        formTitle={A.formTitle}
        formCopy={A.formCopy}
        form={<EnquiryForm topic={A.topic} defaultMessage={A.defaultMessage} placeholders={A.placeholders} />}
      />

      <Dialog open={!!industry} onClose={() => setIndustry(null)} label={industry?.title}>
        {industry && <IndustryDetail s={industry} />}
      </Dialog>
      <Dialog open={!!report} onClose={() => setReport(null)} label={report?.title}>
        {report && <ReportDetail r={report} />}
      </Dialog>
    </>
  )
}
