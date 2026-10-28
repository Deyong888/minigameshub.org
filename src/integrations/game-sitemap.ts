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
import gamepixBatchData from '../data/gamepix-batch-2026-10-21.json';
import { isGameIndexable } from '../utils/gameSeo';
import { withRichContentOverride } from '../utils/richContentOverrides';

const SITE = 'https://minigameshub.org';

type GamepixItem = {
  id: string;
  namespace?: string;
  description?: string;
  rich_content?: string;
};

// AdSense 合规整改:与游戏页 robots 共用唯一判定源 isGameIndexable。
// 不可索引(thin-content)的游戏页永不进入 sitemap-games.xml。

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
        const baseItems: GamepixItem[] = Array.isArray((gamepixData as { items?: GamepixItem[] }).items)
          ? (gamepixData as { items: GamepixItem[] }).items
          : [];
        // 2026-10-21 上新批次:与 games.ts 相同的增量合并(批次排在基础之后,按 id 去重保留基础版本)
        const seenIds = new Set(baseItems.map((item) => item.id));
        const batchItems: GamepixItem[] = (
          Array.isArray((gamepixBatchData as { items?: GamepixItem[] }).items)
            ? (gamepixBatchData as { items: GamepixItem[] }).items
            : []
        ).filter((item) => {
          if (seenIds.has(item.id)) return false;
          seenIds.add(item.id);
          return true;
        });
        const items: GamepixItem[] = [...baseItems, ...batchItems];
        // 人工富内容回填(2026-10-11 质量审计):与游戏页 robots 共用同一合并逻辑
        const games = items.map(withRichContentOverride).filter(isGameIndexable);

        const urls = games.map((g) => {
          const id = g.id;
          const slug = g.namespace || g.id;
          const en = loc('', id, slug);
          // 游戏页 canonical 收敛到英文版(2026-10-28 审计):sitemap 只输出 en + x-default,
          // 不再输出 es/zh hreflang,避免与 canonical 信号冲突(与 HTML 的 skipHreflang 对齐)
          return (
            `  <url>\n` +
            `    <loc>${escapeXml(en)}</loc>\n` +
            `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>\n` +
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
        logger.info(`Wrote sitemap-games.xml with ${games.length} game URLs (en).`);

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
