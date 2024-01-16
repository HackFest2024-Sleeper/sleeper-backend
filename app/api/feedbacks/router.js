const express = require('express');
const {
  inputDailyFeedbacks,
  getAllFeedbacks,
  getOneFeedback,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.get('/feedbacks', authenticateUser, getAllFeedbacks);
router.get('/feedbacks/:id', authenticateUser, getOneFeedback);
router.post('/feedbacks/daily', authenticateUser, inputDailyFeedbacks);

module.exports = router;
