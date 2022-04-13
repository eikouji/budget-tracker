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

function checkDataBase() {
    const dataBase = request.result;

    // open a transaction on your db //
    let transaction = db.transaction([pendingObjectStoreName], `readwrite`);

    // access pending object store //
    let store = transaction.objectStore(pendingObjectStoreName);

    // get all records from store and set to a variable //
    const getAll = store.getAll();

    // successful get //
    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch(`/api/transaction/bulk`, {
                method: `POST`,
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: `application/json, text/plain, */*`,
                    "Content-type": `application/json`
                }
            })
            .then(response => response.json())
            .then(() => {
                // success -> open transaction on db //

                // access pending object store //

                // clear store //

            }
        }
    }
}



window.addEventListener('online', checkDatabase);