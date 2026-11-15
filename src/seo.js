import { SITE_URL, CONTACT, LEGAL_NAME } from './data/site.js'

// Titles/descriptions/keywords preserved from the live site. Fixed two live-site defects:
// every page's canonical pointed at the homepage, and titles repeated "| BharatFundAxis" twice.
const DEFAULT_KEYWORDS =
  'BharatFundAxis,Government Grants India,Startup India Schemes,MSME Subsidy Facilitation,PMEGP Loan Advisory,SIDBI Venture Capital,Techno Economic Viability TEV Report,DPIIT Recognition,CGTMSE Credit Line,Corporate Financial Consulting Ahmedabad,Sovereign Capital Advisory'

export const PAGES = {
  '/': {
    title: "BharatFundAxis – India's Premier Sovereign Funding & Capital Advisory Navigator",
    description:
      "BharatFundAxis is India's leading corporate consulting platform facilitating sovereign grants, MSME schemes, CGTMSE credit lines, DPIIT 80-IAC tax exemptions, and TEV feasibility modeling for high-growth enterprises.",
    ogDescription:
      'Unlock sovereign capital, government subsidies, CGTMSE credit lines, and bankable TEV feasibility reports for Indian enterprises.',
    priority: '1.0', changefreq: 'daily',
  },
  '/about': {
    title: 'About Us – Who We Are, Our Values & Who We Serve | BharatFundAxis',
    description:
      'A trusted growth partner for startups, MSMEs and established businesses, bringing funding, grants, certificates, marketing and business solutions under one roof.',
    crumb: 'About Us', priority: '0.8', changefreq: 'monthly',
  },
  '/services': {
    title: 'Our Services – Funding, Grants, Certificates, Marketing & Business Solutions | BharatFundAxis',
    description:
      'We support businesses across their complete journey: from getting started and getting approved, to getting funded and getting noticed. Our work is organised into five connected service verticals, so you never need to run from one agency to another.',
    crumb: 'Services', priority: '0.9', changefreq: 'monthly',
  },
  '/market-suchna': {
    title: "Market Suchna – India's Sovereign Business Intelligence | BharatFundAxis",
    description:
      "Explore India's premier editorial portal for sovereign grants, MSME policy updates, non-dilutive credit schemes, and real-time market intelligence.",
    crumb: 'Market Suchna', priority: '0.9', changefreq: 'daily',
  },
  '/schemes-grants': {
    title: 'Schemes & Government Grants Database | BharatFundAxis',
    description:
      "Search and access India's most comprehensive catalog of government grants, MSME subvention funds, PMEGP subsidies, and SIDBI venture capital.",
    keywords: 'Government Schemes India,MSME Grants 2026,PMEGP Subsidy Application,Startup India Seed Fund,SIDBI Credit Guarantee,CGTMSE Collateral Free Loan',
    crumb: 'Schemes & Grants', priority: '0.9', changefreq: 'daily',
  },
  '/beyond-funding': {
    title: 'Beyond Funding – Long-Term Growth Advisory | BharatFundAxis',
    description:
      'BharatFundAxis is not merely a platform for discovering schemes or grants—it is your long-term enterprise growth partner for strategy, compliance, and capital clearance.',
    keywords: 'TEV Report Consultants India,Techno Economic Viability Study,DPR Financial Modeling,DPIIT Section 80-IAC Tax Exemption,Bankable Feasibility Report,BharatFundAxis Advisory',
    crumb: 'Beyond Funding', priority: '0.8', changefreq: 'weekly',
  },
  '/contact': {
    title: 'Contact Nodal Advisory Desk | BharatFundAxis',
    description:
      'Connect with BharatFundAxis senior capital advisors in Jaipur, Rajasthan for enterprise grant evaluation, TEV report inquiries, and credit mapping.',
    keywords: 'Contact BharatFundAxis,Funding Advisory Desk Ahmedabad,Consulting Inquiries Grants India,TEV Report Advisory Contact',
    crumb: 'Contact Us', priority: '0.8', changefreq: 'monthly',
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Vulnerability Disclosure Program | BharatFundAxis',
    description:
      'Official sovereign data privacy directives, DPDP Act 2023 compliance terms, API resource protection policy, and Vulnerability Disclosure Program (VDP).',
    crumb: 'Privacy Policy', priority: '0.5', changefreq: 'monthly',
  },
  '/terms-of-service': {
    title: 'Terms of Service & Statutory Disclaimers | BharatFundAxis',
    description:
      'Official terms of service, institutional non-lending disclaimers, acceptable platform use policies, and exclusive jurisdiction under the courts of Jaipur, Rajasthan, India.',
    crumb: 'Terms of Service', priority: '0.5', changefreq: 'monthly',
  },
}

export const NOT_FOUND = {
  title: 'Page not found | BharatFundAxis',
  description: 'This page does not exist on BharatFundAxis.',
}

const ORG = {
  '@type': 'FinancialService',
  '@id': `${SITE_URL}/#organization`,
  name: LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo-symbol.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "India's premier corporate financial consulting platform facilitating sovereign government grants, MSME subvention lines, CGTMSE credit access, and TEV feasibility reports.",
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '118, Vijaynagar, Gopal Pura Mode',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 10:30-19:00',
  areaServed: 'India',
}

/** JSON-LD for a route; `faqs` (array of {q,a}) adds an FAQPage node. */
export function jsonLd(path, faqs = []) {
  const meta = PAGES[path]
  const url = SITE_URL + (path === '/' ? '' : path)
  const graph = [
    ORG,
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'BharatFundAxis', inLanguage: ['hi-IN', 'en-IN'], publisher: { '@id': `${SITE_URL}/#organization` } },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: meta.title, description: meta.description, isPartOf: { '@id': `${SITE_URL}/#website` } },
  ]
  if (path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: meta.crumb, item: url },
      ],
    })
  }
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function headTags(path) {
  const meta = PAGES[path] || NOT_FOUND
  const url = SITE_URL + (path === '/' ? '' : path)
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
  ]
  if (!PAGES[path]) return tags.concat('<meta name="robots" content="noindex">').join('\n    ')
  return tags
    .concat([
      `<meta name="keywords" content="${esc(meta.keywords || DEFAULT_KEYWORDS)}">`,
      `<link rel="canonical" href="${url}">`,
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="BharatFundAxis">`,
      `<meta property="og:locale" content="en_IN">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:title" content="${esc(meta.title)}">`,
      `<meta property="og:description" content="${esc(meta.ogDescription || meta.description)}">`,
      `<meta property="og:image" content="${SITE_URL}/og-image.jpg">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="BharatFundAxis – Enterprise Sovereign Capital &amp; Grant Advisory">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${esc(meta.title)}">`,
      `<meta name="twitter:description" content="${esc(meta.ogDescription || meta.description)}">`,
      `<meta name="twitter:image" content="${SITE_URL}/og-image.jpg">`,
    ])
    .join('\n    ')
}
