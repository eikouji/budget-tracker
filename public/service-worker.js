const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

console.log('service-worker.js file');

// save these files //
const FILES_TO_CACHE = [
    `/db.js`,
    // index files //
    `/index.html`,
    `/index.js`,
    `/index.css`,

    `/manifest.webmanifest`,
    `/img/icons/money.png`

];

// cache activate //

self.addEventListener(`activate`, event => {
    const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
    event.waitUntil(
        caches.keys().then(function (keyList) {
          // keylist contains all cache names under username.github.io ///
          // filter out the cache names that has this app prefix to the keeplist //
          let cacheKeepList = keyList.filter(function (key) {
              return key.indexOf(APP_PREFIX);
          })
          // add current cache name to keeplist //
          cacheKeepList.push(CACHE_NAME);

          return Promise.all(keyList.map(function (key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i] );
              return caches.delete(keyList[i]);
            }
          }));
        })
})

// fetch event //

self.addEventListener(`fetch`, event => {
    console.log('fetch request : ' + event.request.url)
    event.respondWith(
        caches.match(event.request).then(function (request) {
    if (request) { // if cache is available, respond with cache //
        console.log('responding with cache : ') + event.request.url)
        return request
    } else {
        event.request.method !== `GET` ||
        !event.request.url.startsWith(self.location.origin)
    ) {
        event.respondWith(fetch(event.request));
        return;
    }

    if (
        event.request.url.includes(`/api/transaction`)) {
            event.respondWith(
                caches.ope(RUNTIME_CACHE).then(cache =>
                    fetch(event.request)
                    .then(response => {
                        cach.put(event.request, response.clone());

                    })
                    .catch(() => caches.match(event.request ))
                    )

            );
            return;
        }

        // data is retrieved from cache //
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return cache 
                  .open(RUNTIME_CACHE)
                  .then(cache =>)
            })
        )


        // cache resources //
        self.addEventListener('install', function (event) {
            event.waitUntil(
                caches.open(CACHE_NAME).then(function (cache) {
                    console.log('installing cache : ' + CACHE_NAME)
                    return cache.addAll(FILES_TO_CACHE)
                })
            )
        })
    )
})