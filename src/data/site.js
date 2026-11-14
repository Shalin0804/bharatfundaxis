// Site-wide content, copied verbatim from https://bharatfundaxis.com (audited 2026-11-10).
// Items marked in docs/CONTENT-FLAGS.md need business verification before launch.

export const SITE_URL = 'https://bharatfundaxis.com'
export const BRAND = 'BharatFundAxis'
export const LEGAL_NAME = 'BharatfundAxis Capital Management'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/market-suchna', label: 'Market Suchna' },
  { to: '/schemes-grants', label: 'Schemes & Grants' },
  { to: '/beyond-funding', label: 'Beyond Funding' },
  { to: '/contact', label: 'Contact Us' },
]

export const APPLY_HREF = '/contact#connection-panels'

// Forms open WhatsApp after submitting. Uses the site's published phone number;
// change here if the business WhatsApp line differs (country code, no + or spaces).
export const WHATSAPP_NUMBER = '919928965676'

export const CONTACT = {
  email: 'support@bharatfundaxis.com',
  phone: '+91-9928965676',
  phoneHref: 'tel:+919928965676',
  address: '118, Vijaynagar, Gopal Pura Mode, Jaipur, Rajasthan, India',
  addressLabel: 'Corporate Headquarters',
  hours: 'सोम – शनि: 10:30 AM – 7:00 PM IST',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28471.294082764933!2d75.78349754999999!3d26.874544450000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4491196456b%3A0xca903912a9a8d596!2sGopal%20Pura%20Mode%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1785992537482!5m2!1sen!2sin',
}

export const TICKER = [
  { tag: 'LIVE', text: 'Vishwakarma Yojna upto 2 Cr' },
  { tag: 'UPDATE', text: 'CGTMSE upto 2 Cr Collateral Free Business Loan' },
  { tag: 'DEADLINE', text: 'PMEGP Scheme: 35% Capital Subsidy के लिए शीघ्र Apply करें' },
  { tag: 'FUNDING', text: 'Grants and Subsides upto 2 Cr for Women Entrepreneurs' },
  { tag: 'TAX RELIEF', text: 'MUDRA Loans upto 10 Cr for General category' },
  { tag: 'NEW', text: 'Startup Funding upto 50 Cr for SEZ units' },
]

export const FOOTER_TAGLINE =
  'Empowering Indian enterprises through institutional capital consulting and strategic sovereign scheme mapping.'

export const DISCLAIMER =
  "BharatfundAxis Capital Management is an institutional consulting firm. We provide information and application facilitation services for government schemes. We are not a government agency and do not guarantee funding. All disbursements are subject to the respective scheme's terms and government approval. Logos and trademarks of government agencies and partners belong to their respective owners."

export const COPYRIGHT = '© 2026 BharatfundAxis Capital Management. All rights reserved.'

export const PARTNERS = [
  { name: 'SIDBI', sub: 'Development Bank', image: '/img/logos/sidbi.webp' },
  { name: 'DPIIT', sub: 'Govt. of India', image: '/img/logos/dpiit.webp' },
  { name: 'Startup India', sub: 'Flagship Initiative', image: '/img/logos/startup_india.webp' },
  { name: 'Make in India', sub: 'Ministry of Commerce', image: '/img/logos/make_in_india.webp' },
  { name: 'NASSCOM', sub: 'Tech Ecosystem', image: '/img/logos/nasscom.webp' },
  { name: 'NABARD', sub: 'Rural Dev. Bank', image: '/img/logos/nabard.webp' },
]

// Shared validation messages used by the English enquiry forms on the live site.
export const FORM_MESSAGES_EN = {
  nameInvalid: 'Enter a valid name (letters only, min 2 characters)',
  nameRequired: 'Name is required',
  emailInvalid: 'Enter a valid email address',
  emailRequired: 'Email address is required',
  phoneInvalid: 'Enter a valid 10-digit mobile number',
  phoneRequired: 'Phone number is required',
  success: 'We have received your request, shortly we will be in touch with you.',
  redirecting: 'Request received. Opening WhatsApp…',
  error: 'Oops there was an error submitting the mail, Please Submit again.',
  submitting: 'Submitting Request...',
  submit: 'Submit Advisory Request',
}

export const FORM_MESSAGES_HI = {
  nameInvalid: 'कृपया सही नाम दर्ज करें (केवल अक्षर, न्यूनतम 2 वर्ण)',
  nameRequired: 'पूरा नाम आवश्यक है',
  emailInvalid: 'कृपया सही Email address दर्ज करें',
  emailRequired: 'Email address आवश्यक है',
  phoneInvalid: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें',
  phoneRequired: 'Mobile / Phone number आवश्यक है',
  success: 'आपकी Application सफलतापूर्वक जमा हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।',
  redirecting: 'आपकी Application प्राप्त हो गई है। WhatsApp खोला जा रहा है…',
  error: 'सबमिट करते समय कोई त्रुटि हुई, कृपया पुनः प्रयास करें।',
  submitting: 'Application जमा की जा रही है...',
  submit: 'अपनी Application जमा करें',
}

// Scheme directory categories (also used by the header dropdown).
export const CATEGORIES = [
  'All',
  'Manufacturing & Artisan',
  'Startup Innovation',
  'Technology & Deeptech',
  'SC/ST & Women Entrepreneurs',
  'Agriculture & Rural',
  'Export & Trade',
  'Healthcare & Biotech',
]
