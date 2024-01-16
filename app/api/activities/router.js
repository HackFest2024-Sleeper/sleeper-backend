const express = require('express');
const {
  inputDailyActivities,
  getAllDailyActivities,
  getOneDailyActivities,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.post('/activities/daily', authenticateUser, inputDailyActivities);
router.get('/activities/daily', authenticateUser, getAllDailyActivities);
router.get('/activities/daily/:id', authenticateUser, getOneDailyActivities);

module.exports = router;
