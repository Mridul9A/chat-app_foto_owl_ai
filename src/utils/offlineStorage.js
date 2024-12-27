export const openOfflineDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('chatApp', 1);

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject('Error opening IndexedDB: ' + e.target.error);
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { autoIncrement: true });
      }
    };
  });
};

export const storeMessageOffline = (message) => {
  openOfflineDB()
    .then((db) => {
      const transaction = db.transaction('messages', 'readwrite');
      const store = transaction.objectStore('messages');
      store.add(message);
    })
    .catch((error) => console.error('Error storing message offline:', error));
};

export const getMessagesOffline = () => {
  return new Promise((resolve, reject) => {
    openOfflineDB()
      .then((db) => {
        const transaction = db.transaction('messages', 'readonly');
        const store = transaction.objectStore('messages');
        const request = store.getAll();
        
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject('Error fetching offline messages: ' + e.target.error);
      })
      .catch((error) => reject(error));
  });
};
