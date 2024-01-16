const { NotFoundError } = require('../../errors');

const User = require('../../../models').User;
const Exercise = require('../../../models').Exercise;
const Food = require('../../../models').Food;
const ExerciseRecommendation =
  require('../../../models').ExerciseRecommendation;
const FoodRecommendation = require('../../../models').FoodRecommendation;

const getExercisesRecommendationUser = async (req) => {
  const { page = 1, limit = 10, date } = req.query;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await ExerciseRecommendation.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id, date: date },
    attributes: ['id', 'UserId', 'date'],
    include: [
      {
        model: Exercise,
        attributes: [
          'id',
          'name',
          'category',
          'description',
          'duration',
          'repetitions',
          'sets',
          'image',
        ],
      },
    ],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const getFoodsRecommendationUser = async (req) => {
  const { page = 1, limit = 10, date } = req.query;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }
  const result = await FoodRecommendation.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id, date: date },
    attributes: ['id', 'UserId', 'date'],
    include: {
      model: Food,
      attributes: ['id', 'name', 'category', 'description', 'image'],
    },
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

module.exports = {
  inputDailyActivitiesUser,
  getExercisesRecommendationUser,
  getFoodsRecommendationUser,
};
