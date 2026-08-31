/**
 * Emits a sitemap for the ~6.7k game pages that render on-demand.
 *
 * Why an integration and not a post-build script:
 * @astrojs/vercel copies `dist/client` into `.vercel/output/static` inside the
 * adapter's `astro:build:done` hook, which Astro runs *after* every integration
 * hook. Anything written after `astro build` exits is therefore never copied
 * into the deployment (sitemap-games.xml came back 404 because of this).
 * Hooking `astro:build:done` here means we write into the same `dir` that
 * @astrojs/sitemap uses, before the adapter copies it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

import gamepixData from '../data/gamepix.json';

const SITE = 'https://minigameshub.org';

type GamepixItem = {
  id: string;
  namespace?: string;
  description?: string;
  rich_content?: string;
};

// Mirrors astro.config.ts: a game is "thin" (kept out of the sitemap) when it has
// neither a description nor meaningful rich_content.
const isThin = (g: GamepixItem) =>
  !(g.description && String(g.description).trim()) &&
  !(g.rich_content && String(g.rich_content).length > 80);

const escapeXml = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const loc = (lang: string, id: string, slug: string) =>
  `${SITE}${lang ? `/${lang}` : ''}/game/${encodeURIComponent(id)}-${encodeURIComponent(slug)}`;

export default function gameSitemap(): AstroIntegration {
  return {
    name: 'game-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = typeof dir === 'string' ? dir : fileURLToPath(dir);
        const items: GamepixItem[] = Array.isArray((gamepixData as { items?: GamepixItem[] }).items)
          ? (gamepixData as { items: GamepixItem[] }).items
          : [];
        const games = items.filter((g) => !isThin(g));

        const urls = games.map((g) => {
          const id = g.id;
          const slug = g.namespace || g.id;
          const en = loc('', id, slug);
          const es = loc('es', id, slug);
          const zh = loc('zh', id, slug);
          return (
            `  <url>\n` +
            `    <loc>${escapeXml(en)}</loc>\n` +
            `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>\n` +
            `    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(es)}"/>\n` +
            `    <xhtml:link rel="alternate" hreflang="zh" href="${escapeXml(zh)}"/>\n` +
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(en)}"/>\n` +
            `  </url>`
          );
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

        fs.writeFileSync(path.join(outDir, 'sitemap-games.xml'), sitemap);
        logger.info(`Wrote sitemap-games.xml with ${games.length} game URLs (en/es/zh).`);

        // Register it in the index produced by @astrojs/sitemap.
        const indexFile = path.join(outDir, 'sitemap-index.xml');
        if (fs.existsSync(indexFile)) {
          const index = fs.readFileSync(indexFile, 'utf-8');
          if (!index.includes('sitemap-games.xml')) {
            const entry = `  <sitemap><loc>${SITE}/sitemap-games.xml</loc></sitemap>\n`;
            fs.writeFileSync(indexFile, index.replace('</sitemapindex>', `${entry}</sitemapindex>`));
            logger.info('Registered sitemap-games.xml in sitemap-index.xml.');
          }
        } else {
          logger.warn(`sitemap-index.xml not found in ${outDir} — index not patched.`);
        }
      },
    },
  };
}
