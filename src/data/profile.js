// Company profile content, copied verbatim from BharatFundAxis_Company_Profile.pdf (dated 2026-10-29).
// The live website has no About/Services pages; this is the only source for them. Differences between the
// profile and the live site are listed in docs/CONTENT-FLAGS.md.

import { VERTICALS } from './site.js'

export { TAGLINE } from './site.js'

export const PROFILE_INTRO =
  'A trusted growth partner for startups, MSMEs and established businesses, bringing funding, grants, certificates, marketing and business solutions under one roof.'

export const WELCOME = {
  eyebrow: 'INTRODUCTION',
  title: 'Welcome to BharatFundAxis',
  quote:
    'Every business has a big idea. What it often needs is the right funding, the right approvals, the right visibility and the right guidance at the right time. BharatFundAxis brings all of this together under one roof, so that business owners can focus on what they do best: building and growing.',
  copy: 'This company profile gives you a clear picture of who we are, what we do, the services we offer and the simple, transparent way in which we work with every client.',
}

export const WHO_WE_ARE = {
  eyebrow: '01  |  WHAT WE ARE',
  title: 'Who We Are',
  copy: 'BharatFundAxis is a business support and growth partner for entrepreneurs, startups and established enterprises. We help businesses access funding, find and apply for grants, obtain the certificates and registrations they need, build their marketing presence and solve day-to-day business challenges with practical solutions. Our promise is captured in our tagline: Your Business. Our Priority.',
  vision: {
    title: 'Our Vision',
    copy: 'To become a trusted one-stop growth partner for Indian businesses, where every entrepreneur, small or large, can easily find the financial, regulatory and marketing support needed to succeed.',
  },
  mission: {
    title: 'Our Mission',
    copy: 'To simplify the journey of business growth by providing honest guidance, complete documentation support and result-focused solutions, delivered with transparency, speed and care.',
  },
}

export const LOGO_MEANING = {
  title: 'What Our Logo Stands For',
  copy: 'Three overlapping circles form the heart of our identity. They show that partnership, growth and people are not separate ideas: they meet and strengthen each other, exactly as our services do.',
  items: [
    { letter: 'P', title: 'Partnership', copy: 'The handshake reflects trust, long-term relationships and working together with our clients as a true partner.' },
    { letter: 'G', title: 'Growth', copy: 'The rising chart shows our focus on measurable progress: better funding, stronger visibility and a healthier business.' },
    { letter: 'P', title: 'People', copy: 'The figure at the top shows the entrepreneur, the person at the center of everything we do.' },
  ],
}

export const VALUES = {
  eyebrow: '02  |  WHAT GUIDES US',
  title: 'Our Values',
  copy: 'Our values are not just words on a page. They shape how we speak to clients, how we prepare every file and how we measure our own success.',
  items: [
    { title: 'Integrity', copy: 'We give honest advice, even when it is not what you expect to hear. We never make unrealistic promises about approvals or outcomes.' },
    { title: 'Transparency', copy: 'Clear communication on process, timelines, documents and fees, so that you always know where your application stands.' },
    { title: 'Partnership', copy: 'We work as an extension of your team and treat your business goals as our own.' },
    { title: 'Growth Focus', copy: 'Every service we offer is chosen for one reason: to help your business move forward in a measurable way.' },
    { title: 'Accountability', copy: 'We take ownership of our work, follow up diligently and keep you informed at every stage.' },
    { title: 'Simplicity and Speed', copy: 'We turn complex procedures into simple steps and respond quickly, because time matters in business.' },
  ],
}

export const GLANCE = {
  title: 'BHARATFUNDAXIS AT A GLANCE',
  items: [
    { value: '5', label: 'Service Verticals' },
    { value: '1', label: 'Single Point of Contact' },
    { value: 'End-to-End', label: 'Documentation Support' },
    { value: '100%', label: 'Client Focus' },
  ],
}

const VERTICAL_COPY = {
  funding: 'Guidance and documentation support to help businesses raise the capital they need for working capital, expansion, machinery or new projects.',
  grants: 'Identifying suitable grant, subsidy and scheme opportunities and supporting the application process from eligibility check to submission.',
  certificates: 'Assistance with business registrations, licences and certifications that give your company legal standing and credibility.',
  marketing: 'Brand building and digital marketing that make your business visible, trusted and easy to find for the right customers.',
  'business-solutions': 'Practical advisory and support for planning, compliance, documentation and day-to-day operations of your business.',
}

export const WHAT_WE_DO = {
  eyebrow: '03  |  OUR EXPERTISE',
  title: 'What We Do',
  copy: 'We support businesses across their complete journey: from getting started and getting approved, to getting funded and getting noticed. Our work is organised into five connected service verticals, so you never need to run from one agency to another.',
  verticals: VERTICALS.map((v) => ({ ...v, copy: VERTICAL_COPY[v.id] })),
}

// Detail for each vertical (profile pages 6-8), keyed by the ids above.
export const SERVICE_DETAILS = {
  funding: {
    eyebrow: '04  |  SERVICE 01',
    copy: 'Access to the right capital at the right time can change the future of a business. Our funding support helps you understand your options, prepare a strong and complete application and present your business in the best possible light to lenders and financial institutions.',
    lists: [
      {
        title: 'What We Help With',
        items: [
          'Business loans and working capital support',
          'Term loans for machinery, equipment and expansion',
          'MSME and government-linked loan schemes',
          'Project reports and financial projections',
          'Loan file preparation and documentation',
          'Coordination and follow-up with lenders',
        ],
      },
      {
        title: 'Who Can Benefit',
        items: [
          'Startups and new entrepreneurs',
          'Micro, small and medium enterprises',
          'Traders, manufacturers and service providers',
          'Businesses planning expansion or upgrades',
          'Professionals starting independent practice',
        ],
      },
    ],
    approach: {
      title: 'Our Funding Support Approach',
      steps: [
        { title: 'Understand', copy: 'Your business, needs and repayment ability' },
        { title: 'Match', copy: 'The most suitable funding option for you' },
        { title: 'Prepare', copy: 'Complete, accurate documentation and reports' },
        { title: 'Support', copy: 'Submission, follow-up and guidance till closure' },
      ],
    },
    note: {
      label: 'Please note:',
      text: "Loan sanction, terms and timelines depend on the policies of the lender or institution and on the applicant's profile. BharatFundAxis provides guidance and documentation support and does not guarantee approvals.",
    },
  },
  grants: {
    eyebrow: '04  |  SERVICE 02',
    copy: 'Many businesses miss out on government and institutional support simply because they are unaware of it or find the process confusing. We help you discover schemes, grants and subsidies you may be eligible for and guide you through the entire application process.',
    lists: [
      {
        items: [
          'Eligibility check and scheme identification',
          'Grant and subsidy application support',
          'Preparation of business plans and project proposals',
          'Documentation checking and compilation',
          'Guidance on submission and compliance requirements',
          'Follow-up support after submission',
        ],
      },
    ],
  },
  certificates: {
    eyebrow: '04  |  SERVICE 03',
    copy: 'The right certificates and registrations build credibility, open doors to tenders and funding and keep your business compliant. We simplify the paperwork and help you obtain the documents your business needs.',
    lists: [
      {
        items: [
          'Business and enterprise registrations',
          'Tax and statutory registrations',
          'Industry licences and certifications',
          'Quality and standards certifications',
          'Startup and MSME recognition support',
          'Renewals, amendments and updates',
        ],
      },
    ],
    note: {
      text: 'Examples of certificates we assist with include business registrations, GST, FSSAI, ISO, startup and MSME recognition and other licences, depending on your business type and requirement.',
    },
  },
  marketing: {
    eyebrow: '04  |  SERVICE 04',
    copy: 'A good business deserves to be seen. Our marketing support helps you build a strong brand identity and reach the right customers through practical, budget-conscious strategies that fit the size and stage of your business.',
    lists: [
      {
        items: [
          'Brand identity, logo and visual design',
          'Website and landing page support',
          'Social media setup and management',
          'Digital advertising and lead generation',
          'Company profiles, brochures and presentations',
          'Online presence and reputation building',
        ],
      },
    ],
  },
  'business-solutions': {
    eyebrow: '04  |  SERVICE 05',
    copy: 'Beyond funding and registrations, businesses need dependable day-to-day support. Our business solutions help you plan better, stay compliant and run smoothly, so that you can concentrate on growth.',
    lists: [
      {
        items: [
          'Business planning and advisory',
          'Documentation and compliance support',
          'Financial and project report preparation',
          'Process and operations guidance',
          'Support for new business setup',
          'Customised solutions for specific needs',
        ],
      },
    ],
    note: {
      text: 'Not sure what you need? Share your business goal with us and we will suggest the right combination of services for your situation.',
    },
  },
}

export const HOW_WE_WORK = {
  eyebrow: '05  |  KAISE HUM KAAM KARTE HAIN',
  title: 'How We Work',
  copy: 'Our process is simple, structured and transparent. From the very first call to final delivery, you always know what is happening and what comes next.',
  steps: [
    { title: 'Consultation', copy: 'We listen to your business, your goals and your challenges in a free, open conversation to understand exactly what you need.' },
    { title: 'Assessment', copy: 'We review your profile, documents and eligibility, then identify the most suitable funding, grant, certificate or service option.' },
    { title: 'Planning', copy: 'We propose a clear action plan with the required documents, expected timelines and the way forward, with no hidden surprises.' },
    { title: 'Documentation', copy: 'Our team prepares, checks and organises every document and report so that your file is complete and accurate.' },
    { title: 'Execution', copy: 'We handle applications, submissions and coordination with the concerned institutions and follow up regularly.' },
    { title: 'Support and Growth', copy: 'We keep supporting you after delivery with updates, renewals and new opportunities as your business grows.' },
  ],
}

export const WHO_WE_SERVE = {
  eyebrow: '06  |  OUR CLIENTS',
  title: 'Who We Serve',
  copy: 'Whatever the size or stage of your business, we have a solution designed to help it grow.',
  items: [
    { title: 'Startups', copy: 'New ideas that need funding, registration and visibility to take off.' },
    { title: 'MSMEs', copy: 'Small and medium businesses looking to scale operations and finances.' },
    { title: 'Traders', copy: 'Wholesalers and retailers who need working capital and compliance support.' },
    { title: 'Manufacturers', copy: 'Units seeking machinery finance, certifications and subsidies.' },
    { title: 'Service Providers', copy: 'Agencies, consultants and firms building trust and clients.' },
    { title: 'Professionals', copy: 'Individuals starting or growing an independent practice or venture.' },
  ],
}

export const WHY_US = {
  title: 'Why Choose BharatFundAxis?',
  items: [
    { title: 'One roof, many solutions', copy: 'Funding, grants, certificates, marketing and business support in one place.' },
    { title: 'Clear and honest guidance', copy: 'Realistic advice, transparent process and no false promises.' },
    { title: 'Complete documentation support', copy: 'Accurate, well-organised files that save your time and effort.' },
    { title: 'Personal attention', copy: "A dedicated approach where every client's business truly is our priority." },
    { title: 'Growth-oriented thinking', copy: 'Solutions that look beyond the paperwork to your long-term success.' },
  ],
}

export const GETTING_STARTED = {
  eyebrow: '07  |  LET US BEGIN',
  title: 'Getting Started',
  copy: 'Starting with BharatFundAxis is easy. Here is what is usually needed and answers to the questions we hear most often.',
  documents: {
    title: 'Documents Usually Required',
    items: [
      'Identity and address proof of owner/partners/directors',
      'PAN and Aadhaar details',
      'Business registration documents (if available)',
      'Bank statements (recent months)',
      'Income tax returns and financial statements (if available)',
      'Brief about your business and requirement',
      'Any existing licences or certificates',
    ],
    note: 'Exact requirements vary by service.',
  },
  faqTitle: 'Common Questions',
  faqs: [
    { q: 'Is the first consultation chargeable?', a: 'Please contact us to know about the consultation process for your requirement.' },
    { q: 'How long does the process take?', a: 'Timelines depend on the service, your documents and the concerned institution. We share an estimate upfront.' },
    { q: 'Do you guarantee approval?', a: 'No honest advisor can. We maximise your chances with accurate preparation and proper guidance.' },
    { q: 'Can I use more than one service?', a: 'Yes. Many clients combine funding, certificates and marketing for faster growth.' },
  ],
  cta: {
    eyebrow: 'READY TO GROW YOUR BUSINESS?',
    title: "Let's talk about your goals.",
    copy: 'Visit our website to know more about our services and connect with our team. We will be happy to understand your requirement and guide you with the right solution.',
  },
}

export const THANK_YOU = {
  title: 'Thank You',
  copy: 'Thank you for taking the time to know BharatFundAxis. Whether you are starting up, scaling up or simply looking for the right guidance, we are here to support you with funding, grants, certificates, marketing and business solutions, all under one roof.',
  close: 'We look forward to becoming your trusted growth partner.',
}
