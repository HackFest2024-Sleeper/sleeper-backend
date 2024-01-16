const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').User;
const Feedback = require('../../../models').Feedback;
const Activity = require('../../../models').Activity;
const FeedbackActivity = require('../../../models').FeedbackActivity;

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
  } else {
    whereClause.UserId = user.id;
  }

  const result = await Feedback.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: whereClause,
    attributes: ['id', 'feedback', 'date'],
    include: {
      model: Activity,
      attributes: ['id', 'name', 'priority', 'duration', 'time'],
    },
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
    where: { UserId: user.id },
    attributes: ['id', 'feedbacks', 'date'],
    include: {
      model: Activity,
      attributes: ['id', 'name', 'priority', 'duration', 'time'],
    },
  });

  return result;
};

const inputDailyFeedbacksUser = async (req) => {
  const { activityIds, feedbacks, date } = req.body;
  const { uid } = req.user;
  let activities = null;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  if (activityIds) {
    activities = await Activity.findAll({
      where: {
        id: activityIds,
        UserId: user.id,
      },
    });

    const foundIds = activities.map((activity) => activity.id);
    const missingIds = activityIds.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundError(`Activities with id [${missingIds}] not found.`);
    }
  }

  const [feedback, created] = await Feedback.findOrCreate({
    where: { date: date, UserId: user.id },
    defaults: {
      feedback: feedbacks,
    },
  });

  if (!created) {
    throw new BadRequestError(
      `Daily feedback already filled for ${feedback.date}`
    );
  }

  await FeedbackActivity.bulkCreate(
    activities.map((activity) => ({
      FeedbackId: feedback.id,
      ActivityId: activity.id,
    }))
  );

  return feedback;
};

module.exports = {
  inputDailyFeedbacksUser,
  getAllFeedbacksUser,
  getOneFeedbackUser,
};
