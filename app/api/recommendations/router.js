const express = require('express');
const { inputDailyActivities } = require('./controller');
const router = express();

router.post('/recommendations/daily-activities', inputDailyActivities);

module.exports = router;
