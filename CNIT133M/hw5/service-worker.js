
// Change to v2, etc. if update any of the local resources, 
const PRECACHE = 'hw5-v2';
const RUNTIME = 'runtime';

// A list of local resources to be cached.
const PRECACHE_URLS = [
       './',
       'index.html',
//        'images/lightblue.jpg',
//        'images/lightgold.jpg',
       'images/android-chrome-192x192.png',
       'images/android-chrome-512x512.png',
       'images/favicon-16x16.png',
       'images/favicon-32x32.png',
       'style.css',
       'manifest.json',
       'app.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
   event.waitUntil(
      caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
   );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
   const currentCaches = [PRECACHE, RUNTIME];
   event.waitUntil(
      caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
         return caches.delete(cacheToDelete);
      }));
      }).then(() => self.clients.claim())
   );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics if you have one.
   if (event.request.url.startsWith(self.location.origin)) {
      event.respondWith(
         caches.match(event.request).then(cachedResponse => {
         if (cachedResponse) {
            return cachedResponse;
         }

         return caches.open(RUNTIME).then(cache => {
            return fetch(event.request).then(response => {
               // Put a copy of the response in the runtime cache.
               return cache.put(event.request, response.clone()).then(() => {
               return response;
               });
            });
         });
         })
      );
   }
});
