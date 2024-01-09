const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').users;
const History = require('../../../models').histories;

const inputDailyFeedbacksUser = async (req) => {
  const { exercises, foods, feedbacks } = req.body;
  // const { uid } = req.user;
  const uid = 'xInOmaflENWmM0STEfsS7GwWoAE3';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const [history, created] = await History.findOrCreate({
    where: { date: new Date() },
    defaults: {
      UserId: user.id,
      foods: foods,
      exercises: exercises,
      feedbacks: feedbacks,
    },
  });

  if (!created) {
    throw new BadRequestError(
      `Daily feedback already filled for ${history.date}`
    );
  }

  return history;
};

module.exports = { inputDailyFeedbacksUser };
