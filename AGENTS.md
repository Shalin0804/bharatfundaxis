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
- Pages are presentation only; add content to the data files, not JSX.
- SEO metadata per route lives in `src/seo.js` (titles, descriptions, canonical, JSON-LD). New routes must be added there
  and in `App.jsx`; the prerender script and sitemap pick them up from `PAGES`.
- Keep route components lazy (`App.jsx`) so each page's content ships only with that page.
- Fonts are self-hosted via @fontsource (Newsreader, Hanken Grotesk, Noto Sans Devanagari 400). Don't add Google Fonts
  links or extra Devanagari weights: each Devanagari file is ~50–100 KB and delayed first paint in Lighthouse.
  `scripts/prerender.js` preloads the three hero faces.
- Off-screen sections use `content-visibility: auto` (index.css); keep the first section of each page out of it.
- Design tokens are in `src/index.css` (`@theme`). Gold is reserved for the axis motif, key figures and primary CTAs.
- Accessibility floor: keyboard focus visible, ARIA tabs via `useTabs`, native `<details>`/`<dialog>`, reduced motion respected.
- Secrets only via env vars (`.env.example`); never commit keys.
