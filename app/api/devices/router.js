const express = require('express');
const { updateSmartLamp } = require('./controller');
const router = express();

router.put('/smart-lamp', updateSmartLamp)

module.exports = router;
