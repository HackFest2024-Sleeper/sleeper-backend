const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://sleeper-409912-default-rtdb.asia-southeast1.firebasedatabase.app',
});

module.exports = admin;
