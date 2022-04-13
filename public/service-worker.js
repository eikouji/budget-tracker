
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
        catches
          .keys()
          .then(cacheNames =>
            // returns array of cache names //
            cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
            )
            .then(cachesToDelete =>
                Promise.all(
                    // deletes caches //
                    cachesToDelete.map(cacheToDelete => caches.toDelete();
                    )
                )
                .then() => self.clients())
})