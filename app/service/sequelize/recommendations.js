const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').User;
const Activity = require('../../../models').Activity;
const Exercise = require('../../../models').Exercise;
const ExerciseRecommendation =
  require('../../../models').ExerciseRecommendation;
const FoodRecommendation = require('../../../models').FoodRecommendation;

const inputDailyActivitiesUser = async (req) => {
  const { activities, date } = req.body;
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';

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
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await ExerciseRecommendation.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id, date: date },
    attributes: ['id', 'UserId', 'ExerciseId', 'date'],
    include: [
      {
        model: Exercise,
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
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await FoodRecommendation.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id, date: date },
    attributes: ['id', 'UserId', 'FoodId', 'date'],
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
