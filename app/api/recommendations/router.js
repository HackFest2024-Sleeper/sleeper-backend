const express = require('express');
const {
  inputDailyActivities,
  getExercisesRecommendation,
  getFoodsRecommendation,
} = require('./controller');
const router = express();

router.post('/recommendations/daily-activities', inputDailyActivities);
router.get('/recommendations/exercises', getExercisesRecommendation);
router.get('/recommendations/foods', getFoodsRecommendation);

module.exports = router;
