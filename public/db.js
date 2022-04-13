// create new db request for a budget database //
const request = indexedDB.open(`budget`, 2);

request.onupgradeneeded = event => {
    const db = request.result;

    console.log(event);

    // set auto-increment to true for object store //
    if (!db.objectStoreNames.contains(pendingObjectStoreName)) {
        db.createObjectStore(pendingObjectStoreName, { autoIncrement: true });

    }

};

