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

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// P0 SEO: protect crawl budget by excluding "thin" game pages (no description AND
// no rich_content) from the sitemap. They still render & are reachable internally,
// but we stop telling Google to crawl ~7k near-empty URLs. Real content lives on
// category / hub / blog / home pages, which stay fully indexed.
const gamepixItems: { id: string; namespace?: string; description?: string; rich_content?: string }[] = (
  gamepixData as { items?: { id: string; namespace?: string; description?: string; rich_content?: string }[] }
).items ?? [];
const thinGameSuffixes = new Set(
  gamepixItems
    .filter(
      (g) =>
        !(g.description && String(g.description).trim()) &&
        !(g.rich_content && String(g.rich_content).length > 80)
    )
    .map((g) => `${g.id}-${g.namespace || g.id}`)
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
    '/games-to-play-when-bored': '/bored-games',
    '/bored-at-work': '/bored-games/bored-at-work',
    '/bored-at-school': '/bored-games/bored-at-school',
    '/waiting-in-line': '/bored-games/waiting-in-line',
    '/es/bored-at-school': '/es/bored-games/bored-at-school',
    '/es/bored-at-work': '/es/bored-games/bored-at-work',
    '/es/waiting-in-line': '/es/bored-games/waiting-in-line',
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // Exclude thin game pages across all locales (en/es/zh) to focus crawl budget
      // on quality URLs. Page format: /game/{id}-{slug} (slug = namespace || id).
      filter: (page: string) => {
        const pathname = page
          .replace(/^https?:\/\/[^/]+/, '')
          .replace(/^\/(es|zh)(?=\/)/, '');
        if (pathname.startsWith('/game/') && thinGameSuffixes.has(pathname.slice('/game/'.length))) {
          return false;
        }
        return true;
      },
    }),
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
