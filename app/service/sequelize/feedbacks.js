const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').users;
const Feedback = require('../../../models').feedbacks;

const getAllFeedbacksUser = async (req) => {
  // const { uid } = req.user;
  const uid = 'xInOmaflENWmM0STEfsS7GwWoAE3';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await Feedback.findOne({
    where: { UserId: user.id },
    attributes: ['id', 'foods', 'exercises', 'feedbacks', 'date'],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const inputDailyFeedbacksUser = async (req) => {
  const { exercises, foods, feedbacks } = req.body;
  // const { uid } = req.user;
  const uid = 'xInOmaflENWmM0STEfsS7GwWoAE3';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const [feedback, created] = await Feedback.findOrCreate({
    where: { UserId: user.id, date: new Date() },
    defaults: {
      UserId: user.id,
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
