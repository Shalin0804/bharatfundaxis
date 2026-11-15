# BharatFundAxis — website

New build of [bharatfundaxis.com](https://bharatfundaxis.com): same content, pages, URLs and forms; new design.
Public site only (no dashboards or logins).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # prerendered static site in dist/
npm run preview    # serve dist/ (forms need `vercel dev`)
npm test           # API validation tests
```

## Deploy (Vercel)

1. Import the repo in Vercel (framework preset: Vite; build command `npm run build`; output `dist`).
2. Set env vars from `.env.example`: `CONTACT_FROM_EMAIL` plus either SMTP (`SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER`, `SMTP_PASS`, sent with Nodemailer) or `RESEND_API_KEY`. Enquiries go to `CONTACT_TO_EMAIL`
   (default support@bharatfundaxis.com). Optional: WhatsApp Cloud API alerts (`WHATSAPP_*`) and Vercel KV
   storage + global rate limit (`KV_REST_API_*`). Until email is configured the API returns 503 and the forms
   show an error; they never fake success. Send one test enquiry from each form after deploying.
3. `vercel.json` enables clean URLs so `/contact` serves `contact.html` (same URLs as the live site).

Another host works if it serves `<route>.html` for `/<route>` and runs `api/contact.js` as a Node function.

## Structure

```
api/contact.js          form endpoint (validation, spam checks, rate limit, email with reference ID, WhatsApp/KV optional)
src/data/*.js           all site copy, verbatim from the live site
src/seo.js              per-route titles, descriptions, canonical, OG, JSON-LD
src/pages/*.jsx         one lazy-loaded component per route
src/components/         header, footer, form, dialog, tabs, carousel…
scripts/prerender.js    renders each route to static HTML + sitemap.xml
docs/                   content inventory and items flagged for verification
```

## Before launch

Read `docs/CONTENT-FLAGS.md` — the live site contains contradictory scheme amounts, some outdated policy
statements and unsubstantiated stats. They were preserved verbatim, as instructed, and need a business decision.
