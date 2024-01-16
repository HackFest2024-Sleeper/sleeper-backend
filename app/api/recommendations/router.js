const express = require('express');
const {
  getExercisesRecommendation,
  getFoodsRecommendation,
} = require('./controller');
const { authenticateUser } = require('../../middlewares/auth');
const router = express();

router.get(
  '/recommendations/exercises',
  authenticateUser,
  getExercisesRecommendation
);
router.get('/recommendations/foods', authenticateUser, getFoodsRecommendation);

module.exports = router;
