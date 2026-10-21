const CACHE_NAME = 'minigameshub-v2';
const RUNTIME_CACHE = 'minigameshub-runtime-v2';
const ASSETS_TO_CACHE = ['/', '/search', '/manifest.json', '/favicon.svg', '/404'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(ASSETS_TO_CACHE.map((url) => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Navigation requests: network first, fall back to cache / 404
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
          return response;
        } catch (e) {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/404');
          if (fallback) return fallback;
          throw e;
        }
      })()
    );
    return;
  }

  // Static assets (including cross-origin game thumbnails): stale-while-revalidate
  const dest = request.destination;
  if (dest === 'style' || dest === 'script' || dest === 'image' || dest === 'font') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && (response.ok || response.type === 'opaque')) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })()
    );
    return;
  }

  // Everything else: network only (not intercepted)
});
