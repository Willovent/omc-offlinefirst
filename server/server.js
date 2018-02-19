const webpush = require('web-push');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const keys = { "publicKey": "BNEkbZKhisrNksovQYTgmytwoH2R4k8DM3QWNQooBkOiH12GghIB2nJXvmZVT9_xDHwcicOE6eDd6eU0sb1BwP0", "privateKey": "ql2iWXBZc5zJEAvGkd0urOCBrYXi2OKW-ROncUI1r6I" }

webpush.setVapidDetails(
    'mailto:klein.william@outlook.com',
    keys.publicKey,
    keys.privateKey
);

let sub = {};

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/sub', function (req, res) {
  sub = req.body;
  res.send('Ok');
});

app.get('/', function (req, res) {
    res.send('Ok');
    webpush.sendNotification(sub,JSON.stringify( {data:'Les messages, ça serait stylé'}));
});

app.listen(8080);
