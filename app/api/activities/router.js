const express = require('express');
const {
  inputDailyActivities,
  getAllDailyActivities,
  getOneDailyActivities,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.post('/activities/daily', inputDailyActivities);
router.get('/activities/:uid/daily', getAllDailyActivities);
router.get('/activities/:uid/daily/:id', getOneDailyActivities);

module.exports = router;
