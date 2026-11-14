// Legal pages, verbatim from /privacy-policy and /terms-of-service.
// Block types: p, lead (bold lead + text), h3, list, code, quote, note.

export const PRIVACY = {
  eyebrow: 'SOVEREIGN GOVERNANCE & SECURITY DIRECTIVES',
  title: 'Privacy Policy & Security Directives',
  copy: 'Comprehensive enterprise data protection frameworks, API resource usage terms, statutory compliance policies, and our official Vulnerability Disclosure Program.',
  meta: 'Effective Date: August 02, 2026 • Legal Jurisdiction: Jaipur, Rajasthan, India. All corporate dispatches, TEV reports, and contact submissions processed by BharatFundAxis are governed under strict encryption, non-disclosure, and resource protection standards.',
  sections: [
    {
      title: '1. Scope & Sovereign Data Commitment',
      blocks: [
        { p: 'BharatFundAxis Capital Management ("BharatFundAxis", "We", "Our") respects the privacy and confidentiality of enterprises, founders, and institutional partners using our consulting platform. This Policy applies to all services, web portals, advisory desks, and digital endpoints operated under the BharatFundAxis platform.' },
        { p: 'We commit to maintaining sovereign data privacy standards in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology Act, 2000 of India.' },
      ],
    },
    {
      title: '2. Information We Collect',
      blocks: [
        { p: 'To evaluate scheme eligibility, prepare bankable Techno-Economic Viability (TEV) reports, and map non-dilutive credit lines, we collect the following categories of information:' },
        { lead: 'Identity & Contact Details:', text: 'Full name, official corporate email, contact telephone numbers, business address, and promoter credentials.' },
        { lead: 'Enterprise & Financial Metrics:', text: 'Business registration status (DPIIT, Udyam, MCA), turnover figures, capital requirement targets, and sector classifications.' },
        { lead: 'Technical & Log Data:', text: 'Originating IP address, browser metadata, time-stamps, and request headers collected automatically for security logging and rate-limiting purposes.' },
        { note: true, lead: 'Zero Commercial Data Selling Policy:', text: 'We do not sell, license, rent, or trade applicant contact information, financial metrics, or enterprise data to third-party marketing brokers or advertising networks under any circumstances.' },
      ],
    },
    {
      kicker: 'OFFICIAL INFRASTRUCTURE SECURITY DIRECTIVE',
      title: '3. Resource Protection & The "Don\'t Be That Guy" Policy',
      blocks: [
        { code: '> root@bharatfundaxis:~# tail -f /var/log/waf/blocked_kiddies.log' },
        { quote: '"Oops! Did you just try to run DirBuster with 500 threads on a mostly static site? Adorable. We love the enthusiasm, but let’s set some boundaries before our automated sentinels null-route your entire ASN."' },
        { p: 'We are building an institutional-grade platform. Right now, it might look light, but our enterprise Web Application Firewalls (WAF) and real-time behavioral anomaly detectors are fully awake and highly caffeinated. We have a zero-tolerance policy for lazy, noisy infrastructural abuse. You want to test us? Be elegant about it.' },
        { h3: 'Automated Scraping & Ghost Hunting' },
        { p: 'Scraping a static site? Congratulations on downloading our HTML. But seriously, deploying aggressive crawlers, botnets, or automated scripts to hunt for hidden endpoints or harvest data will just get your IP permanently walled off.' },
        { h3: 'Credential Stuffing & Blind Brute-Forcing' },
        { p: 'Trying to brute-force /admin panels that don\'t even exist yet? Bold strategy. Any attempts to execute credential stuffing or manipulate session tokens will trigger our tarpits. We will slow your requests down to a crawl before dropping them completely.' },
        { h3: 'DDoS Isn\'t Hacking, It\'s Just Being Loud' },
        { p: 'Any attempt to spam our contact endpoints, flood submission forms, or consume system resources via Layer 4/Layer 7 volumetric attacks is strictly prohibited. Sending a million requests a second doesn\'t make you a hacker; it makes you a nuisance to our society. Our automated systems track request velocity meticulously. Offending IP ranges won\'t just be banned—we actively bundle the logs and hand them over to CERT-In (Computer Emergency Response Team - India).' },
        { note: true, text: '* Legitimate users & researchers: Did you accidentally get yourself blocked because your Burp Intruder was set to "greed"? Disable your aggressive VPNs, check your headers, and wait out the temporary ban. If it\'s a permanent ban, well... you should have read the rules first.' },
      ],
    },
    {
      kicker: 'Security Operations Center : The Arena',
      title: '4. Responsible Vulnerability Disclosure Program (VDP)',
      blocks: [
        { p: 'Welcome to the game. Right now, BharatFundAxis is mostly a highly-optimized static fortress. Your only real playground is our contact forms and their direct APIs. Looks too easy? Don\'t get comfortable. We are scaling fast. Soon, we\'ll be shipping complex architectures, heavier endpoints, and massive institutional features. The attack surface is going to explode, and the competition between our engineers and your payloads is just getting started. Consider this the warm-up round.' },
        { h3: 'Leave Your Calling Card (Or Get Dropped)' },
        { p: 'We hate analyzing anonymous scanner traffic. If you\'re going to poke around our house, ring the doorbell. You must include this custom HTTP header in all your testing requests. If our WAF catches you throwing payloads without this header, it assumes you\'re a mindless bot and autobans your IP before you can even say "Burp Suite". Don\'t let a simple regex ruin your day.' },
        { code: 'X-BFA-Hunter: @your_social_handle_or_hacker_alias' },
        { h3: 'Target Scope' },
        { quote: '"Yeah, it\'s tight right now. But keep monitoring our DNS. We deploy new code often. More code = more bugs. Stay hungry."' },
        { code: '*.bharatfundaxis.com/* (All current and future subdomains & direct endpoints)' },
        { h3: 'The Good Stuff (In-Scope)' },
        { p: 'Show us your best moves. Since we are mostly static right now, get creative with our forms and mailing architecture:' },
        { list: ['Creative API abuses on contact/submission endpoints', 'Stored / Reflected Cross-Site Scripting (XSS) with actual impact', 'Server-Side Request Forgery (SSRF) on any future integrations', 'Future Auth/Privilege bypasses (when we launch them)', 'Significant Business Logic Flaws that make us look dumb'] },
        { h3: 'The Trash Bin (Out-of-Scope)' },
        { p: 'Please, for the love of root, don\'t send us Nessus or Nuclei automated HTML reports:' },
        { list: ['Missing HTTP headers (We know. We don\'t care without a PoC)', 'Clickjacking on pages with no sensitive actions', 'Volumetric attacks / DDoS (Crashing a site with 10M requests isn\'t hacking)', 'Social Engineering our team (We already have trust issues)', 'SSL/TLS cipher weaknesses that require a quantum computer to break'] },
        { h3: 'Submission Protocol' },
        { p: 'Email your detailed report to support@bharatfundaxis.com. Give us clear reproduction steps. If your exploit chain requires us to guess what you did, we will close it as N/A. Send a PoC that actually works on the first try.', email: true },
        { h3: 'Bounty & Hall of Fame (Make Us Sweat)' },
        { p: 'Let’s be clear: This is a VDP, not a guaranteed cash-grab Bug Bounty. Financial rewards are strictly discretionary. If you submit a low-hanging fruit, you get a polite "Thanks." But if you manage to completely bypass our defenses and achieve something critical down the line? We’ll talk rewards. Make our SOC team cry a little, and we\'ll make it worth your while.' },
        { h3: 'Rules of Engagement' },
        { list: ['Don\'t break the toys while you play. Test on your own data.', 'Give us at least 30 days to patch before you go dropping 0-days on Twitter/X to boost your clout.', 'If you accidentally stumble into sensitive infrastructure, stop immediately and report it. Don\'t go exploring.'] },
        { h3: 'Safe Harbor (The Truce)' },
        { p: 'It’s a simple trade. You hack us ethically according to these rules, and we give you Safe Harbor. We won\'t call the cyber police or unleash the lawyers on you. You go rogue? The truce is off. Happy hunting.' },
      ],
    },
    {
      title: '5. Data Retention & Storage Locations',
      blocks: [
        { p: 'All corporate records, grant evaluation archives, and advisory communications are stored on secure servers located within the Republic of India. Data is retained strictly for the duration necessary to fulfill advisory mandates or to satisfy statutory record-keeping obligations under Indian law.' },
      ],
    },
    {
      title: '6. Your Rights & Legal Jurisdiction',
      blocks: [
        { p: 'Under applicable Indian statutory provisions, applicants maintain rights to access, rectify, or request deletion of their submitted advisory records, subject to ongoing statutory audit mandates.' },
        { lead: 'Legal Jurisdiction:', text: 'This Privacy Policy and all associated data governance disputes are governed exclusively by the laws of India, with exclusive jurisdiction vested in the competent courts of Jaipur, Rajasthan, India.' },
      ],
    },
  ],
}

export const TERMS = {
  eyebrow: 'STATUTORY AGREEMENT & GOVERNANCE DIRECTIVES',
  title: 'Terms of Service & Operational Scope',
  copy: 'Comprehensive legal terms, non-lending disclaimers, acceptable platform use policies, and exclusive jurisdiction under the courts of Jaipur, Rajasthan, India.',
  sections: [
    {
      title: '1. Acceptance of Terms & Advisory Scope',
      blocks: [
        { p: 'Welcome to BharatFundAxis Capital Management ("BharatFundAxis", "Firm", "We", "Our"). These Terms of Service ("Terms") govern your access to and use of our digital platform, capital allocation tools, scheme evaluation desks, and advisory dispatches.' },
        { p: 'By accessing this website, submitting inquiry forms, or interacting with our APIs, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and our Privacy Policy. If you do not agree, you must immediately cease platform use.' },
      ],
    },
    {
      title: '2. Institutional Consulting Scope & Non-Lending Disclaimer',
      blocks: [
        { p: 'BharatFundAxis is an independent corporate consulting firm and digital advisory platform. BharatFundAxis is not a direct banking institution, non-banking financial company (NBFC), government ministry, or statutory grant sanctioning authority.' },
        { lead: 'No Guaranteed Sanctions:', text: 'All grant disbursements, interest subventions, CGTMSE credit lines, and tax holiday approvals remain at the sole and absolute discretion of respective nodal government boards, PSU banks, and Ministry evaluation committees.' },
        { lead: 'Facilitation Services Only:', text: 'Our services consist of eligibility cross-matching, TEV feasibility modeling, and application documentation structuring. We do not issue direct loans or grant funds.' },
        { lead: 'Dynamic Policy Outlays:', text: 'Scheme guidelines, outlays, and eligibility thresholds are aggregated from public government gazettes and are subject to sovereign policy updates without prior notice.' },
      ],
    },
    {
      title: '3. Acceptable Use Policy & Anti-Spam Rules',
      blocks: [
        { p: 'Users agree to use our platform strictly for legitimate business consulting purposes. You explicitly agree NOT to:' },
        { list: ['Spam our contact forms, submit automated payload floods, or execute unauthorized API script polling that degrades resource availability for active users.', 'Submit false, fraudulent, deceptive, or misleading enterprise credentials or financial metrics.', 'Attempt to bypass security rate limiters, reverse engineer API structures, or probe infrastructure endpoints.'] },
        { p: 'Violation of these acceptable use rules will result in immediate IP banning, submission cancellation, and potential legal action under Indian cybersecurity laws.' },
      ],
    },
    {
      title: '4. User Representations & Warranty of Accuracy',
      blocks: [
        { p: 'By submitting corporate data or financial information on our forms, you warrant that you are a authorized representative of the enterprise and that all details provided are true, accurate, and current. BharatFundAxis assumes no responsibility for application rejections resulting from inaccurate or forged applicant disclosures.' },
      ],
    },
    {
      title: '5. Intellectual Property Rights',
      blocks: [
        { p: 'All proprietary algorithms, component layouts, trademarked logos ("BharatFundAxis"), editorial dispatches, and custom software code are the exclusive intellectual property of BharatFundAxis. Unauthorised copying, scraping, or redistribution of platform assets is strictly prohibited. Logos of government ministries (DPIIT, MeitY, SIDBI, NABARD) belong to their respective statutory owners.' },
      ],
    },
    {
      title: '6. Limitation of Liability & Hold Harmless',
      blocks: [
        { p: 'To the maximum extent permitted by applicable law, BharatFundAxis and its partners shall not be liable for any direct, indirect, incidental, punitive, or consequential damages, loss of revenue, business interruption, or application rejections by government sanction desks. You agree to hold harmless BharatFundAxis from any claims resulting from third-party ministry evaluations or bank credit decisions.' },
      ],
    },
    {
      title: '7. Governing Law & Exclusive Jurisdiction',
      blocks: [
        { p: 'These Terms of Service and any contractual or non-contractual disputes arising from platform use are governed by and construed in accordance with the laws of the Republic of India.' },
        { lead: 'Exclusive Jurisdiction:', text: 'Any suit, legal action, or arbitration proceeding shall be instituted exclusively in the competent courts located in Jaipur, Rajasthan, India.' },
      ],
    },
  ],
}
