const express = require('express');
const {
  inputDailyActivities,
  getAllDailyActivities,
  getOneDailyActivities,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.post('/daily', authenticateUser, inputDailyActivities);
router.get('/daily', authenticateUser, getAllDailyActivities);
router.get('/daily/:id', authenticateUser, getOneDailyActivities);

module.exports = router;
