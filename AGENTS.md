# BharatFundAxis website — agent guide

Project root (absolute): `D:\CF\Codes\Website code\bharatfundaxis.com`

When calling the claude-code MCP tool, always pass absolute paths under this project root — the tool's working directory is Antigravity's install folder, not this project.

## What this is
Public corporate website for BharatFundAxis (government scheme & capital advisory, Jaipur). Rebuilt from scratch with
the live site's content and a new UI. **Public site only — no dashboards, logins, CRM or admin.**

## Stack
React 19 · Vite 8 · Tailwind CSS 4 · React Router 8 · Framer Motion (LazyMotion, async features) · Vercel serverless function for forms.
Pages are prerendered to static HTML at build time (`scripts/prerender.js`) and hydrated on the client.

## Commands
- `npm run dev` — dev server (client-rendered)
- `npm run build` — client build + SSR build + prerender all routes + sitemap.xml into `dist/`
- `npm run preview` — serve `dist/` (no `/api`; use `vercel dev` to exercise forms)
- `npm test` — API validation tests (node:test)
- `python scripts/optimize-images.py <dir>` — one-off image conversion (already run)

## Rules
- **Content is verbatim from the live site** and lives only in `src/data/*.js`. Do not rewrite, "fix" or invent copy,
  numbers, schemes, stats or contact details. Known issues are listed in `docs/CONTENT-FLAGS.md` for the business to decide.
- **Brand source:** `BharatFundAxis_Company_Profile.pdf` (logo, colours, tagline, and the About/Services content in
  `src/data/profile.js`, verbatim). Where the PDF and live site differ, the live site wins for existing pages; flag it in
  CONTENT-FLAGS section G. The PDF's full logo lockup misspells the name ("BhartFundAxis"): never use it. Use the symbol
  (`/img/logo-symbol.*`, `/img/logo-mark.webp`) unmodified, beside the live-text wordmark in `Logo.jsx`.
  `python scripts/brand-assets.py <pdf>` regenerates the symbol, favicons and app icons.
- Pages are presentation only; add content to the data files, not JSX.
- SEO metadata per route lives in `src/seo.js` (titles, descriptions, canonical, JSON-LD). New routes must be added there
  and in `App.jsx`; the prerender script and sitemap pick them up from `PAGES`.
- Keep route components lazy (`App.jsx`) so each page's content ships only with that page.
- Fonts are self-hosted via @fontsource (Newsreader, Hanken Grotesk, Noto Sans Devanagari 400). Don't add Google Fonts
  links or extra Devanagari weights: each Devanagari file is ~50–100 KB and delayed first paint in Lighthouse.
  `scripts/prerender.js` preloads the three hero faces.
- Off-screen sections use `content-visibility: auto` (index.css); keep the first section of each page out of it.
- Motion (see the "Motion system" block in `index.css`):
  - Brand preloader is inline in `index.html` (first visit per session, 0.9–3.5 s, CSS failsafe at 5 s). It uses the
    unmodified profile symbol `/img/logo-symbol.webp` on cream, with gold rings and the tagline. It lifts when the
    DOM and fonts are ready (not window load) so it never holds the LCP; hero headline/intro use `.enter-solid`
    (slide only, never transparent) for the same reason.
  - Page transitions live in `Layout.jsx` (`AnimatePresence`, scroll resets after exit).
  - Hero entrances use `.enter` + `--d` delays; scroll reveals use `.reveal` (+ `reveal-left`, `reveal-clip`), played
    once by `src/lib/reveal.js`; stats use `<CountUp value>` (renders the exact source string server-side).
  - Keyframes use `backwards` fill so hover transforms still work; don't add Tailwind `transition-*` to `.card`, it
    overrides the lift transition. Keep motion transform/opacity only and respect reduced motion.
- Mobile-first: style for phones first, then add `sm:`/`lg:`. Verified at 320–430, 768, 1024, 1440 with no overflow.
  - Fluid headings via `.display-*` (clamp). Section rhythm in `.section`. Button groups use `.cta-row` (stacked on phones).
  - Long card lists use `.rail` (swipe row with peek on phones, normal grid from 640px). A rail inside a grid column
    needs `min-w-0` (or `grid-cols-1`) on that column or it widens the page.
  - Tap targets ≥ 44px (`min-h-11`). Inputs stay 16px (no iOS zoom). Backdrop blur, float, drift and parallax are
    desktop-only.
  - Don't float elements inside `Dialog`; floats squeeze the content beside them on narrow screens.
- Design language ("the ledger", see the top of `index.css`): cream paper, hairline rules, square edges (2–6px),
  hard gold offset shadows on hover, IBM Plex Mono for labels/figures, Newsreader display with an italic `<Accent>`
  second line (Devanagari gets colour only: it has no italic). `SectionHead` numbers its rule § 01, § 02 … in JS
  (not CSS counters: `content-visibility` sections contain style and would restart them). `PageHero` takes
  `tone="light" | "dark"`; alternate them so inner pages don't all open the same way. Don't reintroduce pills,
  rounded cards, glass or gradients: the redesign must not resemble bharatfundaxis.com.
- Design tokens are in `src/index.css` (`@theme`), sampled from the profile PDF. Names are historical: `ink` = forest green,
  `royal` = emerald, `paper` = cream; `navy` and `royal-soft` (sage) support. `gold` is the profile gold lifted to AA on
  forest; use `gold-deep` for gold text on light. Gold is reserved for the axis motif, key figures and primary CTAs.
- Accessibility floor: keyboard focus visible, ARIA tabs via `useTabs`, native `<details>`/`<dialog>`, reduced motion respected.
- Secrets only via env vars (`.env.example`); never commit keys.
- Forms: every form uses `EnquiryForm` → `POST /api/contact`. The API validates, rejects honeypot/too-fast/cross-site
  posts, rate-limits, emails support@bharatfundaxis.com (SMTP via Nodemailer, else Resend) with a `BFA-YYMMDD-XXXXXX`
  reference ID, then optionally alerts WhatsApp Cloud API and stores to KV. The visitor sees success (with the
  reference ID and a WhatsApp hand-off link) only after the email is accepted. `npm test` covers this with a mocked provider.
