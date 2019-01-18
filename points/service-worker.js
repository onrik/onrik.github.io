var cacheName = 'points-v1';
var filesToCache = [
  '/points/',
  '/points/static/css/bootstrap-4.1.3.min.css',
  '/points/static/css/bootstrap.min.css.map',
  '/points/static/css/font-awesome-4.7.0.min.css',
  '/points/static/css/mdb-4.5.15.min.css',
  '/points/static/images/icon.png',
  '/points/static/font/roboto/Roboto-Light.woff2',
  '/points/static/font/roboto/Roboto-Regular.woff2',
  '/points/static/font/roboto/Roboto-Regular.woff2',
  '/points/static/js/jquery-3.3.1.min.js',
  '/points/static/js/bootstrap-4.1.3.min.js',
  '/points/static/js/bootstrap.min.js.map',
  '/points/static/js/mdb-4.5.14.min.js',
  '/points/static/js/vue-2.5.17.min.js',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }).then(self.skipWaiting())
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
      e.respondWith(
      caches.open(cacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
});