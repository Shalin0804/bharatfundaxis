import Icon from '../components/Icon.jsx'
import { PageHero, JsonLd } from '../components/ui.jsx'
import { PAGES } from '../seo.js'
import { CONTACT } from '../data/site.js'
import { PRIVACY, TERMS } from '../data/legal.js'

function Block({ b }) {
  if (b.h3) return <h3 className="mt-8 font-sans text-lg font-semibold">{b.h3}</h3>
  if (b.code) return <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-ink px-4 py-3 text-sm text-gold-pale sm:whitespace-pre sm:break-normal"><code>{b.code}</code></pre>
  if (b.quote) return <blockquote className="mt-4 border-l-2 border-gold pl-5 italic text-ink">{b.quote}</blockquote>
  if (b.list) return <ul className="mt-3 list-disc space-y-1.5 pl-6 marker:text-gold-deep">{b.list.map((t) => <li key={t}>{t}</li>)}</ul>
  if (b.lead) {
    return (
      <p className={`mt-4 ${b.note ? 'rounded-lg border border-gold/40 bg-gold-pale/50 p-4' : ''}`}>
        <strong className="text-ink">{b.lead}</strong> {b.text}
      </p>
    )
  }
  if (b.note) return <p className="mt-6 rounded-lg bg-paper p-4 text-sm">{b.text}</p>
  if (b.email) {
    const [before, after] = b.p.split(CONTACT.email)
    return (
      <p className="mt-4">
        {before}
        <a href={`mailto:${CONTACT.email}`} className="font-medium text-royal underline underline-offset-2">{CONTACT.email}</a>
        {after}
      </p>
    )
  }
  return <p className="mt-4">{b.p}</p>
}

export default function Legal({ path }) {
  const doc = path === '/privacy-policy' ? PRIVACY : TERMS
  return (
    <>
      <JsonLd path={path} />
      <PageHero tone="light" crumb={PAGES[path].crumb} eyebrow={doc.eyebrow} title={[doc.title, '']} copy={doc.copy} />
      <div className="wrap grid gap-8 py-10 sm:py-16 lg:grid-cols-[16rem_1fr] lg:gap-12 lg:py-24">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-36 space-y-2 border-l border-line text-sm">
            {doc.sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="-ml-px block border-l border-transparent py-1 pl-4 hover:border-gold hover:text-ink">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <details className="card group lg:hidden">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            On this page
            <Icon name="plus" size={16} className="text-royal transition-transform group-open:rotate-45" />
          </summary>
          <ol className="border-t border-line px-2 py-2 text-sm">
            {doc.sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="block rounded-lg px-3 py-2.5 hover:bg-paper hover:text-ink">{s.title}</a>
              </li>
            ))}
          </ol>
        </details>
        <article className="prose-legal min-w-0">
          {doc.meta && <p className="rounded-[var(--radius-card)] border border-line bg-white p-5 text-sm">{doc.meta}</p>}
          {doc.sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="border-b border-line py-8 last:border-0 sm:py-10">
              {s.kicker && <p className="eyebrow mb-3">{s.kicker}</p>}
              <h2 className="display-md">{s.title}</h2>
              {s.blocks.map((b, j) => <Block key={j} b={b} />)}
            </section>
          ))}
        </article>
      </div>
    </>
  )
}
