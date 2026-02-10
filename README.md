# 🎮 MiniGamesHub.org

**MiniGamesHub.org** is a world-class browser game portal offering instant access to over 5,000+ free games. Built with **[Astro 5.0](https://astro.build/)** and **[Tailwind CSS](https://tailwindcss.com/)**, it delivers extreme performance, SEO optimization, and a seamless user experience across all devices.

![Astro](https://img.shields.io/badge/Astro-5.0-orange?style=flat-square&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square&logo=pwa)

## ✨ Key Features

- **🚀 High Performance**: Static Site Generation (SSG) with Astro for lightning-fast load times.
- **🎮 Massive Library**: Automated integration with GamePix API to serve 5000+ games.
- **🌍 Multi-language Support**: Full support for English (`/`) and Spanish (`/es`) with localized UI and metadata.
- **📱 PWA Ready**: Installable as a native-like app on mobile and desktop devices.
- **🔍 SEO Optimized**:
  - Comprehensive Schema.org structured data (VideoGame, CollectionPage).
  - Auto-generated XML Sitemaps.
  - Optimized Meta Tags and Open Graph data.
- **� User Center**:
  - **My Games**: Track your "Played" history and "Favorites" (Local storage via Nano Stores).
  - **Surprise Me**: Random game selector for indecisive players.
  - **Boss Key**: Instantly switch to a fake Excel spreadsheet interface for stealth.
- **🔎 Instant Search**: Client-side search powered by Pagefind.

## 🛠️ Tech Stack

- **Framework**: [Astro 5.0](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Scripting**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Nano Stores](https://github.com/nanostores/nanostores) (Persistent storage)
- **Search**: [Pagefind](https://pagefind.app/)
- **Icons**: [Iconify](https://iconify.design/)
- **Analytics**: Google Analytics 4 & Plausible

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.1 or higher
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Deyong888/minigameshub.git
   cd minigameshub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Fetch Game Data:**
   Before running the dev server, you need to download the game data.
   ```bash
   npm run fetch-games
   ```

### Development

Start the local development server:

```bash
npm run dev
```
The site will be available at `http://localhost:4321`.

### Build for Production

Build the static site and index content for search:

```bash
npm run build
```
The output will be in the `dist/` directory.

### Code Quality

Run the following command to check for errors and linting issues:

```bash
npm run check
```

## 📂 Project Structure

```text
/
├── public/             # Static assets (manifest.json, robots.txt, sw.js)
├── scripts/            # Build scripts (fetch-games.js, seo-audit.js)
├── src/
│   ├── assets/         # Images, global styles
│   ├── components/     # Reusable Astro components
│   │   ├── game/       # Game-specific components (Player, Card)
│   │   ├── widgets/    # UI widgets (Hero, Grid)
│   │   └── common/     # Metadata, Analytics, SEO
│   ├── data/           # Static data files (games.ts)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages (Routes)
│   │   ├── es/         # Spanish localized pages
│   │   └── ...         # English pages (default)
│   └── utils/          # Helper functions (i18n, permalinks)
├── astro.config.ts     # Astro configuration
└── tailwind.config.mjs # Tailwind configuration
```

## 📄 License

This project is based on [AstroWind](https://github.com/onwidget/astrowind) and is open source.
