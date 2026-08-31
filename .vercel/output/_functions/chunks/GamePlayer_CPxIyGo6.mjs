import { d as createAstro, c as createComponent, a as renderTemplate, x as renderScript, w as defineScriptVars, u as unescapeHTML, b as addAttribute, m as maybeRenderHead } from './astro/server_BWaOESUl.mjs';
import 'piccolore';
import 'clsx';
/* empty css                               */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://minigameshub.org");
const $$GamePlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GamePlayer;
  const {
    game,
    showControls = true,
    labels = {
      loading: "Loading",
      bossKey: "Boss Key",
      mute: "Mute",
      unmute: "Unmute",
      fullscreen: "Fullscreen",
      bossKeyHint: "Press ESC for Boss Key",
      returnToGame: "Press ESC to return to game..."
    }
  } = Astro2.props;
  const embedUrl = game.url.includes("sid=") ? game.url : `${game.url}${game.url.includes("?") ? "&" : "?"}sid=GM8A7`;
  return renderTemplate(_a || (_a = __template(["", '<div class="game-player"', ' data-astro-cid-v2j3jbim> <!-- Game iframe container (lazy-loaded: poster + click-to-play) --> <div class="game-frame-wrapper relative" data-astro-cid-v2j3jbim> <iframe', "", "", ' width="100%" height="100%" allowfullscreen allow="autoplay; fullscreen; clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" loading="lazy" tabindex="-1" aria-hidden="true" class="game-frame rounded-lg shadow-2xl opacity-0" data-astro-cid-v2j3jbim></iframe> <!-- Poster + click-to-play (defers the heavy GamePix iframe \u2192 better LCP / CWV) --> <button type="button"', ' class="game-poster absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg border-0 p-0"', " data-astro-cid-v2j3jbim> <img", "", ' width="960" height="540" fetchpriority="high" decoding="async" class="absolute inset-0 w-full h-full object-cover rounded-lg" data-astro-cid-v2j3jbim> <span class="play-badge relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white/90 text-primary shadow-xl" data-astro-cid-v2j3jbim> <svg viewBox="0 0 24 24" class="w-9 h-9 ml-1" fill="currentColor" aria-hidden="true" data-astro-cid-v2j3jbim><path d="M8 5v14l11-7z" data-astro-cid-v2j3jbim></path></svg> </span> </button> <!-- Loading state (shown only after the user starts the game) --> <div class="loading-overlay absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg hidden" data-astro-cid-v2j3jbim> <div class="text-center" data-astro-cid-v2j3jbim> <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" data-astro-cid-v2j3jbim></div> <p class="mt-4 text-white" data-astro-cid-v2j3jbim>', " ", "...</p> </div> </div> </div> ", ' <!-- Boss key overlay (hidden by default) --> <div id="boss-overlay" class="boss-overlay hidden fixed inset-0 bg-gray-100 z-50 overflow-auto" data-astro-cid-v2j3jbim> <div class="max-w-5xl mx-auto p-8" data-astro-cid-v2j3jbim> <!-- Fake Excel UI --> <div class="bg-white shadow-lg min-h-screen" data-astro-cid-v2j3jbim> <div class="bg-green-700 text-white px-4 py-2 flex items-center justify-between" data-astro-cid-v2j3jbim> <span data-astro-cid-v2j3jbim>Q3_Financial_Report.xlsx - Excel</span> <div class="flex gap-2" data-astro-cid-v2j3jbim> <span class="w-3 h-3 rounded-full bg-yellow-400" data-astro-cid-v2j3jbim></span> <span class="w-3 h-3 rounded-full bg-green-400" data-astro-cid-v2j3jbim></span> </div> </div> <div class="p-4" data-astro-cid-v2j3jbim> <div class="border border-gray-300" data-astro-cid-v2j3jbim> <table class="w-full text-sm" data-astro-cid-v2j3jbim> <thead class="bg-gray-100" data-astro-cid-v2j3jbim> <tr data-astro-cid-v2j3jbim> <th class="border p-2 text-left" data-astro-cid-v2j3jbim>Revenue Stream</th> <th class="border p-2 text-right" data-astro-cid-v2j3jbim>Q1</th> <th class="border p-2 text-right" data-astro-cid-v2j3jbim>Q2</th> <th class="border p-2 text-right" data-astro-cid-v2j3jbim>Q3</th> </tr> </thead> <tbody data-astro-cid-v2j3jbim> <tr data-astro-cid-v2j3jbim><td class="border p-2" data-astro-cid-v2j3jbim>Product Sales</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.2M</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.5M</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.8M</td></tr> <tr data-astro-cid-v2j3jbim><td class="border p-2" data-astro-cid-v2j3jbim>Services</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$800K</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$900K</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.1M</td></tr> </tbody> </table> </div> <p class="mt-8 text-gray-500 text-center" data-astro-cid-v2j3jbim>', "</p> </div> </div> </div> </div> </div> <script>(function(){", `
  // \u8001\u677F\u952E\u529F\u80FD
  let isBossMode = false;
  let started = false;
  const bossOverlay = document.getElementById('boss-overlay');
  const bossBtn = document.getElementById('boss-key-btn');
  const poster = document.getElementById(\`poster-\${gameId}\`);
  const gameFrame = document.getElementById(\`game-frame-\${gameId}\`);

  // Click-to-play: defer the heavy GamePix iframe until the user wants it (Core Web Vitals)
  function startGame() {
    if (started) return;
    started = true;
    const loading = document.querySelector('.loading-overlay');
    if (loading) loading.classList.remove('hidden');
    if (gameFrame && gameFrame.dataset.src) {
      gameFrame.src = gameFrame.dataset.src;
    }
  }
  poster?.addEventListener('click', startGame);

  function toggleBossMode() {
    isBossMode = !isBossMode;

    if (isBossMode) {
      // \u8FDB\u5165\u8001\u677F\u6A21\u5F0F
      bossOverlay.classList.remove('hidden');
      document.title = 'Q3_Financial_Report.xlsx - Excel Online';

      // \u5C1D\u8BD5\u9759\u97F3\u6E38\u620F\uFF08\u901A\u8FC7postMessage\uFF09
      try {
        gameFrame.contentWindow?.postMessage({ type: 'mute', value: true }, '*');
      } catch {
        // Cross-origin iframe
      }

      // \u6539\u53D8favicon
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href =
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23217346" width="100" height="100"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white">X</text></svg>';
      document.head.appendChild(link);
    } else {
      // \u6062\u590D\u6E38\u620F
      bossOverlay.classList.add('hidden');
      document.title = \`\${gameTitle} - Play Online Free | MiniGamesHub\`;

      try {
        gameFrame.contentWindow?.postMessage({ type: 'mute', value: false }, '*');
      } catch {
        // Cross-origin iframe
      }

      // \u6062\u590Dfavicon
      const link = document.querySelector("link[rel*='icon']");
      if (link) link.href = '/favicon.svg';
    }
  }

  // \u952E\u76D8\u76D1\u542C
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === '\`') {
      e.preventDefault();
      toggleBossMode();
    }
    if (!started) return;
    if (e.key === 'm' || e.key === 'M') {
      toggleMute();
    }
    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  bossBtn?.addEventListener('click', toggleBossMode);

  // \u9759\u97F3\u529F\u80FD
  let isMuted = false;
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = document.getElementById('mute-icon');
  const muteText = document.getElementById('mute-text');

  function toggleMute() {
    isMuted = !isMuted;
    muteIcon.textContent = isMuted ? '\u{1F507}' : '\u{1F50A}';
    muteText.textContent = isMuted ? labels.unmute : labels.mute;

    try {
      gameFrame.contentWindow?.postMessage(
        {
          type: 'audio',
          action: isMuted ? 'mute' : 'unmute',
        },
        '*'
      );
    } catch {
      // Cross-origin iframe
    }

    // \u89C6\u89C9\u53CD\u9988
    muteBtn.classList.toggle('bg-red-600', isMuted);
    muteBtn.classList.toggle('bg-gray-600', !isMuted);
  }

  muteBtn?.addEventListener('click', toggleMute);

  // \u5168\u5C4F\u529F\u80FD
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      void gameFrame.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }

  fullscreenBtn?.addEventListener('click', toggleFullscreen);

  // iframe\u52A0\u8F7D\u5B8C\u6210\u540E\uFF1A\u9690\u85CFloading\u4E0E\u6D77\u62A5\uFF0C\u663E\u793A\u771F\u5B9E\u6E38\u620F\u753B\u9762
  gameFrame?.addEventListener('load', () => {
    const loading = document.querySelector('.loading-overlay');
    if (loading) loading.classList.add('hidden');
    gameFrame.classList.remove('opacity-0');
    poster?.classList.add('hidden');
  });
})();<\/script> `, " "], ["", '<div class="game-player"', ' data-astro-cid-v2j3jbim> <!-- Game iframe container (lazy-loaded: poster + click-to-play) --> <div class="game-frame-wrapper relative" data-astro-cid-v2j3jbim> <iframe', "", "", ' width="100%" height="100%" allowfullscreen allow="autoplay; fullscreen; clipboard-write" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" loading="lazy" tabindex="-1" aria-hidden="true" class="game-frame rounded-lg shadow-2xl opacity-0" data-astro-cid-v2j3jbim></iframe> <!-- Poster + click-to-play (defers the heavy GamePix iframe \u2192 better LCP / CWV) --> <button type="button"', ' class="game-poster absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg border-0 p-0"', " data-astro-cid-v2j3jbim> <img", "", ' width="960" height="540" fetchpriority="high" decoding="async" class="absolute inset-0 w-full h-full object-cover rounded-lg" data-astro-cid-v2j3jbim> <span class="play-badge relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white/90 text-primary shadow-xl" data-astro-cid-v2j3jbim> <svg viewBox="0 0 24 24" class="w-9 h-9 ml-1" fill="currentColor" aria-hidden="true" data-astro-cid-v2j3jbim><path d="M8 5v14l11-7z" data-astro-cid-v2j3jbim></path></svg> </span> </button> <!-- Loading state (shown only after the user starts the game) --> <div class="loading-overlay absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg hidden" data-astro-cid-v2j3jbim> <div class="text-center" data-astro-cid-v2j3jbim> <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" data-astro-cid-v2j3jbim></div> <p class="mt-4 text-white" data-astro-cid-v2j3jbim>', " ", "...</p> </div> </div> </div> ", ' <!-- Boss key overlay (hidden by default) --> <div id="boss-overlay" class="boss-overlay hidden fixed inset-0 bg-gray-100 z-50 overflow-auto" data-astro-cid-v2j3jbim> <div class="max-w-5xl mx-auto p-8" data-astro-cid-v2j3jbim> <!-- Fake Excel UI --> <div class="bg-white shadow-lg min-h-screen" data-astro-cid-v2j3jbim> <div class="bg-green-700 text-white px-4 py-2 flex items-center justify-between" data-astro-cid-v2j3jbim> <span data-astro-cid-v2j3jbim>Q3_Financial_Report.xlsx - Excel</span> <div class="flex gap-2" data-astro-cid-v2j3jbim> <span class="w-3 h-3 rounded-full bg-yellow-400" data-astro-cid-v2j3jbim></span> <span class="w-3 h-3 rounded-full bg-green-400" data-astro-cid-v2j3jbim></span> </div> </div> <div class="p-4" data-astro-cid-v2j3jbim> <div class="border border-gray-300" data-astro-cid-v2j3jbim> <table class="w-full text-sm" data-astro-cid-v2j3jbim> <thead class="bg-gray-100" data-astro-cid-v2j3jbim> <tr data-astro-cid-v2j3jbim> <th class="border p-2 text-left" data-astro-cid-v2j3jbim>Revenue Stream</th> <th class="border p-2 text-right" data-astro-cid-v2j3jbim>Q1</th> <th class="border p-2 text-right" data-astro-cid-v2j3jbim>Q2</th> <th class="border p-2 text-right" data-astro-cid-v2j3jbim>Q3</th> </tr> </thead> <tbody data-astro-cid-v2j3jbim> <tr data-astro-cid-v2j3jbim><td class="border p-2" data-astro-cid-v2j3jbim>Product Sales</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.2M</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.5M</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.8M</td></tr> <tr data-astro-cid-v2j3jbim><td class="border p-2" data-astro-cid-v2j3jbim>Services</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$800K</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$900K</td><td class="border p-2 text-right" data-astro-cid-v2j3jbim>$1.1M</td></tr> </tbody> </table> </div> <p class="mt-8 text-gray-500 text-center" data-astro-cid-v2j3jbim>', "</p> </div> </div> </div> </div> </div> <script>(function(){", `
  // \u8001\u677F\u952E\u529F\u80FD
  let isBossMode = false;
  let started = false;
  const bossOverlay = document.getElementById('boss-overlay');
  const bossBtn = document.getElementById('boss-key-btn');
  const poster = document.getElementById(\\\`poster-\\\${gameId}\\\`);
  const gameFrame = document.getElementById(\\\`game-frame-\\\${gameId}\\\`);

  // Click-to-play: defer the heavy GamePix iframe until the user wants it (Core Web Vitals)
  function startGame() {
    if (started) return;
    started = true;
    const loading = document.querySelector('.loading-overlay');
    if (loading) loading.classList.remove('hidden');
    if (gameFrame && gameFrame.dataset.src) {
      gameFrame.src = gameFrame.dataset.src;
    }
  }
  poster?.addEventListener('click', startGame);

  function toggleBossMode() {
    isBossMode = !isBossMode;

    if (isBossMode) {
      // \u8FDB\u5165\u8001\u677F\u6A21\u5F0F
      bossOverlay.classList.remove('hidden');
      document.title = 'Q3_Financial_Report.xlsx - Excel Online';

      // \u5C1D\u8BD5\u9759\u97F3\u6E38\u620F\uFF08\u901A\u8FC7postMessage\uFF09
      try {
        gameFrame.contentWindow?.postMessage({ type: 'mute', value: true }, '*');
      } catch {
        // Cross-origin iframe
      }

      // \u6539\u53D8favicon
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href =
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23217346" width="100" height="100"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white">X</text></svg>';
      document.head.appendChild(link);
    } else {
      // \u6062\u590D\u6E38\u620F
      bossOverlay.classList.add('hidden');
      document.title = \\\`\\\${gameTitle} - Play Online Free | MiniGamesHub\\\`;

      try {
        gameFrame.contentWindow?.postMessage({ type: 'mute', value: false }, '*');
      } catch {
        // Cross-origin iframe
      }

      // \u6062\u590Dfavicon
      const link = document.querySelector("link[rel*='icon']");
      if (link) link.href = '/favicon.svg';
    }
  }

  // \u952E\u76D8\u76D1\u542C
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === '\\\`') {
      e.preventDefault();
      toggleBossMode();
    }
    if (!started) return;
    if (e.key === 'm' || e.key === 'M') {
      toggleMute();
    }
    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  bossBtn?.addEventListener('click', toggleBossMode);

  // \u9759\u97F3\u529F\u80FD
  let isMuted = false;
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = document.getElementById('mute-icon');
  const muteText = document.getElementById('mute-text');

  function toggleMute() {
    isMuted = !isMuted;
    muteIcon.textContent = isMuted ? '\u{1F507}' : '\u{1F50A}';
    muteText.textContent = isMuted ? labels.unmute : labels.mute;

    try {
      gameFrame.contentWindow?.postMessage(
        {
          type: 'audio',
          action: isMuted ? 'mute' : 'unmute',
        },
        '*'
      );
    } catch {
      // Cross-origin iframe
    }

    // \u89C6\u89C9\u53CD\u9988
    muteBtn.classList.toggle('bg-red-600', isMuted);
    muteBtn.classList.toggle('bg-gray-600', !isMuted);
  }

  muteBtn?.addEventListener('click', toggleMute);

  // \u5168\u5C4F\u529F\u80FD
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      void gameFrame.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }

  fullscreenBtn?.addEventListener('click', toggleFullscreen);

  // iframe\u52A0\u8F7D\u5B8C\u6210\u540E\uFF1A\u9690\u85CFloading\u4E0E\u6D77\u62A5\uFF0C\u663E\u793A\u771F\u5B9E\u6E38\u620F\u753B\u9762
  gameFrame?.addEventListener('load', () => {
    const loading = document.querySelector('.loading-overlay');
    if (loading) loading.classList.add('hidden');
    gameFrame.classList.remove('opacity-0');
    poster?.classList.add('hidden');
  });
})();<\/script> `, " "])), maybeRenderHead(), addAttribute(game.id, "data-game-id"), addAttribute(`game-frame-${game.id}`, "id"), addAttribute(embedUrl, "data-src"), addAttribute(`${game.title} - Play Online Free`, "title"), addAttribute(`poster-${game.id}`, "id"), addAttribute(`Play ${game.title} now`, "aria-label"), addAttribute(game.thumbnail, "src"), addAttribute(`${game.title} \u2014 game cover`, "alt"), labels.loading, game.title, showControls && renderTemplate`<div class="player-controls mt-4 flex flex-wrap gap-2 items-center justify-between bg-gray-800 p-3 rounded-lg" data-astro-cid-v2j3jbim> <div class="flex gap-2" data-astro-cid-v2j3jbim> <button id="boss-key-btn" class="boss-key-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"${addAttribute(labels.bossKeyHint, "title")} data-astro-cid-v2j3jbim> <span data-astro-cid-v2j3jbim>🚨</span> <span data-astro-cid-v2j3jbim>${labels.bossKey}</span> </button> <button id="mute-btn" class="mute-btn bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" title="Mute (M)" data-astro-cid-v2j3jbim> <span id="mute-icon" data-astro-cid-v2j3jbim>🔊</span> <span id="mute-text" data-astro-cid-v2j3jbim>${labels.mute}</span> </button> <button id="fullscreen-btn" class="fullscreen-btn bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" title="Fullscreen (F)" data-astro-cid-v2j3jbim> <span data-astro-cid-v2j3jbim>⛶</span> <span data-astro-cid-v2j3jbim>${labels.fullscreen}</span> </button> </div> <div class="text-gray-300 text-sm" data-astro-cid-v2j3jbim>${unescapeHTML(labels.bossKeyHint.replace("ESC", '<kbd class="bg-gray-700 px-2 py-1 rounded">ESC</kbd>'))}</div> </div>`, unescapeHTML(labels.returnToGame.replace("ESC", '<kbd class="bg-gray-200 px-2 py-1 rounded">ESC</kbd>')), defineScriptVars({ gameId: game.id, gameTitle: game.title, labels }), renderScript($$result, "E:/website/minigameshub.org/src/components/game/GamePlayer.astro?astro&type=script&index=0&lang.ts"));
}, "E:/website/minigameshub.org/src/components/game/GamePlayer.astro", void 0);

export { $$GamePlayer as $ };
