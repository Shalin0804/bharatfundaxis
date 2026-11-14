// Market Suchna content, verbatim from https://bharatfundaxis.com/market-suchna

export const MARKET_HERO = {
  eyebrow: 'SOVEREIGN MARKET INTELLIGENCE',
  title: ['आज का Market केवल बदल नहीं रहा, बल्कि नए', 'Business अवसर बना रहा है'],
  copy: 'हर सरकारी Policy और Scheme बदलाव के पीछे छिपे Opportunities को समझिए। Central Grants, Regulatory Updates और Non-Dilutive Credit Lines की सटीक जानकारी।',
  ctas: [
    { label: 'Market Intelligence Explore करें', href: '#featured-stories' },
    { label: 'Live Updates देखें', href: '#live-news' },
  ],
  stats: [
    { label: 'Government Updates', count: '450+', trend: '+12 Today' },
    { label: 'Funding Opportunities', count: '₹50,000 Cr', trend: 'Active Pool' },
    { label: 'Policy Changes', count: '12 New', trend: 'Tax Exemption' },
    { label: 'MSME Alerts', count: '85 Live', trend: 'CGTMSE Cover' },
    { label: 'Industry Notices', count: '120+', trend: 'PLI 2.0 Mandate' },
    { label: 'Business Schemes', count: '50 Active', trend: 'DPIIT Verified' },
  ],
}

export const FEATURED = {
  eyebrow: 'COVER STORY & EDITORIAL DISPATCHES',
  title: ['Featured Market', 'मुख्य रिपोर्ट्स'],
  cover: {
    url: 'https://economictimes.indiatimes.com/news/economy',
    image: '/img/articles/hero_story.webp',
    alt: 'Mumbai Financial Skyline Cover',
    meta: 'CAPITAL MARKETS DISPATCH • RECENT ANALYSIS',
    title: 'Sovereign Credit Architecture: जानिए भारतीय MSMEs बिना Equity Dilute किए Capital कैसे हासिल कर रहे हैं',
    copy: 'RBI Guidelines, CGTMSE Credit Guarantees और Manufacturing Hubs के लिए 0% Equity Dilution पर आधारित एक गहराई से तैयार विशेष Report।',
    cta: 'पूरी Cover Story पढ़ें',
  },
  stories: [
    { category: 'POLICY FRAMEWORK', date: 'Recent Update', url: 'https://www.startupindia.gov.in', title: 'DeepTech Startups के लिए DPIIT ने IMB Approval Process को आसान बनाया', excerpt: 'Streamlined documentation portal की मदद से Verification timeline अब 45 दिनों से घटकर सिर्फ 14 दिन रह गई है।' },
    { category: 'CREDIT ARCHITECTURE', date: 'Latest Dispatch', url: 'https://www.sidbi.in', title: 'SIDBI SMILE Scheme ने जारी किया ₹2,500 Crore Subordinated Debt Window', excerpt: 'Green manufacturing technology upgrade करने वाले MSMEs के लिए विशेष Capital Relief की शुरुआत।' },
    { category: 'STATE INCENTIVES', date: 'Active Scheme', url: 'https://economictimes.indiatimes.com', title: 'Karnataka और Tamil Nadu ने लॉन्च की Dual Prototyping Subsidies', excerpt: 'Hardware और AI prototype labs स्थापित करने के लिए ₹25 Lakhs तक की Direct Capital Grant।' },
  ],
}

// Live feeds: the reference site pulls these RSS feeds through rss2json and falls back to the static lists below.
export const NEWS_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://economictimes.indiatimes.com/news/economy/rssfeeds/13733806.cms'
export const DISPATCH_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=' +
  encodeURIComponent('https://news.google.com/rss/search?q=India+startup+funding+OR+grant+OR+MSME+OR+DPIIT&hl=en-IN&gl=IN&ceid=IN:en')

export const LIVE_NEWS = {
  eyebrow: 'PUBLIC FINANCIAL INTELLIGENCE FEED',
  title: ['Live Market', 'ताज़ा समाचार & Updates'],
  badge: 'Real-Time में अपडेटेड',
  items: [
    { title: 'RBI Enhances Priority Sector Credit Limits for MSME Green Tech Scaling', source: 'Economic Times', url: 'https://economictimes.indiatimes.com/news/economy/policy', category: 'BANKING', image: '/img/articles/rbi_institution_building.webp', snippet: 'Central bank expands collateral-free credit eligibility for Tier-2 manufacturing hubs.' },
    { title: 'DPIIT Extends Section 80-IAC 100% Tax Exemption Application Window', source: 'LiveMint', url: 'https://www.livemint.com/news/india', category: 'TAX & COMPLIANCE', image: '/img/articles/seed_fund_compliance.webp', snippet: 'Automated digital verification to accelerate tax holiday clearance for certified startups.' },
    { title: 'PLI 2.0 Electronics Scheme Grants First Tranche Outlays to Hardware Founders', source: 'Financial Express', url: 'https://www.financialexpress.com/economy/', category: 'MANUFACTURING', image: '/img/articles/tech_manufacturing.webp', snippet: 'Ministry of Electronics approves fiscal outlay for domestic semiconductor packaging.' },
    { title: 'NABARD Unveils ₹1,200 Cr Agri-Tech Infrastructure Innovation Fund', source: 'Business Standard', url: 'https://www.business-standard.com/economy', category: 'AGRICULTURE', image: '/img/articles/agritech.webp', snippet: 'Capital support for solar-powered hydroponic greenhouses and rural cold chains.' },
  ],
}

export const DISPATCH = {
  label: 'LIVE DISPATCH',
  liveLabel: 'LIVE FUNDING',
  items: [
    { title: 'SAMRIDH ACCELERATOR — ₹50 Lakhs Scale-Up Grant Matching Scheme', source: 'MeitY Desk', status: 'ACTIVE' },
    { title: 'NIDHI-PRAYAS — ₹10 Lakhs Prototype Development Seed Support', source: 'DST India', status: 'OPEN' },
    { title: 'iDEX DEFENCE INNOVATION — ₹1.5 Crores Mil-Spec R&D Contract', source: 'Ministry of Defence', status: 'FAST TRACK' },
    { title: 'BIRAC BIG BIOTECH — ₹50 Lakhs Biotechnology Ignition Grant', source: 'DBT Nodal Desk', status: 'ACTIVE' },
    { title: 'PMEGP MANUFACTURING — 35% Capital Subvention Support', source: 'KVIC / MSME Desk', status: 'OPEN' },
    { title: 'CGTMSE CREDIT GUARANTEE — ₹5 Crores Collateral-Free Credit Line', source: 'SIDBI PSU Desk', status: 'DISBURSING' },
  ],
}

export const NOTIFICATIONS = {
  eyebrow: 'REGULATORY GAZETTE MANDATES',
  title: ['Government Notifications &', 'सरकारी नीतियाँ'],
  items: [
    { tag: 'HIGH PRIORITY CIRCULAR', authority: 'DPIIT / MINISTRY OF COMMERCE', title: 'Inter-Ministerial Board Fast-Track Verification Portal', desc: 'Section 80-IAC Tax Holiday के लिए डिजिटल फाइलिंग आसान की गई, जिससे Approval Latency अब केवल 14 दिन रह गई है।' },
    { tag: 'GAZETTE MANDATE', authority: 'MINISTRY OF FINANCE', title: 'CGTMSE Coverage Expansion for Incubated Startups', desc: 'Collateral-Free Credit Limit बढ़ाकर ₹5 Crores की गई, जिसमें 85% Sovereign Risk Guarantee शामिल है।' },
    { tag: 'BANKING REGULATION', authority: 'RESERVE BANK OF INDIA', title: 'Priority Sector Lending (PSL) Re-classification Framework', desc: 'Renewable energy hardware manufacturing plants को Primary PSL Bucket में जोड़ा गया, जिससे Interest Subvention मिलेगी।' },
    { tag: 'POLICY DISBURSEMENT', authority: 'MINISTRY OF HEAVY INDUSTRIES', title: 'PLI Auto & EV Component Grant Disbursement Phase', desc: 'Certified automotive technology manufacturers के लिए Direct Fiscal Outlays जारी किए गए।' },
  ],
}

export const INDUSTRIES = {
  eyebrow: 'SECTOR-SPECIFIC CAPITAL ALLOCATIONS',
  title: ['Industry', 'अवसर & Schemes'],
  cta: 'Capital Guidelines देखें',
  labels: {
    dispatch: 'SOVEREIGN CAPITAL DISPATCH',
    pool: 'Allocated Pool: ',
    authority: 'Nodal Authority',
    limit: 'Sanction Limit',
    eligibility: 'Mandatory Eligibility Benchmarks',
    documents: 'Required Documentation Stack',
  },
  items: [
    {
      title: 'Technology & AI Subsidies', capital: '₹12,500 Cr', category: 'DEEPTECH & CLOUD', image: '/img/articles/venture_debt_saas.webp',
      description: 'GenAI compute, hardware prototyping और semiconductor R&D के लिए Central Grants।',
      nodalAuthority: 'MeitY & Ministry of Science & Technology', maxGrantCap: '₹10 Crores प्रति Enterprise (100% Non-Dilutive)', fastTrackTime: '7 से 12 Business Days',
      eligibility: ['Section 80-IAC के तहत वैध Startup Certificate के साथ DPIIT Recognition।', 'Artificial Intelligence, Semiconductors, Quantum या Robotics पर मुख्य R&D फोकस।', 'पिछले 10 वर्षों के भीतर भारत में Private Limited Company या LLP के रूप में Incorporated।', 'किसी भी वित्तीय वर्ष में Annual Turnover ₹100 Crores से अधिक न हो।'],
      documents: ['विस्तृत Technical TEV (Techno-Economic Viability) रिपोर्ट।', 'पिछले 2 वित्तीय वर्षों के Audited Financial Statements & CA Net Worth Certificate।', 'Prototyping Roadmap और IIT/IISc Lab Infrastructure Access Plan।', 'Patent और Intellectual Property (IPR) Registration Filings।'],
      steps: [
        { day: 'Day 01', step: 'Sovereign Dossier Cross-Matching & Audit' },
        { day: 'Day 03', step: 'MeitY Nodal Desk Fast-Track Application Upload' },
        { day: 'Day 07', step: 'Inter-Ministerial Board (IMB) Technical Evaluation' },
        { day: 'Day 12', step: 'Direct Bank Account Grant Sanction & Disbursement' },
      ],
    },
    {
      title: 'Advanced Manufacturing & PLI', capital: '₹24,000 Cr', category: 'INDUSTRIAL PLI 2.0', image: '/img/articles/tech_manufacturing.webp',
      description: 'Electronics और EV components के Incremental Sales पर 4% - 6% cashback incentives।',
      nodalAuthority: 'Ministry of Heavy Industries & NITI Aayog', maxGrantCap: 'Incremental Annual Turnover पर 6% तक Cashback', fastTrackTime: '10 से 14 Business Days',
      eligibility: ['भारतीय औद्योगिक गलियारों (Industrial Corridors) में स्थित Greenfield या Brownfield manufacturing unit।', '3 वर्षों में न्यूनतम ₹10 Crores का committed baseline capital investment।', 'EV Batteries, Micro-electronics, Solar PV या Defense Hardware पर मैन्युफैक्चरिंग फोकस।', 'Make in India local value addition मानकों (न्यूनतम 50%) का पालन।'],
      documents: ['Factory Establishment License & State Pollution Control Board Approval।', 'Statutory Auditors द्वारा प्रमाणित Quarterly Incremental Sales Certificates।', 'Machinery के लिए Bill of Entry & Customs Duty Exemption Documentation।', 'Environmental & Green Building Compliance Certificate।'],
      steps: [
        { day: 'Day 01', step: 'PLI Portal Registration & Land Allotment Check' },
        { day: 'Day 04', step: 'Customs Duty Clearance & Machinery Inspection' },
        { day: 'Day 09', step: 'Audit Certification of Net Incremental Turnover' },
        { day: 'Day 14', step: 'PLI Cashback Credit Disbursal to Corporate Account' },
      ],
    },
    {
      title: 'AgriTech & Climate Infra', capital: '₹18,000 Cr', category: 'NABARD & AIF INITIATIVES', image: '/img/articles/agritech.webp',
      description: 'Post-harvest logistics, solar cold chains और precision farming infrastructure के लिए Debt Funding।',
      nodalAuthority: 'NABARD & Ministry of Agriculture', maxGrantCap: '3% Interest Subvention (₹2 Cr तक)', fastTrackTime: '7 से 10 Business Days',
      eligibility: ['AgriTech Startups, FPOs, या Post-Harvest Supply Chain Operators।', 'ग्रामीण या अर्ध-शहरी कोल्ड स्टोरेज, सोलर ग्रिड या प्रोसेसिंग यूनिट्स में निवेश।', 'कम से कम 2 वर्षों का एक्टिव कमर्शियल ऑपरेशन्स इतिहास।', 'प्राइमरी एग्रीकल्चरल क्रेडिट सोसाइटीज (PACS) से मान्यता प्राप्त संस्थाएँ।'],
      documents: ['Detailed Project Report (DPR) focused on post-harvest infrastructure.', 'Land Lease Deed या Warehouse Ownership Documents.', '2 वर्षों के Bank Statements & CA Certified IT Returns.', 'FPO / Enterprise Board Resolution & Promoter KYC Documents.'],
      steps: [
        { day: 'Day 01', step: 'AIF Single-Window Portal Application Verification' },
        { day: 'Day 03', step: 'NABARD Nodal Desk Feasibility Validation' },
        { day: 'Day 06', step: 'PSU Commercial Bank Credit Sanction Protocol' },
        { day: 'Day 10', step: 'Interest Subvention Credit & Loan Disbursal' },
      ],
    },
    {
      title: 'Healthcare & Biotech Parks', capital: '₹8,500 Cr', category: 'BIRAC & ICMR GRANTS', image: '/img/articles/rbi_institution_building.webp',
      description: 'Medical device manufacturing, diagnostic labs और clinical trials के लिए R&D Outlays।',
      nodalAuthority: 'BIRAC & Department of Biotechnology (DBT)', maxGrantCap: '₹50 Lakhs से ₹5 Crores तक Direct R&D Subsidies', fastTrackTime: '12 से 18 Business Days',
      eligibility: ['BIRAC या ICMR पार्टनर्ड बायोटेक पार्क में रजिस्टर्ड मेडिकल डिवाइस या डायग्नोस्टिक्स स्टार्टअप।', 'ISO 13485 या CDSCO मैन्युफैक्चरिंग लाइसेंस प्राप्त करने की दिशा में कार्य।', 'क्लिनिकल ट्रायल चरण में न्यूनतम 1 पेटेंटेड बायोटेक इनोवेशन।', 'भारतीय नागरिकों द्वारा 51% से अधिक शेयरहोल्डिंग।'],
      documents: ['BIRAC Application Dossier & Proof of Concept Document.', 'CDSCO & ICMR Trial Clearance Documentation.', 'Lab Infrastructure Agreement & R&D Expenditure Projection.', 'Audited Financial Statements for Past 2 Financial Years.'],
      steps: [
        { day: 'Day 01', step: 'BIRAC Portal Submission & IP Audit' },
        { day: 'Day 05', step: 'ICMR Technical Panel Clinical Review' },
        { day: 'Day 12', step: 'DBT Sanction Committee Recommendation' },
        { day: 'Day 18', step: 'Tranche Disbursement into Dedicated Escrow Account' },
      ],
    },
  ],
}

export const MARKET_FAQ = {
  eyebrow: 'EDITORIAL COMPLIANCE & KNOWLEDGE DESK',
  title: ['Business', 'ज्ञान केंद्र & Compliance'],
  items: [
    { q: 'DPIIT Registered Startups के लिए Section 80-IAC Tax Exemption Claim करने की प्रक्रिया क्या है?', a: 'Startups को Audited Financial Statements, Form 1 DPIIT Certificate, Pitch Deck और Video Demo के साथ Startup India Portal पर Apply करना होता है। BharatFundAxis आपकी Inter-Ministerial Board Filing को सही तरीके से तैयार करता है ताकि 14 दिनों के भीतर Clearances मिल सकें।' },
    { q: 'MSMEs बिना जमीन गिरवी रखे ₹5 Crores तक CGTMSE Credit Facility कैसे प्राप्त कर सकते हैं?', a: 'संशोधित CGTMSE नियमों के तहत Micro & Small Enterprises को 85% Sovereign Risk Guarantee मिलती है। हम आपकी बैंक-स्तरीय TEV Feasibility Report तैयार करके उसे Partner PSU Banks के Sanction Desks तक पहुँचाते हैं।' },
    { q: 'क्या Government Grants पर Corporate Income Tax लगता है?', a: 'NIDHI-PRAYAS या SAMRIDH जैसी Central Schemes के तहत मिलने वाली Grants को Capital Subsidies माना जाता है। यदि इन्हें आपके Audited Accounts में Capital Reserves के रूप में दिखाया जाए, तो ये पूर्णतः Non-Taxable होती हैं।' },
    { q: 'PLI 2.0 (Production Linked Incentive) Subsidies के लिए कौन से Manufacturing Sectors पात्र हैं?', a: 'Semiconductor Fabrication, Electric Vehicles, Advanced Chemistry Cells, Telecommunications Hardware, Medical Devices और Renewable Solar Modules जैसे Sectors इसमें शामिल हैं, जिन्हें Net Incremental Sales पर 4% से 6% तक Incentives मिलते हैं।' },
  ],
}

export const REPORTS = {
  eyebrow: 'DEEP ADVISORY PAPERS',
  title: ['Market', 'विशेष रिपोर्ट्स'],
  cta: 'Read Full Briefing',
  labels: {
    dispatch: 'OFFICIAL ADVISORY DISPATCH',
    author: 'Authored by: ',
    summary: 'Executive Summary',
    takeaways: 'Strategic Takeaways',
    filing: 'Mandated Filing Stack',
    desks: 'Associated Nodal Desks',
    disclaimerTitle: 'LEGAL DISCLAIMER & LIMITATION OF LIABILITY',
    disclaimer: 'This research paper is produced by BharatFundAxis strictly for institutional information and strategic guidance purposes. BharatFundAxis is an independent consulting firm and is not a financial institution, government ministry, or statutory regulatory authority. Publications herein do not constitute binding financial, tax, or legal advice. All capital frameworks, tax holiday parameters, and debt limits are subject to verified government gazettes and ministry evaluations. BharatFundAxis assumes no legal liability for any business decisions, financial losses, or regulatory actions resulting from reliance on this content.',
  },
  items: [
    {
      title: 'Sovereign Credit Architecture: Venture Debt और Equity Grants का सही संतुलन', author: 'BharatFundAxis Research Desk', category: 'SPECIAL ADVISORY REPORT', readTime: '12 Min Read', image: '/img/articles/scaling_100cr.webp',
      summary: 'Series A से Series B स्तर पर बिना अपनी Equity खोए Scale करने वाले Founders के लिए एक रणनीतिक Framework।',
      executiveSummary: 'यह एडवाइजरी पेपर Dual Non-Dilutive Capital Stack की व्यवस्था को समझाता है। CGTMSE Collateral-Free Debt Lines (₹5 Cr तक) और DPIIT Section 80-IAC Tax Exemption को मिलाकर, High-Growth SaaS और DeepTech Enterprises अपनी Promoter Equity को 100% सुरक्षित रखते हुए 18 से 24 महीनों की अतिरिक्त Runway प्राप्त कर सकते हैं।',
      takeaways: ['Optimal Capital Blend: 40% Non-Dilutive Grant, 35% Venture Debt, 25% Founder Equity।', 'PSU Bank Co-lending Desks के लिए Debt Service Coverage Ratio (DSCR) आवश्यकता 1.25x है।', 'Section 80-IAC 3-वर्षीय Tax Holiday नेट प्रॉफिट मार्जिन को प्रभावी रूप से 25.17% बढ़ाता है।'],
      filing: ['Form 1 के तहत जारी DPIIT Recognition Certificate।', 'Inter-Ministerial Board (IMB) Tax Exemption Sanction Order।', 'Empaneled CA द्वारा तैयार Bank TEV (Techno-Economic Viability) Audit Report।'],
      sanctionDesks: 'SIDBI Venture Desk, State Bank of India Commercial Branch, और GIFT City IFSC Nodal Desk।',
    },
    {
      title: 'Tier-2 & Tier-3 City Manufacturing Hubs: Tax Holiday का अधिकतम लाभ उठाएँ', author: 'Regulatory Compliance Desk', category: 'COMPLIANCE BRIEF', readTime: '9 Min Read', image: '/img/articles/msme_tier2_cities.webp',
      summary: 'गुजरात, महाराष्ट्र और तमिलनाडु के Industrial Parks किस प्रकार 100% Tax Subventions प्रदान कर रहे हैं।',
      executiveSummary: 'Tier-2/3 Manufacturing Hubs में राज्य स्तरीय औद्योगिक नीतियाँ 100% तक Capital Equipment Refunds, 7 वर्षों के लिए State GST Reimbursements और Subsidized Power Tariffs प्रदान करती हैं। यह रिपोर्ट बताती है कि Hardware और EV Component Manufacturers Central PLI 2.0 और State Schemes दोनों का एक साथ लाभ कैसे उठा सकते हैं।',
      takeaways: ['State SGST Refund: 7 वर्षों के लिए पात्र Intra-State Sales पर 100% Refund।', 'Capital Subsidy: Plant & Machinery ख़रीद पर 35% तक Direct Cash Refund।', 'Land Allotment: UP, Gujarat और Tamil Nadu Defense/EV Corridors में Priority Allotment।'],
      filing: ['State Pollution Control Board Consent to Establish (CTE) & Consent to Operate (CTO)।', 'Factory License और State Industrial Development Corporation (SIDC) Land Lease।', 'Statutory Auditors द्वारा प्रमाणित Quarterly Value Addition & Employment Audit Records।'],
      sanctionDesks: 'District Industries Centre (DIC), State Industrial Investment Board, और Ministry of Heavy Industries।',
    },
  ],
}

export const PLAYBOOKS = {
  eyebrow: 'EXPERT GUIDANCE & PLAYBOOKS',
  title: ['Enterprise Success', 'Strategies & Playbooks'],
  copy: 'वरिष्ठ Capital Advisors और Former Panelists द्वारा तैयार की गई रणनीतियाँ जो आपके Business की Funding Success बढ़ाती हैं।',
  items: [
    { title: 'Dual Bank Sanction Protocol', desc: 'दो अलग-अलग PSU Banks में एक साथ Application दर्ज करने से Sanction Time 60% तक घट जाता है।' },
    { title: 'DPIIT Self-Certification Stack', desc: 'पहले से तैयार Verified Templates जो प्रथम Review में ही Inter-Ministerial Board Clearance पास करते हैं।' },
    { title: 'Subordinated Debt Structure', desc: '0% Equity Dilution के साथ Funding जुटाने के लिए CGTMSE Collateral Guarantees और SIDBI Credit का मेल।' },
  ],
  summary: {
    eyebrow: 'EXECUTIVE SUMMARY',
    title: 'Tier-1 Incubators के साथ 98.4% Grant Approval Ratio',
    copy: '3,000 से अधिक भारतीय उधमियों ने बिना अपनी Equity गँवाए Sovereign Capital सुरक्षित करने के लिए हमारे Advisory Frameworks का उपयोग किया है।',
    badges: ['100% Non-Dilutive', 'Audit Verified'],
  },
}

export const RESOURCES = {
  eyebrow: 'ENTERPRISE KNOWLEDGE MODULES',
  title: ['Business', 'संसाधन केंद्र'],
  items: [
    { title: 'Funding Schemes Portal', desc: 'Early & Growth Stage Ventures के लिए Central & State Grant Opportunities खोजिए।', image: '/img/articles/equity_vs_grants.webp', href: '/schemes-grants' },
    { title: 'Startup India Registration', desc: 'DPIIT Certificate Verification और Inter-Ministerial Board Clearance की Fast-track प्रक्रिया।', image: '/img/articles/seed_fund_compliance.webp', href: '/contact#connection-panels' },
    { title: 'MSME Credit Guarantee Desk', desc: '85% Risk Cover के साथ ₹5 Crores तक CGTMSE Collateral-Free Loans प्राप्त कीजिए।', image: '/img/articles/rbi_institution_building.webp', href: '/contact#connection-panels' },
    { title: 'Incubation & Accelerator Hubs', desc: 'Prototype Funding & Lab Access के लिए 150+ Partner Incubators से जुड़िए।', image: '/img/articles/equity_vs_debt.webp', href: '/beyond-funding' },
  ],
}

export const MARKET_ADVISORY = {
  title: 'Request Sovereign Capital Clearance',
  copy: 'Connect directly with a senior BharatFundAxis capital consultant to evaluate your eligibility for non-dilutive grants, CGTMSE credit cover, and Section 80-IAC tax exemptions.',
  points: ['100% Confidential Eligibility Audit', 'Zero Equity Dilution Mandate', 'Direct Bank & Ministry Filing Stack'],
  formTitle: 'Get in Touch with an Advisor',
  formCopy: 'Fill out your details below and an advisory representative will reach out to you.',
  placeholders: { name: 'Your Full Name *', email: 'Official Email Address *', phone: 'Mobile / WhatsApp Number *', message: 'Brief Message / Funding Requirements (Optional)' },
  topic: 'Market Suchna Capital Clearance',
  defaultMessage: 'Market Suchna advisory request',
}
