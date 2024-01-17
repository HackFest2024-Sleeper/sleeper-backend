const express = require('express');
const {
  inputDailyFeedbacks,
  getAllFeedbacks,
  getOneFeedback,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.get('/:uid/feedbacks', getAllFeedbacks);
router.get('/:uid/feedbacks/:id', getOneFeedback);
router.post('/feedbacks/daily', inputDailyFeedbacks);

module.exports = router;
