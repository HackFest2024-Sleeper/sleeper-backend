const express = require('express');
const { inputDailyFeedbacks } = require('./controller');
const router = express();

router.post('/feedbacks/daily', inputDailyFeedbacks);

module.exports = router;
