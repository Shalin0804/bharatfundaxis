# Content flagged for business verification

All items below are **preserved exactly as published** on bharatfundaxis.com (audited 2026-11-10).
Per the brief, nothing was corrected in the site copy. Each needs a decision from the business
before launch. Policy notes reflect public information as of the audit date — confirm against the
official scheme guidelines.

## A. Internal contradictions (same scheme, different numbers on different pages)

| Item | Where | Values published |
|---|---|---|
| CGTMSE credit limit | Ticker vs. everywhere else | "upto **2 Cr**" (ticker) vs "**₹5 Crores**" (home, schemes, market) |
| PM Vishwakarma | Ticker vs. schemes page | "upto **2 Cr**" (ticker) vs "**₹3 Lakhs** Credit Limit" (schemes) |
| MUDRA | Ticker vs. schemes page | "MUDRA Loans upto **10 Cr**" (ticker, tagged *TAX RELIEF*) vs "Tarun **₹10 Lakhs**" (schemes) |
| NIDHI-PRAYAS | Home sector tab vs. elsewhere | "**₹10 Cr**" (home DeepTech tab) vs "**₹10 Lakhs**" (home cards, schemes, market) |
| SAMRIDH | Three places | "**₹5 Cr**" (home tab), "**₹40 Lakhs**" (schemes), "**₹50 Lakhs**" (home FAQ, market ticker) |
| TIDE 2.0 | Home tab vs. schemes | "**₹2 Cr**" vs "**₹7 Lakhs**" |
| Business phone | JSON-LD vs. visible | Old structured data used `+91-79-4000-8800`; site shows `+91-9928965676` (new build uses the visible number) |
| Location keywords | Meta keywords | "Corporate Financial Consulting **Ahmedabad**", "Funding Advisory Desk Ahmedabad" — HQ is **Jaipur** |
| Establishment vs. scale | Contact page | "ESTABLISHED 2026" alongside "15,000+ enterprises scaled", "12,000+ supported" |

## B. Likely outdated or inaccurate policy statements

- **CGTMSE ceiling**: Union Budget 2025 raised the guarantee cover limit for micro & small enterprises from ₹5 Cr to ₹10 Cr. Site says ₹5 Cr.
- **Hero banner "CGTMSE Capital Subsidy Scheme Upto ₹1 Crore"**: CGTMSE is a credit *guarantee*, not a capital subsidy.
- **Section 80-IAC eligibility window**: schemes page says incorporated "1 अप्रैल 2016 से 31 मार्च 2026". Budget 2025 extended the incorporation deadline to 31 March 2030.
- **Angel tax (Sec 56(2)(viib))** is presented as a live exemption benefit; it was abolished for all investor classes from FY 2025-26 (Budget 2024).
- **FAME-II** (home CleanTech tab) ended March 2024; succeeded by PM E-DRIVE.
- **SEIS** (home FinTech tab) was discontinued under FTP 2023.
- **MUDRA**: Tarun Plus (₹10–20 lakh) exists since Oct 2024; "10 Cr for General category" is not a MUDRA product.
- **PMEGP "₹50 Lakhs Project Subsidy"**: ₹50 lakh is the max *project cost* (manufacturing), not the subsidy; subsidy is 15–35% of project cost.
- **Defense tab**: "Guaranteed first procurement purchase orders" and "Unrestricted testing… across DRDO" overstate iDEX terms.
- **"85% NABARD Credit Guarantee"** (Agritech tab) — verify the guarantee instrument and percentage.
- **Market Suchna news items** (e.g. "SIDBI SMILE ₹2,500 Crore Subordinated Debt Window", "Karnataka & Tamil Nadu Dual Prototyping Subsidies", "DPIIT IMB 45→14 days") link to generic homepages, not the specific stories. Verify each or label as illustrative.

## C. Unverifiable marketing claims (preserved; need substantiation)

Under consumer-protection and advertising norms these need evidence on file:
12,000+ Startups & MSMEs supported · 98% Grant Approval Rate · 98.4% approval ratio with Tier-1 incubators ·
₹100+ Crore disbursed to 3,000+ innovators · 15,000+ enterprises scaled globally · 1,200+ brands / 99% satisfaction ·
88% reach target milestones · 8,000+ deploys "sanctioned within 48 hours" · ₹50 Cr+ active grant pool ·
150+ global network nodes / partner incubators · 200+ institutional lenders · Client rating 4.9 ·
per-sector approval rates (92–98%) and "Fast-Track" sanction turnarounds (5–15 days) ·
"Zero Equity Dilution की पूर्ण गारंटी" (CTA) vs. the footer disclaimer "do not guarantee funding".

## D. Legal / brand risk

- **Partner logos** (SIDBI, DPIIT, Startup India, Make in India, NASSCOM, NABARD) appear under "…द्वारा समर्थित" (*supported by*), implying endorsement. Confirm written permission or reword to "schemes we work with".
- "DPIIT Approved" badge on the homepage — confirm what is DPIIT-approved.
- Privacy Policy section 3–4 is written in an informal "hacker" voice and contains no cookie/analytics disclosure, grievance officer, or DPDP-Act consent details. Recommend legal review.

## E. Live-site defects found and fixed in the rebuild (no content change)

- Every page's `<link rel="canonical">` pointed to the homepage → now self-referencing per page.
- Page titles repeated "| BharatFundAxis | BharatFundAxis" → single suffix.
- Contact form "Consultation Focus Area" and "Target Timeframe" were collected but never sent → now included in the payload.
- Name validation rejected Hindi (Devanagari) names on a Hindi-first site → now accepts Unicode names.
- Advisory popup re-opened every 30 seconds → now once per session, never on /contact.
- Footer social icons linked to `#` (no destinations) → omitted until real profile URLs are provided.

## F. WhatsApp number — confirm before launch

After a confirmed submission, forms offer a WhatsApp hand-off to `+91-9928965676` (the site's published phone; set in `src/data/site.js` → `WHATSAPP_NUMBER`). The mobile action bar links there too.
When tested on 2026-11-10, WhatsApp showed this number's business profile as **"Technologia"**, not BharatFundAxis.
Confirm the correct WhatsApp line, or update the profile name, before launch.

## G. Company profile PDF vs. live site (added 2026-11-15)

The official brand now comes from `BharatFundAxis_Company_Profile.pdf` (dated 2026-10-29). Its content is on the new
`/about` and `/services` pages (`src/data/profile.js`, verbatim). Points to confirm:

| Item | Profile PDF | Live site / rebuild |
|---|---|---|
| **Logo wordmark spelling** | The full logo lockup (cover page) reads "**BhartFundAxis**" (missing "a") | The rebuild uses the profile's **symbol** unchanged, beside the wordmark "BharatFundAxis" set as the profile's own page headers set it. Fix the lockup artwork before using it anywhere. |
| Logo | Three overlapping circles (people · partnership · growth) | Live site uses a gold lotus logo. Replaced site-wide by the profile symbol (header, footer, preloader, favicons, OG image). |
| Brand colours | Forest green, gold, cream, navy | Live site was navy/royal blue. Rebuild now uses the profile palette. |
| Services | Five verticals: Funding, Grants, Certificates, **Marketing**, **Business Solutions** | Live site describes government-scheme and capital advisory only; marketing (brand identity, websites, social media, ads) is not mentioned anywhere on it. |
| Positioning | "business support and growth partner"; "We never make unrealistic promises" | Live site: "India's Premier Sovereign Funding & Capital Advisory Navigator", plus the claims in section C. |
| Legal name | "BharatFundAxis" only | Live site: "BharatfundAxis Capital Management" (footer, disclaimer). |
| Numbered labels | Section numbers ("03 | OUR EXPERTISE"); Grants and Certificates share "SERVICES 02 AND 03" | Rebuild shows "SERVICE 02" and "SERVICE 03" on their own sections. |
