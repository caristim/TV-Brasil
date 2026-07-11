const CACHE_NAME = 'tvbrasil-v1';
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});