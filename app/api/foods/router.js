const express = require('express');
const { getAll, getOne } = require('./controller');
const router = express();

router.get('/foods', getAll);
router.get('/foods/:id', getOne);

module.exports = router;
