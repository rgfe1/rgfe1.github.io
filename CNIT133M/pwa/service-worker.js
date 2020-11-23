var CACHE_VERSION = 'PWA';
var CACHE_FILES = [
       './',
       './styles.css',
       './app.js'
];

self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches
        .open(CACHE_VERSION)
        .then(cache => {
            console.log('SW caching files');
            cache.addAll(CACHE_FILES)
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('SW activated');
    event.waitUntil(
        caches.keys().then(keyNames => {
            return Promise.all(
                keyNames.map(key => {
                    if(key !== CACHE_VERSION) {
                        console.log('SW clearing old caches');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('SW fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});



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
