const CACHE_NAME = 'tvbrasil-v2'; // Cambiar versión para forzar actualización
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  'https://cdn.jsdelivr.net/npm/hls.js@1.5.8/dist/hls.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activar y limpiar caches antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
