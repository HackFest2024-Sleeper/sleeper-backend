const express = require('express');
const { updateSmartLamp } = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.put('/smart-lamp', authenticateUser, updateSmartLamp);

module.exports = router;
