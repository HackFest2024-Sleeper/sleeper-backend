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

  createActivitiesRecommendation
);
router.get(
  '/:uid/recommendations/activities',

  getActivitiesRecommendation
);
router.get(
  '/:uid/recommendations/exercises',

  getExercisesRecommendation
);
router.get('/:uid/recommendations/foods', getFoodsRecommendation);

module.exports = router;
