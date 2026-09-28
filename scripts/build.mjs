import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages } from '../src/pages.mjs';
import { renderPage } from '../src/components.mjs';
import { site } from '../src/config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });

for (const page of pages) {
  const out = page.path === '/' ? dist : path.join(dist, page.path.slice(1));
  await mkdir(out, { recursive: true });
  await writeFile(path.join(out, 'index.html'), renderPage(page), 'utf8');
}

await mkdir(path.join(dist, 'assets'), { recursive: true });
for (const file of ['site.css', 'site.js', 'favicon.png']) {
  await copyFile(path.join(root, 'src', 'assets', file), path.join(dist, 'assets', file));
}
for (const file of ['logo-primary.png', 'logo-reversed.svg']) {
  try { await copyFile(path.join(root, 'src', 'assets', file), path.join(dist, 'assets', file)); } catch { /* optional supplied master asset */ }
}
const robots = `User-agent: *\nAllow: /\n${site.siteUrl ? `Sitemap: ${site.siteUrl}/sitemap.xml\n` : ''}`;
await writeFile(path.join(dist, 'robots.txt'), robots, 'utf8');
await writeFile(path.join(dist, '.nojekyll'), '', 'utf8');
const urls = pages.map(p => site.siteUrl ? `${site.siteUrl}${p.path === '/' ? '/' : p.path + '/'}` : '').filter(Boolean);
if (urls.length) await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${u}</loc></url>`).join('')}</urlset>`, 'utf8');
console.log(`Built ${pages.length} pages in ${dist}`);
