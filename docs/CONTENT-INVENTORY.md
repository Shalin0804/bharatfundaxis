# Reference-site inventory — bharatfundaxis.com

Audited 2026-11-10. Source: server-rendered HTML of each page plus the site's client bundles
(tab panels, FAQ answers, modals and popups are client-rendered; their text was recovered from the bundles).
Full verbatim copy lives in `src/data/*.js` — that is the canonical content record.

## Page inventory (from sitemap.xml + internal links)

| URL | Title (live) | Rebuilt | Data file |
|---|---|---|---|
| `/` | BharatFundAxis – India's Premier Sovereign Funding & Capital Advisory Navigator | yes | `home.js` |
| `/market-suchna` | Market Suchna – India's Sovereign Business Intelligence | yes | `market.js` |
| `/schemes-grants` | Schemes & Government Grants Database | yes | `schemes.js` |
| `/beyond-funding` | Beyond Funding – Long-Term Growth Advisory | yes | `beyond.js` |
| `/contact` | Contact Nodal Advisory Desk | yes | `contact.js` |
| `/about` | (new — from the company profile PDF) | yes | `profile.js` |
| `/services` | (new — from the company profile PDF; anchors `#funding` `#grants` `#certificates` `#marketing` `#business-solutions` `#how-we-work` `#getting-started`) | yes | `profile.js` |
| `/privacy-policy` | Privacy Policy & Vulnerability Disclosure Program | yes | `legal.js` |
| `/terms-of-service` | Terms of Service & Statutory Disclaimers | yes | `legal.js` |

No other public pages exist on the live site (About and Services come from the company profile PDF): there are no individual scheme, industry, blog-article or FAQ pages.
Scheme / industry / report "detail pages" on the live site are modals — rebuilt as accessible dialogs.
Every "article" card links to `/market-suchna`; news items link to external publishers.
`/api/*` is disallowed in robots.txt (form endpoint only).

## Navigation map

Header: Home · Market Suchna · Schemes & Grants · Beyond Funding · Contact Us · **Apply Now** → `/contact#connection-panels`
(Rebuild adds a Schemes & Grants dropdown that deep-links the 7 existing scheme categories: `/schemes-grants?category=…`.)
Footer: Quick links (same 5) · Corporate HQ address · email · phone · Privacy Policy · Terms of Service · regulatory disclaimer.
Global: scrolling "UPDATES" ticker (6 items) · advisory popup form.

## Section inventory

**Home** — ticker · hero (H1, copy, 2 CTAs, 2 stats, 3-slide scheme banner carousel) · partner logo strip (6) ·
5-phase framework + metrics bento · Pan-India corridors (Gujarat/Maharashtra/Rajasthan tabs) + Our Reach (4) + quote ·
Guided Ecosystem (6 services) · sector capital architecture (6 sector tabs × 3 perks × 4 schemes) ·
Sovereign Schemes (6 cards) · Execution Roadmap (4 steps) · Executive Dispatches (1+3) · Knowledge base FAQ (6, filterable) + advisory desk ·
Knowledge Hub (3) · final CTA.

**Market Suchna** — hero + 6 stats · featured cover story + 3 stories (external) · Live Dispatch ticker (Google News RSS, fallback 6) ·
Live news (Economic Times RSS, fallback 4) · Government notifications (4) · Industry opportunities (4, each with detail modal) ·
Compliance FAQ (4) · Special reports (2, detail modals) · Playbooks (3) + executive summary · Resource centre (4) · advisory form.

**Schemes & Grants** — hero + search · category filter (8) · Popular schemes (4) · directory (21 schemes in 7 categories, each with
detail modal: ministry, nodal agency, pool, coverage, collateral, subvention, timeline, overview, eligibility, documents, benefits) ·
Scheme FAQ (4) · advisory form.

**Beyond Funding** — hero + 3 cards · 5 pillars (expandable) · 9-stage journey (tabs) · integrated ecosystem (10 services) ·
4 critical decisions with takeaways · Architecture vs Chaos · Unasked questions (5) · Manifesto (5 principles) · advisory form.

**Contact** — hero + Strategy Studio card · 4 conversation paths (`#connection-panels`) · adaptive enquiry form (`#writing-desk`;
funding path adds requirement + stage, consultation path adds focus + timeframe) · 4-phase process · HQ, hours, email, phone,
Google Map · Enquiry FAQ (5) · closing CTA.

**Privacy / Terms** — 6 and 7 numbered sections respectively, verbatim.

## Images (all from the live site, re-encoded to WebP at web size)

Brand: the live site's lotus logo was replaced by the official three-circle symbol from the company profile PDF. Banners: Rajasthan grant, CGTMSE, business loan. Partner logos: SIDBI, DPIIT, Startup India,
Make in India, NASSCOM, NABARD. Editorial images (11, de-duplicated — the live site served identical files from 3 folders).
Popup image, advisory portrait. Total image weight dropped from 27 MB to 1.4 MB.

## Functionality inventory

| Live feature | Rebuild |
|---|---|
| 5 enquiry forms POSTing JSON to `/api/contact` | Same payload → Vercel function → email to support@bharatfundaxis.com via SMTP/Nodemailer or Resend, with reference ID (`api/contact.js`) |
| Client validation (name/email/10-digit Indian mobile) | Same rules, Unicode names, server re-validates, honeypot, rate limit |
| Scheme search + category filter | Same; category is now shareable in the URL |
| Tabs, accordions, carousels, modals | Rebuilt accessibly (ARIA tabs, native `<details>`, native `<dialog>`) |
| Live RSS (ET + Google News via rss2json) with fallback | Same sources and fallback lists |
| Popup every 30 s | Once per session after 5 s |
| `mailto:` / `tel:` links, Google Map embed | Same |
| WhatsApp | Not on live site. Added at client request: every form, once the email is confirmed, shows the reference ID and a link to wa.me/<WHATSAPP_NUMBER> (src/data/site.js) with the enquiry and reference pre-typed; optional WhatsApp Cloud API alert to the business |
| Social links | `href="#"` placeholders on live site — omitted |
