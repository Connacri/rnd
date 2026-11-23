/* RND Aïn El Türck PWA service worker — GitHub Pages subpath aware. */
const CACHE_PREFIX = 'rnd-aet-pwa-';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const APP_BASE = new URL(self.registration.scope).pathname;
const CORE_URLS = [
  APP_BASE,
  APP_BASE + 'index.html',
  APP_BASE + 'site.webmanifest',
  APP_BASE + 'favicon.png',
  APP_BASE + 'apple-touch-icon.png',
  APP_BASE + 'assets/icons/icon-192.png',
  APP_BASE + 'assets/icons/icon-512.png',
  APP_BASE + 'assets/icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_URLS))
      .catch((error) => console.warn('RND PWA core cache could not be fully populated:', error))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_BASE)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(APP_BASE + 'index.html', copy));
        }
        return response;
      }).catch(async () => {
        return (await caches.match(APP_BASE + 'index.html')) ||
          (await caches.match(APP_BASE)) || Response.error();
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
