const express = require('express');
const { getAll } = require('./controller');
const router = express();

router.get('/foods', getAll);

module.exports = router;