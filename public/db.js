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

function checkDatabase() {
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
               // open transaction on pending db //
               transaction = db.transaction([pendingObjectStoreName], `readwrite`);

               // access your pending object store //
               store = transaction.objetStore(pendingObjectStoreName);

               // clear all items from store //
               store.clear();
            };
        }
       };

       // save records //
       function saveRecord(record) {
           const db = request.result;

           // create a transaction on the pending db with readwrite access //
           const transaction = db.transaction([pendingObjectStoreName], `readwrite`);
           
           // access your pending object store //
           const store = transaction.objectSTore(pendingObjectStoreName);

           // add record to your store //
           store.add(record);
        }
}


window.addEventListener('online', checkDatabase);