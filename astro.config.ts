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

import gameSitemap from './src/integrations/game-sitemap';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = true;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: 'https://minigameshub.org',
  // Astro 5 removed `output: 'hybrid'` — `static` + an adapter supports
  // per-route opt-out via `export const prerender = false`. Since 2026-11-16
  // every route is pre-rendered and the deployment serves zero functions:
  // on-demand game pages burned the Hobby plan's 4 Fluid Active CPU-hours
  // and paused the whole site with 402 on 2026-11-16. Game pages use the
  // shell scheme (2026-11-16): only isGameIndexable games (500/locale) are
  // pre-rendered; the rest are served by the GameShell player shell via
  // vercel.json rewrites (see src/components/game/GameShell.astro).
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
      // 游戏页全部排除:可索引的 500 条英文游戏页只进 sitemap-games.xml
      // (game-sitemap integration 生成),不再与 sitemap-0.xml 重复;
      // noindex 游戏页同样排除(与 2026-11-16 之前的行为一致)。
      // 外壳页 /play(各语种)同样排除:noindex 的 rewrite 承接页,不应被收录。
      // Page format: /game/{id}-{slug} (slug = namespace || id), plus
      // /{es|zh|de|pt}/game/{id}-{slug} for localized game pages.
      filter: (page: string) => {
        const pathname = page
          .replace(/^https?:\/\/[^/]+/, '')
          .replace(/^\/(es|zh|de|pt)(?=\/)/, '');
        if (pathname.startsWith('/game/')) {
          return false;
        }
        if (pathname === '/play') {
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
      // HTML minification OFF (2026-11-16): html-minifier-terser runs
      // single-threaded and batches gigabytes in memory — with the earlier
      // full prerender (36,525 game pages, ~3.1 GB HTML) it took ~2h and
      // OOM-risked the build, far past Vercel's 45-minute build limit.
      // The shell scheme (2026-11-16) cut game pages to ~2,500, but the
      // minifier stays off: Vercel serves gzip/brotli anyway, so the
      // ~10-15% minification win is not worth the build time.
      // CSS/JS minification stays on (few files).
      HTML: false,
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
    locales: ['en', 'es', 'zh', 'de', 'pt'],
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
