import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, nav, differentiators } from './config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hasPrimaryLogo = existsSync(path.join(root, 'src/assets/logo-primary.png'));
const hasReversedLogo = existsSync(path.join(root, 'src/assets/logo-reversed.svg'));
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function brand(reversed = false) {
  const asset = reversed ? (hasReversedLogo ? 'logo-reversed.svg' : null) : (hasPrimaryLogo ? 'logo-primary.png' : null);
  return asset
    ? `<a class="brand brand-image" href="/" aria-label="Field Proven Marketing home"><img src="/assets/${asset}" width="225" height="163" alt="Field Proven Marketing" /></a>`
    : `<a class="brand brand-type" href="/" aria-label="Field Proven Marketing home"><span>FIELD <strong>PROVEN</strong></span><small>MARKETING</small></a>`;
}

function header(minimal, active) {
  if (minimal) return `<header class="site-header landing-header"><div class="container header-inner">${brand()}<a class="header-link" href="/">Visit main site <span aria-hidden="true">↗</span></a></div></header>`;
  return `<header class="site-header"><div class="container header-inner">${brand()}<button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button><nav id="primary-nav" class="primary-nav" aria-label="Main navigation">${nav.map(item => `<a href="${item.href}" ${active === item.href ? 'aria-current="page"' : ''}>${escapeHtml(item.label)}</a>`).join('')}<a class="nav-cta" href="/contact/#market-review">Market review</a></nav></div></header>`;
}

function footer(minimal = false) {
  return `<footer class="site-footer"><div class="container footer-main"><div>${brand(true)}<p>${escapeHtml(site.tagline)}</p><p class="footer-note">Google Ads for independent moving companies, led from an operator's perspective.</p></div><div><h2>Explore</h2><ul>${(minimal ? [nav[0], nav[2], nav[4]] : nav).map(item => `<li><a href="${item.href}">${escapeHtml(item.label)}</a></li>`).join('')}<li><a href="/privacy-policy">Privacy Policy</a></li></ul></div><div><h2>Contact</h2><p><a href="mailto:${site.email}">${site.email}</a></p><p>Founded by Logan Arnold<br />A working moving company owner</p></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Field Proven Marketing</span><span>Advertising performance varies. No specific result is guaranteed.</span></div></footer>`;
}

export function button(label = site.reviewCta, href = '/contact/#market-review', secondary = false) {
  return `<a class="button ${secondary ? 'button-secondary' : 'button-primary'}" href="${href}">${escapeHtml(label)}<span aria-hidden="true">↗</span></a>`;
}

export function sectionIntro(kicker, title, text = '') {
  return `<div class="section-intro"><p class="eyebrow">${escapeHtml(kicker)}</p><h2>${escapeHtml(title)}</h2>${text ? `<p>${escapeHtml(text)}</p>` : ''}</div>`;
}

export function differentiatorGrid() {
  return `<div class="differentiator-grid">${differentiators.map(([title, copy], i) => `<article class="differentiator"><span class="item-index">0${i + 1}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`).join('')}</div>`;
}

export function ctaBand(title = 'See what your market and current ads are telling you.', text = 'Start with a short, practical conversation about demand, tracking and the work your crews can take on.') {
  return `<section class="cta-band"><div class="container cta-inner"><div><p class="eyebrow eyebrow-light">Next step</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></div><div class="cta-actions">${button()}<a class="text-link light-link" href="mailto:${site.email}">Email Logan directly <span aria-hidden="true">↗</span></a></div></div></section>`;
}

export function offerCard(compact = false) {
  return `<div class="offer-card ${compact ? 'offer-compact' : ''}"><div class="offer-heading"><p class="eyebrow">Current offer</p><h3>Founding Partner Program</h3><p>A focused initial partnership for independent movers ready to evaluate paid search against real business outcomes.</p></div><div class="offer-prices"><div><strong>${site.offer.setup}</strong><span>one-time setup</span></div><div><strong>${site.offer.monthly}</strong><span>monthly management</span></div></div><ul class="check-list"><li>Recommended Google ad spend: at least ${site.offer.spend} per month, paid directly to Google</li><li>Initial ${site.offer.term} partnership</li><li>Client-owned Google Ads account and clear access to campaign data</li></ul><p class="fine-print">Advertising performance varies. No specific result is guaranteed.</p></div>`;
}

function field(label, name, type = 'text', required = false, extra = '') {
  const fieldId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `<div class="form-field"><label for="${fieldId}">${label}${required ? ' <span aria-hidden="true">*</span>' : ' <span class="optional">(optional)</span>'}</label><input id="${fieldId}" name="${name}" type="${type}" ${required ? 'required' : ''} ${extra} /></div>`;
}

export function leadForm({ short = false, id = 'market-review' } = {}) {
  return `<form id="${id}" class="lead-form" action="https://formsubmit.co/${site.email}" method="POST" data-lead-form data-ajax-endpoint="https://formsubmit.co/ajax/${site.email}" novalidate>
    <input type="hidden" name="_subject" value="Field Proven Marketing: new market review request" />
    <input type="hidden" name="_template" value="table" />
    <div class="honeypot" aria-hidden="true"><label for="${id}-website-check">Leave this field blank</label><input id="${id}-website-check" name="_honey" type="text" tabindex="-1" autocomplete="off" /></div>
    <div class="form-grid">
      ${field('Full name', 'Full name', 'text', true, 'autocomplete="name" maxlength="100"')}
      ${field('Company name', 'Company name', 'text', true, 'autocomplete="organization" maxlength="120"')}
      ${field('Email', 'email', 'email', true, 'autocomplete="email" maxlength="160"')}
      ${field('Phone', 'Phone', 'tel', true, 'autocomplete="tel" maxlength="35"')}
      ${!short ? field('Website', 'Website', 'url', false, 'placeholder="https://" autocomplete="url" maxlength="200"') : ''}
      ${field('Primary market or city', 'Primary market or city', 'text', true, 'autocomplete="address-level2" maxlength="120"')}
      <div class="form-field"><label for="${id}-ads">Are you currently running Google Ads? <span aria-hidden="true">*</span></label><select id="${id}-ads" name="Currently running Google Ads" required><option value="">Select one</option><option>Yes</option><option>No</option><option>Not sure</option></select></div>
      ${!short ? `<div class="form-field"><label for="${id}-spend">Approximate monthly ad spend <span class="optional">(optional)</span></label><select id="${id}-spend" name="Approximate monthly ad spend"><option value="">Select a range</option><option>Not currently spending</option><option>Under $2,500</option><option>$2,500–$5,000</option><option>$5,001–$10,000</option><option>Over $10,000</option></select></div>` : ''}
      <div class="form-field full-width"><label for="${id}-message">What would you like to improve? <span class="optional">(optional)</span></label><textarea id="${id}-message" name="Message" rows="4" maxlength="2000" placeholder="Tell us about your market, current ads or lead-quality concerns."></textarea></div>
    </div>
    <div class="form-submit"><button class="button button-primary" type="submit">${site.reviewCta}<span aria-hidden="true">↗</span></button><p>We’ll use these details only to respond to your request. <a href="/privacy-policy">Privacy Policy</a></p></div>
    <p class="form-status" role="status" aria-live="polite" tabindex="-1" hidden></p>
  </form>`;
}

function structuredData() {
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${site.siteUrl}/#business`, name: site.name, url: site.siteUrl, email: site.email, description: 'Operator-led Google Ads management for independent moving companies.', founder: { '@type': 'Person', name: site.founder }, serviceType: 'Google Ads management for independent moving companies' }).replace(/</g, '\\u003c');
}

export function renderPage(page) {
  const canonical = `${site.siteUrl}${page.path === '/' ? '/' : page.path + '/'}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#0F172A" /><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}" /><link rel="canonical" href="${canonical}" /><link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" /><link rel="stylesheet" href="/assets/site.css" /><meta property="og:type" content="website" /><meta property="og:site_name" content="${escapeHtml(site.name)}" /><meta property="og:title" content="${escapeHtml(page.title)}" /><meta property="og:description" content="${escapeHtml(page.description)}" /><meta property="og:url" content="${canonical}" /><meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${escapeHtml(page.title)}" /><meta name="twitter:description" content="${escapeHtml(page.description)}" />${page.schema ? `<script type="application/ld+json">${structuredData()}</script>` : ''}<script src="/assets/site.js" defer></script></head><body><a class="skip-link" href="#main">Skip to content</a>${header(page.minimal, page.path)}<main id="main">${page.content}</main>${footer(page.minimal)}</body></html>`;
}
