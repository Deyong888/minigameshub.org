# MiniGamesHub.org — Agent Guide

## Quick start

```bash
npm install
npm run fetch-games   # download GamePix data to src/data/gamepix.json (prerequisite)
npm run dev           # astro dev on :4321
npm run build         # fetch-games → astro build → npx pagefind --site dist
npm run preview       # astro preview
```

## Code quality (no test framework)

```bash
npm run check         # astro check + eslint + prettier --check (in that order)
npm run fix           # eslint --fix + prettier -w
```

No test framework is configured. CI runs `build` and `check`; `npm test` is unused.

## Project architecture

- **Framework**: Astro 5 SSG (`output: 'static'`), Tailwind CSS 3.4, TypeScript 5.8
- **Package manager**: npm only (`.npmrc` has `shamefully-hoist=true` but pnpm is not used)
- **Path alias**: `~/*` → `src/*`
- **State**: `nanostores` + `@nanostores/persistent` → localStorage (`boredgames:state` key)
- **Config**: `src/config.yaml` drives site metadata, analytics, theme, i18n, blog settings
- **Search**: Pagefind indexes `dist/` post-build (`src/pages/search.astro`)
- **PWA**: `public/sw.js` (cache-first static assets, network-first navigation)

## Game data

- `src/data/gamepix.json` committed (fetched from GamePix API, ~20 pages)
- `src/data/games.ts` maps raw items to `Game` interface, slices into curated category arrays
- `Game` interface: `id, slug, title, description, thumbnail, url, category, tags, rating, plays`
- `npm run fetch-games` (or `node scripts/fetch-games.js`) must run before dev/build

## i18n

- 4 locales: `en` (default, no prefix), `es`, `zh`, `hi`
- Translation map: `src/utils/i18n.ts` (UI strings keyed by `en/es/zh/hi`)
- Route pages under `src/pages/es/`, `src/pages/zh/`, `src/pages/hi/`

## Tooling

| Tool | Config | Notes |
|---|---|---|
| ESLint | `eslint.config.js` | Flat config (ESLint 9+). `.astro` files use `astro-eslint-parser`. Ignores `dist/`, `.astro/`, `types.generated.d.ts` |
| Prettier | `.prettierrc.cjs` | `printWidth: 120`, `singleQuote`, `trailingComma: 'es5'`, `semi: true`. Plugin: `prettier-plugin-astro` |
| TypeScript | `tsconfig.json` | Extends `astro/tsconfigs/base`, `strictNullChecks`, `allowJs` |
| Icons | `astro-icon` | Sets: `tabler` (all), `flat-color-icons` (specific subset in `astro.config.ts`) |

## Deploy

- **Netlify**: `netlify.toml` — build `npm run build`, publish `dist/`
- **Vercel**: `vercel.json` — clean URLs, `_astro/*` cache immutable
- **Docker**: `Dockerfile` — multi-stage (node build → nginx:stable-alpine on :8080)

## Gotchas

- `astro-compress` strips HTML attribute quotes — `removeAttributeQuotes: false` in config
- `@astrojs/tailwind` has `applyBaseStyles: false` (base styles managed in `src/assets/styles/tailwind.css`)
- `@astrojs/partytown` only included when `hasExternalScripts` is `true` (currently `false` because GA4 ID is `null` in config)
- No pre-commit hooks are configured
- ESLint uses `smart-tabs` for mixed tabs/spaces in `.astro` files
- `no-unused-vars` uses `@typescript-eslint` rule with `argsIgnorePattern: '^_'`
- Image domains allowed in astro config: `cdn.pixabay.com`, `img.gamepix.com`
