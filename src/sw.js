self.importScripts('https://unpkg.com/dexie@2.0.1/dist/dexie.js');

let db;

self.addEventListener('install', function (event) {
  db = new Dexie("CommentDb");
  db.version(1).stores({
    comment: '++id, content, user, date',
    outBoxComment: '++id, content, user, date',
  });
});

self.addEventListener('sync', function (event) {
  if (event.tag == 'sync-outbox') {
    event.waitUntil(syncOutBox());
  }
});

function syncOutBox() {
  return fetch('http://localhost:8080');
}

self.addEventListener('push', function (event) {
  db.outBoxComment.toArray()
    .then(comments => {
      let promises = [];
      for (var comment of comments) {
        promises.push(db.comment.add(comment));
      }
      return Promise.all(promises);
    })
    .then(() => db.outBoxComment.clear())
    .then(() => {
      clients.matchAll().then((clients) => {
        for (var client of clients) {
          client.postMessage("update");
        }
      });
    });
})


