// Generates a sitemap for the ~7k game pages that are rendered on-demand
// (hybrid/SSR) and therefore NOT emitted as static .html files by Astro — which
// means @astrojs/sitemap would otherwise skip them. We read the canonical game
// list (src/data/gamepix.json), emit dist/sitemap-games.xml, and register it in
// dist/sitemap-index.xml so crawlers still discover every game URL.
//
// Run automatically by `npm run build` (see package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://minigameshub.org';

const gamepix = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/data/gamepix.json'), 'utf-8')
);
const items = Array.isArray(gamepix?.items) ? gamepix.items : [];

// Mirror astro.config.ts: a game is "thin" (excluded from sitemap) when it has
// neither a description nor meaningful rich_content. Real content lives on these
// pages once a description exists, so only those get indexed.
const isThin = (g) =>
  !(g.description && String(g.description).trim()) &&
  !(g.rich_content && String(g.rich_content).length > 80);

const games = items.filter((g) => !isThin(g));

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const loc = (lang, id, slug) =>
  `${SITE}${lang ? `/${lang}` : ''}/game/${encodeURIComponent(id)}-${encodeURIComponent(slug)}`;

const urls = [];
for (const g of games) {
  const id = g.id;
  const slug = g.namespace || g.id;
  const en = loc('', id, slug);
  const es = loc('es', id, slug);
  const zh = loc('zh', id, slug);
  urls.push(
    `  <url>\n` +
      `    <loc>${escapeXml(en)}</loc>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(es)}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="zh" href="${escapeXml(zh)}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(en)}"/>\n` +
      `  </url>`
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'dist/sitemap-games.xml'), sitemap);
console.log(`[sitemap] wrote dist/sitemap-games.xml with ${games.length} game URLs (en/es/zh).`);

// Register the games sitemap in the index produced by @astrojs/sitemap.
const indexFile = path.join(ROOT, 'dist/sitemap-index.xml');
if (fs.existsSync(indexFile)) {
  let index = fs.readFileSync(indexFile, 'utf-8');
  const entry = `  <sitemap><loc>${SITE}/sitemap-games.xml</loc></sitemap>\n`;
  if (!index.includes('sitemap-games.xml')) {
    index = index.replace('</sitemapindex>', `${entry}</sitemapindex>`);
    fs.writeFileSync(indexFile, index);
    console.log('[sitemap] registered sitemap-games.xml in sitemap-index.xml.');
  } else {
    console.log('[sitemap] sitemap-games.xml already registered; skipped.');
  }
} else {
  console.warn('[sitemap] dist/sitemap-index.xml not found — index not patched.');
}
