
// Change to v2, etc. if update any of the local resources, 
const PRECACHE = 'hw5-v2';
const RUNTIME = 'runtime';

// A list of local resources to be cached.
const PRECACHE_URLS = [
       './',
       'index.html',
       'images/lightblue.jpg',
       'images/lightgold.jpg',
       'android-chrome-192x192.png',
       'android-chrome-512x512.png',
       'favicon-16x16.png',
       'favicon-32x32.png',
       'style.css',
       'app.js'

//    'index.html',
//    './', 
//    'style.css',
//    'lightblue.jpg',
//    'lightgold.jpg',
//    'manifest.json',
//    'icon/icon48.png',
//    'icon/icon180.png',
//    'icon/icon192.png',
//    'icon/icon512.png'
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






// var CACHE_VERSION = 'Research App Tech';
// var CACHE_FILES = [
//        './',
//        './index.html',
//        'images/lightblue.jpg',
//        'images/lightgold.jpg',
//        'android-chrome-192x192.png',
//        'android-chrome-512x512.png',
//        'favicon-16x16.png',
//        'favicon-32x32.png',
//        './style.css',
//        './app.js'
// ];

// self.addEventListener('install', event => {
//     console.log('SW installed');
//     event.waitUntil(
//         caches
//         .open(CACHE_VERSION)
//         .then(cache => {
//             console.log('SW caching files');
//             cache.addAll(CACHE_FILES)
//         })
//         .then(() => self.skipWaiting())
//     );
// });

// self.addEventListener('activate', event => {
//     console.log('SW activated');
//     event.waitUntil(
//         caches.keys().then(keyNames => {
//             return Promise.all(
//                 keyNames.map(key => {
//                     if(key !== CACHE_VERSION) {
//                         console.log('SW clearing old caches');
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
// });

// self.addEventListener('fetch', event => {
//     console.log('SW fetching');
//     event.respondWith(
//         fetch(event.request).catch(() => caches.match(event.request))
//     );
// });



// const staticAssets = [
//     './',
//     './styles.css',
//     './app.js'
// ];

// self.addEventListener('install', async event => {
//     const cache = await caches.open('static-PWA');
//     cache.addAll(staticAssets);
// });

// self.addEventListener('fetch', event => {
//     const {request} = event;
//     const url = new URL(request.url);
//     if(url.origin === location.origin) {
//         event.respondWith(cacheData(request));
//     } else {
//         event.respondWith(networkFirst(request));
//     }

// });

// async function cacheData(request) {
//     const cachedResponse = await caches.match(request);
//     return cachedResponse || fetch(request);
// }

// async function networkFirst(request) {
//     const cache = await caches.open('dynamic-PWA');

//     try {
//         const response = await fetch(request);
//         cache.put(request, response.clone());
//         return response;
//     } catch (error){
//         return await cache.match(request);

//     }

// }
