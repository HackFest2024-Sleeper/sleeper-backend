const express = require('express');
const {
  inputDailyActivities,
  getExercisesRecommendation,
  getFoodsRecommendation,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.post(
  '/recommendations/daily-activities',
  authenticateUser,
  inputDailyActivities
);
router.get(
  '/recommendations/exercises',
  authenticateUser,
  getExercisesRecommendation
);
router.get('/recommendations/foods', authenticateUser, getFoodsRecommendation);

module.exports = router;
