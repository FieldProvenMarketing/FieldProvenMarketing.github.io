// Edit these values for routine updates. Run `npm run build` afterward.
export const site = {
  name: 'Field Proven Marketing',
  tagline: 'Strategy. Execution. Results.',
  email: 'fieldprovenmarketing@gmail.com',
  founder: 'Logan Arnold',
  location: 'Charleston, South Carolina',
  siteUrl: process.env.SITE_URL || 'http://127.0.0.1:4173',
  reviewCta: 'Request a 15-Minute Market Review',
  auditCta: 'Request a Free Google Audit',
  offer: {
    setup: '$1,000',
    monthly: '$1,000',
    spend: '$2,500',
    term: '90 days'
  }
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Google Ads Services', href: '/google-ads-services' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact', href: '/contact' }
];

export const services = [
  ['Campaign builds and restructuring', 'A clear account structure around the moving services and markets you can serve.'],
  ['Search terms and negative keywords', 'Review the actual searches behind spend and exclude traffic that does not fit.'],
  ['Call and form conversion tracking', 'Measure the inquiries that reach your team, with a path to deeper outcome reporting.'],
  ['Location, service and schedule targeting', 'Align ads with service areas, crew capacity and the times your team can respond.'],
  ['Ad and landing-page recommendations', 'Improve the message and the next step people see after they search.'],
  ['Bid and budget optimization', 'Shift spend based on demand, lead quality and what the available data supports.'],
  ['Lead and call-quality review', 'Look beyond a conversion count to understand whether inquiries are worth pursuing.'],
  ['Monthly booked-job reporting', 'Connect spend to estimates and booked moves when your systems can provide that data.']
];

export const differentiators = [
  ['Operator Led', 'Led by Logan Arnold, a working moving company owner. Decisions account for trucks, crews, seasonality and the realities of answering the phone.'],
  ['Full Transparency', 'You own the Google Ads account, pay Google directly and keep access to campaign data and the work being done.'],
  ['Booked-Job Focus', 'We look at qualified calls, estimates and booked moves wherever your tracking allows, not just clicks and impressions.']
];
