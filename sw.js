const CACHE_NAME = 'mon-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css'
  // Ajoutez ici les chemins vers d'autres fichiers importants si besoin
  // Par exemple : '/script.js', '/images/une-autre-image.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Sert depuis le cache
        }
        return fetch(event.request); // Sinon, va chercher sur le réseau
      }
    )
  );
});