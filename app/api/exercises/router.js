const express = require('express');
const { getAll } = require('./controller');
const router = express();

router.get('/exercises', getAll);

module.exports = router;
