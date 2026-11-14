// Contact page content, verbatim from https://bharatfundaxis.com/contact

export const CONTACT_HERO = {
  eyebrow: 'CONTACT',
  title: ['आइए आपके Business Growth का अगला', 'Chapter शुरू करें'],
  copy: 'साधारण फॉर्म भरने के बजाय, हम आपको Sovereign Funding, Bankable TEV Audits, DPIIT Registrations और Enterprise Growth पर विशेषज्ञ परामर्श के लिए आमंत्रित करते हैं।',
  ctas: [
    { label: 'Consultation शेड्यूल करें', href: '#writing-desk' },
    { label: 'Enquiry भेजें', href: '#connection-panels' },
  ],
  studio: {
    tag: 'ESTABLISHED 2026',
    title: 'Strategy Studio',
    copy: 'Institutional Sovereign Capital & Advisory Desk',
    desks: [
      { label: 'DESK 01', value: 'CGTMSE & Grants' },
      { label: 'DESK 02', value: 'Section 80-IAC' },
    ],
  },
}

export const PATHS = {
  eyebrow: 'CHOOSE YOUR CONVERSATION PATH',
  title: ['आप किस विषय पर', 'चर्चा करना चाहते हैं?'],
  copy: 'नीचे दिए गए किसी भी टॉपिक पर क्लिक करें, उसका संपर्क फ़ॉर्म नीचे लोड हो जाएगा।',
  items: [
    {
      id: 'funding', title: 'Start a Funding Conversation', folderTag: 'CAPITAL ADVISORY', badge: 'GRANTS & DEBT',
      desc: 'Non-dilutive Central Government Grants, PLI Manufacturing Cashbacks और ₹5 Crores तक CGTMSE Collateral-Free Loans खोजिए।',
      actionText: 'Funding Form भरें ↓',
      form: { tag: 'CAPITAL ADVISORY FORM', title: 'Sovereign Funding Enquiry दर्ज करें', desc: 'Central grant & CGTMSE credit matching के लिए अपनी Capital आवश्यकता और Business Stage की जानकारी साझा कीजिए।' },
    },
    {
      id: 'consultation', title: 'Business & Strategy Consultation', folderTag: 'CORPORATE PLANNING', badge: 'TEV AUDITS',
      desc: 'Techno-Economic Viability (TEV) Report Preparation, Unit Economics Hardening और Financial Forecast Audits पर चर्चा करें।',
      actionText: 'Consultation Form भरें ↓',
      form: { tag: 'STRATEGY CONSULTATION FORM', title: 'Corporate Strategy Session शेड्यूल करें', desc: 'गहराई से परामर्श के लिए अपने TEV feasibility लक्ष्य या financial modeling आवश्यकताएँ साझा करें।' },
    },
    {
      id: 'partnership', title: 'Partnership & Collaboration', folderTag: 'INSTITUTIONAL ECOSYSTEM', badge: 'ECOSYSTEM AXIS',
      desc: 'Empanelled DST/MeitY Incubators, PSU Bank Credit Desks और Corporate Innovation Desks से जुड़िए।',
      actionText: 'Partnership Form भरें ↓',
      form: { tag: 'ECOSYSTEM PARTNERSHIP FORM', title: 'Institutional Collaboration शुरू करें', desc: 'Empanelled incubators, PSU bank credit desks और innovation hubs के लिए ecosystem axis साझेदारी।' },
    },
    {
      id: 'general', title: 'General Enquiry', folderTag: 'GOVERNANCE DISPATCH', badge: 'GENERAL INQUIRY',
      desc: 'DPIIT Recognition, Udyam MSME Registration, Section 80-IAC Tax Exemption या Gazette Updates पर सामान्य जानकारी।',
      actionText: 'General Form भरें ↓',
      form: { tag: 'GENERAL GOVERNANCE DISPATCH FORM', title: 'अपनी General Advisory Enquiry सबमिट करें', desc: 'DPIIT recognition, Section 80-IAC tax holidays या state policy gazettes पर कुछ भी पूछें।' },
    },
  ],
}

export const CONTACT_FORM = {
  labels: {
    name: 'पूरा नाम (Full Name) *',
    business: 'Business / Enterprise का नाम',
    fundingReq: 'Funding Requirement Goal',
    stage: 'Current Enterprise Stage',
    focus: 'Consultation Focus Area',
    timeframe: 'Target Timeframe',
    email: 'Official Email Address *',
    phone: 'Mobile / Phone Number *',
    message: 'Enterprise संदेश / विशेष प्रश्न (Optional)',
  },
  placeholders: {
    name: 'अपना पूरा नाम दर्ज करें',
    business: 'Enterprise या Company का नाम',
    email: 'अपना आधिकारिक ईमेल दर्ज करें',
    phone: '10-अंकों का मोबाइल नंबर',
    message: 'अपने growth goals या scheme inquiries के बारे में विस्तार से लिखें...',
  },
  fundingOptions: [
    { value: 'Up to ₹10 Lakhs', label: '₹10 Lakhs तक (Prototype Grant)' },
    { value: '₹10 Lakhs - ₹50 Lakhs', label: '₹10 Lakhs - ₹50 Lakhs (Seed Fund)' },
    { value: '₹50 Lakhs - ₹2 Crores', label: '₹50 Lakhs - ₹2 Crores (CGTMSE Debt)' },
    { value: '₹2 Crores - ₹5 Crores', label: '₹2 Crores - ₹5 Crores (PLI / Credit Line)' },
    { value: '₹5 Crores+', label: '₹5 Crores+ (Scale Expansion)' },
  ],
  stageOptions: ['Idea / Prototyping Stage', 'Early Revenue Startup', 'Scaling MSME Enterprise', 'Established Industrial Unit'],
  focusOptions: ['TEV Feasibility Modeling', 'Section 80-IAC Tax Holiday Filing', 'Financial Projection Audit', 'DPIIT & IMB Board Verification'],
  timeframeOptions: [
    { value: 'Immediate (Within 7 Days)', label: 'तत्काल (7 दिनों के भीतर)' },
    { value: 'Current Financial Quarter', label: 'वर्तमान तिमाही में' },
    { value: 'Next Fiscal Tranche', label: 'अगली तिमाही में' },
  ],
  consentPrefix: 'सबमिट करके, आप हमारी',
  consentSuffix: 'से सहमत होते हैं।',
}

export const PROCESS = {
  eyebrow: 'THE ADVISORY PROCESS',
  title: ['What Happens Next', 'After You Connect?'],
  steps: [
    { phase: 'PHASE 01 • INGESTION', title: 'हम आपकी Enquiry का Review करते हैं', short: '24 घंटों के भीतर Sovereign Scheme Cross-Matching।', details: 'हमारे वरिष्ठ Capital Partners आपके Business Turnover, Incorporation Age और Tech Domain की समीक्षा Central & State Scheme Eligibility Guidelines के खिलाफ करते हैं।' },
    { phase: 'PHASE 02 • AUDIT', title: 'हम आपके Business को गहराई से समझते हैं', short: 'गहराई से Feasibility और Unit Economics Auditing।', details: 'हम आपके TEV Feasibility Metrics, CIBIL Commercial Ratings और Working Capital Cycles का Audit करते हैं ताकि Non-Dilutive Credit Opportunities की पहचान की जा सके।' },
    { phase: 'PHASE 03 • DIALOGUE', title: 'हम आपसे सीधा संवाद करते हैं', short: '1-on-1 Private Strategy Consultation Session।', details: 'एक dedicated Capital Partner आपकी CGTMSE Debt Lines और DPIIT Tax Holiday Strategy को तैयार करने के लिए एक गोपनीय Advisory Session आयोजित करता है।' },
    { phase: 'PHASE 04 • EXECUTION', title: 'हम एक साथ Opportunities खोजते हैं', short: 'End-to-End Filing, Incubation और Sovereign Clearance।', details: 'हम PSU Bank Sanction Desks, DST/MeitY Incubators और Inter-Ministerial Board Tax Exemption Desks पर Direct Nodal Filings की सुविधा प्रदान करते हैं।' },
  ],
  badges: ['RESPONSE GUARANTEE: WITHIN 24 HOURS', 'CONFIDENTIALITY ASSURED'],
}

export const PRESENCE = {
  eyebrow: 'PHYSICAL PRESENCE',
  title: 'Difference Between Us.',
  hqLabel: 'CORPORATE HEADQUARTERS',
  copy: 'हमारा Jaipur Strategy Centre हाई-ग्रोथ फाउंडर्स, PSU Bank Sanction Heads और Government Grant Panelists की गोपनीय परामर्श बैठकों का मुख्य केंद्र है।',
  hoursLabel: 'OFFICE HOURS',
  emailLabel: 'DIRECT EMAIL',
  phoneLabel: 'PHONE',
  mapTitle: 'BharatFundAxis Office Location',
}

export const CONTACT_FAQ = {
  eyebrow: 'FREQUENTLY ASKED QUESTIONS',
  title: ['Enquiry Guidelines', 'महत्वपूर्ण जानकारी'],
  items: [
    { q: 'Enquiry सबमिट करने के बाद मुझे प्रतिक्रिया कितने समय में मिलेगी?', a: 'प्रत्येक Enquiry का 24 घंटों के भीतर एक Senior Capital Partner द्वारा review किया जाता है। यदि आपके Enterprise Metrics सक्रिय Sovereign Schemes से मेल खाते हैं, तो हम 48 घंटों के भीतर 1-on-1 Consultation शेड्यूल करते हैं।' },
    { q: 'क्या मैं DPIIT या MCA Registration करने से पहले परामर्श ले सकता हूँ?', a: 'बिल्कुल! Incorporation से पहले परामर्श लेने से हमें आपकी Corporate Structure (जैसे Private Limited बनाम LLP) को सही दिशा देने में मदद मिलती है ताकि Section 80-IAC Tax Holidays का 100% लाभ मिल सके।' },
    { q: 'क्या pre-revenue founders परामर्श ले सकते हैं, या कंपनी का रजिस्टर्ड होना अनिवार्य है?', a: 'Pre-revenue founders और early prototypers का पूरा स्वागत है। हम Early-stage concepts को NIDHI-PRAYAS (₹10 Lakhs तक) और BIRAC BIG (₹50 Lakhs तक) जैसी Prototyping Grants से जोड़ते हैं।' },
    { q: 'क्या भारत के किसी भी राज्य के Businesses Bharat Fund Axis से संपर्क कर सकते हैं?', a: 'हाँ! Bharat Fund Axis देश के सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों के उधमियों को सेवाएँ प्रदान करता है। हम Central Schemes के साथ-साथ State Industrial Policies का भी ध्यान रखते हैं।' },
    { q: 'क्या शुरुआती Strategy Consultation सभी उधमियों के लिए उपलब्ध है?', a: 'हाँ! हमारी प्रारंभिक Scheme Mapping और Eligibility Evaluation पूरी तरह नि:शुल्क है।' },
  ],
}

export const BEGINNING = {
  eyebrow: 'THE BEGINNING',
  title: ['हर बड़ा Business एक सही', 'संवाद से शुरू होता है'],
  copy: 'चाहे आप अपनी पहली Funding Scheme तलाश रहे हों या अपने बिजनेस के अगले Growth Stage की योजना बना रहे हों, हम आपकी बात सुनने के लिए तैयार हैं।',
  cta: { label: 'अपनी बातचीत शुरू करें', href: '#writing-desk' },
}

export const POPUP = {
  title: 'Contact Us',
  copy: 'Leave your details below and an advisory representative will reach out to you.',
  placeholders: { name: 'Your Name *', email: 'Your Email Address *', phone: 'Mobile Number *', message: 'Message (Optional)' },
  topic: 'Popup Advisory Request',
  defaultMessage: 'Advisory request from popup modal',
  submit: 'Submit',
  submitting: 'Submitting...',
}
