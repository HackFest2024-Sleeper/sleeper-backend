const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').User;
const Feedback = require('../../../models').Feedback;

const getAllFeedbacksUser = async (req) => {
  const { uid } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const whereClause = {};

  if (req.query.keyword) {
    keyword = keyword.toLowerCase();
    whereClause.name = { [Op.iLike]: `%${q}%` };
  }

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await Feedback.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: whereClause,
    attributes: ['id', 'foods', 'exercises', 'feedbacks', 'date'],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const getOneFeedbackUser = async (req) => {
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await Feedback.findOne({
    attributes: ['id', 'foods', 'exercises', 'feedbacks', 'date'],
  });

  return result;
};

const inputDailyFeedbacksUser = async (req) => {
  const { exercises, foods, feedbacks } = req.body;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const [feedback, created] = await Feedback.findOrCreate({
    where: { date: new Date(), UserId: user.id },
    defaults: {
      foods: foods,
      exercises: exercises,
      feedbacks: feedbacks,
    },
  });

  if (!created) {
    throw new BadRequestError(
      `Daily feedback already filled for ${feedback.date}`
    );
  }

  return feedback;
};

module.exports = {
  inputDailyFeedbacksUser,
  getAllFeedbacksUser,
  getOneFeedbackUser,
};
