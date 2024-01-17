const express = require('express');
const {
  createActivitiesRecommendation,
  getActivitiesRecommendation,
  getExercisesRecommendation,
  getFoodsRecommendation,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.post(
  '/recommendations/activities',
  authenticateUser,
  createActivitiesRecommendation
);
router.get(
  '/recommendations/activities',
  authenticateUser,
  getActivitiesRecommendation
);
router.get(
  '/recommendations/exercises',
  authenticateUser,
  getExercisesRecommendation
);
router.get('/recommendations/foods', authenticateUser, getFoodsRecommendation);

module.exports = router;
