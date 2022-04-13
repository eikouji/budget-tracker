
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

// fetch event //

self.addEventListener(`fetch`, event => {
    if (
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
    )
})