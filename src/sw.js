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

Dexie.Promise.prototype.delay = function(duration) {
  return this.then(function(value) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(value)
      }, duration)
    })
  }, function(reason) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(reason)
      }, duration)
    })
  })
}

function syncOutBox() {
  return db.outBoxComment.toArray()
  .delay(1500)
  .then(comments => {
    let promises = [];
    for (var comment of comments) {
      promises.push(db.comment.add(comment));
    }
    return Promise.all(promises);
  }).then(() => db.outBoxComment.clear()).then(() => {
    clients.matchAll().then((clients) => {
      for (var client of clients) {
        client.postMessage("update");
      }
    });
  });
}
