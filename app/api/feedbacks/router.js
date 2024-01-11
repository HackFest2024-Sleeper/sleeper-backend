const express = require('express');
const {
  inputDailyFeedbacks,
  getAllFeedbacks,
  getOneFeedback,
} = require('./controller');
const router = express();

router.get('/feedbacks', getAllFeedbacks);
router.get('/feedbacks/:id', getOneFeedback);
router.post('/feedbacks/daily', inputDailyFeedbacks);

module.exports = router;
