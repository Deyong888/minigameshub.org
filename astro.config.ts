import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import gamepixData from './src/data/gamepix.json';
import gameSitemap from './src/integrations/game-sitemap';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';
import { isGameIndexable } from './src/utils/gameSeo';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// AdSense 合规整改:thin-content 游戏页全量 noindex,保护抓取预算。
// 与游戏页 robots、game-sitemap 共用唯一判定源 isGameIndexable。
// noindex 页仍可渲染、可内链到达,但不再告诉 Google 抓取 ~7k 近空 URL。
// 真实内容在分类 / 聚合 / 博客 / 首页,保持完全索引。
const gamepixItems: { id: string; namespace?: string; description?: string; rich_content?: string }[] = (
  gamepixData as { items?: { id: string; namespace?: string; description?: string; rich_content?: string }[] }
).items ?? [];
const noindexGameSuffixes = new Set(
  gamepixItems.filter((g) => !isGameIndexable(g)).map((g) => `${g.id}-${g.namespace || g.id}`)
);

const hasExternalScripts = true;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: 'https://minigameshub.org',
  // Astro 5 removed `output: 'hybrid'` — `static` + an adapter now supports
  // per-route opt-out via `export const prerender = false`, which is exactly
  // what we use. Only a few hundred pages (home, categories, blog, hub, about,
  // editorial) are pre-rendered at build; the ~21k game pages render on-demand
  // via Vercel serverless + edge cache. This keeps the build far under Vercel's
  // 45-minute limit.
  output: 'static',
  adapter: vercel({ webAnalytics: { enabled: false } }),
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/games-to-play-when-bored': '/bored-games',
    '/bored-at-work': '/bored-games/bored-at-work',
    '/bored-at-school': '/bored-games/bored-at-school',
    '/waiting-in-line': '/bored-games/waiting-in-line',
    '/es/bored-at-school': '/es/bored-games/bored-at-school',
    '/es/bored-at-work': '/es/bored-games/bored-at-work',
    '/es/waiting-in-line': '/es/bored-games/waiting-in-line',
    // 2026-10-01: consolidate near-duplicate listicles (drafted) into canonical posts (301)
    // -> /25-best-unblocked-games-for-school-chromebook-2026
    '/25-best-games-to-play-when-bored-at-school-unblocked-for-chromebook-in-2026': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/25-best-unblocked-games-for-school-chromebook-2026-instant-play-no-download': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/25-best-unblocked-games-for-school-chromebook-2026-play-mini-games-instantly': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/25-best-unblocked-mini-games-for-school-chromebook-in-2026': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/30-best-unblocked-games-for-school-chromebook-2026-that-actually-work': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/best-unblocked-games-2026-play-free-mini-games-on-school-chromebook': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/best-unblocked-games-for-school-chromebook-2026-play-instantly': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/best-unblocked-games-for-school-chromebooks-2026-play-instantly': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/games-to-play-when-bored-at-school-2026-best-unblocked-browser-games-for-chromebook-no-download': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/top-trending-unblocked-games-2026-for-school-chromebooks-free-play': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/top-unblocked-games-2026-play-free-on-school-chromebooks': '/25-best-unblocked-games-for-school-chromebook-2026',
    '/top-10-unblocked-games-for-school': '/25-best-unblocked-games-for-school-chromebook-2026',
    // -> /30-best-games-to-play-when-bored-at-school-unblocked-in-2026-no-download-needed
    '/15-best-games-to-play-when-bored-at-school-in-2026-unblocked-and-free': '/30-best-games-to-play-when-bored-at-school-unblocked-in-2026-no-download-needed',
    '/20-best-games-to-play-when-bored-at-school-in-2026': '/30-best-games-to-play-when-bored-at-school-unblocked-in-2026-no-download-needed',
    '/25-best-games-to-play-when-bored-at-school-in-2026-free-no-download': '/30-best-games-to-play-when-bored-at-school-unblocked-in-2026-no-download-needed',
    '/top-15-games-to-play-when-bored-at-school-in-2026': '/30-best-games-to-play-when-bored-at-school-unblocked-in-2026-no-download-needed',
    // -> /best-browser-games-2026-play-instantly-when-bored
    '/25-best-free-browser-games-no-download-2026-play-instantly-when-bored': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-browser-games-2026-top-mini-games-to-play-when-bored': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-browser-games-to-play-when-bored-2026-no-download-instant-play': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-browser-games-to-play-when-bored-in-2026-free-html5-mini-games': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-browser-games-to-play-when-bored-in-2026-no-download-instant-fun': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-browser-games-to-play-when-bored-in-2026-no-download-instant-play': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-browser-games-to-play-when-bored-in-2026-no-download-required': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-games-to-play-when-bored-no-download-browser-games-2026': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-games-to-play-when-bored-in-2026-top-html5-browser-games-for-school-and-work': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-html5-browser-games-to-play-when-bored-in-2026': '/best-browser-games-2026-play-instantly-when-bored',
    '/best-html5-games-to-play-instantly-without-download-in-2026': '/best-browser-games-2026-play-instantly-when-bored',
    // -> /top-25-trending-html5-mini-games-to-play-when-bored-in-2026
    '/top-trending-mini-games-2026-best-html5-browser-games-to-play-when-bored': '/top-25-trending-html5-mini-games-to-play-when-bored-in-2026',
    '/top-trending-mini-games-to-play-when-bored-in-2026-instant-browser-games': '/top-25-trending-html5-mini-games-to-play-when-bored-in-2026',
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // Exclude noindex game pages across all locales (en/es/zh) to focus crawl budget
      // on quality URLs. Page format: /game/{id}-{slug} (slug = namespace || id).
      filter: (page: string) => {
        const pathname = page
          .replace(/^https?:\/\/[^/]+/, '')
          .replace(/^\/(es|zh)(?=\/)/, '');
        if (pathname.startsWith('/game/') && noindexGameSuffixes.has(pathname.slice('/game/'.length))) {
          return false;
        }
        return true;
      },
    }),
    // Must run as an integration: the Vercel adapter copies dist/client into
    // .vercel/output/static after all integration hooks, so a post-build script
    // would write too late and never reach the deployment.
    gameSitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  image: {
    domains: ['cdn.pixabay.com', 'img.gamepix.com', 'images.unsplash.com', 'plus.unsplash.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
