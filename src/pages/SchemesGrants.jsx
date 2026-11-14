import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import Icon from '../components/Icon.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import AdvisoryBlock from '../components/AdvisoryBlock.jsx'
import { PageHero, SectionHead, Accordion, JsonLd, Dialog, CheckList } from '../components/ui.jsx'
import { SCHEMES_HERO as H, CATEGORIES, DETAIL_LABELS as L, POPULAR, SCHEMES, SCHEME_FAQ, SCHEME_ADVISORY as A } from '../data/schemes.js'

// Directory search also covers popular-only entries (HDFC, AWS) so the placeholder's examples resolve.
const SEARCHABLE = [...SCHEMES, ...POPULAR.items.filter((p) => !SCHEMES.some((s) => s.code === p.code))]

function SchemeDetail({ s, tag }) {
  const terms = [
    [L.coverage, s.coverage],
    [L.collateral, s.collateral],
    [L.interest, s.interestSubvention],
    [L.turnaround, s.turnaround],
  ]
  return (
    <article>
      <header className="axis-field on-dark px-6 pb-8 pt-14 text-white sm:px-10">
        <p className="text-xs font-semibold tracking-wide text-gold">{tag} • {s.code}</p>
        <h2 className="display-md mt-3 text-white">{s.title}</h2>
        <p className="mt-2 text-sm text-mist">{s.ministry} • {s.nodalAgency}</p>
        <div className="mt-6 inline-block rounded-xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
          <p className="text-xs font-semibold tracking-wide text-gold">{L.pool}</p>
          <p className="mt-1 font-display text-3xl text-white">{s.amount}</p>
        </div>
      </header>
      <div className="grid gap-8 px-6 py-8 sm:px-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-7">
          <section>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.overview}</h3>
            <p className="mt-2">{s.summary}</p>
          </section>
          <section>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.eligibility}</h3>
            <p className="mt-2">{s.eligibility}</p>
          </section>
          <section>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.benefits}</h3>
            <CheckList items={s.benefits} className="mt-3" />
          </section>
        </div>
        <div className="space-y-7">
          <dl className="divide-y divide-line rounded-[var(--radius-card)] border border-line">
            {terms.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt>{k}</dt>
                <dd className="text-right font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <section>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-gold-deep">{L.documents}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {s.documents.map((d) => (
                <li key={d} className="flex gap-2.5"><Icon name="doc" size={17} className="mt-0.5 shrink-0 text-royal" />{d}</li>
              ))}
            </ul>
          </section>
          <Link to="/contact#writing-desk" className="btn btn-royal w-full">{s.title}{L.applySuffix}</Link>
        </div>
      </div>
    </article>
  )
}

function SchemeCard({ s, onOpen }) {
  return (
    <li className="card group flex flex-col p-6 transition-shadow hover:shadow-[0_24px_50px_-28px_rgb(10_24_56/0.35)]">
      <p className="text-xs font-semibold tracking-wide text-gold-deep">{s.code}</p>
      <h3 className="mt-2 font-display text-[1.45rem] leading-tight">{s.title}</h3>
      <p className="mt-1 text-sm">{s.ministry}</p>
      <p className="mt-5 font-display text-2xl text-royal">{s.amount}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm">{s.summary}</p>
      <button type="button" onClick={() => onOpen(s)} className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-royal group-hover:gap-3">
        View details <span className="sr-only">for {s.title}</span> <Icon name="arrow" size={18} />
      </button>
    </li>
  )
}

export default function SchemesGrants() {
  const [params, setParams] = useSearchParams()
  const category = CATEGORIES.includes(params.get('category')) ? params.get('category') : 'All'
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(null) // {s, tag}

  const setCategory = (c) => {
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('category')
    else next.set('category', c)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (category === 'All' ? SEARCHABLE : SCHEMES.filter((s) => s.category === category)).filter(
      (s) => !q || [s.title, s.code, s.category, s.ministry, s.nodalAgency, s.amount, s.summary].join(' ').toLowerCase().includes(q),
    )
  }, [category, query])

  return (
    <>
      <JsonLd path="/schemes-grants" faqs={SCHEME_FAQ.items} />
      <PageHero
        crumb="Schemes & Grants"
        eyebrow={H.eyebrow}
        title={H.title}
        copy={H.copy}
        aside={
          <form role="search" onSubmit={(e) => { e.preventDefault(); document.getElementById('directory')?.scrollIntoView() }} className="glass rounded-[var(--radius-panel)] p-3">
            <label htmlFor="scheme-search" className="sr-only">Search schemes</label>
            <div className="flex items-center gap-2 rounded-xl bg-white px-3">
              <Icon name="search" size={20} className="shrink-0 text-slate" />
              <input
                id="scheme-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={H.searchPlaceholder}
                className="min-h-13 w-full bg-transparent py-3 text-ink outline-none placeholder:text-[#7b86a3]"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="shrink-0 rounded-full px-3 py-1 text-sm text-royal hover:bg-royal-soft">{H.clear}</button>
              )}
            </div>
          </form>
        }
      />

      <section className="section pb-0">
        <div className="wrap">
          <SectionHead eyebrow={POPULAR.eyebrow} title={POPULAR.title} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR.items.map((s) => (
              <li key={s.code} className="reveal">
                <button
                  type="button"
                  onClick={() => setOpen({ s, tag: L.popularTag })}
                  className="axis-field group flex h-full w-full flex-col rounded-[var(--radius-panel)] p-6 text-left text-white"
                >
                  <p className="text-xs font-semibold tracking-wide text-gold">{s.category}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-white">{s.title}</h3>
                  <p className="mt-auto pt-8 font-display text-xl text-gold-pale">{s.amount}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-gold">
                    View details <Icon name="arrow" size={16} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="directory" className="section">
        <div className="wrap">
          <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${c === category ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-ink'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm" aria-live="polite">{results.length} {results.length === 1 ? 'scheme' : 'schemes'}</p>

          {results.length === 0 ? (
            <div className="mt-6 rounded-[var(--radius-panel)] border border-dashed border-line bg-white p-12 text-center">
              <p className="font-display text-2xl text-ink">{H.emptyTitle}</p>
              <p className="mt-2">{H.emptyCopy}</p>
            </div>
          ) : (
            CATEGORIES.slice(1).concat('Other')
              .map((c) => [c, results.filter((s) => (CATEGORIES.includes(s.category) ? s.category : 'Other') === c)])
              .filter(([, list]) => list.length)
              .map(([c, list]) => (
                <div key={c} className="mt-10">
                  {c !== 'Other' && <h2 className="font-display text-2xl">{c}</h2>}
                  <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((s) => <SchemeCard key={s.code + s.category} s={s} onOpen={(x) => setOpen({ s: x, tag: L.specTag })} />)}
                  </ul>
                </div>
              ))
          )}
        </div>
      </section>

      <section className="section border-y border-line bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead eyebrow={SCHEME_FAQ.eyebrow} title={SCHEME_FAQ.title} />
          <Accordion items={SCHEME_FAQ.items} name="scheme-faq" />
        </div>
      </section>

      <AdvisoryBlock
        image="/img/articles/contact_advisory.webp"
        imageAlt="BharatFundAxis Capital Advisory"
        eyebrow={A.eyebrow}
        title={A.title}
        copy={A.copy}
        note={A.note}
        formTitle={A.formTitle}
        formCopy={A.formCopy}
        form={<EnquiryForm topic={A.topic} defaultMessage={A.defaultMessage} placeholders={A.placeholders} />}
      />

      <Dialog open={!!open} onClose={() => setOpen(null)} label={open?.s.title}>
        {open && <SchemeDetail s={open.s} tag={open.tag} />}
      </Dialog>
    </>
  )
}
