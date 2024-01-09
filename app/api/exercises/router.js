const express = require('express');
const { getAll, getOne } = require('./controller');
const router = express();

router.get('/exercises', getAll);
router.get('/exercises/:id', getOne);

module.exports = router;
