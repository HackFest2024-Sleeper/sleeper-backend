const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').User;
const Activity = require('../../../models').Activity;
const Exercise = require('../../../models').Exercise;
const Food = require('../../../models').Food;
const ExerciseRecommendation =
  require('../../../models').ExerciseRecommendation;
const FoodRecommendation = require('../../../models').FoodRecommendation;

const inputDailyActivitiesUser = async (req) => {
  const { activities, date } = req.body;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  for (const activityData of activities) {
    const [activity, created] = await Activity.findOrCreate({
      where: { name: activityData.name, date: date, UserId: user.id },
      defaults: {
        type: activityData.type,
        duration: activityData.duration,
      },
    });

    if (!created) {
      throw new BadRequestError(
        `Daily activity for ${activity.name} already filled for ${activity.date}`
      );
    }
  }

  return 'Daily Activities inputted';
};

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
