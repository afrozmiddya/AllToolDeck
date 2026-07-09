const CACHE_NAME = 'alltooldeck-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/A_logo.png',
  '/logo1.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // If request is for an asset and succeeds, cache a copy
          if (networkResponse && networkResponse.status === 200 && event.request.url.startsWith(self.location.origin)) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback for document navigation requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
